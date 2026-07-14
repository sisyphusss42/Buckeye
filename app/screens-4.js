// Screen 6: Knowledge Garden
function gardenScreen() {
  return `<div class="screen active" style="display:flex;flex-direction:column;height:100%;">
    ${statusBar()}
    <div class="screen-content">
      <div class="flex items-center justify-between mb-12"><h2 class="text-h2">我的花園 🌸</h2><span style="font-size:20px;">🔍</span></div>
      <p class="text-caption mb-16">28 朵花 · 3 棵樹 · 本週 +5 綻放</p>
      <div class="tab-bar mb-16">
        <div class="tab-item active">全部</div><div class="tab-item">攝影</div><div class="tab-item">心理學</div><div class="tab-item">設計</div>
      </div>
      <div class="flower-grid">
        <div class="flower-item" onclick="navigate('flower-detail')"><span class="flower-emoji">🌸</span><span class="flower-name">三分法</span></div>
        <div class="flower-item" onclick="navigate('flower-detail')"><span class="flower-emoji">🌺</span><span class="flower-name">景深</span></div>
        <div class="flower-item" onclick="navigate('flower-detail')"><span class="flower-emoji">🌷</span><span class="flower-name">色溫</span></div>
        <div class="flower-item" onclick="navigate('flower-detail')"><span class="flower-emoji">🍂</span><span class="flower-name">白平衡</span></div>
        <div class="flower-item" onclick="navigate('flower-detail')"><span class="flower-emoji">🌻</span><span class="flower-name">認知偏誤</span></div>
        <div class="flower-item" onclick="navigate('flower-detail')"><span class="flower-emoji">🌹</span><span class="flower-name">從眾效應</span></div>
        <div class="flower-item" onclick="navigate('flower-detail')"><span class="flower-emoji">💐</span><span class="flower-name">色彩對比</span></div>
        <div class="flower-item" onclick="navigate('flower-detail')"><span class="flower-emoji">🌳</span><span class="flower-name">合作之樹</span></div>
        <div class="flower-item" onclick="navigate('flower-detail')"><span class="flower-emoji">🌱</span><span class="flower-name">ISO 值</span></div>
        <div class="flower-item" onclick="navigate('flower-detail')"><span class="flower-emoji">🌼</span><span class="flower-name">快門速度</span></div>
        <div class="flower-item" onclick="navigate('flower-detail')"><span class="flower-emoji">🪻</span><span class="flower-name">投射效應</span></div>
        <div class="flower-item" onclick="navigate('flower-detail')"><span class="flower-emoji">🌿</span><span class="flower-name">光圈值</span></div>
      </div>
      <div class="card mt-20" style="background:var(--yellow-light);" onclick="navigate('review')">
        <div class="flex items-center gap-12">
          <span style="font-size:24px;">🍃</span>
          <div class="flex-1"><div style="font-weight:600;">1 朵花快枯萎了</div><div class="text-caption">「白平衡」3 天沒複習</div></div>
          <span class="btn btn-small btn-primary">澆水 💧</span>
        </div>
      </div>
    </div>
    ${bottomNav('garden')}
  </div>`;
}

// Screen 7: Flower Detail
function flowerDetailScreen() {
  return `<div class="screen active" style="display:flex;flex-direction:column;height:100%;">
    ${statusBar()}
    <div class="header-bar"><div class="back-btn" onclick="navigate('garden')">‹</div><div></div></div>
    <div class="screen-content" style="text-align:center;">
      <div style="position:relative;margin:16px 0 24px;"><div style="font-size:80px;">🌸</div><div style="position:absolute;top:0;left:30%;font-size:16px;">✨</div><div style="position:absolute;top:10px;right:30%;font-size:14px;">✨</div></div>
      <div class="text-caption" style="color:var(--green);">攝影 · 已掌握</div>
      <h2 class="text-h2" style="margin:4px 0 8px;">三分法則</h2>
      <p class="text-caption">記憶保留度 80% · 8 / 10 片花瓣</p>
      <div class="progress-bar mt-12 mb-24" style="height:10px;"><div class="fill green" style="width:80%"></div></div>
      <div style="background:var(--gray-100);border-radius:16px;padding:16px;margin-bottom:24px;">
        <div class="text-caption mb-12" style="text-align:left;">🌱 成長歷程</div>
        <div class="growth-stages">
          <div class="growth-stage"><span class="stage-icon">🌱</span><span class="stage-label">學習</span></div><div class="growth-connector"></div>
          <div class="growth-stage"><span class="stage-icon">🌿</span><span class="stage-label">測驗</span></div><div class="growth-connector"></div>
          <div class="growth-stage"><span class="stage-icon">🌸</span><span class="stage-label">綻放</span></div><div class="growth-connector"></div>
          <div class="growth-stage" style="opacity:0.4;"><span class="stage-icon">🌺</span><span class="stage-label">精通</span></div>
        </div>
      </div>
      <div class="card mb-16"><div class="flex items-center justify-between"><span>下次複習</span><span style="font-weight:600;color:var(--green);">2 天後</span></div></div>
      <button class="btn btn-primary mb-12" onclick="navigate('review')">立即複習 💧</button>
      <button class="btn btn-ghost" onclick="navigate('video')">回到課程</button>
    </div>
  </div>`;
}
