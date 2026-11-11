import { useEffect, useState } from 'react';

const REVIEWS_API_URL = 'https://jsonplaceholder.typicode.com/posts/13/comments';

/**
 * Завантажує та відображає коментарі попередніх роботодавців (варіант №13).
 */
function Reviews() {
  const [comments, setComments] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const controller = new AbortController();

    async function fetchComments() {
      try {
        setIsLoading(true);
        setError(null);

        const response = await fetch(REVIEWS_API_URL, {
          signal: controller.signal,
        });

        if (!response.ok) {
          throw new Error(`Помилка HTTP: ${response.status}`);
        }

        const data = await response.json();
        setComments(data);
      } catch (err) {
        if (err.name !== 'AbortError') {
          setError(err.message || 'Не вдалося завантажити відгуки.');
        }
      } finally {
        if (!controller.signal.aborted) {
          setIsLoading(false);
        }
      }
    }

    fetchComments();

    return () => {
      controller.abort();
    };
  }, []);

  return (
    <section
      id="reviews"
      className="bg-white dark:bg-slate-900 p-6 rounded-xl shadow-sm border border-slate-200 dark:border-slate-800 hover:shadow-md transition-all"
    >
      <div className="mb-4 border-b border-slate-100 dark:border-slate-800 pb-2">
        <h2 className="text-2xl font-bold text-slate-800 dark:text-slate-100">
          Відгуки попередніх роботодавців
        </h2>
        <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
          Отримано з JSONPlaceholder (варіант №13)
        </p>
      </div>

      {isLoading && (
        <p className="text-sm text-slate-500 dark:text-slate-400 italic">
          Завантаження відгуків...
        </p>
      )}

      {error && (
        <p className="text-sm text-red-600 dark:text-red-400 font-medium">
          Не вдалося завантажити відгуки: {error}
        </p>
      )}

      {!isLoading && !error && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {comments.map((comment, index) => (
            <article
              key={comment.id}
              className="p-4 rounded-lg bg-slate-50 dark:bg-slate-800/70 border border-slate-200 dark:border-slate-700 border-l-4 border-l-blue-600 dark:border-l-blue-400"
            >
              <h3 className="text-base font-semibold text-slate-800 dark:text-slate-100 capitalize mb-1">
                {index + 1}. {comment.name}
              </h3>
              <a
                href={`mailto:${comment.email}`}
                className="text-xs text-blue-600 dark:text-blue-400 hover:underline break-all block mb-2"
              >
                {comment.email}
              </a>
              <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                {comment.body}
              </p>
            </article>
          ))}
        </div>
      )}
    </section>
  );
}

export default Reviews;
