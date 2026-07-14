// Screen 14: Notifications
function notificationsScreen() {
  return `<div class="screen active" style="display:flex;flex-direction:column;height:100%;">
    ${statusBar()}
    <div class="screen-content">
      <div class="flex items-center justify-between mb-16"><h2 class="text-h2">通知 🔔</h2><span class="text-caption" style="cursor:pointer;color:var(--green);">全部已讀</span></div>
      <p class="text-caption mb-12" style="font-weight:600;">今天</p>
      <div class="notif-item" onclick="navigate('flower-detail')"><span class="notif-icon">🌸</span><div class="notif-content"><div class="notif-title">一朵花綻放了！</div><div class="notif-desc">你掌握了「三分法則」· 2 分鐘前</div></div></div>
      <div class="notif-item" onclick="navigate('review')"><span class="notif-icon">🤖</span><div class="notif-content"><div class="notif-title">AI 幫你排好今日複習</div><div class="notif-desc">3 個知識點趁記憶新鮮 · 1 小時前</div></div></div>
      <div class="notif-item" onclick="navigate('partner-challenge')"><span class="notif-icon">🤝</span><div class="notif-content"><div class="notif-title">小柔完成了一堂課</div><div class="notif-desc">你們的合作之樹升級了 · 3 小時前</div></div></div>
      <p class="text-caption mb-12 mt-16" style="font-weight:600;">昨天</p>
      <div class="notif-item" onclick="navigate('review')"><span class="notif-icon">🍃</span><div class="notif-content"><div class="notif-title">「白平衡」需要澆水</div><div class="notif-desc">3 天沒複習，花瓣開始掉落</div></div></div>
      <div class="notif-item"><span class="notif-icon">🔥</span><div class="notif-content"><div class="notif-title">連續學習 12 天！</div><div class="notif-desc">保持下去，明天別忘了 ☀️</div></div></div>
    </div>
    <div style="padding:12px 20px;border-top:1px solid var(--gray-200);text-align:center;">
      <button class="btn btn-ghost" onclick="navigate('home')">← 返回首頁</button>
    </div>
  </div>`;
}

// Screen Registry
const screens = {
  'splash': splashScreen,
  'survey': surveyScreen,
  'home': homeScreen,
  'video': videoScreen,
  'quiz': quizScreen,
  'garden': gardenScreen,
  'flower-detail': flowerDetailScreen,
  'review': reviewScreen,
  'partner-challenge': partnerChallengeScreen,
  'partner-chat': partnerChatScreen,
  'profile': profileScreen,
  'wrap': wrapScreen,
  'leaderboard': leaderboardScreen,
  'notifications': notificationsScreen,
};

// Initialize app
document.addEventListener('DOMContentLoaded', function() { render(); });
