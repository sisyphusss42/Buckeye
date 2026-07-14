// Screen 12: Yearly Wrap
function wrapScreen() {
  return `<div class="screen active" style="display:flex;flex-direction:column;height:100%;background:linear-gradient(180deg,#E8F5E9 0%,var(--bg) 50%);">
    ${statusBar()}
    <div class="header-bar"><div class="back-btn" onclick="navigate('profile')">‹</div><div></div></div>
    <div class="screen-content" style="text-align:center;">
      <h2 class="text-h2 mb-8">✨ 2026 年度回顧</h2>
      <div style="font-size:48px;margin:24px 0;">🌸</div>
      <p style="font-size:16px;">你讓</p>
      <p class="text-display" style="color:var(--green);margin:8px 0;">168</p>
      <p style="font-size:20px;margin-bottom:8px;">朵花綻放 🌸</p>
      <p class="text-caption mb-24">今年是你花園最茂盛的一年</p>
      <div style="display:grid;grid-template-columns:1fr 1fr;gap:12px;margin-bottom:24px;">
        <div class="stat-box"><div class="stat-value" style="color:var(--blue);">86h</div><div class="stat-label">學習時數</div></div>
        <div class="stat-box"><div class="stat-value" style="color:var(--green);">42</div><div class="stat-label">完成課程</div></div>
        <div class="stat-box"><div class="stat-value" style="color:var(--yellow);">98</div><div class="stat-label">最長連續</div></div>
        <div class="stat-box"><div class="stat-value" style="color:var(--pink);">7</div><div class="stat-label">成長樹木</div></div>
      </div>
      <div class="card mb-20"><div class="text-caption mb-8">最愛主題</div><p style="font-size:16px;">📷 攝影 · 🧠 心理學 · 🎨 設計</p></div>
      <button class="btn btn-primary">分享我的年度花園</button>
    </div>
  </div>`;
}

// Screen 13: Leaderboard
function leaderboardScreen() {
  return `<div class="screen active" style="display:flex;flex-direction:column;height:100%;">
    ${statusBar()}
    <div class="screen-content">
      <h2 class="text-h2 mb-8">本週排行 🏆</h2>
      <p class="text-caption mb-16">綠意聯盟 · 還剩 2 天</p>
      <div class="card mb-16" style="background:linear-gradient(135deg,var(--yellow-light),var(--green-light));">
        <div class="flex items-center justify-center gap-16" style="padding:16px 0;">
          <div class="flex flex-col items-center gap-4"><div class="avatar pink" style="width:44px;height:44px;">柔</div><span class="text-small">小柔</span><span style="font-weight:700;">2</span><span class="text-small" style="color:var(--green);">1,240</span></div>
          <div class="flex flex-col items-center gap-4"><span style="font-size:20px;">👑</span><div class="avatar blue" style="width:52px;height:52px;">阿</div><span class="text-small">阿哲</span><span style="font-weight:700;font-size:16px;">1</span><span class="text-small" style="color:var(--green);">1,580</span></div>
          <div class="flex flex-col items-center gap-4"><div class="avatar purple" style="width:44px;height:44px;">安</div><span class="text-small">小安</span><span style="font-weight:700;">3</span><span class="text-small" style="color:var(--green);">1,110</span></div>
        </div>
      </div>
      <div class="card">
        <div class="leader-item"><span class="leader-rank">4</span><div class="avatar yellow" style="width:36px;height:36px;font-size:14px;">阿</div><span style="font-weight:500;">阿明</span><span class="leader-xp">980</span></div>
        <div class="leader-item" style="background:var(--green-light);border-radius:12px;padding:12px;margin:0 -8px;"><span class="leader-rank" style="color:var(--green);">5</span><div class="avatar green" style="width:36px;height:36px;font-size:14px;">A</div><span style="font-weight:600;">Ava（你）</span><span class="leader-xp">920</span></div>
        <div class="leader-item"><span class="leader-rank">6</span><div class="avatar pink" style="width:36px;height:36px;font-size:14px;">婷</div><span style="font-weight:500;">小婷</span><span class="leader-xp">870</span></div>
        <div class="leader-item"><span class="leader-rank">7</span><div class="avatar blue" style="width:36px;height:36px;font-size:14px;">凱</div><span style="font-weight:500;">阿凱</span><span class="leader-xp">760</span></div>
      </div>
      <div class="card mt-16" style="background:var(--green-light);text-align:center;"><p style="font-size:14px;">再賺 60 XP 就能超越小安 ⚡</p></div>
    </div>
    ${bottomNav('home')}
  </div>`;
}
