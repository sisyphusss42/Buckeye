/**
 * Spaced Repetition System
 * 
 * Familiarity (0–100%) is based on:
 * - Quiz score history (correct answers boost, wrong answers lower)
 * - Time decay (familiarity decays toward 0 over time since last review)
 * 
 * Next review interval is calculated using SM-2 variant:
 * - Good answers → interval grows (1 → 3 → 7 → 14 → 30 days)
 * - Bad answers → interval resets to 1 day
 * 
 * All data stored in localStorage under key 'flowerState'.
 */

const STORAGE_KEY = 'flowerState'

// Get all flower states
export function getFlowerStates() {
  return JSON.parse(localStorage.getItem(STORAGE_KEY) || '{}')
}

// Get flower state for a specific video
export function getFlowerState(videoId) {
  const states = getFlowerStates()
  return states[videoId] || createDefaultState()
}

function createDefaultState() {
  return {
    petals: 4,
    baseFamiliarity: 40, // base familiarity from quiz scores (0-100)
    lastReviewAt: null,
    nextReviewAt: null,
    intervalDays: 1,
    easeFactor: 2.5,
    reviewCount: 0,
    totalCorrect: 0,
    totalAnswered: 0,
  }
}

/**
 * Record a quiz result for a video.
 * @param {string} videoId 
 * @param {number} correct - number of correct answers
 * @param {number} total - total questions
 */
export function recordQuizResult(videoId, correct, total) {
  const states = getFlowerStates()
  const state = states[videoId] || createDefaultState()

  const score = correct / total // 0 to 1
  const quality = Math.round(score * 5) // 0-5 scale for SM-2

  // Update totals
  state.totalCorrect += correct
  state.totalAnswered += total
  state.reviewCount += 1

  // Update base familiarity (weighted average with new score)
  const newFamiliarity = score * 100
  state.baseFamiliarity = Math.min(100, Math.round(
    state.baseFamiliarity * 0.6 + newFamiliarity * 0.4
  ))

  // Update petals (4-10 based on familiarity)
  state.petals = Math.max(4, Math.min(10, Math.round(4 + (state.baseFamiliarity / 100) * 6)))

  // SM-2 interval calculation
  if (quality >= 3) {
    // Good answer — grow interval
    if (state.reviewCount === 1) {
      state.intervalDays = 1
    } else if (state.reviewCount === 2) {
      state.intervalDays = 3
    } else {
      state.intervalDays = Math.round(state.intervalDays * state.easeFactor)
    }
    state.easeFactor = Math.max(1.3, state.easeFactor + 0.1 * (quality - 3))
  } else {
    // Poor answer — reset
    state.intervalDays = 1
    state.easeFactor = Math.max(1.3, state.easeFactor - 0.2)
  }

  // Set timestamps
  state.lastReviewAt = new Date().toISOString()
  const nextDate = new Date()
  nextDate.setDate(nextDate.getDate() + state.intervalDays)
  state.nextReviewAt = nextDate.toISOString()

  states[videoId] = state
  localStorage.setItem(STORAGE_KEY, JSON.stringify(states))
  return state
}

/**
 * Get current familiarity accounting for time decay.
 * Familiarity decays based on how long since last review relative to the interval.
 */
export function getCurrentFamiliarity(videoId) {
  const state = getFlowerState(videoId)

  if (!state.lastReviewAt) {
    return { familiarity: 40, state } // Default for just-watched videos
  }

  const now = new Date()
  const lastReview = new Date(state.lastReviewAt)
  const hoursSinceReview = (now - lastReview) / (1000 * 60 * 60)
  const intervalHours = state.intervalDays * 24

  // Ebbinghaus-inspired decay: familiarity drops as time exceeds interval
  // At exactly the interval, familiarity is ~70% of base
  // Beyond interval, it decays further
  const decayRatio = Math.min(hoursSinceReview / intervalHours, 3) // cap at 3x interval
  const retention = Math.exp(-0.5 * decayRatio) // exponential decay
  const familiarity = Math.round(state.baseFamiliarity * retention)

  return { familiarity: Math.max(5, Math.min(100, familiarity)), state }
}

/**
 * Get human-readable time until next review.
 */
export function getNextReviewText(videoId) {
  const state = getFlowerState(videoId)

  if (!state.nextReviewAt) return '現在'

  const now = new Date()
  const next = new Date(state.nextReviewAt)
  const diffMs = next - now

  if (diffMs <= 0) return '現在'

  const diffHours = diffMs / (1000 * 60 * 60)
  if (diffHours < 1) return `${Math.round(diffMs / (1000 * 60))} 分鐘後`
  if (diffHours < 24) return `${Math.round(diffHours)} 小時後`

  const diffDays = Math.round(diffHours / 24)
  return `${diffDays} 天後`
}
