import { useEffect, useRef, useState } from 'react';

const FORMSPREE_ENDPOINT = 'https://formspree.io/f/xzerpoog';
const MODAL_OPEN_DELAY_MS = 60000;

/**
 * Модальне вікно форми зворотного зв'язку.
 * Автоматично відкривається через 1 хвилину перебування користувача на сторінці.
 */
function ContactForm() {
  const [isOpen, setIsOpen] = useState(false);
  const timerRef = useRef(null);

  useEffect(() => {
    timerRef.current = setTimeout(() => {
      setIsOpen(true);
      timerRef.current = null;
    }, MODAL_OPEN_DELAY_MS);

    return () => {
      if (timerRef.current !== null) {
        clearTimeout(timerRef.current);
      }
    };
  }, []);

  useEffect(() => {
    if (!isOpen) return undefined;

    const handleKeyDown = (event) => {
      if (event.key === 'Escape') {
        setIsOpen(false);
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen]);

  const handleOpen = () => {
    if (timerRef.current !== null) {
      clearTimeout(timerRef.current);
      timerRef.current = null;
    }
    setIsOpen(true);
  };

  return (
    <>
      {!isOpen && (
        <button
          type="button"
          onClick={handleOpen}
          className="fixed bottom-5 right-5 z-40 px-4 py-2.5 rounded-full bg-blue-600 hover:bg-blue-700 text-white text-sm font-semibold shadow-lg transition-colors cursor-pointer"
        >
          Зворотний зв’язок
        </button>
      )}

      {isOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/70 backdrop-blur-xs p-4"
          role="dialog"
          aria-modal="true"
          aria-labelledby="contact-modal-title"
          onClick={(event) => {
            if (event.target === event.currentTarget) {
              setIsOpen(false);
            }
          }}
        >
          <div className="w-full max-w-md rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 p-6 shadow-2xl text-slate-800 dark:text-slate-100">
            <div className="flex items-center justify-between mb-2">
              <h2 id="contact-modal-title" className="text-xl font-bold">
                Зворотний зв’язок
              </h2>
              <button
                type="button"
                onClick={() => setIsOpen(false)}
                aria-label="Закрити модальне вікно"
                className="text-2xl leading-none text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 cursor-pointer"
              >
                &times;
              </button>
            </div>

            <p className="text-sm text-slate-500 dark:text-slate-400 mb-4">
              Залиште свої контактні дані та повідомлення — я обов’язково відповім.
            </p>

            <form action={FORMSPREE_ENDPOINT} method="POST" className="space-y-4">
              <div>
                <label
                  htmlFor="react-contact-name"
                  className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1"
                >
                  Ім’я
                </label>
                <input
                  id="react-contact-name"
                  type="text"
                  name="name"
                  placeholder="Введіть ваше ім’я"
                  required
                  className="w-full rounded-lg border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-800 px-3 py-2 text-sm text-slate-900 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div>
                <label
                  htmlFor="react-contact-email"
                  className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1"
                >
                  Email
                </label>
                <input
                  id="react-contact-email"
                  type="email"
                  name="email"
                  placeholder="example@domain.com"
                  required
                  className="w-full rounded-lg border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-800 px-3 py-2 text-sm text-slate-900 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div>
                <label
                  htmlFor="react-contact-phone"
                  className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1"
                >
                  Номер телефону
                </label>
                <input
                  id="react-contact-phone"
                  type="tel"
                  name="phone"
                  placeholder="+380 XX XXX XX XX"
                  required
                  className="w-full rounded-lg border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-800 px-3 py-2 text-sm text-slate-900 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div>
                <label
                  htmlFor="react-contact-message"
                  className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1"
                >
                  Повідомлення
                </label>
                <textarea
                  id="react-contact-message"
                  name="message"
                  rows={4}
                  placeholder="Текст повідомлення у довільній формі..."
                  required
                  className="w-full rounded-lg border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-800 px-3 py-2 text-sm text-slate-900 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div className="flex justify-end gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => setIsOpen(false)}
                  className="px-4 py-2 rounded-lg bg-slate-200 dark:bg-slate-700 hover:bg-slate-300 dark:hover:bg-slate-600 text-slate-800 dark:text-slate-100 text-sm font-medium transition-colors cursor-pointer"
                >
                  Закрити
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 rounded-lg bg-blue-600 hover:bg-blue-700 text-white text-sm font-semibold transition-colors cursor-pointer"
                >
                  Надіслати
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
}

export default ContactForm;
