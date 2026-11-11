function About() {
  return (
    <section className="bg-white dark:bg-slate-900 p-6 rounded-xl shadow-sm border border-slate-200 dark:border-slate-800 hover:shadow-md transition-all">
      <h2 className="text-2xl font-bold text-slate-800 dark:text-slate-100 mb-3 border-b border-slate-100 dark:border-slate-800 pb-2">
        Про мене
      </h2>
      <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
        Студент Національного університету «Львівська політехніка» кафедри захисту інформації (спеціальність 125 «Кібербезпека»).
        Цікавлюся сучасними вебтехнологіями, компонентною розробкою на React та безпекою вебзастосунків.
      </p>
    </section>
  );
}

export default About;
