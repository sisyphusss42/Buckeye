/**
 * Seeds localStorage with demo data if it hasn't been seeded yet.
 * Call this once on app startup.
 */
export function seedDemoData() {
  if (localStorage.getItem('demoSeeded')) return

  // 10 pre-watched videos from various courses
  const completedVideos = [
    { videoId: 'astro-1', title: '【觀念】恆星顏色與溫度', courseId: 'astronomy', completedAt: '2026-07-10T08:30:00.000Z' },
    { videoId: 'astro-2', title: '【觀念】太陽視運動', courseId: 'astronomy', completedAt: '2026-07-10T09:00:00.000Z' },
    { videoId: 'astro-3', title: '【觀念】亮度與光度', courseId: 'astronomy', completedAt: '2026-07-11T10:00:00.000Z' },
    { videoId: 'geo-1', title: '【觀念】張裂型板塊邊界的地質活動＋錯動型板塊邊界的地質活動', courseId: 'geology', completedAt: '2026-07-11T14:00:00.000Z' },
    { videoId: 'geo-2', title: '【觀念】板塊構造學說+板塊交界的三大類型', courseId: 'geology', completedAt: '2026-07-12T09:00:00.000Z' },
    { videoId: 'geo-3', title: '【觀念】固體地球的分層', courseId: 'geology', completedAt: '2026-07-12T10:30:00.000Z' },
    { videoId: 'atmo-1', title: '【觀念】影響颱風路徑的因素與不同颱風路徑對臺灣的影響', courseId: 'atmosphere', completedAt: '2026-07-13T08:00:00.000Z' },
    { videoId: 'atmo-2', title: '【觀念】地轉風與近地面風', courseId: 'atmosphere', completedAt: '2026-07-13T09:00:00.000Z' },
    { videoId: 'ocean-1', title: '【觀念】聖嬰與反聖嬰現象', courseId: 'ocean', completedAt: '2026-07-14T08:00:00.000Z' },
    { videoId: 'ocean-2', title: '【觀念】潮汐', courseId: 'ocean', completedAt: '2026-07-14T09:30:00.000Z' },
    { videoId: 'es-1', title: 'Structure of the Earth', courseId: 'earth-science-khan', completedAt: '2026-07-14T10:00:00.000Z' },
    { videoId: 'econ-1', title: 'Introduction to Economics', courseId: 'microeconomics', completedAt: '2026-07-14T11:00:00.000Z' },
    { videoId: 'fin-1', title: '理財第 1 課：「想要」還是「必要」？', courseId: 'financial-literacy', completedAt: '2026-07-14T12:00:00.000Z' },
  ]

  // Varying flower states (different familiarity/petals/review schedules)
  const now = new Date()
  const flowerState = {
    'astro-1': {
      petals: 8, baseFamiliarity: 85, lastReviewAt: '2026-07-14T10:00:00.000Z',
      nextReviewAt: new Date(now.getTime() + 3 * 24 * 60 * 60 * 1000).toISOString(),
      intervalDays: 7, easeFactor: 2.8, reviewCount: 4, totalCorrect: 10, totalAnswered: 12,
    },
    'astro-2': {
      petals: 6, baseFamiliarity: 65, lastReviewAt: '2026-07-13T14:00:00.000Z',
      nextReviewAt: new Date(now.getTime() + 1 * 24 * 60 * 60 * 1000).toISOString(),
      intervalDays: 3, easeFactor: 2.5, reviewCount: 3, totalCorrect: 7, totalAnswered: 9,
    },
    'astro-3': {
      petals: 4, baseFamiliarity: 45, lastReviewAt: '2026-07-12T16:00:00.000Z',
      nextReviewAt: new Date(now.getTime() - 2 * 60 * 60 * 1000).toISOString(), // due now
      intervalDays: 1, easeFactor: 2.3, reviewCount: 2, totalCorrect: 4, totalAnswered: 6,
    },
    'geo-1': {
      petals: 9, baseFamiliarity: 92, lastReviewAt: '2026-07-14T08:00:00.000Z',
      nextReviewAt: new Date(now.getTime() + 14 * 24 * 60 * 60 * 1000).toISOString(),
      intervalDays: 14, easeFactor: 3.0, reviewCount: 5, totalCorrect: 14, totalAnswered: 15,
    },
    'geo-2': {
      petals: 5, baseFamiliarity: 55, lastReviewAt: '2026-07-13T10:00:00.000Z',
      nextReviewAt: new Date(now.getTime() - 1 * 60 * 60 * 1000).toISOString(), // due now
      intervalDays: 1, easeFactor: 2.4, reviewCount: 2, totalCorrect: 5, totalAnswered: 6,
    },
    'geo-3': {
      petals: 3, baseFamiliarity: 30, lastReviewAt: '2026-07-12T11:00:00.000Z',
      nextReviewAt: new Date(now.getTime() - 5 * 60 * 60 * 1000).toISOString(), // due now
      intervalDays: 1, easeFactor: 2.1, reviewCount: 1, totalCorrect: 2, totalAnswered: 3,
    },
    'atmo-1': {
      petals: 7, baseFamiliarity: 72, lastReviewAt: '2026-07-14T12:00:00.000Z',
      nextReviewAt: new Date(now.getTime() + 5 * 24 * 60 * 60 * 1000).toISOString(),
      intervalDays: 7, easeFactor: 2.6, reviewCount: 3, totalCorrect: 8, totalAnswered: 9,
    },
    'atmo-2': {
      petals: 4, baseFamiliarity: 40, lastReviewAt: '2026-07-13T15:00:00.000Z',
      nextReviewAt: new Date(now.getTime() - 30 * 60 * 1000).toISOString(), // due now
      intervalDays: 1, easeFactor: 2.2, reviewCount: 1, totalCorrect: 3, totalAnswered: 3,
    },
    'ocean-1': {
      petals: 6, baseFamiliarity: 60, lastReviewAt: '2026-07-14T14:00:00.000Z',
      nextReviewAt: new Date(now.getTime() + 2 * 24 * 60 * 60 * 1000).toISOString(),
      intervalDays: 3, easeFactor: 2.5, reviewCount: 2, totalCorrect: 5, totalAnswered: 6,
    },
    'ocean-2': {
      petals: 2, baseFamiliarity: 20, lastReviewAt: null,
      nextReviewAt: null,
      intervalDays: 1, easeFactor: 2.5, reviewCount: 0, totalCorrect: 0, totalAnswered: 0,
    },
    'es-1': {
      petals: 5, baseFamiliarity: 50, lastReviewAt: '2026-07-14T10:30:00.000Z',
      nextReviewAt: new Date(now.getTime() - 3 * 60 * 60 * 1000).toISOString(), // due now
      intervalDays: 1, easeFactor: 2.3, reviewCount: 1, totalCorrect: 3, totalAnswered: 4,
    },
    'econ-1': {
      petals: 7, baseFamiliarity: 75, lastReviewAt: '2026-07-14T14:00:00.000Z',
      nextReviewAt: new Date(now.getTime() + 4 * 24 * 60 * 60 * 1000).toISOString(),
      intervalDays: 5, easeFactor: 2.7, reviewCount: 3, totalCorrect: 8, totalAnswered: 9,
    },
    'fin-1': {
      petals: 3, baseFamiliarity: 35, lastReviewAt: '2026-07-14T12:30:00.000Z',
      nextReviewAt: new Date(now.getTime() - 1 * 60 * 60 * 1000).toISOString(), // due now
      intervalDays: 1, easeFactor: 2.2, reviewCount: 1, totalCorrect: 2, totalAnswered: 3,
    },
  }

  localStorage.setItem('completedVideos', JSON.stringify(completedVideos))
  localStorage.setItem('flowerState', JSON.stringify(flowerState))
  localStorage.setItem('demoSeeded', 'true')
}
