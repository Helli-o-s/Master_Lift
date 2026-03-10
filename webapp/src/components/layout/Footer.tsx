import { Phone, Mail, MapPin, Instagram } from 'lucide-react';
import { products, services } from '../../constants';

export const Footer = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-secondary text-slate-300 pt-20 pb-10">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          
          {/* Brand Col */}
          <div className="md:col-span-2 lg:col-span-1">
            <div 
              className="flex items-center gap-2 mb-6 cursor-pointer"
              onClick={scrollToTop}
            >
              <div className="w-10 h-10 bg-primary rounded flex items-center justify-center font-bold text-white text-xl tracking-tighter shadow-lg shadow-black/20">
                ME
              </div>
              <div className="font-bold text-lg leading-tight text-white">
                MASTER ELEVATOR<br/>
                <span className="text-xs font-normal tracking-wide text-slate-400">TRADING CO. W.L.L.</span>
              </div>
            </div>
            <p className="text-sm leading-relaxed text-slate-400 mb-6">
              The best way to rise high. Premium vertical mobility solutions across Bahrain, engineered for safety, speed, and reliability.
            </p>
            <div className="flex items-center gap-4">
              <a 
                href="https://instagram.com/master_elevator_bahrain" 
                target="_blank" 
                rel="noreferrer"
                className="w-10 h-10 rounded-full bg-slate-800 flex items-center justify-center hover:bg-primary hover:text-white transition-colors"
                aria-label="Instagram"
              >
                <Instagram size={20} />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-white font-bold mb-6 flex items-center gap-2">
              <div className="w-4 h-1 bg-primary -skew-x-12" />
              Products
            </h4>
            <ul className="flex flex-col gap-3">
              {products.map((item) => (
                <li key={item.id}>
                  <button 
                    onClick={() => {
                      document.getElementById('products')?.scrollIntoView({ behavior: 'smooth' });
                    }}
                    className="text-sm hover:text-white transition-colors flex items-center gap-2"
                  >
                    <span className="text-primary opacity-50 text-xs">▸</span>
                    {item.title}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-white font-bold mb-6 flex items-center gap-2">
              <div className="w-4 h-1 bg-primary -skew-x-12" />
              Services
            </h4>
            <ul className="flex flex-col gap-3">
              {services.map((item, idx) => (
                <li key={idx}>
                   <button 
                    onClick={() => {
                      document.getElementById('services')?.scrollIntoView({ behavior: 'smooth' });
                    }}
                    className="text-sm hover:text-white transition-colors flex items-center gap-2"
                  >
                    <span className="text-primary opacity-50 text-xs">▸</span>
                    {item.title}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Col */}
          <div>
             <h4 className="text-white font-bold mb-6 flex items-center gap-2">
              <div className="w-4 h-1 bg-primary -skew-x-12" />
              Contact Us
            </h4>
            <ul className="flex flex-col gap-4 text-sm text-slate-400">
              <li className="flex items-start gap-3 hover:text-white transition-colors">
                <MapPin size={18} className="text-primary shrink-0 mt-0.5" />
                <span>Bahrain<br/>Serving all regions 24/7</span>
              </li>
              <li className="flex items-center gap-3 hover:text-white transition-colors">
                <Phone size={18} className="text-primary shrink-0" />
                <div className="flex flex-col">
                  <a href="tel:+97335081527">+973 35081527</a>
                  <a href="tel:+97339966710">+973 39966710</a>
                </div>
              </li>
              <li className="flex items-center gap-3 hover:text-white transition-colors">
                <Mail size={18} className="text-primary shrink-0" />
                <a href="mailto:info@masterelevatorbh.com" className="break-all">info@masterelevatorbh.com</a>
              </li>
            </ul>
          </div>

        </div>

        <div className="border-t border-slate-800 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-slate-500">
          <p>© {new Date().getFullYear()} Master Elevator Trading Co. W.L.L. All rights reserved.</p>
          <div className="flex gap-6">
            <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  );
};
