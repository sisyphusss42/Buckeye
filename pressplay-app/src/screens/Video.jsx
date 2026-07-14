import { useNavigate } from 'react-router-dom'

export default function Video() {
  const navigate = useNavigate()
  return (
    <div className="screen">
      <div className="video-player">
        <div style={{ position: 'absolute', top: 12, left: 16 }}>
          <div className="back-btn" onClick={() => navigate('/')} style={{ background: 'rgba(255,255,255,0.2)', color: 'white' }}>‹</div>
        </div>
        <div className="play-btn">▶</div>
        <div style={{ color: 'white', fontSize: 13, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <span>04:12</span>
          <div className="progress-bar" style={{ flex: 1, margin: '0 12px', height: 4 }}><div className="fill green" style={{ width: '33%' }} /></div>
          <span>12:30</span>
        </div>
        <div style={{ display: 'flex', justifyContent: 'center', gap: 24, marginTop: 8, color: 'white', fontSize: 18 }}>
          <span>⏮</span><span>⏯</span><span>⏭</span><span style={{ fontSize: 13, alignSelf: 'center' }}>1.0×</span>
        </div>
      </div>
      <div className="screen-content" style={{ paddingTop: 16 }}>
        <div className="text-caption" style={{ color: 'var(--green)' }}>攝影 · 第 3 課</div>
        <h2 className="text-title" style={{ margin: '4px 0 8px' }}>光線與構圖</h2>
        <p className="text-caption">學會三分法，讓每張照片更有呼吸感</p>
        <div className="tab-bar mt-16 mb-16">
          <div className="tab-item active">重點</div><div className="tab-item">字幕</div><div className="tab-item">筆記</div>
        </div>
        <div className="card mb-16">
          <div className="flex items-center gap-8 mb-8"><span>💡</span><span style={{ fontWeight: 600 }}>三分法則</span></div>
          <p className="text-body" style={{ lineHeight: 1.6 }}>把畫面分成九宮格，主體放在交叉點上，比置中更自然生動。</p>
        </div>
        <div className="ai-bubble" style={{ cursor: 'pointer' }} onClick={() => navigate('/quiz')}>
          看到這裡，要不要來個 30 秒小測驗鞏固記憶？
          <div style={{ marginTop: 8 }}><span className="btn btn-small btn-primary">好</span></div>
        </div>
      </div>
    </div>
  )
}
