import { useNavigate } from 'react-router-dom'
import StatusBar from '../components/StatusBar'
import BottomNav from '../components/BottomNav'
import { useAuth } from '../auth/AuthContext'
import videos from '../data/videos'

export default function Home() {
  const navigate = useNavigate()
  const { user } = useAuth()
  const displayName = user?.username?.split('@')[0] || 'Ava'

  // Check completed videos from localStorage
  const completedVideos = JSON.parse(localStorage.getItem('completedVideos') || '[]')
  const completedCount = completedVideos.length

  return (
    <div className="screen">
      <StatusBar />
      <div className="screen-content">
        <div className="flex items-center justify-between" style={{ marginBottom: 20 }}>
          <div><span className="text-title">早安 ☀️</span><br/><span className="text-h2">{displayName}</span></div>
          <div className="flex gap-12 items-center">
            <div style={{ cursor: 'pointer', fontSize: 20 }} onClick={() => navigate('/notifications')}>🔔</div>
            <div className="avatar green" onClick={() => navigate('/profile')}>{displayName.charAt(0).toUpperCase()}</div>
          </div>
        </div>

        {/* Streak Card */}
        <div className="card" style={{ background: 'linear-gradient(135deg,var(--green-light),var(--yellow-light))', marginBottom: 20 }}>
          <div className="flex items-center justify-between">
            <div><div className="text-caption">已完成課程</div><div className="text-h2">{completedCount} / {videos.length} 🔥</div></div>
            <div style={{ fontSize: 20, fontWeight: 700 }}>{completedCount}/{videos.length}</div>
          </div>
          <p className="text-caption" style={{ marginTop: 8 }}>
            {completedCount < videos.length ? '繼續學習，讓花園更加茂盛 ✨' : '太厲害了！全部完成 🎉'}
          </p>
        </div>

        {/* Course List */}
        <div className="flex items-center justify-between mb-12">
          <span className="text-title">課程列表</span>
          <span className="text-caption">{videos.length} 堂課</span>
        </div>

        {videos.map(video => {
          const isCompleted = completedVideos.some(c => c.videoId === video.id)
          return (
            <div key={video.id} className="card flex items-center gap-12 mb-12" style={{ cursor: 'pointer' }} onClick={() => navigate(`/video/${video.id}`)}>
              <div style={{ width: 48, height: 48, borderRadius: 12, background: isCompleted ? 'var(--green-light)' : 'var(--blue-light)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 24 }}>
                {isCompleted ? '✅' : video.icon}
              </div>
              <div className="flex-1">
                <div className="text-body" style={{ fontWeight: 600 }}>{video.title}</div>
                <div className="text-caption">{video.subtitle}</div>
                <div className="text-small mt-4">{video.category} · {video.duration}</div>
              </div>
              <div style={{ fontSize: 20 }}>▶</div>
            </div>
          )
        })}

        {/* Review Reminder */}
        {completedCount > 0 && (
          <div className="card mt-16" style={{ background: 'var(--yellow-light)', cursor: 'pointer' }} onClick={() => navigate('/review')}>
            <div className="flex items-center gap-12">
              <span style={{ fontSize: 28 }}>🧠</span>
              <div className="flex-1"><div style={{ fontWeight: 600 }}>{completedCount} 個知識點待複習</div><div className="text-caption">趁記憶還新，快澆水</div></div>
              <span className="btn btn-small btn-primary">複習</span>
            </div>
          </div>
        )}
      </div>
      <BottomNav />
    </div>
  )
}
