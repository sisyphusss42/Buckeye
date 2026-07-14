import { useNavigate } from 'react-router-dom'
import StatusBar from '../components/StatusBar'
import BottomNav from '../components/BottomNav'
import { buildGardenSVG } from '../gardenScene'

export default function Garden() {
  const navigate = useNavigate()
  const gardenHTML = buildGardenSVG()

  return (
    <div className="screen">
      <StatusBar />
      <div className="screen-content">
        <div className="flex items-center justify-between mb-12">
          <h2 className="text-h2">我的花園 🌸</h2>
          <span style={{ fontSize: 20, cursor: 'pointer' }}>🔍</span>
        </div>
        <p className="text-caption mb-12">28 朵花 · 3 棵樹 · 本週 +5 綻放</p>
        <div className="tab-bar mb-16">
          <div className="tab-item active">全部</div>
          <div className="tab-item">攝影</div>
          <div className="tab-item">心理學</div>
          <div className="tab-item">設計</div>
        </div>

        {/* Procedural Garden Scene */}
        <div
          style={{ borderRadius: 20, overflow: 'hidden', boxShadow: 'var(--shadow-md)' }}
          dangerouslySetInnerHTML={{ __html: gardenHTML }}
          onClick={() => navigate('/flower')}
        />

        {/* Wilt Warning */}
        <div className="card mt-16" style={{ background: 'var(--yellow-light)', cursor: 'pointer' }} onClick={() => navigate('/review')}>
          <div className="flex items-center gap-12">
            <span style={{ fontSize: 24 }}>🍃</span>
            <div className="flex-1">
              <div style={{ fontWeight: 600 }}>1 朵花快枯萎了</div>
              <div className="text-caption">「白平衡」3 天沒複習</div>
            </div>
            <span className="btn btn-small btn-primary">澆水 💧</span>
          </div>
        </div>
      </div>
      <BottomNav />
    </div>
  )
}
