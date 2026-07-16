// Course catalog — organized by subject with episodes

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
  {
    id: 'earth-science-khan',
    title: 'Earth Science',
    subtitle: 'Khan Academy Earth & Space',
    icon: '🌍',
    category: 'Science',
    color: '#4CAF50',
    episodes: [
      { id: 'es-1', title: 'Structure of the Earth', youtubeId: '4AxZ-6MOznY', topic: 'structure of the earth layers crust mantle core' },
      { id: 'es-2', title: 'Seismic Waves', youtubeId: 'NhioAAdYDJM', topic: 'seismic waves P-waves S-waves earth geological history' },
      { id: 'es-3', title: 'Earth Formation', youtubeId: 'VbNXh0GaLYo', topic: 'earth formation accretion solar system planet formation' },
      { id: 'es-4', title: 'Hawaiian Islands Formation', youtubeId: 'D1eibbfAEVk', topic: 'Hawaiian islands hotspot volcanic formation plate movement' },
      { id: 'es-5', title: 'Ecosystems and Biomes', youtubeId: 'A495e31cDdE', topic: 'ecosystems biomes ecology natural systems biodiversity' },
      { id: 'es-6', title: 'Ecology Introduction', youtubeId: 'OfV3VNgjpvw', topic: 'ecology introduction organisms environment interactions' },
      { id: 'es-7', title: 'Plates Moving Due to Convection', youtubeId: 'f8GK2oEN-uI', topic: 'plate tectonics convection mantle currents plate movement' },
      { id: 'es-8', title: "Earth's Tilt Causes Seasons", youtubeId: '05qDIjKevJo', topic: 'earth axial tilt seasons solstice equinox' },
      { id: 'es-9', title: "How We Know About Earth's Core", youtubeId: 'KL0i1RSnpfI', topic: 'earth core seismic waves shadow zone inner outer core' },
      { id: 'es-10', title: 'Human Evolution Overview', youtubeId: 'frE1rjhH77Y', topic: 'human evolution hominids fossils natural selection' },
      { id: 'es-11', title: 'Scale of the Small', youtubeId: 'ERKx3Oa2omo', topic: 'scale of universe atoms molecules nanometers' },
      { id: 'es-12', title: 'Beginnings of Life', youtubeId: 'nYFuxTXDj90', topic: 'beginnings of life abiogenesis RNA world early earth' },
      { id: 'es-13', title: "Earth's Gravitational Field", youtubeId: '1E3Z_R5AHdg', topic: 'gravitational field g value acceleration due to gravity' },
      { id: 'es-14', title: 'Introduction to Magnetism', youtubeId: '8Y4JSp5U82I', topic: 'magnetism magnetic fields poles electromagnets' },
      { id: 'es-15', title: 'Four Fundamental Forces', youtubeId: 'FEF6PxWOvsk', topic: 'four fundamental forces gravity electromagnetic strong weak nuclear' },
      { id: 'es-16', title: 'Gravity for Astronauts in Orbit', youtubeId: 'oIZV-ixRTcY', topic: 'gravity orbit astronauts centripetal force weightlessness' },
    ],
  },
  {
    id: 'microeconomics',
    title: 'AP Microeconomics',
    subtitle: 'Khan Academy Economics',
    icon: '📈',
    category: 'Economics',
    color: '#FF7043',
    episodes: [
      { id: 'econ-1', title: 'Introduction to Economics', youtubeId: '8JYP_wU1JTU', topic: 'introduction economics supply demand market equilibrium' },
      { id: 'econ-2', title: 'Scarcity', youtubeId: 'iy-fhpbTH9E', topic: 'scarcity limited resources unlimited wants tradeoffs' },
      { id: 'econ-3', title: 'Four Factors of Production', youtubeId: '-IvwoqPh1_I', topic: 'factors of production land labor capital entrepreneurship' },
      { id: 'econ-4', title: 'Scarcity and Rivalry', youtubeId: 'uVA1-m8SVvA', topic: 'scarcity rivalry excludable non-excludable goods' },
      { id: 'econ-5', title: 'Economic Models', youtubeId: '7n_Hf_UsW7I', topic: 'economic models simplification assumptions ceteris paribus' },
      { id: 'econ-6', title: 'Normative and Positive Statements', youtubeId: 'YtX6SGw7E3c', topic: 'normative positive statements value judgments facts' },
      { id: 'econ-7', title: 'Property Rights in a Market System', youtubeId: 'AJy7pWK0W8g', topic: 'property rights market system incentives ownership' },
      { id: 'econ-8', title: 'Production Possibilities Frontier', youtubeId: '_7VHfuWV-Qg', topic: 'production possibilities frontier PPF tradeoffs efficiency' },
      { id: 'econ-9', title: 'Opportunity Cost', youtubeId: 'pkEiHZAtoro', topic: 'opportunity cost next best alternative forgone' },
      { id: 'econ-10', title: 'Increasing Opportunity Cost', youtubeId: '00fgAG6VrRQ', topic: 'increasing opportunity cost concave PPF specialization' },
      { id: 'econ-11', title: 'PPCs for Increasing, Decreasing and Constant Opportunity Cost', youtubeId: '-aVZtzD44vI', topic: 'PPC shapes constant increasing decreasing opportunity cost' },
      { id: 'econ-12', title: "PPC as a Model of a Country's Economy", youtubeId: '9zZY6RfN6iA', topic: 'PPC model economy growth recession underutilization' },
      { id: 'econ-13', title: 'Comparative Advantage and Gains from Trade', youtubeId: 'xx9xNJlPOJo', topic: 'comparative advantage specialization gains from trade' },
      { id: 'econ-14', title: 'Comparative vs Absolute Advantage', youtubeId: 'xN3UV5FsBkU', topic: 'comparative advantage absolute advantage lower opportunity cost' },
      { id: 'econ-15', title: 'Opportunity Cost Using an Output Table', youtubeId: 'K8p0F92gVUM', topic: 'opportunity cost output table comparative advantage calculation' },
      { id: 'econ-16', title: 'Terms of Trade and Gains from Trade', youtubeId: 'C-xLUS5JGIM', topic: 'terms of trade gains mutually beneficial exchange' },
      { id: 'econ-17', title: 'Input Approach to Comparative Advantage', youtubeId: 'Uqf5c6Xcjr4', topic: 'input approach comparative advantage hours per unit' },
      { id: 'econ-18', title: "When There Aren't Gains from Trade", youtubeId: 'TeAzW_tY6m4', topic: 'no gains from trade same opportunity cost identical PPCs' },
      { id: 'econ-19', title: 'Comparative Advantage Worked Example', youtubeId: 'jHp4fnrEA6w', topic: 'comparative advantage worked example two countries two goods' },
      { id: 'econ-20', title: 'Optimal Decision-Making and Opportunity Costs', youtubeId: '5-03899n678', topic: 'optimal decision marginal analysis opportunity costs rational' },
      { id: 'econ-21', title: 'Accounting Profit vs Economic Profit', youtubeId: 'kQRFfAlj9CE', topic: 'accounting profit economic profit implicit explicit costs' },
      { id: 'econ-22', title: 'Introduction to Utility', youtubeId: 'UnX8RPB5vFM', topic: 'utility satisfaction preferences consumer choice' },
      { id: 'econ-23', title: 'Marginal Utility', youtubeId: 'Kf9KhwryQNE', topic: 'marginal utility diminishing returns additional unit satisfaction' },
      { id: 'econ-24', title: 'Visualizing Marginal Utility and Total Utility', youtubeId: 'JlS5K1AxjT4', topic: 'marginal utility total utility graph visualization diminishing' },
    ],
  },
  {
    id: 'financial-literacy',
    title: '【素養】理財能力',
    subtitle: '均一教育 理財課程',
    icon: '💰',
    category: '理財',
    color: '#F08DAA',
    episodes: [
      { id: 'fin-0', title: '理財課程預告：理財壯遊', youtubeId: '-ExW54-pLak', topic: '理財課程介紹 學習目標 財務規劃概覽' },
      { id: 'fin-1', title: '理財第 1 課：「想要」還是「必要」？', youtubeId: '67ctd6G5yA4', topic: '想要 必要 需求區分 消費決策' },
      { id: 'fin-2', title: '理財第 2 課：「想要」還是「必要」II？', youtubeId: 'elEFcqgbpC4', topic: '想要必要進階 消費陷阱 理性消費' },
      { id: 'fin-3', title: '理財第 3 課：如何做選擇？', youtubeId: 'hEwUHclTV2o', topic: '選擇 機會成本 決策方法 比較' },
      { id: 'fin-4', title: '理財第 4 課：如何做選擇 II？', youtubeId: '_pGiHUTxFrg', topic: '選擇進階 優先順序 資源分配' },
      { id: 'fin-5', title: '理財第 5 課：支付工具 - 悠遊卡、現金、信用卡', youtubeId: 'IXD59Y4sk5M', topic: '支付工具 悠遊卡 現金 信用卡 電子支付' },
      { id: 'fin-6', title: '理財第 6 課：投資工具 - 銀行', youtubeId: 'CFXkYupy7vk', topic: '銀行 存款 利息 金融機構 儲蓄' },
      { id: 'fin-7', title: '理財第 7 課：投資工具 - 單利、複利、定存', youtubeId: 'MLbjoL6kq8k', topic: '單利 複利 定存 利率計算 時間價值' },
      { id: 'fin-8', title: '理財第 8 課：投資工具 - 基金', youtubeId: 'B2QgXaWgeNg', topic: '基金 投資組合 分散風險 基金類型' },
      { id: 'fin-9', title: '理財第 9 課：換匯教學探討', youtubeId: 'QDebj0-6sW8', topic: '換匯 匯率 外幣 貨幣兌換' },
      { id: 'fin-10', title: '理財第 10 課：金錢規劃 - 建立願望清單', youtubeId: 'Evw8WlmDzu0', topic: '金錢規劃 願望清單 目標設定 優先順序' },
      { id: 'fin-11', title: '理財第 11 課：金錢規劃 - 記帳', youtubeId: 'tMVUNxV9wo0', topic: '記帳 收入支出 帳本 消費紀錄' },
      { id: 'fin-12', title: '理財第 12 課：金錢規劃 - 編列預算書', youtubeId: 'EaPudUoCaE4', topic: '預算書 收支平衡 預算編列 財務計畫' },
      { id: 'fin-13', title: '理財第 13 課：金錢規劃 - 擬定儲蓄計劃', youtubeId: '3oEYDJrmHC4', topic: '儲蓄計畫 目標儲蓄 零用錢管理 存錢方法' },
      { id: 'fin-14', title: '理財第 14 課：延伸學習 - 中央銀行', youtubeId: 'r5AFdeAZffI', topic: '中央銀行 貨幣政策 利率 通貨膨脹' },
    ],
  },
].map(course => ({
  ...course,
  lecturer: ['earth-science-khan', 'microeconomics'].includes(course.id)
    ? 'Khan Academy'
    : '均一教育',
}))

export default courses

// Helper: get all episodes as flat list
export function getAllEpisodes() {
  return courses.flatMap(course =>
    course.episodes.map(ep => ({ ...ep, courseId: course.id, courseTitle: course.title, courseIcon: course.icon, courseColor: course.color, courseLecturer: course.lecturer }))
  )
}

// Helper: find episode by id
export function findEpisode(episodeId) {
  for (const course of courses) {
    const ep = course.episodes.find(e => e.id === episodeId)
    if (ep) return { ...ep, courseId: course.id, courseTitle: course.title, courseIcon: course.icon, courseColor: course.color, courseLecturer: course.lecturer }
  }
  return null
}
