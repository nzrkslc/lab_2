function Footer() {
  const currentYear = new Date().getFullYear();
  return (
    <footer>
      <hr />
      <p>&copy; {currentYear} Тарас Шевченко. Лабораторна робота №2 з вебпрограмування.</p>
    </footer>
  );
}

export default Footer;