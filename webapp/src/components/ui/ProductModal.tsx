import { type FC, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Check } from 'lucide-react';
import { Dialog } from '@headlessui/react';
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
    setTimeout(() => {
      document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
    }, 300);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <Dialog 
          static
          as={motion.div}
          open={isOpen} 
          onClose={onClose} 
          className="relative z-[100]"
        >
          {/* Backdrop */}
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 bg-secondary/90 backdrop-blur-md"
            aria-hidden="true"
          />

          <div className="fixed inset-0 overflow-y-auto w-screen">
            <div className="flex min-h-full items-center justify-center p-4 sm:p-6 md:p-12">
              
              <Dialog.Panel className="w-full max-w-5xl">
                <motion.div 
                  initial={{ opacity: 0, scale: 0.98, y: 10 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.98, y: 10 }}
                  transition={{ duration: 0.4, ease: [0.2, 0, 0, 1] }}
                  className="relative w-full flex flex-col md:flex-row bg-white border border-slate-200 shadow-2xl overflow-hidden rounded-2xl"
                >
                  
                {/* Close Button */}
                <button 
                  onClick={onClose}
                  className="absolute top-4 right-4 z-20 p-2 text-slate-400 hover:text-primary transition-colors duration-200 bg-white/80 backdrop-blur-sm border border-slate-200 rounded-lg shadow-sm hover:shadow-md"
                >
                  <X size={20} />
                </button>

                {/* Visual Side */}
                <div className="md:w-1/3 shrink-0 h-[200px] sm:h-[250px] md:h-auto md:min-h-[400px] relative bg-slate-100 border-b md:border-b-0 md:border-r border-slate-200">
                   {product.imageUrl ? (
                     <img src={product.imageUrl} alt={product.title} className="absolute inset-0 w-full h-full object-cover" />
                   ) : (
                     <div className="absolute inset-0 bg-slate-200 flex flex-col items-center justify-center">
                        <div className="w-16 h-16 border border-slate-300 rounded-none mb-4" />
                        <span className="text-[10px] font-mono tracking-widest text-slate-400 uppercase">SYS_VISUAL_PENDING</span>
                     </div>
                   )}
                   {/* Technical Overlay */}
                   <div className="absolute top-0 right-0 p-4 w-full flex justify-between items-start pointer-events-none z-10">
                     <div className="bg-black/60 backdrop-blur-md px-3 py-1.5 border border-white/10 text-[10px] font-mono tracking-widest text-white uppercase">
                       SPEC_SHEET_REF
                     </div>
                   </div>
                   {/* 1px grid corner accents */}
                   <div className="absolute top-4 left-4 w-4 h-4 border-t border-l border-primary/50" />
                   <div className="absolute bottom-4 right-4 w-4 h-4 border-b border-r border-primary/50" />
                </div>

                {/* Text Side */}
                <div className="md:w-2/3 p-6 sm:p-8 md:p-12 flex flex-col bg-white">
                  
                  <div className="flex items-center gap-3 mb-6 shrink-0">
                    <div className="w-8 h-[1px] bg-primary" />
                    <span className="text-[10px] font-bold tracking-widest text-slate-400 uppercase">
                      Hardware Specification
                    </span>
                  </div>
                  
                  <Dialog.Title className="text-3xl font-bold text-secondary mb-4 tracking-tight">
                    {product.title}
                  </Dialog.Title>
                  
                  <p className="text-base text-slate-600 mb-8 leading-relaxed">
                    {product.fullDesc || product.desc}
                  </p>

                  {product.features && (
                    <div className="mb-10 flex-grow">
                      <div className="border-b border-slate-200 pb-2 mb-4">
                        <h3 className="text-[10px] font-bold tracking-widest uppercase text-slate-400">
                          System Capabilities
                        </h3>
                      </div>
                      <ul className="space-y-3">
                        {product.features.map((feature, idx) => (
                          <li key={idx} className="flex items-start gap-3 group">
                            <div className="mt-1 flex-shrink-0 text-primary opacity-80 group-hover:opacity-100 transition-opacity">
                              <Check size={14} strokeWidth={2.5} />
                            </div>
                            <span className="text-slate-600 text-sm leading-relaxed">
                              {feature}
                            </span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                  <div className="mt-auto pt-6 border-t border-slate-100 flex flex-col sm:flex-row gap-4">
                    <Button size="lg" className="w-full sm:w-auto font-semibold uppercase tracking-wider text-sm" onClick={handleQuoteClick}>
                      Request Dispatch
                    </Button>
                    <Button variant="outline" size="lg" className="w-full sm:w-auto text-slate-500 hover:text-secondary uppercase tracking-wider text-sm font-semibold border-slate-300" onClick={onClose}>
                      Cancel
                    </Button>
                  </div>

                </div>
                </motion.div>
              </Dialog.Panel>
            </div>
          </div>
        </Dialog>
      )}
    </AnimatePresence>
  );
};
