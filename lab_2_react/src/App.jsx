import Header from './components/Header';
import About from './components/About';
import Skills from './components/Skills';
import Education from './components/Education';
import Experience from './components/Experience';
import Footer from './components/Footer';

function App() {
  return (
    <div>
      <Header />
      <main>
        <About />
        <Skills />
        <Education />
        <Experience />
      </main>
      <Footer />
    </div>
  );
}

export default App;