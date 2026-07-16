import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../auth/AuthContext'
import config from '../config'
import { findEpisode } from '../data/courses'
import { getDueReviews, recordQuizResult } from '../data/spacedRepetition'

export default function ReviewSession() {
  const navigate = useNavigate()
  const { getToken } = useAuth()
  const [dueVideos] = useState(() => getDueReviews())
  const [currentVideoIdx, setCurrentVideoIdx] = useState(0)
  const [quiz, setQuiz] = useState(null)
  const [currentQ, setCurrentQ] = useState(0)
  const [answered, setAnswered] = useState(null)
  const [correctCount, setCorrectCount] = useState(0)
  const [loading, setLoading] = useState(true)
  const [sessionComplete, setSessionComplete] = useState(false)
  const [totalCorrect, setTotalCorrect] = useState(0)
  const [totalQuestions, setTotalQuestions] = useState(0)

  const currentVideoId = dueVideos[currentVideoIdx]
  const episode = findEpisode(currentVideoId)

  useEffect(() => {
    if (dueVideos.length === 0) {
      setSessionComplete(true)
      setLoading(false)
      return
    }
    loadQuiz()
  }, [currentVideoIdx])

  async function loadQuiz() {
    setLoading(true)
    setCurrentQ(0)
    setAnswered(null)
    setCorrectCount(0)

    const topic = episode?.topic || '地球科學'

    if (!config.api.baseUrl || config.api.baseUrl === 'YOUR_API_GATEWAY_URL') {
      setQuiz({ questions: [{ question: `關於「${episode?.title || '此主題'}」，以下何者正確？`, options: ['選項A', '選項B', '選項C', '選項D'], correctIndex: 0, explanation: '這是預設題目。' }] })
      setLoading(false)
      return
    }

    try {
      const token = await getToken()
      const res = await fetch(`${config.api.baseUrl}/quiz/generate`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'Authorization': token },
        body: JSON.stringify({ topic, numQuestions: 2 }),
      })
      const data = await res.json()
      setQuiz(data.questions?.length > 0 ? data : { questions: [{ question: `「${episode?.title}」的核心概念是什麼？`, options: ['概念A', '概念B', '概念C', '概念D'], correctIndex: 0, explanation: '' }] })
    } catch (e) {
      setQuiz({ questions: [{ question: `「${episode?.title}」的重點為何？`, options: ['重點A', '重點B', '重點C', '重點D'], correctIndex: 0, explanation: '' }] })
    }
    setLoading(false)
  }

  const handleAnswer = (idx) => {
    if (answered !== null) return
    setAnswered(idx)
    if (idx === quiz.questions[currentQ].correctIndex) {
      setCorrectCount(c => c + 1)
    }
  }

  const handleNext = () => {
    const totalQ = quiz.questions.length

    if (currentQ < totalQ - 1) {
      setCurrentQ(currentQ + 1)
      setAnswered(null)
    } else {
      // Finished this video's questions
      recordQuizResult(currentVideoId, correctCount, totalQ)
      setTotalCorrect(t => t + correctCount)
      setTotalQuestions(t => t + totalQ)

      if (currentVideoIdx < dueVideos.length - 1) {
        // Move to next due video
        setCurrentVideoIdx(currentVideoIdx + 1)
      } else {
        // All done
        setSessionComplete(true)
      }
    }
  }

  if (sessionComplete) {
    return (
      <div className="screen" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: 40, textAlign: 'center' }}>
        <div style={{ fontSize: 64, marginBottom: 16 }}>🌸</div>
        <h2 className="text-h2" style={{ marginBottom: 8 }}>複習完成！</h2>
        {totalQuestions > 0 ? (
          <p className="text-caption" style={{ marginBottom: 24 }}>答對 {totalCorrect} / {totalQuestions} 題 · 你的花朵正在成長</p>
        ) : (
          <p className="text-caption" style={{ marginBottom: 24 }}>目前沒有需要複習的知識點 🎉</p>
        )}
        <button className="btn btn-primary" onClick={() => navigate('/garden')}>回到花園</button>
      </div>
    )
  }

  if (loading) {
    return (
      <div className="screen" style={{ position: 'relative' }}>
        <div style={{ position: 'absolute', inset: 0, background: 'rgba(0,0,0,0.6)', zIndex: 1 }} />
        <div style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 2 }}>
          <div className="quiz-card" style={{ textAlign: 'center', padding: 40 }}>
            <span style={{ fontSize: 40 }}>💧</span>
            <p className="text-body mt-12">正在準備複習題目...</p>
            <p className="text-caption mt-4">{currentVideoIdx + 1} / {dueVideos.length} 個知識點</p>
          </div>
        </div>
      </div>
    )
  }

  const q = quiz.questions[currentQ]
  const isCorrect = answered !== null && answered === q.correctIndex
  const totalQ = quiz.questions.length

  return (
    <div className="screen" style={{ position: 'relative' }}>
      <div style={{ position: 'absolute', inset: 0, background: 'rgba(0,0,0,0.6)', zIndex: 1 }} />
      <div style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 2, padding: 24 }}>
        <div className="quiz-card">
          <div style={{ textAlign: 'center', marginBottom: 16 }}>
            <span style={{ fontSize: 28 }}>💧</span>
            <h3 className="text-title" style={{ marginTop: 8 }}>澆水複習</h3>
            <p className="text-caption">{episode?.title} · {currentVideoIdx + 1}/{dueVideos.length}</p>
          </div>
          <p style={{ fontSize: 15, fontWeight: 500, marginBottom: 16 }}>{q.question}</p>
          <div>
            {q.options.map((opt, i) => {
              let cls = 'answer-option'
              if (answered !== null) {
                if (i === q.correctIndex) cls += ' correct'
                else if (i === answered) cls += ' wrong'
              }
              return <div key={i} className={cls} onClick={() => handleAnswer(i)}>{opt}{answered !== null && i === q.correctIndex && ' ✓'}</div>
            })}
          </div>
          {answered !== null && (
            <div style={{ marginTop: 16, textAlign: 'center' }}>
              <div style={{ background: isCorrect ? 'var(--green-light)' : 'var(--yellow-light)', borderRadius: 12, padding: 12, marginBottom: 8 }}>
                {isCorrect ? '💧 澆水成功！花瓣 +1' : '🍃 沒關係，下次會更好'}
              </div>
              {q.explanation && <p className="text-caption" style={{ marginBottom: 12 }}>{q.explanation}</p>}
              <button className="btn btn-primary" onClick={handleNext}>
                {currentQ < totalQ - 1 ? '下一題' : currentVideoIdx < dueVideos.length - 1 ? '下一個知識點' : '完成複習'}
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
