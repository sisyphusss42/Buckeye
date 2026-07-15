import { useNavigate } from 'react-router-dom'
import BottomNav from '../components/BottomNav'
import { buildGardenSVG, getPlotPositions } from '../gardenScene'
import { findEpisode } from '../data/courses'
import { getFlowerState, getDueReviews } from '../data/spacedRepetition'

// Seeded shuffle — same seed always produces same order
function seededShuffle(arr, seed) {
  const shuffled = [...arr]
  let s = seed
  for (let i = shuffled.length - 1; i > 0; i--) {
    s = (s * 1664525 + 1013904223) & 0xFFFFFFFF
    const j = ((s >>> 0) % (i + 1))
    ;[shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]]
  }
  return shuffled
}

export default function Garden() {
  const navigate = useNavigate()

  const completedVideos = JSON.parse(localStorage.getItem('completedVideos') || '[]')

  const flowers = completedVideos.map((cv, i) => {
    const ep = findEpisode(cv.videoId)
    const state = getFlowerState(cv.videoId)
    return {
      id: cv.videoId,
      title: ep?.title || cv.videoId,
      petals: state.petals || 2,
      colorIndex: i,
    }
  })

  // Shuffle plot indices so flowers appear scattered randomly (but consistently)
  const allPlots = getPlotPositions()
  const plotIndices = seededShuffle(allPlots.map((_, i) => i), 42)
  const assignedPlots = flowers.map((_, i) => allPlots[plotIndices[i]])

  const gardenHTML = buildGardenSVG(flowers, assignedPlots)
  const dueReviews = getDueReviews()

  const handleGardenClick = (event) => {
    const target = event.target.closest?.('[data-flower-index]')
    if (!target) return

    const rawIndex = target.getAttribute('data-flower-index')
    if (!/^(0|[1-9]\d*)$/.test(rawIndex ?? '')) return

    const index = Number(rawIndex)
    if (!Number.isSafeInteger(index) || index >= flowers.length) return

    navigate(`/flower/${flowers[index].id}`)
  }

  return (
    <div className="screen">
      <div style={{ flex: 1, overflow: 'hidden', position: 'relative' }}>
        <div
          onClick={handleGardenClick}
          style={{ width: '100%', height: '100%' }}
          dangerouslySetInnerHTML={{ __html: gardenHTML }}
        />
        {/* Review reminder banner */}
        {dueReviews.length > 0 && (
          <div
            onClick={() => navigate('/review-session')}
            style={{
              position: 'absolute',
              bottom: 12,
              left: 16,
              right: 16,
              background: 'rgba(255,255,255,0.95)',
              borderRadius: 16,
              padding: '12px 16px',
              display: 'flex',
              alignItems: 'center',
              gap: 12,
              boxShadow: '0 4px 16px rgba(0,0,0,0.12)',
              cursor: 'pointer',
            }}
          >
            <span style={{ fontSize: 24 }}>💧</span>
            <div style={{ flex: 1 }}>
              <div style={{ fontWeight: 600, fontSize: 14 }}>{dueReviews.length} 朵花需要澆水</div>
              <div style={{ fontSize: 12, color: 'var(--text-secondary)' }}>點擊開始今日複習</div>
            </div>
            <span style={{ fontSize: 13, fontWeight: 600, color: 'var(--green)', background: 'var(--green-light)', padding: '6px 12px', borderRadius: 20 }}>複習</span>
          </div>
        )}
      </div>
      <BottomNav />
    </div>
  )
}
