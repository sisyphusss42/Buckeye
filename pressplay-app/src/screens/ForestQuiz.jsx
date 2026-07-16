import { useState, useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { useAuth } from '../auth/AuthContext'
import config from '../config'
import courses from '../data/courses'
import newsArticles from '../data/newsArticles'

const FALLBACK_QUIZZES = {
  geology: {
    questions: [
      { question: '地震的「規模」與「震度」有什麼不同？', options: ['規模描述震源釋放能量大小，震度描述各地搖晃程度', '兩者完全相同，只是單位不同', '規模只能在震央測量，震度可在任何地方測量', '震度是由規模除以距離計算而來'], correctIndex: 0, explanation: '規模是地震釋放能量的客觀量度（一次地震只有一個規模），震度則是各地感受到的搖晃程度，距離震央越遠通常震度越小。' },
      { question: '為什麼同一場地震中，有些建築物倒塌而有些沒有？', options: ['因為每棟建築承受的規模不同', '與建築結構、地質條件和距離震央遠近有關', '因為地震波只朝一個方向傳播', '因為倒塌的建築物都位於板塊邊界上'], correctIndex: 1, explanation: '建築物是否倒塌取決於多種因素：建築結構設計、當地地質條件（如土壤液化）、以及距離震央的遠近等。' },
    ]
  },
  astronomy: {
    questions: [
      { question: '為什麼韋伯望遠鏡能觀測到哈伯望遠鏡看不清的星系內部？', options: ['因為韋伯望遠鏡離地球更近', '因為韋伯使用紅外線觀測，能穿透塵埃', '因為韋伯的鏡片是金色的', '因為哈伯望遠鏡已經壞了'], correctIndex: 1, explanation: '韋伯望遠鏡主要以紅外線波段觀測，紅外線波長較長，能穿透可見光無法通過的厚重塵埃，因此能看清被塵埃遮蔽的星系內部結構。' },
      { question: '什麼是「超大質量黑洞」最主要的特徵？', options: ['它的溫度極低', '它能釋放可見光', '它擁有極強的引力，連光都無法逃脫', '它只存在於太陽系中'], correctIndex: 2, explanation: '黑洞最核心的特徵是其引力極強，在事件視界內連光都無法逃脫。超大質量黑洞通常位於星系中心，質量可達太陽的數百萬到數十億倍。' },
    ]
  },
  ocean: {
    questions: [
      { question: '「聖嬰現象」指的是哪個海域的水溫異常升高？', options: ['大西洋北部', '赤道中、東太平洋', '北極海域', '印度洋全域'], correctIndex: 1, explanation: '聖嬰現象（El Niño）特指赤道中、東太平洋海水表面溫度異常升高的氣候現象，會影響全球天氣模式。' },
      { question: '為什麼海水溫度升高會影響全球氣候？', options: ['因為水溫高會讓魚類遷移', '因為海水蒸發量改變大氣環流和降水模式', '因為溫暖的海水會融化冰山', '因為水溫高會改變地球自轉速度'], correctIndex: 1, explanation: '海水溫度升高會增加蒸發量，改變大氣中的水氣分布，進而影響大氣環流模式，導致某些地區降雨增加、某些地區乾旱加劇。' },
    ]
  },
  atmosphere: {
    questions: [
      { question: '颱風帶來的大量降雨，水庫如何兼顧「蓄水」與「防洪」？', options: ['直接讓水庫溢出', '颱風來之前先預洩降低水位，騰出防洪空間', '關閉所有閘門不讓水流出', '只在颱風走後才開始蓄水'], correctIndex: 1, explanation: '水庫防洪操作的核心是「預洩」：颱風來臨前降低水位，騰出防洪容量來攔蓄洪水，削減下游洪峰，颱風後再回蓄至正常水位。' },
      { question: '影響颱風路徑最主要的大尺度因素是什麼？', options: ['地形高低', '太平洋高壓的位置與強度', '海水鹽度', '月球引力'], correctIndex: 1, explanation: '颱風的移動路徑主要受太平洋高壓（副熱帶高壓）的位置和強度所導引。高壓邊緣的氣流像是「導引氣流」，引導颱風移動方向。' },
    ]
  },
}

export default function ForestQuiz() {
  const navigate = useNavigate()
  const { courseId } = useParams()
  const { getToken } = useAuth()
  const [quiz, setQuiz] = useState(null)
  const [currentQ, setCurrentQ] = useState(0)
  const [answered, setAnswered] = useState(null)
  const [correctCount, setCorrectCount] = useState(0)
  const [loading, setLoading] = useState(true)
  const [sessionComplete, setSessionComplete] = useState(false)

  const course = courses.find(c => c.id === courseId)
  const news = newsArticles[courseId]

  useEffect(() => { loadQuiz() }, [])

  async function loadQuiz() {
    if (!config.api.baseUrl || config.api.baseUrl === 'YOUR_API_GATEWAY_URL' || !news) {
      setQuiz(FALLBACK_QUIZZES[courseId] || FALLBACK_QUIZZES.geology)
      setLoading(false)
      return
    }

    try {
      const token = await getToken()
      const res = await fetch(`${config.api.baseUrl}/quiz/generate`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'Authorization': token },
        body: JSON.stringify({
          topic: course?.title || courseId,
          content: `以下是一則與「${course?.title}」相關的新聞：\n\n${news.content}\n\n請根據這則新聞作為素材，出與「${course?.title}」課程相關的通用知識題目。不要問新聞中的具體數字或事實，而是問新聞背後的科學原理或概念。`,
          numQuestions: 2,
        }),
      })
      const data = await res.json()
      setQuiz(data.questions?.length > 0 ? data : FALLBACK_QUIZZES[courseId])
    } catch (e) {
      console.warn('Forest quiz API failed:', e)
      setQuiz(FALLBACK_QUIZZES[courseId] || FALLBACK_QUIZZES.geology)
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
      setSessionComplete(true)
    }
  }

  if (sessionComplete) {
    const totalQ = quiz.questions.length
    return (
      <div className="screen" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: 40, textAlign: 'center' }}>
        <div style={{ fontSize: 64, marginBottom: 16 }}>🌳</div>
        <h2 className="text-h2" style={{ marginBottom: 8 }}>延伸問題完成！</h2>
        <p className="text-caption" style={{ marginBottom: 8 }}>答對 {correctCount} / {totalQ} 題</p>
        <p className="text-body" style={{ marginBottom: 24 }}>你幫助均一的「{course?.title}」之樹成長了 {correctCount} 點！</p>
        <button className="btn btn-primary" onClick={() => navigate('/forest')}>回到森林</button>
      </div>
    )
  }

  if (loading) {
    return (
      <div className="screen" style={{ position: 'relative' }}>
        <div style={{ position: 'absolute', inset: 0, background: 'rgba(0,0,0,0.6)', zIndex: 1 }} />
        <div style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 2 }}>
          <div className="quiz-card" style={{ textAlign: 'center', padding: 40 }}>
            <span style={{ fontSize: 40 }}>🌳</span>
            <p className="text-body mt-12">正在準備延伸問題...</p>
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
      <div style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 2, padding: 20 }}>
        <div className="quiz-card" style={{ maxHeight: '90vh', overflowY: 'auto' }}>
          <div style={{ textAlign: 'center', marginBottom: 12 }}>
            <span style={{ fontSize: 28 }}>🌳</span>
            <h3 className="text-title" style={{ marginTop: 6 }}>延伸問題 · {currentQ + 1}/{totalQ}</h3>
            <p className="text-caption">{course?.icon} {course?.title}</p>
          </div>

          {/* News context */}
          {news && (
            <div style={{ background: 'var(--gray-100)', borderRadius: 12, padding: 12, marginBottom: 14, fontSize: 13, lineHeight: 1.6, color: 'var(--text-secondary)' }}>
              <div style={{ fontWeight: 600, marginBottom: 4, color: 'var(--text)' }}>📰 {news.title}</div>
              <div style={{ fontSize: 11, color: 'var(--text-tertiary)', marginBottom: 6 }}>來源：{news.source}</div>
              <div style={{ maxHeight: 80, overflow: 'hidden', textOverflow: 'ellipsis' }}>{news.content.slice(0, 120)}...</div>
            </div>
          )}

          <p style={{ fontSize: 15, fontWeight: 500, marginBottom: 14 }}>{q.question}</p>
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
            <div style={{ marginTop: 14, textAlign: 'center' }}>
              <div style={{ background: isCorrect ? 'var(--green-light)' : 'var(--yellow-light)', borderRadius: 12, padding: 12, marginBottom: 8 }}>
                {isCorrect ? '🌳 答對了！創作者之樹 +1' : '🍂 沒關係，下次加油'}
              </div>
              {q.explanation && <p className="text-caption" style={{ marginBottom: 12, textAlign: 'left' }}>{q.explanation}</p>}
              <button className="btn btn-primary" onClick={handleNext}>
                {currentQ < totalQ - 1 ? '下一題' : '完成'}
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
