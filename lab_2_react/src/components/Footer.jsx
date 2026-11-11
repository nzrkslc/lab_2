import { useEffect, useState } from 'react';

const SYSTEM_INFO_KEY = 'systemInfo';
const CURRENT_YEAR = new Date().getFullYear();

/**
 * Зберігає системну інформацію браузера та ОС у localStorage і відображає її у футері.
 */
function Footer() {
  const [systemInfo, setSystemInfo] = useState(null);

  useEffect(() => {
    const collectedInfo = {
      userAgent: navigator.userAgent,
      platform: navigator.platform || 'Невідомо',
      language: navigator.language,
      cookieEnabled: navigator.cookieEnabled ? 'Так' : 'Ні',
      online: navigator.onLine ? 'Онлайн' : 'Офлайн',
    };

    localStorage.setItem(SYSTEM_INFO_KEY, JSON.stringify(collectedInfo));

    const storedData = localStorage.getItem(SYSTEM_INFO_KEY);
    if (storedData) {
      try {
        setSystemInfo(JSON.parse(storedData));
      } catch {
        setSystemInfo(null);
      }
    }
  }, []);

  return (
    <footer className="mt-12 pt-6 border-t border-slate-200 dark:border-slate-800 text-slate-500 dark:text-slate-400 text-sm">
      <p className="text-center mb-4">
        &copy; {CURRENT_YEAR} Назар Кисилиця. Лабораторна робота №4 з вебпрограмування.
      </p>

      {systemInfo && (
        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-4 text-xs text-slate-600 dark:text-slate-300 space-y-1.5 shadow-xs">
          <h3 className="font-semibold text-slate-800 dark:text-slate-100 mb-2">
            Системна інформація (збережено в localStorage):
          </h3>
          <p>
            <strong className="text-slate-800 dark:text-slate-200">Платформа (OS):</strong>{' '}
            {systemInfo.platform}
          </p>
          <p className="break-all">
            <strong className="text-slate-800 dark:text-slate-200">User-Agent:</strong>{' '}
            {systemInfo.userAgent}
          </p>
          <p>
            <strong className="text-slate-800 dark:text-slate-200">Мова:</strong>{' '}
            {systemInfo.language} |{' '}
            <strong className="text-slate-800 dark:text-slate-200">Cookies:</strong>{' '}
            {systemInfo.cookieEnabled} |{' '}
            <strong className="text-slate-800 dark:text-slate-200">Статус:</strong>{' '}
            {systemInfo.online}
          </p>
        </div>
      )}
    </footer>
  );
}

export default Footer;
