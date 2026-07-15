// Course catalog — organized by subject with episodes
// 均一教育 地球科學 courses

const courses = [
  {
    id: 'astronomy',
    title: '天文',
    subtitle: '探索宇宙的奧秘',
    icon: '🌌',
    category: '地球科學',
    color: '#6FA8FF',
    episodes: [
      { id: 'astro-1', title: '【觀念】恆星顏色與溫度', youtubeId: 'u4TSCwgbf_k', topic: '恆星顏色與溫度 光譜分類 表面溫度' },
      { id: 'astro-2', title: '【觀念】太陽視運動', youtubeId: 'AyHYHkqGVcQ', topic: '太陽視運動 日出日落 四季變化 黃道' },
      { id: 'astro-3', title: '【觀念】亮度與光度', youtubeId: 'l5u5I_OUChM', topic: '恆星亮度 光度 距離與亮度關係' },
      { id: 'astro-4', title: '【觀念】視星等與絕對星等', youtubeId: '2DCqLzgzmzg', topic: '視星等 絕對星等 星等計算 距離模數' },
      { id: 'astro-5', title: '【觀念】星體的周年運動', youtubeId: 'wExybaCZwL4', topic: '周年運動 恆星位置季節變化 黃道十二宮' },
      { id: 'astro-6', title: '【觀念】星體的周日運動', youtubeId: 'kRqdTenZSV0', topic: '周日運動 星體東升西落 地球自轉' },
      { id: 'astro-7', title: '【觀念】北極星的仰角＋不同緯度的星空', youtubeId: 'hAdD8eZIvEA', topic: '北極星仰角 緯度與星空 恆顯星 恆隱星' },
      { id: 'astro-8', title: '【觀念】地心說與天球概念', youtubeId: 'b-eIfbv_mTA', topic: '地心說 天球 天球座標 赤道座標系統' },
    ],
  },
  {
    id: 'geology',
    title: '地質',
    subtitle: '認識腳下的地球',
    icon: '🪨',
    category: '地球科學',
    color: '#B38AF5',
    episodes: [
      { id: 'geo-1', title: '【觀念】張裂型板塊邊界的地質活動＋錯動型板塊邊界的地質活動', youtubeId: 'JM5EgPnMhtI', topic: '張裂型板塊邊界 錯動型板塊邊界 中洋脊 轉形斷層' },
      { id: 'geo-2', title: '【觀念】板塊構造學說+板塊交界的三大類型', youtubeId: '9w-k3PUe1iY', topic: '板塊構造學說 聚合型 張裂型 錯動型 板塊邊界' },
      { id: 'geo-3', title: '【觀念】固體地球的分層', youtubeId: 'mDFwZc4MMZE', topic: '固體地球分層 地殼 地函 地核 岩石圈 軟流圈' },
      { id: 'geo-4', title: '【觀念】聚合型板塊邊界的地質活動與班尼奧夫帶', youtubeId: '1OgYGVAt_18', topic: '聚合型板塊邊界 隱沒帶 班尼奧夫帶 海溝 火山弧' },
      { id: 'geo-5', title: '【觀念】大陸漂移、海底擴張學說', youtubeId: 'lWrsLm7xLuo', topic: '大陸漂移 韋格納 海底擴張 古地磁 磁異常' },
      { id: 'geo-6', title: '【觀念】地震波種類地震波及其運用', youtubeId: 'RqiVSe8Hq_E', topic: '地震波 P波 S波 表面波 地震波應用 地球內部結構' },
      { id: 'geo-7', title: '【觀念】絕對地質年代與地質年代表', youtubeId: 'bMEHTvO3Dv8', topic: '絕對地質年代 放射性定年 半衰期 地質年代表' },
      { id: 'geo-8', title: '【觀念】岩層形成的順序與相對地質年代', youtubeId: 'eivEt370SKg', topic: '岩層順序 相對地質年代 疊置定律 截切定律 化石' },
    ],
  },
  {
    id: 'atmosphere',
    title: '大氣',
    subtitle: '了解天氣與氣候',
    icon: '🌤️',
    category: '地球科學',
    color: '#F6C453',
    episodes: [
      { id: 'atmo-1', title: '【觀念】影響颱風路徑的因素與不同颱風路徑對臺灣的影響', youtubeId: 'dLwmEMxnQbQ', topic: '颱風路徑 太平洋高壓 導引氣流 臺灣颱風' },
      { id: 'atmo-2', title: '【觀念】地轉風與近地面風', youtubeId: 'JfPG1wzNR3E', topic: '地轉風 近地面風 科氏力 摩擦力 氣壓梯度力' },
      { id: 'atmo-3', title: '【觀念】氣流過山與焚風的形成', youtubeId: 'NB9-pgv1Ua8', topic: '氣流過山 焚風 迎風面降雨 背風面增溫' },
      { id: 'atmo-4', title: '【觀念】飽和水氣壓曲線+絕對溼度+相對溼度', youtubeId: '2ufuzzHWp8w', topic: '飽和水氣壓 絕對溼度 相對溼度 露點溫度' },
      { id: 'atmo-5', title: '【觀念】空氣如何達到飽和與人工增雨的原理', youtubeId: 'Zodk0yWfeQA', topic: '空氣飽和 凝結核 人工增雨 碘化銀' },
      { id: 'atmo-6', title: '【觀念】大氣壓力隨高度的變化', youtubeId: '7SbUXRWZVDI', topic: '大氣壓力 高度變化 氣壓遞減 氣壓單位' },
      { id: 'atmo-7', title: '【觀念】空氣上升而膨脹降溫', youtubeId: 'E8K2VxbmYog', topic: '絕熱膨脹 乾絕熱遞減率 溼絕熱遞減率 雲的形成' },
      { id: 'atmo-8', title: '【觀念】大氣的能量收支和平衡', youtubeId: '0TU90Y3plR4', topic: '大氣能量收支 輻射平衡 溫室效應 地球能量平衡' },
    ],
  },
  {
    id: 'ocean',
    title: '海洋',
    subtitle: '探索藍色星球',
    icon: '🌊',
    category: '地球科學',
    color: '#5FAF6A',
    episodes: [
      { id: 'ocean-1', title: '【觀念】聖嬰與反聖嬰現象', youtubeId: '0MUgMPuCryQ', topic: '聖嬰現象 反聖嬰現象 沃克環流 海溫異常' },
      { id: 'ocean-2', title: '【觀念】潮汐', youtubeId: 'UYqQEPdm95Y', topic: '潮汐 引潮力 大潮 小潮 潮差 月球影響' },
      { id: 'ocean-3', title: '【觀念】海域安全：瘋狗浪與沿岸流', youtubeId: 'NxFGv00O8vY', topic: '瘋狗浪 沿岸流 離岸流 海域安全' },
      { id: 'ocean-4', title: '【觀念】波浪的形成與海嘯', youtubeId: 'P88-ruH1SV4', topic: '波浪形成 風浪 湧浪 海嘯 地震引發海嘯' },
      { id: 'ocean-5', title: '【觀念】溫鹽環流', youtubeId: 'PTGABr6YuT0', topic: '溫鹽環流 深層洋流 海水密度 全球輸送帶' },
    ],
  },
]

export default courses

// Helper: get all episodes as flat list
export function getAllEpisodes() {
  return courses.flatMap(course =>
    course.episodes.map(ep => ({ ...ep, courseId: course.id, courseTitle: course.title, courseIcon: course.icon, courseColor: course.color }))
  )
}

// Helper: find episode by id
export function findEpisode(episodeId) {
  for (const course of courses) {
    const ep = course.episodes.find(e => e.id === episodeId)
    if (ep) return { ...ep, courseId: course.id, courseTitle: course.title, courseIcon: course.icon, courseColor: course.color }
  }
  return null
}
