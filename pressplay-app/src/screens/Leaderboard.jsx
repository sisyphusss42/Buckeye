import StatusBar from '../components/StatusBar'
import BottomNav from '../components/BottomNav'

export default function Leaderboard() {
  return (
    <div className="screen">
      <StatusBar />
      <div className="screen-content">
        <h2 className="text-h2 mb-8">本週排行 🏆</h2>
        <p className="text-caption mb-16">綠意聯盟 · 還剩 2 天</p>
        <div className="card mb-16" style={{ background: 'linear-gradient(135deg,var(--yellow-light),var(--green-light))' }}>
          <div className="flex items-center justify-center gap-16" style={{ padding: '16px 0' }}>
            <div className="flex flex-col items-center gap-4"><div className="avatar pink" style={{ width: 44, height: 44 }}>柔</div><span className="text-small">小柔</span><span style={{ fontWeight: 700 }}>2</span><span className="text-small" style={{ color: 'var(--green)' }}>1,240</span></div>
            <div className="flex flex-col items-center gap-4"><span style={{ fontSize: 20 }}>👑</span><div className="avatar blue" style={{ width: 52, height: 52 }}>阿</div><span className="text-small">阿哲</span><span style={{ fontWeight: 700, fontSize: 16 }}>1</span><span className="text-small" style={{ color: 'var(--green)' }}>1,580</span></div>
            <div className="flex flex-col items-center gap-4"><div className="avatar purple" style={{ width: 44, height: 44 }}>安</div><span className="text-small">小安</span><span style={{ fontWeight: 700 }}>3</span><span className="text-small" style={{ color: 'var(--green)' }}>1,110</span></div>
          </div>
        </div>
        <div className="card">
          <div className="leader-item"><span className="leader-rank">4</span><div className="avatar yellow" style={{ width: 36, height: 36, fontSize: 14 }}>阿</div><span style={{ fontWeight: 500 }}>阿明</span><span className="leader-xp">980</span></div>
          <div className="leader-item" style={{ background: 'var(--green-light)', borderRadius: 12, padding: 12, margin: '0 -8px' }}><span className="leader-rank" style={{ color: 'var(--green)' }}>5</span><div className="avatar green" style={{ width: 36, height: 36, fontSize: 14 }}>A</div><span style={{ fontWeight: 600 }}>Ava（你）</span><span className="leader-xp">920</span></div>
          <div className="leader-item"><span className="leader-rank">6</span><div className="avatar pink" style={{ width: 36, height: 36, fontSize: 14 }}>婷</div><span style={{ fontWeight: 500 }}>小婷</span><span className="leader-xp">870</span></div>
          <div className="leader-item"><span className="leader-rank">7</span><div className="avatar blue" style={{ width: 36, height: 36, fontSize: 14 }}>凱</div><span style={{ fontWeight: 500 }}>阿凱</span><span className="leader-xp">760</span></div>
        </div>
        <div className="card mt-16" style={{ background: 'var(--green-light)', textAlign: 'center' }}><p style={{ fontSize: 14 }}>再賺 60 XP 就能超越小安 ⚡</p></div>
      </div>
      <BottomNav />
    </div>
  )
}
