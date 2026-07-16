// Screen 3: Home Dashboard
function homeScreen() {
  return `<div class="screen active" style="display:flex;flex-direction:column;height:100%;">
    ${statusBar()}
    <div class="screen-content">
      <div class="flex items-center justify-between" style="margin-bottom:20px;">
        <div><span class="text-title">早安 ☀️</span><br><span class="text-h2">Ava</span></div>
        <div class="flex gap-12 items-center">
          <div style="cursor:pointer;font-size:20px;" onclick="navigate('notifications')">🔔</div>
          <div class="avatar green" onclick="navigate('profile')">A</div>
        </div>
      </div>
      <div class="card" style="background:linear-gradient(135deg,var(--green-light),var(--yellow-light));margin-bottom:20px;">
        <div class="flex items-center justify-between">
          <div><div class="text-caption">連續學習</div><div class="text-h2">12 天 🔥</div></div>
          <div style="text-align:right;font-size:20px;font-weight:700;">4/5</div>
        </div>
        <p class="text-caption" style="margin-top:8px;">再完成 1 堂課，就能點亮今日花朵 ✨</p>
      </div>
      <div class="flex items-center justify-between mb-12">
        <span class="text-title">繼續學習</span>
        <span class="text-caption" style="cursor:pointer;color:var(--green);">查看全部</span>
      </div>
      <div class="card flex items-center gap-12 mb-16" style="cursor:pointer;" onclick="navigate('video')">
        <div style="width:56px;height:56px;border-radius:12px;background:var(--pink-light);display:flex;align-items:center;justify-content:center;font-size:28px;">📷</div>
        <div class="flex-1">
          <div class="text-body" style="font-weight:600;">攝影 · 進行中</div>
          <div class="text-caption">光線與構圖</div>
          <div class="progress-bar mt-8" style="height:6px;"><div class="fill green" style="width:50%"></div></div>
          <div class="text-small mt-4">第 3 / 6 課 · 剩 8 分鐘</div>
        </div>
        <div style="font-size:24px;">▶</div>
      </div>
      <div class="flex items-center gap-8 mb-12"><span>🤖</span><span class="text-title" style="font-size:16px;">AI 為你推薦</span></div>
      <div class="flex gap-12" style="overflow-x:auto;padding-bottom:8px;">
        <div class="card" style="min-width:160px;cursor:pointer;"><div style="font-size:32px;margin-bottom:8px;">🎨</div><div style="font-size:14px;font-weight:600;">色彩心理學</div><div class="text-small">12 分鐘 · 因你喜歡設計</div></div>
        <div class="card" style="min-width:160px;cursor:pointer;"><div style="font-size:32px;margin-bottom:8px;">🧘</div><div style="font-size:14px;font-weight:600;">正念呼吸法</div><div class="text-small">8 分鐘 · 適合下午</div></div>
      </div>
      <div class="card mt-20" style="background:var(--yellow-light);cursor:pointer;" onclick="navigate('review')">
        <div class="flex items-center gap-12">
          <span style="font-size:28px;">🧠</span>
          <div class="flex-1"><div style="font-weight:600;">3 個知識點待複習</div><div class="text-caption">趁記憶還新，快澆水</div></div>
          <span class="btn btn-small btn-primary">複習</span>
        </div>
      </div>
    </div>
    <div class="fab-ai" onclick="navigate('video')">🤖</div>
    ${bottomNav('home')}
  </div>`;
}
