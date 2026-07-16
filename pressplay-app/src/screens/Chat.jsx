import { useNavigate } from 'react-router-dom'
import StatusBar from '../components/StatusBar'

export default function Chat() {
  const navigate = useNavigate()
  return (
    <div className="screen">
      <StatusBar />
      <div className="header-bar" style={{ borderBottom: '1px solid var(--gray-200)' }}>
        <div className="back-btn" onClick={() => navigate('/partners')}>‹</div>
        <div className="flex flex-col items-center"><span style={{ fontWeight: 600 }}>小柔</span><span className="text-small">● 在線 · 契合度 92%</span></div>
        <span style={{ fontSize: 24 }}>🌳</span>
      </div>
      <div className="chat-messages">
        <div className="text-small" style={{ textAlign: 'center', color: 'var(--text-tertiary)', marginBottom: 8 }}>今天</div>
        <div className="chat-bubble received">Ava 早～ 我剛把攝影第 4 課刷完了 📷</div>
        <div className="chat-bubble sent">好強！我等下也來追進度 💪</div>
        <div className="chat-bubble received">我們的樹好像快升級了 👀</div>
        <div className="chat-bubble system">🌳✨ 合作之樹 升到第 3 階！</div>
        <div className="chat-bubble sent">太棒了 🎉</div>
      </div>
      <div className="chat-input-bar">
        <span style={{ fontSize: 20, cursor: 'pointer' }}>＋</span>
        <input type="text" placeholder="輸入訊息..." />
        <span style={{ fontSize: 20, cursor: 'pointer', color: 'var(--green)' }}>➤</span>
      </div>
    </div>
  )
}
