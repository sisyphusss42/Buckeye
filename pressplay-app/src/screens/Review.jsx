import { useNavigate } from 'react-router-dom'
import StatusBar from '../components/StatusBar'

export default function Review() {
  const navigate = useNavigate()
  return (
    <div className="screen">
      <StatusBar />
      <div className="header-bar">
        <div className="back-btn" onClick={() => navigate('/')}>✕</div>
        <div className="progress-bar" style={{ flex: 1, margin: '0 16px' }}><div className="fill green" style={{ width: '40%' }} /></div>
        <span className="text-caption">2/5</span>
      </div>
      <div className="screen-content" style={{ textAlign: 'center' }}>
        <div style={{ fontSize: 40, marginBottom: 12 }}>🧠</div>
        <h3 className="text-title mb-16">間隔複習</h3>
        <div className="card mb-16" style={{ textAlign: 'left' }}>
          <p className="text-caption mb-8">請用自己的話解釋</p>
          <p className="text-title" style={{ fontSize: 18 }}>什麼是「白平衡」？</p>
          <textarea style={{ width: '100%', height: 80, border: '1.5px solid var(--gray-200)', borderRadius: 12, padding: 12, marginTop: 12, fontFamily: 'var(--font)', fontSize: 15, resize: 'none', outline: 'none' }} placeholder="輸入你的答案..." />
          <p className="text-small mt-8" style={{ color: 'var(--warning)' }}>🍃 這朵花有點缺水了</p>
        </div>
        <div className="ai-bubble" style={{ textAlign: 'left', marginBottom: 24 }}>
          <strong>需要提示嗎？</strong><br/>想想不同光源下，白色為什麼會偏色…
        </div>
        <div style={{ textAlign: 'left', marginBottom: 16 }}>
          <p className="text-caption mb-8">把握度</p>
          <div className="confidence-bar">
            <div className="confidence-dot filled low" /><div className="confidence-dot filled low" />
            <div className="confidence-dot filled medium" /><div className="confidence-dot" /><div className="confidence-dot" />
          </div>
        </div>
      </div>
      <div style={{ padding: '16px 20px', flexShrink: 0 }}>
        <button className="btn btn-primary" onClick={() => navigate('/')}>提交答案</button>
      </div>
    </div>
  )
}
