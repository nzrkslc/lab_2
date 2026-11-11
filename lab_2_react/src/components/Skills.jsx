function Skills() {
  return (
    <section id="skills" className="bg-white dark:bg-slate-900 p-6 rounded-xl shadow-sm border border-slate-200 dark:border-slate-800 hover:shadow-md transition-all">
      <h2 className="text-2xl font-bold text-slate-800 dark:text-slate-100 mb-4 border-b border-slate-100 dark:border-slate-800 pb-2">
        Технічні навички
      </h2>
      <ul className="space-y-3 text-slate-700 dark:text-slate-300">
        <li className="p-2 rounded-lg bg-slate-50 dark:bg-slate-800/70 border border-slate-100 dark:border-slate-700">
          <strong className="text-slate-900 dark:text-slate-100">Мови:</strong> HTML5, CSS3, JavaScript (ES6+)
        </li>
        <li className="p-2 rounded-lg bg-slate-50 dark:bg-slate-800/70 border border-slate-100 dark:border-slate-700">
          <strong className="text-slate-900 dark:text-slate-100">Бібліотеки та середовища:</strong> React, Vite, Node.js
        </li>
        <li className="p-2 rounded-lg bg-slate-50 dark:bg-slate-800/70 border border-slate-100 dark:border-slate-700">
          <strong className="text-slate-900 dark:text-slate-100">Контроль версій:</strong> Git, GitHub
        </li>
      </ul>
    </section>
  );
}

export default Skills;
