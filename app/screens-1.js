// Screen 1: Splash
function splashScreen() {
  return `<div class="screen active" style="background:linear-gradient(180deg,#E8F5E9 0%,var(--bg) 100%);display:flex;flex-direction:column;align-items:center;justify-content:center;padding:40px;text-align:center;">
    <div style="font-size:80px;margin-bottom:24px;">🌿</div>
    <h1 style="font-size:32px;font-weight:700;color:var(--green);margin-bottom:4px;">PressPlay</h1>
    <h2 style="font-size:28px;font-weight:700;margin-bottom:16px;">Academy</h2>
    <p style="font-size:16px;color:var(--text-secondary);margin-bottom:48px;">每一次學習，都讓花園多一分生機</p>
    <button class="btn btn-primary" onclick="navigate('survey')" style="margin-bottom:12px;">開始種下第一朵花 🌱</button>
    <button class="btn btn-ghost" onclick="navigate('home')">我已經有帳號了</button>
    <p style="font-size:12px;color:var(--text-tertiary);margin-top:auto;">v1.0 · 用學習灌溉你的知識花園</p>
  </div>`;
}

// Screen 2: Daily Interest Survey
function surveyScreen() {
  return `<div class="screen active" style="display:flex;flex-direction:column;height:100%;">
    ${statusBar()}
    <div class="header-bar">
      <div class="back-btn" onclick="navigate('splash')">‹</div>
      <div class="progress-bar" style="flex:1;margin:0 16px;"><div class="fill green" style="width:66%"></div></div>
      <span class="text-caption">2/3</span>
    </div>
    <div class="screen-content" style="text-align:center;">
      <div style="font-size:48px;margin-bottom:16px;">🌞</div>
      <h2 class="text-h2" style="margin-bottom:8px;">今天想澆灌哪些主題？</h2>
      <p class="text-caption" style="margin-bottom:24px;">選 3 個以上，AI 會為你調配今日學習</p>
      <div style="display:flex;flex-wrap:wrap;gap:10px;justify-content:center;margin-bottom:24px;">
        <span class="chip selected" onclick="this.classList.toggle('selected')">📷 攝影</span>
        <span class="chip selected" onclick="this.classList.toggle('selected')">🧠 心理學</span>
        <span class="chip selected" onclick="this.classList.toggle('selected')">💰 理財</span>
        <span class="chip" onclick="this.classList.toggle('selected')">🎨 設計</span>
        <span class="chip" onclick="this.classList.toggle('selected')">🌏 語言</span>
        <span class="chip" onclick="this.classList.toggle('selected')">🎸 音樂</span>
        <span class="chip" onclick="this.classList.toggle('selected')">🍳 料理</span>
        <span class="chip" onclick="this.classList.toggle('selected')">💻 程式</span>
        <span class="chip" onclick="this.classList.toggle('selected')">📈 行銷</span>
        <span class="chip" onclick="this.classList.toggle('selected')">🧘 正念</span>
        <span class="chip" onclick="this.classList.toggle('selected')">✍️ 寫作</span>
      </div>
      <div class="ai-bubble" style="text-align:left;margin-bottom:24px;">已選 3 項 — 我幫你排了約 18 分鐘的內容</div>
    </div>
    <div style="padding:16px 20px;flex-shrink:0;">
      <button class="btn btn-primary" onclick="navigate('home')">開始今天的學習</button>
    </div>
  </div>`;
}
