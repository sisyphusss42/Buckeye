import config from './config'

// Authenticated API call helper
export async function apiCall(path, body = {}, getToken) {
  const headers = { 'Content-Type': 'application/json' }

  if (getToken) {
    try {
      const token = await getToken()
      headers['Authorization'] = token
    } catch (e) {
      console.warn('No auth token available')
    }
  }

  const res = await fetch(`${config.api.baseUrl}${path}`, {
    method: 'POST',
    headers,
    body: JSON.stringify(body),
  })

  if (!res.ok) {
    const err = await res.json().catch(() => ({ message: 'Request failed' }))
    throw new Error(err.message || `HTTP ${res.status}`)
  }

  return res.json()
}

// API endpoints
const api = {
  // Garden
  getGarden: (getToken) => apiCall('/garden', {}, getToken),
  waterFlower: (flowerId, getToken) => apiCall('/garden/water', { flowerId }, getToken),

  // Quiz
  generateQuiz: (videoId, getToken) => apiCall('/quiz/generate', { videoId }, getToken),
  submitAnswer: (quizId, answer, getToken) => apiCall('/quiz/submit', { quizId, answer }, getToken),

  // Review (spaced repetition)
  getReviewQueue: (getToken) => apiCall('/review', {}, getToken),
  submitReview: (flowerId, quality, getToken) => apiCall('/review/submit', { flowerId, quality }, getToken),

  // Partner
  getPartner: (getToken) => apiCall('/partner', {}, getToken),
  sendMessage: (partnerId, message, getToken) => apiCall('/partner/message', { partnerId, message }, getToken),

  // AI Chat
  chat: (message, context, getToken) => apiCall('/chat', { message, context }, getToken),
}

export default api
