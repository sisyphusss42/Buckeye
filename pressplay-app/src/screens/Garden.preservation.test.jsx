import React from 'react'
import fc from 'fast-check'
import { cleanup, fireEvent, render, screen } from '@testing-library/react'
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import {
  MemoryRouter,
  Route,
  Routes,
  useLocation,
} from 'react-router-dom'
import { buildGardenSVG, getPlotPositions } from '../gardenScene'
import Garden from './Garden'

const spacedRepetitionMocks = vi.hoisted(() => ({
  dueReviews: [],
  petalsById: new Map(),
  getDueReviews: vi.fn(),
  getFlowerState: vi.fn(),
}))

vi.mock('../data/courses', () => ({
  findEpisode: (videoId) => ({ title: `Episode ${videoId}` }),
}))

vi.mock('../data/spacedRepetition', () => ({
  getDueReviews: spacedRepetitionMocks.getDueReviews,
  getFlowerState: spacedRepetitionMocks.getFlowerState,
}))

const EMPTY_GARDEN_PROMPT = '🌱 完成課程來種下你的第一朵花'
const PETAL_COLORS = ['#F08DAA', '#F6C453', '#6FA8FF', '#B38AF5', '#7BC98A']
const SVG_WIDTH = 390
const SVG_HEIGHT = 680
const plots = getPlotPositions()

function seededShuffle(values, seed) {
  const shuffled = [...values]
  let state = seed
  for (let index = shuffled.length - 1; index > 0; index -= 1) {
    state = (state * 1664525 + 1013904223) & 0xFFFFFFFF
    const swapIndex = (state >>> 0) % (index + 1)
    ;[shuffled[index], shuffled[swapIndex]] = [shuffled[swapIndex], shuffled[index]]
  }
  return shuffled
}

function parseGarden(flowers, assignedPlots) {
  return new DOMParser().parseFromString(
    buildGardenSVG(flowers, assignedPlots),
    'image/svg+xml',
  )
}

function numberAttribute(element, name) {
  return Number(element.getAttribute(name))
}

function flowerVisualAt(document, flower, plot) {
  const baseY = plot.y - 3
  if (flower.petals <= 2) {
    return Array.from(document.querySelectorAll('path[stroke="#6DBE6F"]'))
      .filter((path) => path.getAttribute('d').startsWith(`M${plot.x} ${baseY} C`))
  }

  const headY = baseY - 21
  const expectedColor = PETAL_COLORS[flower.colorIndex % PETAL_COLORS.length]
  const centers = Array.from(document.querySelectorAll('circle[fill="#E8A93B"]'))
    .filter((circle) => numberAttribute(circle, 'cx') === plot.x
      && numberAttribute(circle, 'cy') === headY)
  const petals = Array.from(document.querySelectorAll(`ellipse[fill="${expectedColor}"]`))
    .filter((petal) => Math.hypot(
      numberAttribute(petal, 'cx') - plot.x,
      numberAttribute(petal, 'cy') - headY,
    ) <= 7.1)

  return centers.length === 1 && petals.length === flower.petals ? centers : []
}

function visibleFlowerCount(document, flowers, assignedPlots) {
  return flowers.reduce((count, flower, index) => {
    const plot = assignedPlots[index]
    return count + (plot && flowerVisualAt(document, flower, plot).length === 1 ? 1 : 0)
  }, 0)
}

function expectedGardenPlots(count) {
  const shuffledIndices = seededShuffle(plots.map((_, index) => index), 42)
  return shuffledIndices.slice(0, count).map((index) => plots[index])
}

function LocationProbe({ onLocation }) {
  const location = useLocation()
  React.useEffect(() => {
    onLocation?.(location.pathname)
  }, [location.pathname, onLocation])
  return <output data-testid="location">{location.pathname}</output>
}

function renderRoutedGarden(completedVideos, dueReviews = [], onLocation) {
  localStorage.setItem('completedVideos', JSON.stringify(completedVideos))
  spacedRepetitionMocks.dueReviews = dueReviews

  return render(
    <MemoryRouter initialEntries={['/garden']}>
      <LocationProbe onLocation={onLocation} />
      <Routes>
        <Route path="/garden" element={<Garden />} />
        <Route path="/flower/:videoId" element={null} />
        <Route path="/review-session" element={null} />
      </Routes>
    </MemoryRouter>,
  )
}

function legacyHotspots(container) {
  const svgHost = container.querySelector('svg').parentElement
  return Array.from(svgHost.parentElement.children)
    .filter((element) => element.style.width === '38px'
      && element.style.height === '38px')
}

function selectableFlower(container, index) {
  return container.querySelector(`[data-flower-index="${index}"]`)
    || legacyHotspots(container)[index]
}

const gardenStateArbitrary = fc.record({
  completedItems: fc.uniqueArray(
    fc.record({
      videoId: fc.uuid(),
      petals: fc.integer({ min: 1, max: 8 }),
    }),
    {
      minLength: 0,
      maxLength: plots.length,
      selector: (item) => item.videoId,
    },
  ),
  seed: fc.integer(),
}).map(({ completedItems, seed }) => {
  const flowers = completedItems.map((item, index) => ({
    id: item.videoId,
    title: `Episode ${item.videoId}`,
    petals: item.petals,
    colorIndex: index,
  }))
  return {
    completedItems,
    flowers,
    assignedPlots: seededShuffle(plots, seed).slice(0, flowers.length),
  }
})

function outsideSelectableRegions(point, occupiedPlots) {
  return occupiedPlots.every((plot) => {
    const outsideIntendedTarget = Math.hypot(
      point.x - plot.x,
      point.y - (plot.y - 16),
    ) > 24
    const outsideLegacyHotspot = Math.abs(point.x - plot.x) > 19
      || Math.abs(point.y - (plot.y - 5)) > 19
    return outsideIntendedTarget && outsideLegacyHotspot
  })
}

describe('Property 2: Garden Content and Non-Flower Interactions', () => {
  beforeEach(() => {
    localStorage.clear()
    spacedRepetitionMocks.dueReviews = []
    spacedRepetitionMocks.petalsById.clear()
    spacedRepetitionMocks.getDueReviews.mockImplementation(
      () => spacedRepetitionMocks.dueReviews,
    )
    spacedRepetitionMocks.getFlowerState.mockImplementation(
      (videoId) => ({ petals: spacedRepetitionMocks.petalsById.get(videoId) ?? 2 }),
    )
  })

  afterEach(() => {
    cleanup()
    vi.clearAllMocks()
  })

  /**
   * Property 2: Preservation - Garden Content and Non-Flower Interactions.
   * **Validates: Requirements 3.1, 3.2, 3.3, 3.4, 3.5**
   */
  it('preserves one visible flower and its seeded plot, petal count, and color for every valid item', () => {
    fc.assert(
      fc.property(gardenStateArbitrary, ({ flowers, assignedPlots }) => {
        const document = parseGarden(flowers, assignedPlots)

        expect(visibleFlowerCount(document, flowers, assignedPlots)).toBe(flowers.length)
        flowers.forEach((flower, index) => {
          expect(flowerVisualAt(document, flower, assignedPlots[index])).toHaveLength(1)
        })

        if (flowers.length === 0) {
          expect(document.documentElement.textContent).toContain(EMPTY_GARDEN_PROMPT)
          expect(document.querySelectorAll('[data-flower-index]')).toHaveLength(0)
        }
      }),
      { numRuns: 60 },
    )
  })

  it('records Garden seed 42 item-to-plot mapping and exact visual inputs', () => {
    const completedVideos = [
      { videoId: 'seeded-sprout' },
      { videoId: 'seeded-four-petals' },
      { videoId: 'seeded-seven-petals' },
    ]
    const petals = [2, 4, 7]
    completedVideos.forEach((item, index) => {
      spacedRepetitionMocks.petalsById.set(item.videoId, petals[index])
    })

    const { container } = renderRoutedGarden(completedVideos)
    const expectedFlowers = completedVideos.map((item, index) => ({
      id: item.videoId,
      petals: petals[index],
      colorIndex: index,
    }))
    const assignedPlots = expectedGardenPlots(completedVideos.length)
    const document = container.ownerDocument

    expect(visibleFlowerCount(document, expectedFlowers, assignedPlots)).toBe(completedVideos.length)
    expectedFlowers.forEach((flower, index) => {
      expect(flowerVisualAt(document, flower, assignedPlots[index])).toHaveLength(1)
    })
  })

  it('renders only valid occupied plots and no target for an empty or missing plot', () => {
    const flowers = [
      { id: 'valid-a', petals: 2, colorIndex: 0 },
      { id: 'missing', petals: 5, colorIndex: 1 },
      { id: 'valid-b', petals: 6, colorIndex: 2 },
    ]
    const assignedPlots = [plots[0], undefined, plots[2]]
    const document = parseGarden(flowers, assignedPlots)

    expect(visibleFlowerCount(document, flowers, assignedPlots)).toBe(2)
    expect(document.querySelector('[data-flower-index="1"]')).toBeNull()

    const emptyDocument = parseGarden([], [])
    expect(emptyDocument.documentElement.textContent).toContain(EMPTY_GARDEN_PROMPT)
    expect(emptyDocument.querySelectorAll('[data-flower-index]')).toHaveLength(0)
  })

  it('keeps every currently working selection bound to the exact completed videoId', () => {
    const completedVideos = [
      { videoId: 'identity-first' },
      { videoId: 'identity-middle' },
      { videoId: 'identity-last' },
    ]

    completedVideos.forEach((selected, index) => {
      cleanup()
      const { container } = renderRoutedGarden(completedVideos)
      const selection = selectableFlower(container, index)

      expect(selection).not.toBeNull()
      fireEvent.click(selection)
      expect(screen.getByTestId('location').textContent).toBe(`/flower/${selected.videoId}`)
    })
  })

  it('keeps malformed and generated background selections inert', () => {
    const completedVideos = Array.from({ length: 4 }, (_, index) => ({
      videoId: `background-${index}`,
    }))
    const assignedPlots = expectedGardenPlots(completedVideos.length)
    const { container } = renderRoutedGarden(completedVideos)
    const svgHost = container.querySelector('svg').parentElement
    const background = container.querySelector('svg rect')

    for (const malformedIndex of ['bad', '-1', '1.5', '999']) {
      background.setAttribute('data-flower-index', malformedIndex)
      fireEvent.click(background)
      expect(screen.getByTestId('location').textContent).toBe('/garden')
    }
    background.removeAttribute('data-flower-index')

    const outsidePointArbitrary = fc.record({
      x: fc.integer({ min: 0, max: SVG_WIDTH - 1 }),
      y: fc.integer({ min: 0, max: SVG_HEIGHT - 1 }),
    }).filter((point) => outsideSelectableRegions(point, assignedPlots))

    fc.assert(
      fc.property(outsidePointArbitrary, (point) => {
        fireEvent.click(svgHost, { clientX: point.x, clientY: point.y })
        expect(screen.getByTestId('location').textContent).toBe('/garden')
      }),
      { numRuns: 40 },
    )
  })

  it('preserves the empty scene without flower navigation', () => {
    const { container } = renderRoutedGarden([])
    const svg = container.querySelector('svg')

    expect(svg.textContent).toContain(EMPTY_GARDEN_PROMPT)
    expect(container.querySelectorAll('[data-flower-index]')).toHaveLength(0)
    expect(legacyHotspots(container)).toHaveLength(0)

    fireEvent.click(svg)
    expect(screen.getByTestId('location').textContent).toBe('/garden')
  })

  it('navigates exactly once to review independently of flower selection', () => {
    const onLocation = vi.fn()
    renderRoutedGarden(
      [{ videoId: 'review-independent-flower' }],
      [{ videoId: 'due-1' }, { videoId: 'due-2' }],
      onLocation,
    )
    const reviewBanner = screen.getByText('點擊開始今日複習').parentElement.parentElement

    fireEvent.click(reviewBanner)

    expect(screen.getByTestId('location').textContent).toBe('/review-session')
    expect(onLocation.mock.calls.filter(([path]) => path === '/review-session')).toHaveLength(1)
    expect(onLocation.mock.calls.some(([path]) => path.startsWith('/flower/'))).toBe(false)
  })
})
