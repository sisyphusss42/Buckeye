import { useNavigate, useLocation } from 'react-router-dom'

const items = [
  { path: '/', icon: '🏠', label: '首頁' },
  { path: '/garden', icon: '🌸', label: '花園' },
  { path: '/forest', icon: '🌲', label: '森林' },
  { path: '/partners', icon: '🤝', label: '夥伴' },
  { path: '/leaderboard', icon: '🏆', label: '排行' },
  { path: '/profile', icon: '👤', label: '我的' },
]

export default function BottomNav() {
  const navigate = useNavigate()
  const location = useLocation()

  return (
    <div className="bottom-nav">
      {items.map(item => (
        <div
          key={item.path}
          className={`nav-item ${location.pathname === item.path ? 'active' : ''}`}
          onClick={() => navigate(item.path)}
        >
          <span className="nav-icon">{item.icon}</span>
          <span>{item.label}</span>
        </div>
      ))}
    </div>
  )
}
