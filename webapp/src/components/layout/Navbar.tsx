import { useState, useEffect } from 'react';
import { navLinks } from '../../constants';
import { Button } from '../ui/Button';
import { Menu, X, Phone } from 'lucide-react';
import { cn } from '../../lib/utils';
import { motion, AnimatePresence } from 'framer-motion';

export const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      // Add background blur only after scrolling past the hero (approx 100px)
      setIsScrolled(window.scrollY > 100);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    setMobileMenuOpen(false);
    const element = document.getElementById(id);
    if (element) {
      const offset = 80; // Navbar height
      const bodyRect = document.body.getBoundingClientRect().top;
      const elementRect = element.getBoundingClientRect().top;
      const elementPosition = elementRect - bodyRect;
      const offsetPosition = elementPosition - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  };

  return (
    <>
      <nav 
        className={cn(
          "fixed top-0 left-0 right-0 z-50 transition-all duration-300 px-6 lg:px-12 py-4",
          isScrolled ? "glass-panel py-3" : "bg-transparent py-6"
        )}
      >
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          {/* Logo */}
          <div 
            className="flex items-center gap-2 cursor-pointer relative z-50"
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          >
            <div className="bg-white/95 backdrop-blur-sm p-1.5 rounded-xl shadow-lg border border-white/20">
              <img 
                src="/master_logo.webp" 
                alt="Master Elevator Logo" 
                className="h-10 sm:h-12 w-auto object-contain"
              />
            </div>
          </div>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-8">
            <div className="flex gap-6">
              {navLinks.map((link) => (
                <button
                  key={link.id}
                  onClick={() => scrollToSection(link.id)}
                  className={cn(
                    "text-sm font-medium transition-colors hover:text-primary text-slate-700"
                  )}
                >
                  {link.title}
                </button>
              ))}
            </div>
            <Button 
              size="sm" 
              onClick={() => scrollToSection('contact')}
            >
              Get a Quote
            </Button>
          </div>

          {/* Mobile Toggle */}
          <button 
            className={cn(
              "md:hidden relative z-50 p-2 text-secondary"
            )}
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-40 bg-white pt-24 px-6 md:hidden flex flex-col"
          >
            <div className="flex flex-col gap-6 text-2xl font-semibold text-secondary mt-8">
              {navLinks.map((link) => (
                <button
                  key={link.id}
                  onClick={() => scrollToSection(link.id)}
                  className="text-left border-b border-slate-100 pb-4 hover:text-primary transition-colors"
                >
                  {link.title}
                </button>
              ))}
            </div>
            
            <div className="mt-auto mb-12 flex flex-col gap-4">
              <a href="tel:+97335081527" className="flex items-center gap-3 text-lg font-medium text-slate-600">
                <Phone className="text-primary" size={20} />
                +973 35081527
              </a>
              <Button size="lg" className="w-full" onClick={() => scrollToSection('contact')}>
                Request Service
              </Button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};
