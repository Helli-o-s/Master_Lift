import { useState, useEffect } from 'react';
import { navLinks } from '../../constants';
import { Button } from '../ui/Button';
import { Menu, X, Phone } from 'lucide-react';
import { cn } from '../../lib/utils';
import { motion, AnimatePresence } from 'framer-motion';

export const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState<string>('');

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 100);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Scroll spy: track which section is currently in view
  useEffect(() => {
    const sectionIds = navLinks.map((l) => l.id);
    const observers: IntersectionObserver[] = [];

    sectionIds.forEach((id) => {
      const el = document.getElementById(id);
      if (!el) return;

      const obs = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) setActiveSection(id);
        },
        { rootMargin: '-30% 0px -60% 0px', threshold: 0 }
      );
      obs.observe(el);
      observers.push(obs);
    });

    return () => observers.forEach((o) => o.disconnect());
  }, []);

  const scrollToSection = (id: string) => {
    setMobileMenuOpen(false);
    const element = document.getElementById(id);
    if (element) {
      const offset = 80;
      const bodyRect = document.body.getBoundingClientRect().top;
      const elementRect = element.getBoundingClientRect().top;
      const offsetPosition = elementRect - bodyRect - offset;
      window.scrollTo({ top: offsetPosition, behavior: 'smooth' });
    }
  };

  return (
    <>
      <nav
        className={cn(
          "fixed top-0 left-0 right-0 z-50 transition-all duration-300 px-6 lg:px-12",
          isScrolled ? "glass-panel py-3" : "bg-transparent py-6"
        )}
        role="navigation"
        aria-label="Main navigation"
      >
        <div className="max-w-7xl mx-auto flex items-center justify-between">

          {/* Logo */}
          <div
            className="flex items-center gap-2 cursor-pointer relative z-50"
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            role="button"
            aria-label="Scroll to top"
            tabIndex={0}
            onKeyDown={(e) => e.key === 'Enter' && window.scrollTo({ top: 0, behavior: 'smooth' })}
          >
            <div className="bg-white/95 backdrop-blur-sm p-1.5 rounded-none shadow-lg border border-white/20">
              <img
                src="/master_logo.webp"
                alt="Master Elevator Logo"
                className="h-10 sm:h-12 w-auto object-contain"
              />
            </div>
          </div>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-8">
            <nav className="flex gap-1" aria-label="Section links">
              {navLinks.map((link) => {
                const isActive = activeSection === link.id;
                return (
                  <button
                    key={link.id}
                    onClick={() => scrollToSection(link.id)}
                    aria-current={isActive ? 'location' : undefined}
                    className={cn(
                      "relative text-sm font-medium px-3 py-2 transition-colors duration-200 cursor-pointer",
                      isActive ? "text-primary" : "text-slate-700 hover:text-primary"
                    )}
                  >
                    {link.title}
                    {/* Active underline indicator */}
                    {isActive && (
                      <motion.span
                        layoutId="nav-indicator"
                        className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary"
                        transition={{ type: 'spring', stiffness: 400, damping: 30 }}
                      />
                    )}
                  </button>
                );
              })}
            </nav>
            <Button
              size="sm"
              onClick={() => scrollToSection('contact')}
            >
              Get a Quote
            </Button>
          </div>

          {/* Mobile Toggle */}
          <button
            className="md:hidden relative z-50 p-2 text-secondary cursor-pointer"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label={mobileMenuOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={mobileMenuOpen}
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
            role="dialog"
            aria-modal="true"
            aria-label="Mobile navigation"
          >
            <div className="flex flex-col gap-2 text-2xl font-semibold text-secondary mt-8">
              {navLinks.map((link) => {
                const isActive = activeSection === link.id;
                return (
                  <button
                    key={link.id}
                    onClick={() => scrollToSection(link.id)}
                    aria-current={isActive ? 'location' : undefined}
                    className={cn(
                      "text-left border-b border-slate-100 pb-4 transition-colors flex items-center justify-between",
                      isActive ? "text-primary" : "hover:text-primary"
                    )}
                  >
                    {link.title}
                    {isActive && <span className="w-2 h-2 rounded-none bg-primary" aria-hidden="true" />}
                  </button>
                );
              })}
            </div>

            <div className="mt-auto mb-12 flex flex-col gap-4">
              <a
                href="tel:+97335081527"
                className="flex items-center gap-3 text-lg font-medium text-slate-600"
              >
                <Phone className="text-primary" size={20} aria-hidden="true" />
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
