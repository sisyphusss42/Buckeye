import { useNavigate } from 'react-router-dom'
import StatusBar from '../components/StatusBar'

export default function Leaderboard() {
  const navigate = useNavigate()

  // Demo data: ranking of contributions to 均一's creator trees
  const rankings = [
    { rank: 1, name: '阿哲', avatar: '阿', color: 'blue', contributions: 87 },
    { rank: 2, name: '小柔', avatar: '柔', color: 'pink', contributions: 64 },
    { rank: 3, name: '小安', avatar: '安', color: 'purple', contributions: 52 },
    { rank: 4, name: '阿明', avatar: '阿', color: 'yellow', contributions: 41 },
    { rank: 5, name: '小明（你）', avatar: '明', color: 'green', contributions: 38, isMe: true },
    { rank: 6, name: '小婷', avatar: '婷', color: 'pink', contributions: 29 },
    { rank: 7, name: '阿凱', avatar: '凱', color: 'blue', contributions: 22 },
  ]

  return (
    <div className="screen">
      <StatusBar />
      <div className="header-bar">
        <div className="back-btn" onClick={() => navigate('/forest')}>‹</div>
        <div />
      </div>
      <div className="screen-content">
        <h2 className="text-h2 mb-8">貢獻排行 🏆</h2>
        <p className="text-caption mb-16">均一創作者森林 · 延伸問題貢獻</p>

        {/* Top 3 */}
        <div className="card mb-16" style={{ background: 'linear-gradient(135deg,var(--yellow-light),var(--green-light))' }}>
          <div className="flex items-center justify-center gap-16" style={{ padding: '16px 0' }}>
            {[rankings[1], rankings[0], rankings[2]].map((r, i) => (
              <div key={r.rank} className="flex flex-col items-center gap-4">
                {r.rank === 1 && <span style={{ fontSize: 20 }}>👑</span>}
                <div className={`avatar ${r.color}`} style={{ width: r.rank === 1 ? 52 : 44, height: r.rank === 1 ? 52 : 44 }}>{r.avatar}</div>
                <span className="text-small">{r.name}</span>
                <span style={{ fontWeight: 700 }}>{r.rank}</span>
                <span className="text-small" style={{ color: 'var(--green)' }}>{r.contributions} 🌳</span>
              </div>
            ))}
          </div>
        </div>

        {/* Rest of list */}
        <div className="card">
          {rankings.slice(3).map(r => (
            <div key={r.rank} className="leader-item" style={r.isMe ? { background: 'var(--green-light)', borderRadius: 12, padding: 12, margin: '0 -8px' } : {}}>
              <span className="leader-rank" style={r.isMe ? { color: 'var(--green)' } : {}}>{r.rank}</span>
              <div className={`avatar ${r.color}`} style={{ width: 36, height: 36, fontSize: 14 }}>{r.avatar}</div>
              <span style={{ fontWeight: r.isMe ? 600 : 500 }}>{r.name}</span>
              <span className="leader-xp">{r.contributions} 🌳</span>
            </div>
          ))}
        </div>

        <div className="card mt-16" style={{ background: 'var(--gray-100)', textAlign: 'center' }}>
          <p className="text-caption">答對延伸問題即可增加貢獻值</p>
          <p className="text-small mt-4">每答對 1 題 = 1 🌳 貢獻</p>
        </div>
      </div>
    </div>
  )
}
