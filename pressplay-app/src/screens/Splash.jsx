import { useNavigate } from 'react-router-dom'

export default function Splash() {
  const navigate = useNavigate()
  return (
    <div className="screen" style={{ background: 'linear-gradient(180deg,#E8F5E9 0%,var(--bg) 100%)', alignItems: 'center', justifyContent: 'center', padding: 40, textAlign: 'center' }}>
      <div style={{ fontSize: 80, marginBottom: 24 }}>🌿</div>
      <h1 style={{ fontSize: 32, fontWeight: 700, color: 'var(--green)', marginBottom: 4 }}>PressPlay</h1>
      <h2 style={{ fontSize: 28, fontWeight: 700, marginBottom: 16 }}>Academy</h2>
      <p style={{ fontSize: 16, color: 'var(--text-secondary)', marginBottom: 48 }}>每一次學習，都讓花園多一分生機</p>
      <button className="btn btn-primary" onClick={() => navigate('/survey')} style={{ marginBottom: 12 }}>開始種下第一朵花 🌱</button>
      <button className="btn btn-ghost" onClick={() => navigate('/')}>我已經有帳號了</button>
      <p style={{ fontSize: 12, color: 'var(--text-tertiary)', marginTop: 'auto' }}>v1.0 · 用學習灌溉你的知識花園</p>
    </div>
  )
}
