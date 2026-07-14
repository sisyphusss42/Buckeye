import { useNavigate } from 'react-router-dom'
import StatusBar from '../components/StatusBar'
import BottomNav from '../components/BottomNav'
import { useAuth } from '../auth/AuthContext'

export default function Profile() {
  const navigate = useNavigate()
  const { user, signOut } = useAuth()

  const handleLogout = () => {
    signOut()
    navigate('/splash')
  }

  return (
    <div className="screen">
      <StatusBar />
      <div className="screen-content">
        <div style={{ textAlign: 'center', marginBottom: 24 }}>
          <div className="avatar green" style={{ width: 72, height: 72, fontSize: 28, margin: '0 auto 12px' }}>
            {user?.username?.charAt(0)?.toUpperCase() || 'A'}
          </div>
          <h2 className="text-h2">{user?.username || 'Ava'}</h2>
          <p className="text-caption">Lv.12 · 知識園丁 🌿</p>
          <div className="progress-bar mt-8" style={{ maxWidth: 200, margin: '8px auto 0' }}><div className="fill purple" style={{ width: '65%' }} /></div>
          <p className="text-small mt-4">距離 Lv.13 還差 350 XP</p>
        </div>
        <div className="stat-row mb-20">
          <div className="stat-box"><div className="stat-value">28</div><div className="stat-label">花朵</div></div>
          <div className="stat-box"><div className="stat-value">12</div><div className="stat-label">連續天數</div></div>
          <div className="stat-box"><div className="stat-value">9</div><div className="stat-label">徽章</div></div>
        </div>
        <div className="flex items-center justify-between mb-12"><span className="text-title" style={{ fontSize: 16 }}>我的徽章</span><span className="text-caption" style={{ cursor: 'pointer', color: 'var(--green)' }}>全部</span></div>
        <div className="flex gap-12 mb-20" style={{ overflowX: 'auto' }}>
          <div className="badge"><span className="badge-icon">🔥</span><span className="badge-label">7 日</span></div>
          <div className="badge"><span className="badge-icon">🌳</span><span className="badge-label">結業</span></div>
          <div className="badge"><span className="badge-icon">🧠</span><span className="badge-label">記憶王</span></div>
          <div className="badge"><span className="badge-icon">💯</span><span className="badge-label">滿分</span></div>
        </div>
        <div className="flex flex-col gap-4">
          <div className="card flex items-center justify-between" style={{ cursor: 'pointer' }} onClick={() => navigate('/wrap')}><span>📊 學習回顧</span><span>›</span></div>
          <div className="card flex items-center justify-between" style={{ cursor: 'pointer' }}><span>📚 課程紀錄</span><span>›</span></div>
          <div className="card flex items-center justify-between" style={{ cursor: 'pointer' }} onClick={() => navigate('/notifications')}><span>🔔 通知設定</span></div>
          <div className="card flex items-center justify-between" style={{ cursor: 'pointer' }} onClick={() => navigate('/leaderboard')}><span>🏆 排行榜</span><span>›</span></div>
          <div className="card flex items-center justify-between mt-12" style={{ cursor: 'pointer', color: 'var(--danger)' }} onClick={handleLogout}><span>🚪 登出</span><span>›</span></div>
        </div>
      </div>
      <BottomNav />
    </div>
  )
}
