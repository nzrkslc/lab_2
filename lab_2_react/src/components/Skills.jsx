function Skills() {
  return (
    <section id="skills" className="bg-white p-6 rounded-xl shadow-sm border border-slate-200 hover:shadow-md transition-shadow">
      <h2 className="text-2xl font-bold text-slate-800 mb-4 border-b border-slate-100 pb-2">
        Технічні навички
      </h2>
      <ul className="space-y-3 text-slate-700">
        <li className="p-2 rounded-lg bg-slate-50 border border-slate-100">
          <strong className="text-slate-900">Мови:</strong> HTML5, CSS3, JavaScript (ES6+)
        </li>
        <li className="p-2 rounded-lg bg-slate-50 border border-slate-100">
          <strong className="text-slate-900">Бібліотеки та середовища:</strong> React, Vite, Node.js
        </li>
        <li className="p-2 rounded-lg bg-slate-50 border border-slate-100">
          <strong className="text-slate-900">Контроль версій:</strong> Git, GitHub
        </li>
      </ul>
    </section>
  );
}

export default Skills;