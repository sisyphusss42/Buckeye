import { useNavigate } from 'react-router-dom'
import StatusBar from '../components/StatusBar'

export default function Notifications() {
  const navigate = useNavigate()
  return (
    <div className="screen">
      <StatusBar />
      <div className="screen-content">
        <div className="flex items-center justify-between mb-16">
          <h2 className="text-h2">通知 🔔</h2>
          <span className="text-caption" style={{ cursor: 'pointer', color: 'var(--green)' }}>全部已讀</span>
        </div>
        <p className="text-caption mb-12" style={{ fontWeight: 600 }}>今天</p>
        <div className="notif-item" onClick={() => navigate('/flower')}>
          <span className="notif-icon">🌸</span>
          <div><div className="notif-title">一朵花綻放了！</div><div className="notif-desc">你掌握了「三分法則」· 2 分鐘前</div></div>
        </div>
        <div className="notif-item" onClick={() => navigate('/review')}>
          <span className="notif-icon">🤖</span>
          <div><div className="notif-title">AI 幫你排好今日複習</div><div className="notif-desc">3 個知識點趁記憶新鮮 · 1 小時前</div></div>
        </div>
        <div className="notif-item" onClick={() => navigate('/partners')}>
          <span className="notif-icon">🤝</span>
          <div><div className="notif-title">小柔完成了一堂課</div><div className="notif-desc">你們的合作之樹升級了 · 3 小時前</div></div>
        </div>
        <p className="text-caption mb-12 mt-16" style={{ fontWeight: 600 }}>昨天</p>
        <div className="notif-item" onClick={() => navigate('/review')}>
          <span className="notif-icon">🍃</span>
          <div><div className="notif-title">「白平衡」需要澆水</div><div className="notif-desc">3 天沒複習，花瓣開始掉落</div></div>
        </div>
        <div className="notif-item">
          <span className="notif-icon">🔥</span>
          <div><div className="notif-title">連續學習 12 天！</div><div className="notif-desc">保持下去，明天別忘了 ☀️</div></div>
        </div>
      </div>
      <div style={{ padding: '12px 20px', borderTop: '1px solid var(--gray-200)', textAlign: 'center' }}>
        <button className="btn btn-ghost" onClick={() => navigate('/')}>← 返回首頁</button>
      </div>
    </div>
  )
}
