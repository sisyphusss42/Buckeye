// Screen 10: Partner Chat
function partnerChatScreen() {
  return `<div class="screen active" style="display:flex;flex-direction:column;height:100%;">
    ${statusBar()}
    <div class="header-bar" style="border-bottom:1px solid var(--gray-200);">
      <div class="back-btn" onclick="navigate('partner-challenge')">‹</div>
      <div class="flex flex-col items-center"><span style="font-weight:600;">小柔</span><span class="text-small">● 在線 · 契合度 92%</span></div>
      <span style="font-size:24px;">🌳</span>
    </div>
    <div class="chat-messages">
      <div class="text-small" style="text-align:center;color:var(--text-tertiary);margin-bottom:8px;">今天</div>
      <div class="chat-bubble received">Ava 早～ 我剛把攝影第 4 課刷完了 📷</div>
      <div class="chat-bubble sent">好強！我等下也來追進度 💪</div>
      <div class="chat-bubble received">我們的樹好像快升級了 👀</div>
      <div class="chat-bubble system">🌳✨ 合作之樹 升到第 3 階！</div>
      <div class="chat-bubble sent">太棒了 🎉</div>
    </div>
    <div class="chat-input-bar">
      <span style="font-size:20px;cursor:pointer;">＋</span>
      <input type="text" placeholder="輸入訊息...">
      <span style="font-size:20px;cursor:pointer;color:var(--green);">➤</span>
    </div>
  </div>`;
}

// Screen 11: Profile
function profileScreen() {
  return `<div class="screen active" style="display:flex;flex-direction:column;height:100%;">
    ${statusBar()}
    <div class="screen-content">
      <div style="text-align:center;margin-bottom:24px;">
        <div class="avatar green" style="width:72px;height:72px;font-size:28px;margin:0 auto 12px;">A</div>
        <h2 class="text-h2">Ava</h2>
        <p class="text-caption">Lv.12 · 知識園丁 🌿</p>
        <div class="progress-bar mt-8" style="max-width:200px;margin:8px auto 0;"><div class="fill purple" style="width:65%"></div></div>
        <p class="text-small mt-4">距離 Lv.13 還差 350 XP</p>
      </div>
      <div class="stat-row mb-20">
        <div class="stat-box"><div class="stat-value">28</div><div class="stat-label">花朵</div></div>
        <div class="stat-box"><div class="stat-value">12</div><div class="stat-label">連續天數</div></div>
        <div class="stat-box"><div class="stat-value">9</div><div class="stat-label">徽章</div></div>
      </div>
      <div class="flex items-center justify-between mb-12"><span class="text-title" style="font-size:16px;">我的徽章</span><span class="text-caption" style="cursor:pointer;color:var(--green);">全部</span></div>
      <div class="flex gap-12 mb-20" style="overflow-x:auto;">
        <div class="badge"><span class="badge-icon">🔥</span><span class="badge-label">7 日</span></div>
        <div class="badge"><span class="badge-icon">🌳</span><span class="badge-label">結業</span></div>
        <div class="badge"><span class="badge-icon">🧠</span><span class="badge-label">記憶王</span></div>
        <div class="badge"><span class="badge-icon">💯</span><span class="badge-label">滿分</span></div>
      </div>
      <div class="flex flex-col gap-4">
        <div class="card flex items-center justify-between" style="cursor:pointer;" onclick="navigate('wrap')"><span>📊 學習回顧</span><span>›</span></div>
        <div class="card flex items-center justify-between" style="cursor:pointer;"><span>📚 課程紀錄</span><span>›</span></div>
        <div class="card flex items-center justify-between" style="cursor:pointer;" onclick="navigate('notifications')"><span>🔔 通知設定</span></div>
        <div class="card flex items-center justify-between" style="cursor:pointer;" onclick="navigate('leaderboard')"><span>🏆 排行榜</span><span>›</span></div>
      </div>
    </div>
    ${bottomNav('profile')}
  </div>`;
}
