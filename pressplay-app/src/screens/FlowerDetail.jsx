import { useNavigate, useParams } from 'react-router-dom'
import StatusBar from '../components/StatusBar'
import { findEpisode } from '../data/courses'
import { getCurrentFamiliarity, getNextReviewText } from '../data/spacedRepetition'
import { buildSingleFlowerSVG } from '../gardenScene'

export default function FlowerDetail() {
  const navigate = useNavigate()
  const { videoId } = useParams()

  const episode = findEpisode(videoId)
  const title = episode?.title || videoId
  const courseTitle = episode?.courseTitle || ''
  const { familiarity, state } = getCurrentFamiliarity(videoId)
  const nextReview = getNextReviewText(videoId)
  const petals = state.petals || 2

  // Determine color index based on position in completed videos
  const completedVideos = JSON.parse(localStorage.getItem('completedVideos') || '[]')
  const colorIndex = completedVideos.findIndex(cv => cv.videoId === videoId)

  const flowerSVG = buildSingleFlowerSVG(petals, colorIndex >= 0 ? colorIndex : 0, 140)

  const getStage = () => {
    if (familiarity >= 90) return 3
    if (familiarity >= 60) return 2
    if (familiarity >= 30) return 1
    return 0
  }
  const stage = getStage()
  const familiarityColor = familiarity >= 70 ? 'var(--green)' : familiarity >= 40 ? 'var(--yellow)' : 'var(--danger)'

  return (
    <div className="screen">
      <StatusBar />
      <div className="header-bar"><div className="back-btn" onClick={() => navigate('/garden')}>‹</div><div/></div>
      <div className="screen-content" style={{ textAlign: 'center' }}>
        <div style={{ position: 'relative', margin: '16px 0 24px' }}>
          <div dangerouslySetInnerHTML={{ __html: flowerSVG }} />
          <div style={{ position: 'absolute', top: 0, left: '25%', fontSize: 16 }}>✨</div>
          <div style={{ position: 'absolute', top: 10, right: '25%', fontSize: 14 }}>✨</div>
        </div>
        <div className="text-caption" style={{ color: 'var(--green)' }}>{courseTitle} · {stage >= 2 ? '已掌握' : '學習中'}</div>
        <h2 className="text-h2" style={{ margin: '4px 0' }}>{title}</h2>
        <div className="text-small" style={{ marginBottom: 8 }}>講師：{episode?.courseLecturer}</div>

        {/* Familiarity */}
        <div className="card mb-16" style={{ background: 'var(--gray-100)' }}>
          <div className="flex items-center justify-between mb-8">
            <span className="text-caption">記憶熟悉度</span>
            <span style={{ fontWeight: 700, fontSize: 20, color: familiarityColor }}>{familiarity}%</span>
          </div>
          <div className="progress-bar" style={{ height: 10 }}>
            <div className="fill" style={{ width: `${familiarity}%`, background: familiarityColor, height: '100%', borderRadius: 'var(--r-full)' }} />
          </div>
          <div className="flex items-center justify-between mt-8">
            <span className="text-small">{petals} / 10 片花瓣</span>
            <span className="text-small">已複習 {state.reviewCount} 次</span>
          </div>
        </div>

        {/* Next Review */}
        <div className="card mb-16">
          <div className="flex items-center justify-between">
            <span>⏰ 下次複習</span>
            <span style={{ fontWeight: 600, color: nextReview === '現在' ? 'var(--danger)' : 'var(--green)' }}>{nextReview}</span>
          </div>
        </div>

        {/* Quiz Stats */}
        {state.totalAnswered > 0 && (
          <div className="card mb-16">
            <div className="flex items-center justify-between">
              <span>📊 答題紀錄</span>
              <span className="text-caption">{state.totalCorrect} / {state.totalAnswered} 正確 ({Math.round(state.totalCorrect / state.totalAnswered * 100)}%)</span>
            </div>
          </div>
        )}

        {/* Growth Stages */}
        <div style={{ background: 'var(--gray-100)', borderRadius: 16, padding: 16, marginBottom: 24 }}>
          <div className="text-caption mb-12" style={{ textAlign: 'left' }}>🌱 成長歷程</div>
          <div className="growth-stages">
            <div className="growth-stage" style={{ opacity: stage >= 0 ? 1 : 0.4 }}><span className="stage-icon">🌱</span><span className="stage-label">學習</span></div>
            <div className="growth-connector" />
            <div className="growth-stage" style={{ opacity: stage >= 1 ? 1 : 0.4 }}><span className="stage-icon">🌿</span><span className="stage-label">測驗</span></div>
            <div className="growth-connector" />
            <div className="growth-stage" style={{ opacity: stage >= 2 ? 1 : 0.4 }}><span className="stage-icon">🌸</span><span className="stage-label">綻放</span></div>
            <div className="growth-connector" />
            <div className="growth-stage" style={{ opacity: stage >= 3 ? 1 : 0.4 }}><span className="stage-icon">🌺</span><span className="stage-label">精通</span></div>
          </div>
        </div>

        <button className="btn btn-primary mb-12" onClick={() => navigate(`/quiz/${videoId}`)}>開始複習 💧</button>
        <button className="btn btn-ghost" onClick={() => navigate(`/video/${videoId}`)}>重看影片</button>
      </div>
    </div>
  )
}
