function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer>
      <hr />
      <p>&copy; {currentYear} Назар Кисилиця. Лабораторна робота №2 з вебпрограмування.</p>
    </footer>
  );
}

export default Footer;