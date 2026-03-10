import { lazy, Suspense } from 'react';
import { Navbar } from './components/layout/Navbar';
import { Hero } from './sections/Hero';

// Lazy load everything below the fold for better LCP
const About = lazy(() => import('./sections/About').then(m => ({ default: m.About })));
const Products = lazy(() => import('./sections/Products').then(m => ({ default: m.Products })));
const Services = lazy(() => import('./sections/Services').then(m => ({ default: m.Services })));
const Stats = lazy(() => import('./sections/Stats').then(m => ({ default: m.Stats })));
const R3FShowcase = lazy(() => import('./sections/R3FShowcase').then(m => ({ default: m.R3FShowcase })));
const Contact = lazy(() => import('./sections/Contact').then(m => ({ default: m.Contact })));
const Footer = lazy(() => import('./components/layout/Footer').then(m => ({ default: m.Footer })));

function App() {
  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      
      <main className="flex-grow">
        <Hero />
        <Suspense fallback={<div className="h-screen animate-pulse bg-slate-50" />}>
          <About />
          <Products />
          <Services />
          <Stats />
          <R3FShowcase />
          <Contact />
        </Suspense>
      </main>

      <Suspense fallback={null}>
        <Footer />
      </Suspense>
    </div>
  );
}

export default App;
