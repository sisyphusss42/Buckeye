import { useNavigate } from 'react-router-dom'
import StatusBar from '../components/StatusBar'
import BottomNav from '../components/BottomNav'
import { useAuth } from '../auth/AuthContext'
import courses from '../data/courses'

export default function Home() {
  const navigate = useNavigate()
  const { user } = useAuth()
  const displayName = user?.username?.split('@')[0] || '小明'

  const completedVideos = JSON.parse(localStorage.getItem('completedVideos') || '[]')
  const completedCount = completedVideos.length
  const totalEpisodes = courses.reduce((sum, c) => sum + c.episodes.length, 0)

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

        {/* Progress Card */}
        <div className="card" style={{ background: 'linear-gradient(135deg,var(--green-light),var(--yellow-light))', marginBottom: 16 }}>
          <div className="flex items-center justify-between">
            <div><div className="text-caption">學習進度</div><div className="text-h2">{completedCount} 堂完成 🔥</div></div>
            <div style={{ fontSize: 16, fontWeight: 700 }}>{completedCount}/{totalEpisodes}</div>
          </div>
          <div className="progress-bar mt-8" style={{ height: 6 }}>
            <div className="fill green" style={{ width: `${(completedCount / totalEpisodes) * 100}%` }} />
          </div>
        </div>

        {/* AI Recommendation */}
        <div className="card mb-20" style={{ cursor: 'pointer', border: '1.5px solid var(--green-light)' }} onClick={() => navigate('/course/ocean')}>
          <div className="flex items-center gap-8 mb-8">
            <span>🤖</span>
            <span className="text-caption" style={{ color: 'var(--green)', fontWeight: 600 }}>AI 為你推薦</span>
          </div>
          <div className="flex items-center gap-12">
            <div style={{ width: 48, height: 48, borderRadius: 12, background: '#5FAF6A22', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 24 }}>🌊</div>
            <div className="flex-1">
              <div className="text-body" style={{ fontWeight: 600 }}>海洋</div>
              <div className="text-caption">你已完成天文和地質的大部分課程，建議接著學習海洋，補齊地球科學的知識版圖。</div>
            </div>
            <div style={{ fontSize: 16 }}>›</div>
          </div>
        </div>

        {/* Course List */}
        <div className="flex items-center justify-between mb-12">
          <span className="text-title">課程列表</span>
          <span className="text-caption">{courses.length} 門課程</span>
        </div>

        {courses.map(course => {
          const courseCompleted = completedVideos.filter(cv =>
            course.episodes.some(ep => ep.id === cv.videoId)
          ).length
          return (
            <div key={course.id} className="card mb-12" style={{ cursor: 'pointer' }} onClick={() => navigate(`/course/${course.id}`)}>
              <div className="flex items-center gap-12">
                <div style={{ width: 48, height: 48, borderRadius: 12, background: course.color + '22', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 24 }}>
                  {course.icon}
                </div>
                <div className="flex-1">
                  <div className="text-body" style={{ fontWeight: 600 }}>{course.title}</div>
                  <div className="text-caption">{course.subtitle}</div>
                  <div className="text-small mt-4">講師：{course.lecturer}</div>
                  <div className="progress-bar mt-8" style={{ height: 4 }}>
                    <div className="fill" style={{ width: `${(courseCompleted / course.episodes.length) * 100}%`, background: course.color, height: '100%', borderRadius: 'var(--r-full)' }} />
                  </div>
                  <div className="text-small mt-4">{courseCompleted} / {course.episodes.length} 集</div>
                </div>
                <div style={{ fontSize: 16 }}>›</div>
              </div>
            </div>
          )
        })}

      </div>
      <BottomNav />
    </div>
  )
}
