import { useNavigate, useParams } from 'react-router-dom'
import StatusBar from '../components/StatusBar'
import courses from '../data/courses'

export default function Course() {
  const navigate = useNavigate()
  const { courseId } = useParams()
  const course = courses.find(c => c.id === courseId) || courses[0]

  const completedVideos = JSON.parse(localStorage.getItem('completedVideos') || '[]')

  return (
    <div className="screen">
      <StatusBar />
      <div className="header-bar">
        <div className="back-btn" onClick={() => navigate('/')}>‹</div>
        <div/>
      </div>
      <div className="screen-content">
        {/* Course Header */}
        <div style={{ textAlign: 'center', marginBottom: 24 }}>
          <div style={{ fontSize: 48, marginBottom: 8 }}>{course.icon}</div>
          <h2 className="text-h2">{course.title}</h2>
          <p className="text-caption">{course.subtitle}</p>
          <p className="text-small mt-4">{course.category} · {course.episodes.length} 集</p>
        </div>

        {/* Episode List */}
        {course.episodes.map((ep, idx) => {
          const isCompleted = completedVideos.some(cv => cv.videoId === ep.id)
          return (
            <div key={ep.id} className="card flex items-center gap-12 mb-8" style={{ cursor: 'pointer' }} onClick={() => navigate(`/video/${ep.id}`)}>
              <div style={{ width: 36, height: 36, borderRadius: '50%', background: isCompleted ? 'var(--green)' : 'var(--gray-200)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 14, color: isCompleted ? 'white' : 'var(--text-secondary)', fontWeight: 600 }}>
                {isCompleted ? '✓' : idx + 1}
              </div>
              <div className="flex-1">
                <div className="text-body" style={{ fontWeight: 500 }}>{ep.title}</div>
              </div>
              <div style={{ fontSize: 16, color: 'var(--text-tertiary)' }}>▶</div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
