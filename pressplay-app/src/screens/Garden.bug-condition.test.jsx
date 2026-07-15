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

vi.mock('../data/courses', () => ({
  findEpisode: (videoId) => ({ title: `Episode ${videoId}` }),
}))

vi.mock('../data/spacedRepetition', () => ({
  getFlowerState: (videoId) => ({
    petals: videoId.includes('sprout') ? 2 : 6,
  }),
  getDueReviews: () => [],
}))

const SVG_WIDTH = 390
const SVG_HEIGHT = 680
const TARGET_RADIUS = 24
const LEGACY_HOTSPOT_SIZE = 38
const plots = getPlotPositions()

function svgPointToScreen(point, viewport) {
  const scale = viewport.width / SVG_WIDTH
  return { x: point.x * scale, y: point.y * scale }
}

function intendedTarget(plot) {
  return { x: plot.x, y: plot.y - 16, radius: TARGET_RADIUS }
}

function legacyHotspot(plot, viewport) {
  const halfSize = LEGACY_HOTSPOT_SIZE / 2
  const center = {
    x: (plot.x / SVG_WIDTH) * viewport.width,
    y: ((plot.y - 5) / SVG_HEIGHT) * viewport.height,
  }
  return {
    center,
    left: center.x - halfSize,
    right: center.x + halfSize,
    top: center.y - halfSize,
    bottom: center.y + halfSize,
  }
}

function pointInTransformedTarget(point, plot, viewport) {
  const target = intendedTarget(plot)
  const center = svgPointToScreen(target, viewport)
  const scale = viewport.width / SVG_WIDTH
  return Math.hypot(point.x - center.x, point.y - center.y) <= target.radius * scale + Number.EPSILON
}

function pointInLegacyHotspot(point, plot, viewport) {
  const hotspot = legacyHotspot(plot, viewport)
  return point.x >= hotspot.left && point.x <= hotspot.right
    && point.y >= hotspot.top && point.y <= hotspot.bottom
}

function isBugCondition(input) {
  const occupied = Number.isInteger(input.flowerIndex)
    && input.flowerIndex >= 0
    && input.flowerIndex < input.completedItems.length
    && Boolean(input.assignedPlots[input.flowerIndex])

  if (!occupied) return false

  const plot = input.assignedPlots[input.flowerIndex]
  return pointInTransformedTarget(input.pointerScreenPoint, plot, input.viewport)
    && !pointInLegacyHotspot(input.pointerScreenPoint, plot, input.viewport)
}

function diagnostic(input) {
  const plot = input.assignedPlots[input.flowerIndex]
  const targetCenter = svgPointToScreen(intendedTarget(plot), input.viewport)
  const hotspot = legacyHotspot(plot, input.viewport)
  const point = input.pointerScreenPoint
  const nearestVerticalMiss = point.y < hotspot.top
    ? hotspot.top - point.y
    : point.y > hotspot.bottom
      ? point.y - hotspot.bottom
      : 0

  return {
    viewport: `${input.viewport.width}x${input.viewport.height}`,
    flowerIndex: input.flowerIndex,
    videoId: input.completedItems[input.flowerIndex].videoId,
    plot,
    growthState: input.growthState,
    pointerScreenPoint: point,
    svgTargetCenterY: Number(targetCenter.y.toFixed(3)),
    legacyHotspotCenterY: Number(hotspot.center.y.toFixed(3)),
    centerOffsetY: Number((hotspot.center.y - targetCenter.y).toFixed(3)),
    nearestVerticalMiss: Number(nearestVerticalMiss.toFixed(3)),
  }
}

function parseGarden(flowers, assignedPlots) {
  const document = new DOMParser().parseFromString(
    buildGardenSVG(flowers, assignedPlots),
    'image/svg+xml',
  )
  return { document, svg: document.documentElement }
}

function expectSvgIntegratedTarget(input) {
  const flowers = input.completedItems.map((item, index) => ({
    id: item.videoId,
    title: item.videoId,
    petals: index === input.flowerIndex ? input.petals : 2,
    colorIndex: index,
  }))
  const { svg } = parseGarden(flowers, input.assignedPlots)
  const target = svg.querySelector(`[data-flower-index="${input.flowerIndex}"]`)
  const details = JSON.stringify(diagnostic(input))

  expect(
    target,
    `Expected an SVG-integrated flower target for bug-condition input: ${details}`,
  ).not.toBeNull()
  expect(target.closest('svg'), `Target must inherit the rendered flower SVG transform: ${details}`).toBe(svg)

  const sharedGroup = target.localName === 'g' ? target : target.parentElement
  expect(
    sharedGroup?.querySelector('path, ellipse, circle'),
    `Visible flower and target must occupy the same SVG group: ${details}`,
  ).not.toBeNull()

  const targetCircle = target.localName === 'circle'
    ? target
    : target.querySelector('circle[fill="transparent"], circle[pointer-events]')
  expect(targetCircle, `Expected circular SVG target geometry: ${details}`).not.toBeNull()

  const plot = input.assignedPlots[input.flowerIndex]
  const cx = Number(targetCircle.getAttribute('cx'))
  const cy = Number(targetCircle.getAttribute('cy'))
  const radius = Number(targetCircle.getAttribute('r'))
  const pointerUserPoint = {
    x: input.pointerScreenPoint.x * SVG_WIDTH / input.viewport.width,
    y: input.pointerScreenPoint.y * SVG_WIDTH / input.viewport.width,
  }

  expect(cx).toBe(plot.x)
  expect(cy).toBe(plot.y - 16)
  expect(radius).toBeGreaterThanOrEqual(TARGET_RADIUS)
  expect(Math.hypot(pointerUserPoint.x - cx, pointerUserPoint.y - cy)).toBeLessThanOrEqual(radius)
}

const plotArbitrary = fc.constantFrom(...plots)
const offsetArbitrary = fc.record({
  dx: fc.integer({ min: -24, max: 24 }),
  dy: fc.integer({ min: -24, max: 24 }),
}).filter(({ dx, dy }) => dx * dx + dy * dy <= TARGET_RADIUS * TARGET_RADIUS)

const bugInputArbitrary = fc.record({
  viewport: fc.record({
    width: fc.oneof(fc.constant(390), fc.integer({ min: 320, max: 480 })),
    height: fc.oneof(
      fc.constantFrom(600, 680, 760),
      fc.integer({ min: 520, max: 840 }),
    ),
  }),
  assignedPlots: fc.uniqueArray(plotArbitrary, {
    minLength: 6,
    maxLength: 6,
    selector: (plot) => `${plot.x}:${plot.y}`,
  }),
  flowerIndex: fc.integer({ min: 0, max: 5 }),
  petals: fc.oneof(fc.constant(2), fc.integer({ min: 3, max: 8 })),
  offset: offsetArbitrary,
}).map((generated) => {
  const plot = generated.assignedPlots[generated.flowerIndex]
  const pointerUserPoint = {
    x: plot.x + generated.offset.dx,
    y: plot.y - 16 + generated.offset.dy,
  }
  return {
    viewport: generated.viewport,
    assignedPlots: generated.assignedPlots,
    flowerIndex: generated.flowerIndex,
    completedItems: generated.assignedPlots.map((_, index) => ({
      videoId: `generated-video-${index}`,
    })),
    petals: generated.petals,
    growthState: generated.petals <= 2 ? 'sprout' : 'mature',
    pointerScreenPoint: svgPointToScreen(pointerUserPoint, generated.viewport),
  }
}).filter(isBugCondition)

const deterministicCounterexamples = [
  {
    name: 'tall 390x760 host',
    viewport: { width: 390, height: 760 },
    plot: { x: 195, y: 402 },
    pointerUserPoint: { x: 195, y: 386 },
    petals: 6,
    growthState: 'mature',
  },
  {
    name: 'short 390x600 host',
    viewport: { width: 390, height: 600 },
    plot: { x: 335, y: 490 },
    pointerUserPoint: { x: 335, y: 474 },
    petals: 2,
    growthState: 'sprout',
  },
  {
    name: 'reference 390x680 right-edge plot',
    viewport: { width: 390, height: 680 },
    plot: { x: 375, y: 314 },
    pointerUserPoint: { x: 375, y: 274 },
    petals: 8,
    growthState: 'mature',
  },
].map((counterexample) => ({
  ...counterexample,
  flowerIndex: 0,
  assignedPlots: [counterexample.plot],
  completedItems: [{ videoId: `counterexample-${counterexample.viewport.height}` }],
  pointerScreenPoint: svgPointToScreen(counterexample.pointerUserPoint, counterexample.viewport),
}))

function LocationProbe() {
  const location = useLocation()
  return <output data-testid="location">{location.pathname}</output>
}

function renderRoutedGarden(completedVideos) {
  localStorage.setItem('completedVideos', JSON.stringify(completedVideos))
  return render(
    <MemoryRouter initialEntries={['/garden']}>
      <Routes>
        <Route path="/garden" element={<Garden />} />
        <Route path="/flower/:videoId" element={<LocationProbe />} />
      </Routes>
    </MemoryRouter>,
  )
}

describe('Property 1: Responsive Flower Target Alignment and Selection', () => {
  beforeEach(() => localStorage.clear())
  afterEach(() => cleanup())

  /**
   * Property 1: Bug Condition - Responsive Flower Target Alignment and Selection.
   * **Validates: Requirements 1.1, 1.2, 2.1, 2.2**
   */
  it('co-locates every bug-condition target with its rendered flower under one SVG transform', () => {
    fc.assert(
      fc.property(bugInputArbitrary, (input) => {
        expect(isBugCondition(input)).toBe(true)
        expectSvgIntegratedTarget(input)
      }),
      { numRuns: 100, verbose: 2 },
    )
  })

  it.each(deterministicCounterexamples)(
    'reproduces the $name transform mismatch',
    (input) => {
      expect(isBugCondition(input), JSON.stringify(diagnostic(input))).toBe(true)
      expectSvgIntegratedTarget(input)
    },
  )

  it('preserves exact videoId identity when an existing legacy hotspot receives the click', () => {
    const completedVideos = [
      { videoId: 'sprout-video-exact' },
      { videoId: 'mature-video-exact' },
    ]
    const { container } = renderRoutedGarden(completedVideos)
    const svgHost = container.querySelector('svg').parentElement
    const legacyHotspots = Array.from(svgHost.parentElement.children)
      .filter((element) => element.style.width === '38px' && element.style.height === '38px')

    expect(legacyHotspots).toHaveLength(completedVideos.length)
    fireEvent.click(legacyHotspots[1])
    expect(screen.getByTestId('location').textContent).toBe('/flower/mature-video-exact')
  })

  it('navigates an SVG-integrated target to the exact rendered flower videoId', () => {
    const completedVideos = [
      { videoId: 'sprout-video-exact' },
      { videoId: 'mature-video-exact' },
    ]
    const { container } = renderRoutedGarden(completedVideos)
    const target = container.querySelector('[data-flower-index="1"]')

    expect(target).not.toBeNull()
    fireEvent.click(target)
    expect(screen.getByTestId('location').textContent).toBe('/flower/mature-video-exact')
  })
})
