import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import StatusBar from '../components/StatusBar'

export default function Leaderboard() {
  const navigate = useNavigate()
  const [tab, setTab] = useState('users') // 'users' | 'creators'

  // Demo data: ranking of user contributions to 均一's creator trees
  const userRankings = [
    { rank: 1, name: '阿哲', avatar: '阿', color: 'blue', contributions: 87 },
    { rank: 2, name: '小柔', avatar: '柔', color: 'pink', contributions: 64 },
    { rank: 3, name: '小安', avatar: '安', color: 'purple', contributions: 52 },
    { rank: 4, name: '阿明', avatar: '阿', color: 'yellow', contributions: 41 },
    { rank: 5, name: '小明（你）', avatar: '明', color: 'green', contributions: 38, isMe: true },
    { rank: 6, name: '小婷', avatar: '婷', color: 'pink', contributions: 29 },
    { rank: 7, name: '阿凱', avatar: '凱', color: 'blue', contributions: 22 },
  ]

  // Demo data: ranking of creators by total tree contributions received
  const creatorRankings = [
    { rank: 1, name: '均一教育', icon: '🎓', totalTrees: 4, totalContributions: 2446, color: '#5FAF6A' },
    { rank: 2, name: '阿滴英文', icon: '🇬🇧', totalTrees: 3, totalContributions: 1872, color: '#6FA8FF' },
    { rank: 3, name: '志祺七七', icon: '📰', totalTrees: 5, totalContributions: 1654, color: '#B38AF5' },
    { rank: 4, name: '啾啾鞋', icon: '👟', totalTrees: 2, totalContributions: 1230, color: '#F6C453' },
    { rank: 5, name: '老高與小茉', icon: '🌌', totalTrees: 4, totalContributions: 1105, color: '#F08DAA' },
    { rank: 6, name: '好味小姐', icon: '🍳', totalTrees: 2, totalContributions: 890, color: '#FF7043' },
    { rank: 7, name: '柴鼠兄弟', icon: '💰', totalTrees: 3, totalContributions: 756, color: '#4CAF50' },
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

        {/* Tabs */}
        <div className="tab-bar mb-16">
          <div className={`tab-item ${tab === 'users' ? 'active' : ''}`} onClick={() => setTab('users')}>學習者排行</div>
          <div className={`tab-item ${tab === 'creators' ? 'active' : ''}`} onClick={() => setTab('creators')}>創作者排行</div>
        </div>

        {tab === 'users' ? (
          <>
            <p className="text-caption mb-12">均一創作者森林 · 延伸問題貢獻</p>
            {/* Top 3 */}
            <div className="card mb-16" style={{ background: 'linear-gradient(135deg,var(--yellow-light),var(--green-light))' }}>
              <div className="flex items-center justify-center gap-16" style={{ padding: '16px 0' }}>
                {[userRankings[1], userRankings[0], userRankings[2]].map((r) => (
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
            {/* Rest */}
            <div className="card">
              {userRankings.slice(3).map(r => (
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
          </>
        ) : (
          <>
            <p className="text-caption mb-12">所有創作者森林 · 依總貢獻數排行</p>
            {/* Top 3 Creators */}
            <div className="card mb-16" style={{ background: 'linear-gradient(135deg,var(--purple-light),var(--green-light))' }}>
              <div className="flex items-center justify-center gap-16" style={{ padding: '16px 0' }}>
                {[creatorRankings[1], creatorRankings[0], creatorRankings[2]].map((r) => (
                  <div key={r.rank} className="flex flex-col items-center gap-4">
                    {r.rank === 1 && <span style={{ fontSize: 20 }}>👑</span>}
                    <div style={{ width: r.rank === 1 ? 52 : 44, height: r.rank === 1 ? 52 : 44, borderRadius: '50%', background: r.color + '22', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: r.rank === 1 ? 24 : 20 }}>{r.icon}</div>
                    <span className="text-small">{r.name}</span>
                    <span style={{ fontWeight: 700 }}>{r.rank}</span>
                    <span className="text-small" style={{ color: 'var(--green)' }}>{r.totalContributions.toLocaleString()} 🌳</span>
                  </div>
                ))}
              </div>
            </div>
            {/* Rest */}
            <div className="card">
              {creatorRankings.slice(3).map(r => (
                <div key={r.rank} className="leader-item">
                  <span className="leader-rank">{r.rank}</span>
                  <div style={{ width: 36, height: 36, borderRadius: '50%', background: r.color + '22', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 16 }}>{r.icon}</div>
                  <div className="flex-1">
                    <span style={{ fontWeight: 500 }}>{r.name}</span>
                    <div className="text-small">{r.totalTrees} 棵樹</div>
                  </div>
                  <span className="leader-xp">{r.totalContributions.toLocaleString()} 🌳</span>
                </div>
              ))}
            </div>
            <div className="card mt-16" style={{ background: 'var(--gray-100)', textAlign: 'center' }}>
              <p className="text-caption">創作者排行依據所有學習者的延伸問題貢獻總數</p>
            </div>
          </>
        )}
      </div>
    </div>
  )
}
