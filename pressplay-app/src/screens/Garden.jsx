import { useNavigate } from 'react-router-dom'
import BottomNav from '../components/BottomNav'
import { buildGardenSVG, getPlotPositions } from '../gardenScene'
import { findEpisode } from '../data/courses'
import { getFlowerState } from '../data/spacedRepetition'

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

  const gardenHTML = buildGardenSVG(flowers)
  const plots = getPlotPositions()

  // SVG viewBox is 390x680, we need to map plot coords to percentage positions
  const W = 390, H = 680

  return (
    <div className="screen">
      {/* Full-screen garden with clickable flowers */}
      <div style={{ flex: 1, overflow: 'hidden', position: 'relative' }}>
        <div
          style={{ width: '100%', height: '100%' }}
          dangerouslySetInnerHTML={{ __html: gardenHTML }}
        />
        {/* Clickable hotspots over each planted flower */}
        {flowers.map((flower, i) => {
          if (i >= plots.length) return null
          const plot = plots[i]
          return (
            <div
              key={flower.id}
              onClick={() => navigate(`/flower/${flower.id}`)}
              style={{
                position: 'absolute',
                left: `${(plot.x / W) * 100}%`,
                top: `${((plot.y - 5) / H) * 100}%`,
                width: 38,
                height: 38,
                transform: 'translate(-50%, -50%)',
                cursor: 'pointer',
                borderRadius: '50%',
              }}
            />
          )
        })}
      </div>
      <BottomNav />
    </div>
  )
}
