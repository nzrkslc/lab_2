const COMMENTS_API_URL = 'https://jsonplaceholder.typicode.com/posts/13/comments';
const SYSTEM_INFO_STORAGE_KEY = 'systemInfo';
const MODAL_DELAY_MS = 60000;

/**
 * Збирає наявну інформацію про операційну систему та браузер.
 */
function collectSystemInfo() {
  const info = {
    'User-Agent': navigator.userAgent || 'Невідомо',
    'Платформа (OS)': navigator.platform || 'Невідомо',
    'Назва браузера (appName)': navigator.appName || 'Невідомо',
    'Версія браузера (appVersion)': navigator.appVersion || 'Невідомо',
    'Постачальник (vendor)': navigator.vendor || 'Невідомо',
    'Мова браузера': navigator.language || 'Невідомо',
    'Список мов': Array.isArray(navigator.languages) ? navigator.languages.join(', ') : 'Невідомо',
    'Cookies увімкнено': navigator.cookieEnabled ? 'Так' : 'Ні',
    'Онлайн-статус': navigator.onLine ? 'Онлайн' : 'Офлайн',
    'Кількість потоків CPU': navigator.hardwareConcurrency ?? 'Невідомо',
    'Роздільна здатність екрана': `${window.screen.width}x${window.screen.height}`,
    'Глибина кольору': `${window.screen.colorDepth} біт`,
    'Часовий пояс': Intl.DateTimeFormat().resolvedOptions().timeZone || 'Невідомо',
  };

  if (navigator.deviceMemory !== undefined) {
    info['Оперативна пам’ять (ГБ)'] = navigator.deviceMemory;
  }

  if (navigator.maxTouchPoints !== undefined) {
    info['Макс. точок дотику'] = navigator.maxTouchPoints;
  }

  if (navigator.userAgentData) {
    info['Мобільний пристрій'] = navigator.userAgentData.mobile ? 'Так' : 'Ні';
    if (navigator.userAgentData.platform) {
      info['Платформа (UA-CH)'] = navigator.userAgentData.platform;
    }
    if (Array.isArray(navigator.userAgentData.brands) && navigator.userAgentData.brands.length > 0) {
      info['Бренди браузера'] = navigator.userAgentData.brands
        .map((brand) => `${brand.brand} v${brand.version}`)
        .join(', ');
    }
  }

  return info;
}

/**
 * Зберігає інформацію про систему у localStorage та відображає всі дані з localStorage у футері.
 */
function initSystemInfoFooter() {
  const container = document.getElementById('local-storage-info');
  if (!container) return;

  const systemInfo = collectSystemInfo();
  localStorage.setItem(SYSTEM_INFO_STORAGE_KEY, JSON.stringify(systemInfo));

  container.textContent = '';

  const appendInfoCard = (label, value) => {
    const item = document.createElement('div');
    item.className = 'system-info-item';

    const strong = document.createElement('strong');
    strong.textContent = `${label}: `;

    const span = document.createElement('span');
    span.textContent = String(value);

    item.append(strong, span);
    container.appendChild(item);
  };

  for (let i = 0; i < localStorage.length; i += 1) {
    const key = localStorage.key(i);
    if (!key) continue;

    const rawValue = localStorage.getItem(key);
    try {
      const parsed = JSON.parse(rawValue);
      if (parsed && typeof parsed === 'object' && !Array.isArray(parsed)) {
        Object.entries(parsed).forEach(([entryKey, entryVal]) => {
          appendInfoCard(entryKey, entryVal);
        });
      } else {
        appendInfoCard(key, rawValue);
      }
    } catch {
      appendInfoCard(key, rawValue);
    }
  }
}

/**
 * Завантажує та рендерить коментарі попередніх роботодавців у порядку їх отримання.
 */
async function loadEmployerComments() {
  const container = document.getElementById('reviews-container');
  if (!container) return;

  try {
    const response = await fetch(COMMENTS_API_URL);
    if (!response.ok) {
      throw new Error(`Помилка HTTP: ${response.status}`);
    }

    const comments = await response.json();
    container.textContent = '';

    comments.forEach((comment, index) => {
      const card = document.createElement('article');
      card.className = 'review-card';

      const header = document.createElement('div');
      header.className = 'review-card-header';

      const title = document.createElement('h3');
      title.textContent = `${index + 1}. ${comment.name}`;

      const emailLink = document.createElement('a');
      emailLink.className = 'review-email';
      emailLink.href = `mailto:${comment.email}`;
      emailLink.textContent = comment.email;

      const body = document.createElement('p');
      body.className = 'review-body';
      body.textContent = comment.body;

      header.append(title, emailLink);
      card.append(header, body);
      container.appendChild(card);
    });
  } catch (error) {
    container.textContent = '';
    const errEl = document.createElement('p');
    errEl.className = 'status-text error-text';
    errEl.textContent = `Не вдалося завантажити коментарі: ${error.message}`;
    container.appendChild(errEl);
  }
}

/**
 * Налаштовує модальне вікно форми зворотного зв'язку з таймером на 1 хвилину.
 */
function initContactModal() {
  const modal = document.getElementById('contact-modal');
  const openBtn = document.getElementById('open-contact-btn');
  const closeBtn = document.getElementById('close-modal-btn');
  const cancelBtn = document.getElementById('cancel-modal-btn');

  if (!modal) return;

  let timerId = null;

  const openModal = () => {
    if (timerId !== null) {
      clearTimeout(timerId);
      timerId = null;
    }
    modal.hidden = false;
  };

  const closeModal = () => {
    modal.hidden = true;
  };

  timerId = setTimeout(openModal, MODAL_DELAY_MS);

  if (openBtn) {
    openBtn.addEventListener('click', openModal);
  }

  if (closeBtn) {
    closeBtn.addEventListener('click', closeModal);
  }

  if (cancelBtn) {
    cancelBtn.addEventListener('click', closeModal);
  }

  modal.addEventListener('click', (event) => {
    if (event.target === modal) {
      closeModal();
    }
  });

  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape' && !modal.hidden) {
      closeModal();
    }
  });
}

/**
 * Визначає початкову тему залежно від часу доби (07:00–21:00 — денна, інакше — нічна)
 * та налаштовує ручне перемикання теми.
 */
function initThemeSwitcher() {
  const toggleBtn = document.getElementById('theme-toggle');

  const getAutoTheme = () => {
    const hours = new Date().getHours();
    return hours >= 7 && hours < 21 ? 'light' : 'dark';
  };

  let currentTheme = getAutoTheme();

  const applyTheme = (theme) => {
    const isDark = theme === 'dark';
    document.body.classList.toggle('dark-mode', isDark);

    if (toggleBtn) {
      toggleBtn.textContent = isDark ? '☀️ Денна тема' : '🌙 Нічна тема';
      toggleBtn.setAttribute('aria-pressed', String(isDark));
    }
  };

  applyTheme(currentTheme);

  if (toggleBtn) {
    toggleBtn.addEventListener('click', () => {
      currentTheme = currentTheme === 'light' ? 'dark' : 'light';
      applyTheme(currentTheme);
    });
  }
}

document.addEventListener('DOMContentLoaded', () => {
  initSystemInfoFooter();
  loadEmployerComments();
  initContactModal();
  initThemeSwitcher();
});
