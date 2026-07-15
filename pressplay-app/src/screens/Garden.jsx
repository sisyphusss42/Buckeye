import { useNavigate } from 'react-router-dom'
import StatusBar from '../components/StatusBar'
import BottomNav from '../components/BottomNav'
import { buildGardenSVG } from '../gardenScene'
import videos from '../data/videos'

export default function Garden() {
  const navigate = useNavigate()

  // Get completed videos from localStorage
  const completedVideos = JSON.parse(localStorage.getItem('completedVideos') || '[]')

  // Build flower data from completed videos
  const flowers = completedVideos.map((cv, i) => {
    const video = videos.find(v => v.id === cv.videoId)
    return {
      title: video?.title || cv.videoId,
      petals: 4, // starts with 4 petals, grows with quiz answers
      colorIndex: i,
    }
  })

  const gardenHTML = buildGardenSVG(flowers)

  return (
    <div className="screen">
      <StatusBar />
      <div className="screen-content">
        <div className="flex items-center justify-between mb-12">
          <h2 className="text-h2">我的花園 🌸</h2>
          <span style={{ fontSize: 20, cursor: 'pointer' }}>🔍</span>
        </div>
        <p className="text-caption mb-12">
          {flowers.length > 0
            ? `${flowers.length} 朵花 · 本週 +${flowers.length} 綻放`
            : '花園還是空的，去看影片種下第一朵花吧'}
        </p>

        {/* Garden Scene */}
        <div
          style={{ borderRadius: 20, overflow: 'hidden', boxShadow: 'var(--shadow-md)' }}
          dangerouslySetInnerHTML={{ __html: gardenHTML }}
        />

        {/* Flower list — tap to see detail */}
        {flowers.length > 0 && (
          <div className="flex gap-12 mt-16" style={{ overflowX: 'auto', paddingBottom: 4 }}>
            {completedVideos.map((cv, i) => {
              const video = videos.find(v => v.id === cv.videoId)
              return (
                <div key={cv.videoId} className="card" style={{ minWidth: 100, textAlign: 'center', cursor: 'pointer' }} onClick={() => navigate(`/flower/${cv.videoId}`)}>
                  <div style={{ fontSize: 28 }}>🌸</div>
                  <div className="text-small mt-4">{video?.title || cv.videoId}</div>
                  <div className="text-small" style={{ color: 'var(--green)' }}>4 片花瓣</div>
                </div>
              )
            })}
          </div>
        )}

        {/* Actions */}
        {flowers.length > 0 ? (
          <div className="card mt-16" style={{ background: 'var(--yellow-light)', cursor: 'pointer' }} onClick={() => navigate('/quiz/' + completedVideos[0].videoId)}>
            <div className="flex items-center gap-12">
              <span style={{ fontSize: 24 }}>🧠</span>
              <div className="flex-1">
                <div style={{ fontWeight: 600 }}>複習讓花朵成長</div>
                <div className="text-caption">答對問題可以增加花瓣</div>
              </div>
              <span className="btn btn-small btn-primary">複習</span>
            </div>
          </div>
        ) : (
          <button className="btn btn-primary mt-16" onClick={() => navigate('/')}>
            去看第一部影片 🌱
          </button>
        )}
      </div>
      <BottomNav />
    </div>
  )
}
