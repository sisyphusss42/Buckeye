import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

const options = [
  { text: '正中央', correct: false },
  { text: '四條線的交叉點', correct: true },
  { text: '最上緣', correct: false },
  { text: '畫面角落', correct: false },
]

export default function Quiz() {
  const navigate = useNavigate()
  const [answered, setAnswered] = useState(null)

  const handleAnswer = (idx) => {
    if (answered !== null) return
    setAnswered(idx)
  }

  const isCorrect = answered !== null && options[answered].correct

  return (
    <div className="screen" style={{ position: 'relative' }}>
      <div style={{ position: 'absolute', inset: 0, background: 'rgba(0,0,0,0.6)', zIndex: 1 }} />
      <div style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 2, padding: 24 }}>
        <div className="quiz-card">
          <div style={{ textAlign: 'center', marginBottom: 16 }}>
            <span style={{ fontSize: 32 }}>🤖</span>
            <h3 className="text-title" style={{ marginTop: 8 }}>AI 快速測驗 · 1/1</h3>
          </div>
          <p style={{ fontSize: 15, fontWeight: 500, marginBottom: 16 }}>主體放在九宮格的哪個位置，畫面最自然？</p>
          <div>
            {options.map((opt, i) => {
              let cls = 'answer-option'
              if (answered !== null) {
                if (opt.correct) cls += ' correct'
                else if (i === answered) cls += ' wrong'
              }
              return (
                <div key={i} className={cls} onClick={() => handleAnswer(i)}>
                  {opt.text}{answered !== null && opt.correct && ' ✓'}
                </div>
              )
            })}
          </div>
          {answered !== null && (
            <div style={{ marginTop: 16, textAlign: 'center' }}>
              <div style={{ background: 'var(--green-light)', borderRadius: 12, padding: 12, marginBottom: 16 }}>
                {isCorrect ? '🌸 答對了！這朵花長出第 6 片花瓣' : '🍃 沒關係，再想想看'}
              </div>
              <button className="btn btn-primary" onClick={() => navigate('/video')}>繼續學習</button>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
