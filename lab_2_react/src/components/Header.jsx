function Header() {
  return (
    <header className="bg-slate-900 text-white p-6 sm:p-8 rounded-2xl shadow-xl mb-8 border border-slate-800">
      <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight mb-2 text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-indigo-300">
        Назар Кисилиця
      </h1>
      <p className="text-slate-300 font-medium mb-4">
        <strong className="text-blue-400">Спеціальність:</strong> 125 Кібербезпека та захист інформації (F5)
      </p>
      <address className="not-italic text-sm text-slate-400 space-y-1">
        <p>Місто: Львів, Україна</p>
        <p>
          Email: <a href="mailto:nazar.kysylytsia.kb.2025@lpnu.ua" className="text-blue-400 hover:underline hover:text-blue-300 transition-colors">nazar.kysylytsia.kb.2025@lpnu.ua</a>
        </p>
        <p>
          GitHub: <a href="https://github.com/nzrkslc" target="_blank" rel="noreferrer" className="text-blue-400 hover:underline hover:text-blue-300 transition-colors">github.com/nzrkslc</a>
        </p>
      </address>
    </header>
  );
}

export default Header;