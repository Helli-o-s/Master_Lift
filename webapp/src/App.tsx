import { Navbar } from './components/layout/Navbar';
import { Footer } from './components/layout/Footer';
import { Hero } from './sections/Hero';
import { About } from './sections/About';
import { Products } from './sections/Products';
import { Services } from './sections/Services';
import { Stats } from './sections/Stats';
import { Contact } from './sections/Contact';
import { R3FShowcase } from './sections/R3FShowcase';

function App() {
  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      
      <main className="flex-grow">
        <Hero />
        <About />
        <Products />
        <Services />
        <Stats />
        <R3FShowcase />
        <Contact />
      </main>

      <Footer />
    </div>
  );
}

export default App;
