import { useEffect, useState } from 'react';
import Header from './components/Header';
import About from './components/About';
import Skills from './components/Skills';
import Experience from './components/Experience';
import Education from './components/Education';
import Reviews from './components/Reviews';
import Footer from './components/Footer';
import ContactForm from './components/ContactForm';

function getThemeByTime() {
  const hours = new Date().getHours();
  return hours >= 7 && hours < 21 ? 'light' : 'dark';
}

function App() {
  const [theme, setTheme] = useState(() => getThemeByTime());

  useEffect(() => {
    const syncThemeByTime = () => {
      setTheme(getThemeByTime());
    };

    const intervalId = setInterval(syncThemeByTime, 60000);
    return () => clearInterval(intervalId);
  }, []);

  useEffect(() => {
    const isDark = theme === 'dark';
    document.body.classList.toggle('dark', isDark);
    document.body.classList.toggle('dark-mode', isDark);
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prevTheme) => (prevTheme === 'light' ? 'dark' : 'light'));
  };

  return (
    <div
      className={`${
        theme === 'dark' ? 'dark ' : ''
      }min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 py-10 px-4 sm:px-6 lg:px-8 font-sans transition-colors duration-300`}
    >
      <div className="max-w-4xl mx-auto">
        <Header theme={theme} onToggleTheme={toggleTheme} />

        <main className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-6">
              <About />
              <Skills />
            </div>
            <div className="space-y-6">
              <Experience />
              <Education />
            </div>
          </div>

          <Reviews />
        </main>

        <Footer />
        <ContactForm />
      </div>
    </div>
  );
}

export default App;
