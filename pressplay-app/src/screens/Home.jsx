import { useNavigate } from 'react-router-dom'
import StatusBar from '../components/StatusBar'
import BottomNav from '../components/BottomNav'

export default function Home() {
  const navigate = useNavigate()
  return (
    <div className="screen">
      <StatusBar />
      <div className="screen-content">
        <div className="flex items-center justify-between" style={{ marginBottom: 20 }}>
          <div><span className="text-title">早安 ☀️</span><br/><span className="text-h2">Ava</span></div>
          <div className="flex gap-12 items-center">
            <div style={{ cursor: 'pointer', fontSize: 20 }} onClick={() => navigate('/notifications')}>🔔</div>
            <div className="avatar green" onClick={() => navigate('/profile')}>A</div>
          </div>
        </div>
        <div className="card" style={{ background: 'linear-gradient(135deg,var(--green-light),var(--yellow-light))', marginBottom: 20 }}>
          <div className="flex items-center justify-between">
            <div><div className="text-caption">連續學習</div><div className="text-h2">12 天 🔥</div></div>
            <div style={{ fontSize: 20, fontWeight: 700 }}>4/5</div>
          </div>
          <p className="text-caption" style={{ marginTop: 8 }}>再完成 1 堂課，就能點亮今日花朵 ✨</p>
        </div>
        <div className="flex items-center justify-between mb-12">
          <span className="text-title">繼續學習</span>
          <span className="text-caption" style={{ cursor: 'pointer', color: 'var(--green)' }}>查看全部</span>
        </div>
        <div className="card flex items-center gap-12 mb-16" style={{ cursor: 'pointer' }} onClick={() => navigate('/video')}>
          <div style={{ width: 56, height: 56, borderRadius: 12, background: 'var(--pink-light)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 28 }}>📷</div>
          <div className="flex-1">
            <div className="text-body" style={{ fontWeight: 600 }}>攝影 · 進行中</div>
            <div className="text-caption">光線與構圖</div>
            <div className="progress-bar mt-8" style={{ height: 6 }}><div className="fill green" style={{ width: '50%' }} /></div>
            <div className="text-small mt-4">第 3 / 6 課 · 剩 8 分鐘</div>
          </div>
          <div style={{ fontSize: 24 }}>▶</div>
        </div>
        <div className="flex items-center gap-8 mb-12"><span>🤖</span><span className="text-title" style={{ fontSize: 16 }}>AI 為你推薦</span></div>
        <div className="flex gap-12" style={{ overflowX: 'auto', paddingBottom: 8 }}>
          <div className="card" style={{ minWidth: 160, cursor: 'pointer' }}><div style={{ fontSize: 32, marginBottom: 8 }}>🎨</div><div style={{ fontSize: 14, fontWeight: 600 }}>色彩心理學</div><div className="text-small">12 分鐘 · 因你喜歡設計</div></div>
          <div className="card" style={{ minWidth: 160, cursor: 'pointer' }}><div style={{ fontSize: 32, marginBottom: 8 }}>🧘</div><div style={{ fontSize: 14, fontWeight: 600 }}>正念呼吸法</div><div className="text-small">8 分鐘 · 適合下午</div></div>
        </div>
        <div className="card mt-20" style={{ background: 'var(--yellow-light)', cursor: 'pointer' }} onClick={() => navigate('/review')}>
          <div className="flex items-center gap-12">
            <span style={{ fontSize: 28 }}>🧠</span>
            <div className="flex-1"><div style={{ fontWeight: 600 }}>3 個知識點待複習</div><div className="text-caption">趁記憶還新，快澆水</div></div>
            <span className="btn btn-small btn-primary">複習</span>
          </div>
        </div>
      </div>
      <div className="fab-ai" onClick={() => navigate('/video')}>🤖</div>
      <BottomNav />
    </div>
  )
}
