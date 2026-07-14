import { useNavigate } from 'react-router-dom'
import StatusBar from '../components/StatusBar'
import BottomNav from '../components/BottomNav'

const flowers = [
  { emoji: '🌸', name: '三分法' }, { emoji: '🌺', name: '景深' },
  { emoji: '🌷', name: '色溫' }, { emoji: '🍂', name: '白平衡' },
  { emoji: '🌻', name: '認知偏誤' }, { emoji: '🌹', name: '從眾效應' },
  { emoji: '💐', name: '色彩對比' }, { emoji: '🌳', name: '合作之樹' },
  { emoji: '🌱', name: 'ISO 值' }, { emoji: '🌼', name: '快門速度' },
  { emoji: '🪻', name: '投射效應' }, { emoji: '🌿', name: '光圈值' },
]

export default function Garden() {
  const navigate = useNavigate()
  return (
    <div className="screen">
      <StatusBar />
      <div className="screen-content">
        <div className="flex items-center justify-between mb-12">
          <h2 className="text-h2">我的花園 🌸</h2>
          <span style={{ fontSize: 20 }}>🔍</span>
        </div>
        <p className="text-caption mb-16">28 朵花 · 3 棵樹 · 本週 +5 綻放</p>
        <div className="tab-bar mb-16">
          <div className="tab-item active">全部</div>
          <div className="tab-item">攝影</div>
          <div className="tab-item">心理學</div>
          <div className="tab-item">設計</div>
        </div>
        <div className="flower-grid">
          {flowers.map((f, i) => (
            <div key={i} className="flower-item" onClick={() => navigate('/flower')}>
              <span className="flower-emoji">{f.emoji}</span>
              <span className="flower-name">{f.name}</span>
            </div>
          ))}
        </div>
        <div className="card mt-20" style={{ background: 'var(--yellow-light)', cursor: 'pointer' }} onClick={() => navigate('/review')}>
          <div className="flex items-center gap-12">
            <span style={{ fontSize: 24 }}>🍃</span>
            <div className="flex-1"><div style={{ fontWeight: 600 }}>1 朵花快枯萎了</div><div className="text-caption">「白平衡」3 天沒複習</div></div>
            <span className="btn btn-small btn-primary">澆水 💧</span>
          </div>
        </div>
      </div>
      <BottomNav />
    </div>
  )
}
