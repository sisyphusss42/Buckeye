import { useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { findEpisode } from '../data/courses'

export default function Video() {
  const navigate = useNavigate()
  const { videoId } = useParams()
  const [completed, setCompleted] = useState(false)

  const episode = findEpisode(videoId)
  if (!episode) return <div className="screen"><p style={{ padding: 40 }}>找不到此影片</p></div>

  const handleMarkComplete = () => {
    if (!completed) {
      setCompleted(true)
      const finishData = {
        videoId: episode.id,
        title: episode.title,
        courseId: episode.courseId,
        completedAt: new Date().toISOString(),
      }
      console.log('✅ 影片觀看完成', finishData)
      const history = JSON.parse(localStorage.getItem('completedVideos') || '[]')
      if (!history.find(h => h.videoId === episode.id)) {
        history.push(finishData)
        localStorage.setItem('completedVideos', JSON.stringify(history))
      }
      setTimeout(() => navigate('/garden'), 1500)
    }
  }

  return (
    <div className="screen">
      {/* YouTube Embed */}
      <div style={{ position: 'relative', width: '100%', aspectRatio: '16/9', background: '#000', flexShrink: 0 }}>
        <div style={{ position: 'absolute', top: 12, left: 16, zIndex: 10 }}>
          <div className="back-btn" onClick={() => navigate(`/course/${episode.courseId}`)} style={{ background: 'rgba(255,255,255,0.2)', color: 'white' }}>‹</div>
        </div>
        <iframe
          width="100%"
          height="100%"
          src={`https://www.youtube.com/embed/${episode.youtubeId}?rel=0&modestbranding=1`}
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
          style={{ display: 'block' }}
        />
      </div>

      {/* Content */}
      <div className="screen-content" style={{ paddingTop: 16 }}>
        <div className="text-caption" style={{ color: episode.courseColor }}>{episode.courseIcon} {episode.courseTitle}</div>
        <h2 className="text-title" style={{ margin: '4px 0 8px' }}>{episode.title}</h2>

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

        <div className="card mt-16" style={{ background: 'linear-gradient(135deg, var(--green-light), var(--blue-light))', cursor: 'pointer', padding: '12px 16px', borderRadius: 16, fontSize: 14, lineHeight: 1.6 }} onClick={() => navigate(`/quiz/${episode.id}`)}>
          想測驗一下對「{episode.title}」的理解嗎？
          <div style={{ marginTop: 8 }}><span className="btn btn-small btn-primary">開始測驗</span></div>
        </div>

        <button className="btn btn-ghost mt-16" onClick={() => navigate(`/course/${episode.courseId}`)}>
          ← 回到「{episode.courseTitle}」課程列表
        </button>
      </div>
    </div>
  )
}
