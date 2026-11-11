function Experience() {
  return (
    <section id="experience" className="bg-white dark:bg-slate-900 p-6 rounded-xl shadow-sm border border-slate-200 dark:border-slate-800 hover:shadow-md transition-all">
      <h2 className="text-2xl font-bold text-slate-800 dark:text-slate-100 mb-4 border-b border-slate-100 dark:border-slate-800 pb-2">
        Досвід та проекти
      </h2>
      <article className="border-l-4 border-blue-600 dark:border-blue-400 pl-4 py-1">
        <h3 className="text-lg font-semibold text-slate-800 dark:text-slate-100">Навчальні лабораторні роботи з Web-розробки</h3>
        <p className="text-xs text-slate-400 dark:text-slate-500 mb-2"><em>НУЛП, 2026</em></p>
        <ul className="list-disc list-inside space-y-1 text-slate-600 dark:text-slate-300 text-sm">
          <li>Побудова структури вебдокументів засобами HTML5.</li>
          <li>Розробка SPA-застосунків на базі React та Vite.</li>
        </ul>
      </article>
    </section>
  );
}

export default Experience;
