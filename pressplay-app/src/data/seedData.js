/**
 * Seeds localStorage with demo data if it hasn't been seeded yet.
 * Call this once on app startup.
 */
export function seedDemoData() {
  if (localStorage.getItem('demoSeeded') === 'v2') return

  const now = new Date()

  // 30 pre-watched videos from various courses
  const completedVideos = [
    // Astronomy (8)
    { videoId: 'astro-1', courseId: 'astronomy', completedAt: '2026-07-01T08:30:00.000Z' },
    { videoId: 'astro-2', courseId: 'astronomy', completedAt: '2026-07-01T09:00:00.000Z' },
    { videoId: 'astro-3', courseId: 'astronomy', completedAt: '2026-07-02T10:00:00.000Z' },
    { videoId: 'astro-4', courseId: 'astronomy', completedAt: '2026-07-02T11:00:00.000Z' },
    { videoId: 'astro-5', courseId: 'astronomy', completedAt: '2026-07-03T08:00:00.000Z' },
    { videoId: 'astro-6', courseId: 'astronomy', completedAt: '2026-07-03T09:00:00.000Z' },
    { videoId: 'astro-7', courseId: 'astronomy', completedAt: '2026-07-04T08:00:00.000Z' },
    { videoId: 'astro-8', courseId: 'astronomy', completedAt: '2026-07-04T09:00:00.000Z' },
    // Geology (6)
    { videoId: 'geo-1', courseId: 'geology', completedAt: '2026-07-05T08:00:00.000Z' },
    { videoId: 'geo-2', courseId: 'geology', completedAt: '2026-07-05T09:00:00.000Z' },
    { videoId: 'geo-3', courseId: 'geology', completedAt: '2026-07-06T08:00:00.000Z' },
    { videoId: 'geo-4', courseId: 'geology', completedAt: '2026-07-06T09:00:00.000Z' },
    { videoId: 'geo-5', courseId: 'geology', completedAt: '2026-07-07T08:00:00.000Z' },
    { videoId: 'geo-6', courseId: 'geology', completedAt: '2026-07-07T09:00:00.000Z' },
    // Atmosphere (4)
    { videoId: 'atmo-1', courseId: 'atmosphere', completedAt: '2026-07-08T08:00:00.000Z' },
    { videoId: 'atmo-2', courseId: 'atmosphere', completedAt: '2026-07-08T09:00:00.000Z' },
    { videoId: 'atmo-3', courseId: 'atmosphere', completedAt: '2026-07-09T08:00:00.000Z' },
    { videoId: 'atmo-4', courseId: 'atmosphere', completedAt: '2026-07-09T09:00:00.000Z' },
    // Ocean (3)
    { videoId: 'ocean-1', courseId: 'ocean', completedAt: '2026-07-10T08:00:00.000Z' },
    { videoId: 'ocean-2', courseId: 'ocean', completedAt: '2026-07-10T09:00:00.000Z' },
    { videoId: 'ocean-3', courseId: 'ocean', completedAt: '2026-07-10T10:00:00.000Z' },
    // Earth Science Khan (4)
    { videoId: 'es-1', courseId: 'earth-science-khan', completedAt: '2026-07-11T08:00:00.000Z' },
    { videoId: 'es-2', courseId: 'earth-science-khan', completedAt: '2026-07-11T09:00:00.000Z' },
    { videoId: 'es-3', courseId: 'earth-science-khan', completedAt: '2026-07-12T08:00:00.000Z' },
    { videoId: 'es-4', courseId: 'earth-science-khan', completedAt: '2026-07-12T09:00:00.000Z' },
    // Microeconomics (3)
    { videoId: 'econ-1', courseId: 'microeconomics', completedAt: '2026-07-13T08:00:00.000Z' },
    { videoId: 'econ-2', courseId: 'microeconomics', completedAt: '2026-07-13T09:00:00.000Z' },
    { videoId: 'econ-3', courseId: 'microeconomics', completedAt: '2026-07-13T10:00:00.000Z' },
    // Financial Literacy (2)
    { videoId: 'fin-1', courseId: 'financial-literacy', completedAt: '2026-07-14T08:00:00.000Z' },
    { videoId: 'fin-2', courseId: 'financial-literacy', completedAt: '2026-07-14T09:00:00.000Z' },
  ]

  // Flower states with varying familiarity
  // 5 flowers under 20% familiarity (wilting/sprouts)
  // Rest spread from 30% to 95%
  const flowerState = {
    // === HIGH FAMILIARITY (mastered) ===
    'astro-1': {
      petals: 10, baseFamiliarity: 95, lastReviewAt: '2026-07-14T10:00:00.000Z',
      nextReviewAt: new Date(now.getTime() + 30 * 24 * 60 * 60 * 1000).toISOString(),
      intervalDays: 30, easeFactor: 3.0, reviewCount: 7, totalCorrect: 20, totalAnswered: 21,
    },
    'astro-2': {
      petals: 9, baseFamiliarity: 90, lastReviewAt: '2026-07-13T14:00:00.000Z',
      nextReviewAt: new Date(now.getTime() + 14 * 24 * 60 * 60 * 1000).toISOString(),
      intervalDays: 14, easeFactor: 2.9, reviewCount: 6, totalCorrect: 17, totalAnswered: 18,
    },
    'geo-1': {
      petals: 9, baseFamiliarity: 88, lastReviewAt: '2026-07-14T08:00:00.000Z',
      nextReviewAt: new Date(now.getTime() + 12 * 24 * 60 * 60 * 1000).toISOString(),
      intervalDays: 14, easeFactor: 2.8, reviewCount: 5, totalCorrect: 14, totalAnswered: 15,
    },
    'econ-1': {
      petals: 8, baseFamiliarity: 82, lastReviewAt: '2026-07-14T14:00:00.000Z',
      nextReviewAt: new Date(now.getTime() + 7 * 24 * 60 * 60 * 1000).toISOString(),
      intervalDays: 7, easeFactor: 2.7, reviewCount: 4, totalCorrect: 11, totalAnswered: 12,
    },

    // === GOOD FAMILIARITY ===
    'astro-3': {
      petals: 8, baseFamiliarity: 78, lastReviewAt: '2026-07-13T10:00:00.000Z',
      nextReviewAt: new Date(now.getTime() + 5 * 24 * 60 * 60 * 1000).toISOString(),
      intervalDays: 7, easeFactor: 2.6, reviewCount: 4, totalCorrect: 10, totalAnswered: 12,
    },
    'astro-4': {
      petals: 7, baseFamiliarity: 72, lastReviewAt: '2026-07-12T16:00:00.000Z',
      nextReviewAt: new Date(now.getTime() + 3 * 24 * 60 * 60 * 1000).toISOString(),
      intervalDays: 5, easeFactor: 2.5, reviewCount: 3, totalCorrect: 8, totalAnswered: 9,
    },
    'geo-2': {
      petals: 7, baseFamiliarity: 70, lastReviewAt: '2026-07-13T09:00:00.000Z',
      nextReviewAt: new Date(now.getTime() + 4 * 24 * 60 * 60 * 1000).toISOString(),
      intervalDays: 5, easeFactor: 2.5, reviewCount: 3, totalCorrect: 7, totalAnswered: 9,
    },
    'atmo-1': {
      petals: 7, baseFamiliarity: 68, lastReviewAt: '2026-07-14T12:00:00.000Z',
      nextReviewAt: new Date(now.getTime() + 3 * 24 * 60 * 60 * 1000).toISOString(),
      intervalDays: 3, easeFactor: 2.5, reviewCount: 3, totalCorrect: 8, totalAnswered: 9,
    },
    'ocean-1': {
      petals: 6, baseFamiliarity: 65, lastReviewAt: '2026-07-14T09:00:00.000Z',
      nextReviewAt: new Date(now.getTime() + 2 * 24 * 60 * 60 * 1000).toISOString(),
      intervalDays: 3, easeFactor: 2.5, reviewCount: 2, totalCorrect: 5, totalAnswered: 6,
    },

    // === MODERATE FAMILIARITY ===
    'astro-5': {
      petals: 6, baseFamiliarity: 60, lastReviewAt: '2026-07-12T08:00:00.000Z',
      nextReviewAt: new Date(now.getTime() + 1 * 24 * 60 * 60 * 1000).toISOString(),
      intervalDays: 3, easeFactor: 2.4, reviewCount: 2, totalCorrect: 5, totalAnswered: 6,
    },
    'geo-3': {
      petals: 5, baseFamiliarity: 55, lastReviewAt: '2026-07-13T08:00:00.000Z',
      nextReviewAt: new Date(now.getTime() + 1 * 24 * 60 * 60 * 1000).toISOString(),
      intervalDays: 3, easeFactor: 2.4, reviewCount: 2, totalCorrect: 4, totalAnswered: 6,
    },
    'atmo-2': {
      petals: 5, baseFamiliarity: 52, lastReviewAt: '2026-07-13T15:00:00.000Z',
      nextReviewAt: new Date(now.getTime() + 18 * 60 * 60 * 1000).toISOString(), // tomorrow
      intervalDays: 1, easeFactor: 2.3, reviewCount: 2, totalCorrect: 4, totalAnswered: 6,
    },
    'es-1': {
      petals: 5, baseFamiliarity: 50, lastReviewAt: '2026-07-14T10:30:00.000Z',
      nextReviewAt: new Date(now.getTime() + 2 * 24 * 60 * 60 * 1000).toISOString(),
      intervalDays: 3, easeFactor: 2.3, reviewCount: 2, totalCorrect: 4, totalAnswered: 6,
    },
    'econ-2': {
      petals: 5, baseFamiliarity: 48, lastReviewAt: '2026-07-13T11:00:00.000Z',
      nextReviewAt: new Date(now.getTime() + 12 * 60 * 60 * 1000).toISOString(), // later today
      intervalDays: 1, easeFactor: 2.3, reviewCount: 1, totalCorrect: 3, totalAnswered: 3,
    },

    // === LOW FAMILIARITY (needs review) ===
    'astro-6': {
      petals: 4, baseFamiliarity: 40, lastReviewAt: '2026-07-11T08:00:00.000Z',
      nextReviewAt: new Date(now.getTime() + 6 * 60 * 60 * 1000).toISOString(), // later today
      intervalDays: 1, easeFactor: 2.2, reviewCount: 1, totalCorrect: 2, totalAnswered: 3,
    },
    'geo-4': {
      petals: 4, baseFamiliarity: 38, lastReviewAt: '2026-07-10T09:00:00.000Z',
      nextReviewAt: new Date(now.getTime() + 8 * 60 * 60 * 1000).toISOString(), // later today
      intervalDays: 1, easeFactor: 2.1, reviewCount: 1, totalCorrect: 2, totalAnswered: 3,
    },
    'atmo-3': {
      petals: 4, baseFamiliarity: 35, lastReviewAt: '2026-07-12T09:00:00.000Z',
      nextReviewAt: new Date(now.getTime() + 10 * 60 * 60 * 1000).toISOString(), // later today
      intervalDays: 1, easeFactor: 2.1, reviewCount: 1, totalCorrect: 2, totalAnswered: 3,
    },
    'ocean-2': {
      petals: 3, baseFamiliarity: 30, lastReviewAt: '2026-07-11T10:00:00.000Z',
      nextReviewAt: new Date(now.getTime() - 8 * 60 * 60 * 1000).toISOString(), // due now ← KEEP
      intervalDays: 1, easeFactor: 2.0, reviewCount: 1, totalCorrect: 1, totalAnswered: 3,
    },
    'es-2': {
      petals: 4, baseFamiliarity: 32, lastReviewAt: '2026-07-12T10:00:00.000Z',
      nextReviewAt: new Date(now.getTime() + 5 * 60 * 60 * 1000).toISOString(), // later today
      intervalDays: 1, easeFactor: 2.0, reviewCount: 1, totalCorrect: 2, totalAnswered: 3,
    },
    'fin-1': {
      petals: 3, baseFamiliarity: 28, lastReviewAt: '2026-07-14T08:30:00.000Z',
      nextReviewAt: new Date(now.getTime() - 2 * 60 * 60 * 1000).toISOString(), // due now ← KEEP
      intervalDays: 1, easeFactor: 2.0, reviewCount: 1, totalCorrect: 1, totalAnswered: 3,
    },

    // === VERY LOW FAMILIARITY (<20%) — 5 flowers ===
    'astro-7': {
      petals: 2, baseFamiliarity: 18, lastReviewAt: '2026-07-05T08:00:00.000Z',
      nextReviewAt: new Date(now.getTime() + 3 * 60 * 60 * 1000).toISOString(), // later today
      intervalDays: 1, easeFactor: 1.8, reviewCount: 1, totalCorrect: 1, totalAnswered: 3,
    },
    'astro-8': {
      petals: 2, baseFamiliarity: 15, lastReviewAt: '2026-07-04T10:00:00.000Z',
      nextReviewAt: new Date(now.getTime() + 4 * 60 * 60 * 1000).toISOString(), // later today
      intervalDays: 1, easeFactor: 1.6, reviewCount: 1, totalCorrect: 0, totalAnswered: 3,
    },
    'geo-5': {
      petals: 2, baseFamiliarity: 12, lastReviewAt: '2026-07-08T09:00:00.000Z',
      nextReviewAt: new Date(now.getTime() + 7 * 60 * 60 * 1000).toISOString(), // later today
      intervalDays: 1, easeFactor: 1.5, reviewCount: 1, totalCorrect: 0, totalAnswered: 3,
    },
    'geo-6': {
      petals: 2, baseFamiliarity: 10, lastReviewAt: '2026-07-07T10:00:00.000Z',
      nextReviewAt: new Date(now.getTime() + 9 * 60 * 60 * 1000).toISOString(), // later today
      intervalDays: 1, easeFactor: 1.4, reviewCount: 1, totalCorrect: 0, totalAnswered: 3,
    },
    'atmo-4': {
      petals: 2, baseFamiliarity: 8, lastReviewAt: '2026-07-09T10:00:00.000Z',
      nextReviewAt: new Date(now.getTime() + 2 * 60 * 60 * 1000).toISOString(), // later today
      intervalDays: 1, easeFactor: 1.3, reviewCount: 1, totalCorrect: 0, totalAnswered: 3,
    },

    // === NEVER REVIEWED — push to future so not counted as due ===
    'ocean-3': {
      petals: 2, baseFamiliarity: 20, lastReviewAt: '2026-07-14T10:00:00.000Z',
      nextReviewAt: new Date(now.getTime() + 20 * 60 * 60 * 1000).toISOString(),
      intervalDays: 1, easeFactor: 2.5, reviewCount: 0, totalCorrect: 0, totalAnswered: 0,
    },
    'es-3': {
      petals: 2, baseFamiliarity: 20, lastReviewAt: '2026-07-14T10:00:00.000Z',
      nextReviewAt: new Date(now.getTime() + 22 * 60 * 60 * 1000).toISOString(),
      intervalDays: 1, easeFactor: 2.5, reviewCount: 0, totalCorrect: 0, totalAnswered: 0,
    },
    'es-4': {
      petals: 2, baseFamiliarity: 20, lastReviewAt: '2026-07-14T10:00:00.000Z',
      nextReviewAt: new Date(now.getTime() + 24 * 60 * 60 * 1000).toISOString(),
      intervalDays: 1, easeFactor: 2.5, reviewCount: 0, totalCorrect: 0, totalAnswered: 0,
    },
    'econ-3': {
      petals: 2, baseFamiliarity: 20, lastReviewAt: '2026-07-14T10:00:00.000Z',
      nextReviewAt: new Date(now.getTime() + 26 * 60 * 60 * 1000).toISOString(),
      intervalDays: 1, easeFactor: 2.5, reviewCount: 0, totalCorrect: 0, totalAnswered: 0,
    },
    'fin-2': {
      petals: 2, baseFamiliarity: 20, lastReviewAt: '2026-07-14T10:00:00.000Z',
      nextReviewAt: new Date(now.getTime() + 28 * 60 * 60 * 1000).toISOString(),
      intervalDays: 1, easeFactor: 2.5, reviewCount: 0, totalCorrect: 0, totalAnswered: 0,
    },
  }

  localStorage.setItem('completedVideos', JSON.stringify(completedVideos))
  localStorage.setItem('flowerState', JSON.stringify(flowerState))
  localStorage.setItem('demoSeeded', 'v2')
}
