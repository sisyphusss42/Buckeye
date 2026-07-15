import { useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import videos from '../data/videos'

export default function Video() {
  const navigate = useNavigate()
  const { videoId } = useParams()
  const [completed, setCompleted] = useState(false)

  // Find the video or default to first
  const video = videos.find(v => v.id === videoId) || videos[0]

  const handleMarkComplete = () => {
    if (!completed) {
      setCompleted(true)
      const finishData = {
        videoId: video.id,
        title: video.title,
        completedAt: new Date().toISOString(),
      }
      console.log('✅ 影片觀看完成', finishData)
      // Store in localStorage for garden
      const history = JSON.parse(localStorage.getItem('completedVideos') || '[]')
      if (!history.find(h => h.videoId === video.id)) {
        history.push(finishData)
        localStorage.setItem('completedVideos', JSON.stringify(history))
      }
      // Redirect to garden after a short delay
      setTimeout(() => navigate('/garden'), 1500)
    }
  }

  return (
    <div className="screen">
      {/* YouTube Embed */}
      <div style={{ position: 'relative', width: '100%', aspectRatio: '16/9', background: '#000', flexShrink: 0 }}>
        <div style={{ position: 'absolute', top: 12, left: 16, zIndex: 10 }}>
          <div className="back-btn" onClick={() => navigate('/')} style={{ background: 'rgba(255,255,255,0.2)', color: 'white' }}>‹</div>
        </div>
        <iframe
          width="100%"
          height="100%"
          src={`https://www.youtube.com/embed/${video.youtubeId}?rel=0&modestbranding=1`}
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
          style={{ display: 'block' }}
        />
      </div>

      {/* Content */}
      <div className="screen-content" style={{ paddingTop: 16 }}>
        <div className="text-caption" style={{ color: 'var(--green)' }}>{video.category} · {video.duration}</div>
        <h2 className="text-title" style={{ margin: '4px 0 8px' }}>{video.title}</h2>
        <p className="text-caption">{video.subtitle}</p>

        {!completed ? (
          <button className="btn btn-primary mt-16" onClick={handleMarkComplete}>
            我看完了 ✓
          </button>
        ) : (
          <div className="card mt-16" style={{ background: 'var(--green-light)', textAlign: 'center' }}>
            <span style={{ fontSize: 24 }}>🌱</span>
            <p style={{ fontWeight: 600, marginTop: 8 }}>恭喜完成觀看！</p>
            <p className="text-caption">你獲得了一顆種子，已種入花園</p>
          </div>
        )}

        <div className="ai-bubble mt-16" style={{ cursor: 'pointer' }} onClick={() => navigate(`/quiz/${video.id}`)}>
          想測驗一下對「{video.title}」的理解嗎？
          <div style={{ marginTop: 8 }}><span className="btn btn-small btn-primary">開始測驗</span></div>
        </div>
      </div>
    </div>
  )
}
