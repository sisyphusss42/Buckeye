import { useState, useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { useAuth } from '../auth/AuthContext'
import config from '../config'
import videos from '../data/videos'
import { recordQuizResult } from '../data/spacedRepetition'

// Fallback quiz if API fails
const FALLBACK_QUIZ = {
  questions: [{
    question: '一元一次方程式中，若 3x + 5 = 20，x 等於多少？',
    options: ['3', '5', '7', '15'],
    correctIndex: 1,
    explanation: '3x = 20 - 5 = 15，所以 x = 15 ÷ 3 = 5',
  }]
}

export default function Quiz() {
  const navigate = useNavigate()
  const { videoId } = useParams()
  const { getToken } = useAuth()
  const [quiz, setQuiz] = useState(null)
  const [currentQ, setCurrentQ] = useState(0)
  const [answered, setAnswered] = useState(null)
  const [loading, setLoading] = useState(true)
  const [correctCount, setCorrectCount] = useState(0)

  const video = videos.find(v => v.id === videoId) || videos[0]

  useEffect(() => {
    loadQuiz()
  }, [])

  async function loadQuiz() {
    if (!config.api.baseUrl || config.api.baseUrl === 'YOUR_API_GATEWAY_URL') {
      setQuiz(FALLBACK_QUIZ)
      setLoading(false)
      return
    }

    try {
      const token = await getToken()
      const res = await fetch(`${config.api.baseUrl}/quiz/generate`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'Authorization': token },
        body: JSON.stringify({ topic: video.topic, numQuestions: 3 }),
      })
      const data = await res.json()
      if (data.questions && data.questions.length > 0) {
        setQuiz(data)
      } else {
        setQuiz(FALLBACK_QUIZ)
      }
    } catch (e) {
      console.warn('Quiz API failed, using fallback:', e)
      setQuiz(FALLBACK_QUIZ)
    }
    setLoading(false)
  }

  if (loading) {
    return (
      <div className="screen" style={{ position: 'relative' }}>
        <div style={{ position: 'absolute', inset: 0, background: 'rgba(0,0,0,0.6)', zIndex: 1 }} />
        <div style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 2 }}>
          <div className="quiz-card" style={{ textAlign: 'center', padding: 40 }}>
            <span style={{ fontSize: 40 }}>🤖</span>
            <p className="text-body mt-12">AI 正在根據「{video.title}」出題...</p>
          </div>
        </div>
      </div>
    )
  }

  const q = quiz.questions[currentQ]
  const isCorrect = answered !== null && answered === q.correctIndex
  const totalQ = quiz.questions.length

  const handleAnswer = (idx) => {
    if (answered !== null) return
    setAnswered(idx)
    if (idx === quiz.questions[currentQ].correctIndex) {
      setCorrectCount(c => c + 1)
    }
  }

  const handleNext = () => {
    if (currentQ < totalQ - 1) {
      setCurrentQ(currentQ + 1)
      setAnswered(null)
    } else {
      // Quiz finished — record result (recalculate correct since setState is async)
      const finalCorrect = quiz.questions.reduce((acc, question, idx) => {
        if (idx < currentQ) return acc // already counted in correctCount
        if (idx === currentQ && answered === question.correctIndex) return acc + 1
        return acc
      }, correctCount)
      recordQuizResult(video.id, correctCount, totalQ)
      console.log(`📊 測驗完成: ${video.title} — ${correctCount}/${totalQ} 正確`)
      navigate(`/flower/${video.id}`)
    }
  }

  return (
    <div className="screen" style={{ position: 'relative' }}>
      <div style={{ position: 'absolute', inset: 0, background: 'rgba(0,0,0,0.6)', zIndex: 1 }} />
      <div style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 2, padding: 24 }}>
        <div className="quiz-card">
          <div style={{ textAlign: 'center', marginBottom: 16 }}>
            <span style={{ fontSize: 32 }}>🤖</span>
            <h3 className="text-title" style={{ marginTop: 8 }}>AI 測驗 · {currentQ + 1}/{totalQ}</h3>
            <p className="text-caption">{video.title}</p>
          </div>
          <p style={{ fontSize: 15, fontWeight: 500, marginBottom: 16 }}>{q.question}</p>
          <div>
            {q.options.map((opt, i) => {
              let cls = 'answer-option'
              if (answered !== null) {
                if (i === q.correctIndex) cls += ' correct'
                else if (i === answered) cls += ' wrong'
              }
              return (
                <div key={i} className={cls} onClick={() => handleAnswer(i)}>
                  {opt}{answered !== null && i === q.correctIndex && ' ✓'}
                </div>
              )
            })}
          </div>
          {answered !== null && (
            <div style={{ marginTop: 16, textAlign: 'center' }}>
              <div style={{ background: isCorrect ? 'var(--green-light)' : 'var(--yellow-light)', borderRadius: 12, padding: 12, marginBottom: 8 }}>
                {isCorrect ? '🌸 答對了！花瓣 +1' : '🍃 沒關係，記住這個知識點'}
              </div>
              {q.explanation && <p className="text-caption" style={{ marginBottom: 12 }}>{q.explanation}</p>}
              <button className="btn btn-primary" onClick={handleNext}>
                {currentQ < totalQ - 1 ? '下一題' : '完成測驗'}
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
