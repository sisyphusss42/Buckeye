import { useNavigate } from 'react-router-dom'
import StatusBar from '../components/StatusBar'

export default function FlowerDetail() {
  const navigate = useNavigate()
  return (
    <div className="screen">
      <StatusBar />
      <div className="header-bar"><div className="back-btn" onClick={() => navigate('/garden')}>‹</div><div/></div>
      <div className="screen-content" style={{ textAlign: 'center' }}>
        <div style={{ position: 'relative', margin: '16px 0 24px' }}>
          <div style={{ fontSize: 80 }}>🌸</div>
          <div style={{ position: 'absolute', top: 0, left: '30%', fontSize: 16 }}>✨</div>
          <div style={{ position: 'absolute', top: 10, right: '30%', fontSize: 14 }}>✨</div>
        </div>
        <div className="text-caption" style={{ color: 'var(--green)' }}>攝影 · 已掌握</div>
        <h2 className="text-h2" style={{ margin: '4px 0 8px' }}>三分法則</h2>
        <p className="text-caption">記憶保留度 80% · 8 / 10 片花瓣</p>
        <div className="progress-bar mt-12 mb-20" style={{ height: 10 }}><div className="fill green" style={{ width: '80%' }} /></div>
        <div style={{ background: 'var(--gray-100)', borderRadius: 16, padding: 16, marginBottom: 24 }}>
          <div className="text-caption mb-12" style={{ textAlign: 'left' }}>🌱 成長歷程</div>
          <div className="growth-stages">
            <div className="growth-stage"><span className="stage-icon">🌱</span><span className="stage-label">學習</span></div>
            <div className="growth-connector" />
            <div className="growth-stage"><span className="stage-icon">🌿</span><span className="stage-label">測驗</span></div>
            <div className="growth-connector" />
            <div className="growth-stage"><span className="stage-icon">🌸</span><span className="stage-label">綻放</span></div>
            <div className="growth-connector" />
            <div className="growth-stage" style={{ opacity: 0.4 }}><span className="stage-icon">🌺</span><span className="stage-label">精通</span></div>
          </div>
        </div>
        <div className="card mb-16"><div className="flex items-center justify-between"><span>下次複習</span><span style={{ fontWeight: 600, color: 'var(--green)' }}>2 天後</span></div></div>
        <button className="btn btn-primary mb-12" onClick={() => navigate('/review')}>立即複習 💧</button>
        <button className="btn btn-ghost" onClick={() => navigate('/video')}>回到課程</button>
      </div>
    </div>
  )
}
