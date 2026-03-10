import { type FC, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Check } from 'lucide-react';
import { Button } from './Button';

interface ProductModalProps {
  isOpen: boolean;
  onClose: () => void;
  product: {
    title: string;
    desc: string;
    fullDesc?: string;
    features?: string[];
    imageUrl?: string;
  } | null;
}

export const ProductModal: FC<ProductModalProps> = ({ isOpen, onClose, product }) => {
  // Prevent background scrolling when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => { document.body.style.overflow = 'unset'; };
  }, [isOpen]);

  if (!product) return null;

  const handleQuoteClick = () => {
    onClose();
    // Use a small timeout to allow modal animation to finish before scrolling
    setTimeout(() => {
      document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
    }, 300);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6 md:p-12">
          
          {/* Backdrop */}
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-secondary/80 backdrop-blur-sm"
          />

          {/* Modal Content */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ type: "spring", duration: 0.5, bounce: 0.2 }}
            className="relative w-full max-w-4xl max-h-[90vh] overflow-y-auto bg-white rounded-3xl shadow-2xl z-10 flex flex-col md:flex-row"
          >
            
            {/* Close Button */}
            <button 
              onClick={onClose}
              className="absolute top-4 right-4 z-20 p-2.5 bg-slate-100/50 hover:bg-slate-200 rounded-full text-slate-500 transition-colors"
            >
              <X size={24} />
            </button>

            {/* Visual Side */}
            <div className="md:w-2/5 bg-slate-100 relative min-h-[250px] md:min-h-full flex items-center justify-center overflow-hidden">
               {product.imageUrl ? (
                 <img src={product.imageUrl} alt={product.title} className="absolute inset-0 w-full h-full object-cover" />
               ) : (
                 <>
                   <div className="absolute inset-0 bg-gradient-to-br from-slate-200 to-slate-100" />
                   <div className="relative z-10 w-32 h-32 bg-primary/10 rounded-full flex items-center justify-center">
                      <span className="text-primary font-bold tracking-widest uppercase opacity-50">
                        MASTER<br/>LIFT
                      </span>
                   </div>
                 </>
               )}
               {/* Accent */}
               <div className="absolute top-0 right-0 w-full h-2 z-20 bg-primary" />
            </div>

            {/* Text Side */}
            <div className="md:w-3/5 p-5 sm:p-8 md:p-12 flex flex-col">
              
              <div className="mb-2 w-12 h-1 bg-primary -skew-x-12" />
              
              <h2 className="text-3xl md:text-4xl font-bold text-secondary mb-4">
                {product.title}
              </h2>
              
              <p className="text-lg text-slate-500 mb-8 leading-relaxed">
                {product.fullDesc || product.desc}
              </p>

              {product.features && (
                <div className="mb-10">
                  <h3 className="text-sm font-bold tracking-widest uppercase text-slate-400 mb-4">
                    Key Specifications
                  </h3>
                  <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {product.features.map((feature, idx) => (
                      <li key={idx} className="flex items-start gap-3">
                        <div className="mt-1 flex-shrink-0 w-5 h-5 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center">
                          <Check size={12} strokeWidth={3} />
                        </div>
                        <span className="text-slate-600 font-medium text-sm leading-tight">
                          {feature}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              <div className="mt-auto pt-6 border-t border-slate-100 flex flex-col sm:flex-row gap-4">
                <Button size="lg" className="w-full sm:w-auto" onClick={handleQuoteClick}>
                  Request Quote
                </Button>
                <Button variant="outline" size="lg" className="w-full sm:w-auto text-slate-600" onClick={onClose}>
                  Back to Catalog
                </Button>
              </div>

            </div>

          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};
