import Header from './components/Header';
import About from './components/About';
import Skills from './components/Skills';
import Experience from './components/Experience';
import Education from './components/Education';
import Footer from './components/Footer';

function App() {
  return (
    <div className="min-h-screen bg-slate-50 py-10 px-4 sm:px-6 lg:px-8 font-sans">
      <div className="max-w-4xl mx-auto">
        <Header />
        
        <main className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-6">
            <About />
            <Skills />
          </div>
          <div className="space-y-6">
            <Experience />
            <Education />
          </div>
        </main>

        <Footer />
      </div>
    </div>
  );
}

export default App;