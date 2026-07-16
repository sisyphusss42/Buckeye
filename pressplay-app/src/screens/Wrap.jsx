import { useNavigate } from 'react-router-dom'
import StatusBar from '../components/StatusBar'

export default function Wrap() {
  const navigate = useNavigate()
  return (
    <div className="screen" style={{ background: 'linear-gradient(180deg,#E8F5E9 0%,var(--bg) 50%)' }}>
      <StatusBar />
      <div className="header-bar"><div className="back-btn" onClick={() => navigate('/profile')}>‹</div><div/></div>
      <div className="screen-content" style={{ textAlign: 'center' }}>
        <h2 className="text-h2 mb-8">✨ 2026 年度回顧</h2>
        <div style={{ fontSize: 48, margin: '24px 0' }}>🌸</div>
        <p style={{ fontSize: 16 }}>你讓</p>
        <p className="text-display" style={{ color: 'var(--green)', margin: '8px 0' }}>168</p>
        <p style={{ fontSize: 20, marginBottom: 8 }}>朵花綻放 🌸</p>
        <p className="text-caption mb-24">今年是你花園最茂盛的一年</p>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12, marginBottom: 24 }}>
          <div className="stat-box"><div className="stat-value" style={{ color: 'var(--blue)' }}>86h</div><div className="stat-label">學習時數</div></div>
          <div className="stat-box"><div className="stat-value" style={{ color: 'var(--green)' }}>42</div><div className="stat-label">完成課程</div></div>
          <div className="stat-box"><div className="stat-value" style={{ color: 'var(--yellow)' }}>98</div><div className="stat-label">最長連續</div></div>
          <div className="stat-box"><div className="stat-value" style={{ color: 'var(--pink)' }}>7</div><div className="stat-label">成長樹木</div></div>
        </div>
        <div className="card mb-20"><div className="text-caption mb-8">最愛主題</div><p style={{ fontSize: 16 }}>📷 攝影 · 🧠 心理學 · 🎨 設計</p></div>
        <button className="btn btn-primary">分享我的年度花園</button>
      </div>
    </div>
  )
}
