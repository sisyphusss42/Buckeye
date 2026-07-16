import { useNavigate } from 'react-router-dom'
import StatusBar from '../components/StatusBar'
import BottomNav from '../components/BottomNav'

export default function Partners() {
  const navigate = useNavigate()
  return (
    <div className="screen">
      <StatusBar />
      <div className="screen-content">
        <h2 className="text-h2 mb-16">夥伴挑戰 🤝</h2>
        <div className="card mb-20" style={{ textAlign: 'center' }}>
          <div className="flex items-center justify-center gap-16" style={{ marginBottom: 12 }}>
            <div className="flex flex-col items-center gap-4"><div className="avatar green" style={{ width: 48, height: 48, fontSize: 20 }}>A</div><span className="text-small">Ava</span></div>
            <div className="flex flex-col items-center gap-4"><span style={{ fontSize: 28 }}>🌳</span><span className="text-small" style={{ color: 'var(--green)' }}>契合度 92%</span></div>
            <div className="flex flex-col items-center gap-4"><div className="avatar pink" style={{ width: 48, height: 48, fontSize: 20 }}>柔</div><span className="text-small">小柔</span></div>
          </div>
          <p className="text-caption">你們一起種下的樹已經長到第 3 階</p>
        </div>
        <div className="card mb-16">
          <div className="flex items-center justify-between mb-12">
            <span style={{ fontWeight: 600 }}>本週共同任務</span>
            <span className="chip" style={{ padding: '4px 10px', fontSize: 12, background: 'var(--green-light)', color: 'var(--green)', border: 'none' }}>進行中</span>
          </div>
          <p className="text-body mb-12">兩人各完成 5 堂課，解鎖「合作之樹」</p>
          <div className="mb-8"><div className="flex items-center justify-between mb-4"><span className="text-caption">Ava</span><span className="text-small">4/5</span></div><div className="progress-bar"><div className="fill green" style={{ width: '80%' }} /></div></div>
          <div><div className="flex items-center justify-between mb-4"><span className="text-caption">小柔</span><span className="text-small">3/5</span></div><div className="progress-bar"><div className="fill pink" style={{ width: '60%' }} /></div></div>
        </div>
        <div className="card" style={{ background: 'var(--yellow-light)' }}>
          <div className="flex items-center gap-12"><span style={{ fontSize: 24 }}>🎁</span><div><div style={{ fontWeight: 600 }}>完成可得</div><div className="text-caption">稀有花種 ×2 · 200 XP</div></div></div>
        </div>
        <button className="btn btn-primary mt-20" onClick={() => navigate('/chat')}>推小柔一把 👋</button>
      </div>
      <BottomNav />
    </div>
  )
}
