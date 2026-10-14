function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="mt-12 pt-6 border-t border-slate-200 text-center text-slate-500 text-sm">
      <p>&copy; {currentYear} Назар Кисилиця. Лабораторна робота №3 з вебпрограмування.</p>
    </footer>
  );
}

export default Footer;