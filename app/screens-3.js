// Screen 4: Course Video Player
function videoScreen() {
  return `<div class="screen active" style="display:flex;flex-direction:column;height:100%;">
    <div class="video-player">
      <div style="position:absolute;top:12px;left:16px;right:16px;display:flex;justify-content:space-between;">
        <div class="back-btn" onclick="navigate('home')" style="background:rgba(255,255,255,0.2);color:white;">‹</div>
      </div>
      <div class="play-btn">▶</div>
      <div style="color:white;font-size:13px;display:flex;justify-content:space-between;align-items:center;">
        <span>04:12</span>
        <div class="progress-bar" style="flex:1;margin:0 12px;height:4px;"><div class="fill green" style="width:33%"></div></div>
        <span>12:30</span>
      </div>
      <div style="display:flex;justify-content:center;gap:24px;margin-top:8px;color:white;font-size:18px;">
        <span>⏮</span><span>⏯</span><span>⏭</span><span style="font-size:13px;align-self:center;">1.0×</span>
      </div>
    </div>
    <div class="screen-content" style="padding-top:16px;">
      <div class="text-caption" style="color:var(--green);">攝影 · 第 3 課</div>
      <h2 class="text-title" style="margin:4px 0 8px;">光線與構圖</h2>
      <p class="text-caption">學會三分法，讓每張照片更有呼吸感</p>
      <div class="tab-bar mt-16 mb-16">
        <div class="tab-item active">重點</div><div class="tab-item">字幕</div><div class="tab-item">筆記</div>
      </div>
      <div class="card mb-16">
        <div class="flex items-center gap-8 mb-8"><span>💡</span><span style="font-weight:600;">三分法則</span></div>
        <p class="text-body" style="line-height:1.6;">把畫面分成九宮格，主體放在交叉點上，比置中更自然生動。</p>
      </div>
      <div class="ai-bubble" style="cursor:pointer;" onclick="navigate('quiz')">
        看到這裡，要不要來個 30 秒小測驗鞏固記憶？
        <div style="margin-top:8px;"><span class="btn btn-small btn-primary">好</span></div>
      </div>
    </div>
  </div>`;
}

// Screen 5: AI Quiz Popup
function quizScreen() {
  return `<div class="screen active" style="display:flex;flex-direction:column;height:100%;position:relative;">
    <div style="position:absolute;inset:0;background:rgba(0,0,0,0.6);z-index:1;"></div>
    <div style="position:absolute;inset:0;display:flex;align-items:center;justify-content:center;z-index:2;padding:24px;">
      <div class="quiz-card">
        <div style="text-align:center;margin-bottom:16px;">
          <span style="font-size:32px;">🤖</span>
          <h3 class="text-title" style="margin-top:8px;">AI 快速測驗 · 1/1</h3>
        </div>
        <p style="font-size:15px;font-weight:500;margin-bottom:16px;">主體放在九宮格的哪個位置，畫面最自然？</p>
        <div class="flex flex-col gap-12" id="quiz-options">
          <div class="answer-option" onclick="selectAnswer(this,false)">正中央</div>
          <div class="answer-option" onclick="selectAnswer(this,true)">四條線的交叉點</div>
          <div class="answer-option" onclick="selectAnswer(this,false)">最上緣</div>
          <div class="answer-option" onclick="selectAnswer(this,false)">畫面角落</div>
        </div>
        <div id="quiz-result" style="display:none;margin-top:16px;text-align:center;">
          <div style="background:var(--green-light);border-radius:12px;padding:12px;margin-bottom:16px;">🌸 答對了！這朵花長出第 6 片花瓣</div>
          <button class="btn btn-primary" onclick="navigate('video')">繼續學習</button>
        </div>
      </div>
    </div>
  </div>`;
}

function selectAnswer(el, correct) {
  var opts = document.querySelectorAll('.answer-option');
  opts.forEach(function(o){o.style.pointerEvents='none';});
  if(correct){el.classList.add('correct');el.innerHTML+=' ✓';}
  else{el.classList.add('wrong');opts[1].classList.add('correct');opts[1].innerHTML+=' ✓';}
  setTimeout(function(){document.getElementById('quiz-result').style.display='block';},800);
}
