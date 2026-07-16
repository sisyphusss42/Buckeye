import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import StatusBar from '../components/StatusBar'

const topics = ['📷 攝影','🧠 心理學','💰 理財','🎨 設計','🌏 語言','🎸 音樂','🍳 料理','💻 程式','📈 行銷','🧘 正念','✍️ 寫作']

export default function Survey() {
  const navigate = useNavigate()
  const [selected, setSelected] = useState(new Set(['📷 攝影','🧠 心理學','💰 理財']))

  const toggle = (t) => {
    const next = new Set(selected)
    next.has(t) ? next.delete(t) : next.add(t)
    setSelected(next)
  }

  return (
    <div className="screen">
      <StatusBar />
      <div className="header-bar">
        <div className="back-btn" onClick={() => navigate('/splash')}>‹</div>
        <div className="progress-bar" style={{ flex: 1, margin: '0 16px' }}><div className="fill green" style={{ width: '66%' }} /></div>
        <span className="text-caption">2/3</span>
      </div>
      <div className="screen-content" style={{ textAlign: 'center' }}>
        <div style={{ fontSize: 48, marginBottom: 16 }}>🌞</div>
        <h2 className="text-h2" style={{ marginBottom: 8 }}>今天想澆灌哪些主題？</h2>
        <p className="text-caption" style={{ marginBottom: 24 }}>選 3 個以上，AI 會為你調配今日學習</p>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 10, justifyContent: 'center', marginBottom: 24 }}>
          {topics.map(t => (
            <span key={t} className={`chip ${selected.has(t) ? 'selected' : ''}`} onClick={() => toggle(t)}>{t}</span>
          ))}
        </div>
        <div className="ai-bubble" style={{ textAlign: 'left', marginBottom: 24 }}>
          已選 {selected.size} 項 — 我幫你排了約 {selected.size * 6} 分鐘的內容
        </div>
      </div>
      <div style={{ padding: '16px 20px', flexShrink: 0 }}>
        <button className="btn btn-primary" onClick={() => navigate('/')}>開始今天的學習</button>
      </div>
    </div>
  )
}
