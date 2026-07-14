// PressPlay Academy · Single Page App
// Navigation & State Management

const app = document.querySelector('.app-container');
let currentScreen = 'splash';

function navigate(screen) {
  currentScreen = screen;
  render();
}

function render() {
  app.innerHTML = screens[currentScreen]();
  window.scrollTo(0, 0);
}

// Bottom Navigation Component
function bottomNav(active) {
  const items = [
    { id: 'home', icon: '🏠', label: '首頁' },
    { id: 'courses', icon: '📚', label: '課程' },
    { id: 'garden', icon: '🌸', label: '花園' },
    { id: 'partners', icon: '🤝', label: '夥伴' },
    { id: 'profile', icon: '👤', label: '我的' },
  ];
  return `<div class="bottom-nav">
    ${items.map(i => `<div class="nav-item ${active === i.id ? 'active' : ''}" onclick="navigate('${i.id === 'courses' ? 'home' : i.id === 'partners' ? 'partner-challenge' : i.id}')">
      <span class="nav-icon">${i.icon}</span><span>${i.label}</span>
    </div>`).join('')}
  </div>`;
}

// Status Bar Component
function statusBar() {
  return `<div class="status-bar"><span>9:41</span><span>📶 🔋</span></div>`;
}
