import { useState } from 'react';
import { Loading } from './components/Loading';
import { Navbar } from './components/Navbar';
import { MouseFollower } from './components/MouseFollower';
import { BackgroundEffects } from './components/BackgroundEffects';
import { Hero } from './sections/Hero';
import { About } from './sections/About';
import { Skills } from './sections/Skills';
import { Education } from './sections/Education';
import { Certifications } from './sections/Certifications';
import { Projects } from './sections/Projects';
import { Experience } from './sections/Experience';
import { Contact } from './sections/Contact';
import { Footer } from './sections/Footer';

function App() {
  const [loading, setLoading] = useState(true);

  if (loading) {
    return <Loading onComplete={() => setLoading(false)} />;
  }

  return (
    <div className="relative text-white min-h-screen selection:bg-primary/30 selection:text-white bg-[#03030b]">
      {/* Scrolling structural ambient grid background */}
      <div className="fixed inset-0 bg-[linear-gradient(to_right,#080815_1px,transparent_1px),linear-gradient(to_bottom,#080815_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_70%,transparent_100%)] opacity-25 pointer-events-none z-0 animate-grid-scroll" />
      
      {/* Dynamic background lighting and scroll tracker */}
      <BackgroundEffects />
      
      {/* Custom micro-interactive cursor element */}
      <MouseFollower />

      {/* Navigation menu */}
      <Navbar />

      {/* Sections Queue */}
      <main className="relative z-10">
        <Hero />
        <About />
        <Skills />
        <Education />
        <Certifications />
        <Projects />
        <Experience />
        <Contact />
      </main>

      {/* Footer credit branding */}
      <Footer />
    </div>
  );
}

export default App;
