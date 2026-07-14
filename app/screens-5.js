// Screen 8: Memory Review
function reviewScreen() {
  return `<div class="screen active" style="display:flex;flex-direction:column;height:100%;">
    ${statusBar()}
    <div class="header-bar">
      <div class="back-btn" onclick="navigate('home')">✕</div>
      <div class="progress-bar" style="flex:1;margin:0 16px;"><div class="fill green" style="width:40%"></div></div>
      <span class="text-caption">2/5</span>
    </div>
    <div class="screen-content" style="text-align:center;">
      <div style="font-size:40px;margin-bottom:12px;">🧠</div>
      <h3 class="text-title mb-16">間隔複習</h3>
      <div class="card mb-16" style="text-align:left;">
        <p class="text-caption mb-8">請用自己的話解釋</p>
        <p class="text-title" style="font-size:18px;">什麼是「白平衡」？</p>
        <textarea style="width:100%;height:80px;border:1.5px solid var(--gray-200);border-radius:12px;padding:12px;margin-top:12px;font-family:var(--font);font-size:15px;resize:none;outline:none;" placeholder="輸入你的答案..."></textarea>
        <p class="text-small mt-8" style="color:var(--warning);">🍃 這朵花有點缺水了</p>
      </div>
      <div class="ai-bubble" style="text-align:left;margin-bottom:24px;"><strong>需要提示嗎？</strong><br>想想不同光源下，白色為什麼會偏色…</div>
      <div style="text-align:left;margin-bottom:16px;">
        <p class="text-caption mb-8">把握度</p>
        <div class="confidence-bar">
          <div class="confidence-dot filled low"></div><div class="confidence-dot filled low"></div>
          <div class="confidence-dot filled medium"></div><div class="confidence-dot"></div><div class="confidence-dot"></div>
        </div>
      </div>
    </div>
    <div style="padding:16px 20px;flex-shrink:0;">
      <button class="btn btn-primary" onclick="navigate('home')">提交答案</button>
    </div>
  </div>`;
}

// Screen 9: Partner Challenge
function partnerChallengeScreen() {
  return `<div class="screen active" style="display:flex;flex-direction:column;height:100%;">
    ${statusBar()}
    <div class="screen-content">
      <h2 class="text-h2 mb-16">夥伴挑戰 🤝</h2>
      <div class="card mb-20" style="text-align:center;">
        <div class="flex items-center justify-center gap-16" style="margin-bottom:12px;">
          <div class="flex flex-col items-center gap-4"><div class="avatar green" style="width:48px;height:48px;font-size:20px;">A</div><span class="text-small">Ava</span></div>
          <div class="flex flex-col items-center gap-4"><span style="font-size:28px;">🌳</span><span class="text-small" style="color:var(--green);">契合度 92%</span></div>
          <div class="flex flex-col items-center gap-4"><div class="avatar pink" style="width:48px;height:48px;font-size:20px;">柔</div><span class="text-small">小柔</span></div>
        </div>
        <p class="text-caption">你們一起種下的樹已經長到第 3 階</p>
      </div>
      <div class="card mb-16">
        <div class="flex items-center justify-between mb-12"><span style="font-weight:600;">本週共同任務</span><span class="chip" style="padding:4px 10px;font-size:12px;background:var(--green-light);color:var(--green);border:none;">進行中</span></div>
        <p class="text-body mb-12">兩人各完成 5 堂課，解鎖「合作之樹」</p>
        <div class="mb-8"><div class="flex items-center justify-between mb-4"><span class="text-caption">Ava</span><span class="text-small">4/5</span></div><div class="progress-bar"><div class="fill green" style="width:80%"></div></div></div>
        <div><div class="flex items-center justify-between mb-4"><span class="text-caption">小柔</span><span class="text-small">3/5</span></div><div class="progress-bar"><div class="fill pink" style="width:60%"></div></div></div>
      </div>
      <div class="card" style="background:var(--yellow-light);"><div class="flex items-center gap-12"><span style="font-size:24px;">🎁</span><div><div style="font-weight:600;">完成可得</div><div class="text-caption">稀有花種 ×2 · 200 XP</div></div></div></div>
      <button class="btn btn-primary mt-20" onclick="navigate('partner-chat')">推小柔一把 👋</button>
    </div>
    ${bottomNav('partners')}
  </div>`;
}
