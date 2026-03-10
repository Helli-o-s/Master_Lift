import { services } from '../constants';
import { motion } from 'framer-motion';
import { PenTool, Wrench, RefreshCcw, HardHat, PaintBucket } from 'lucide-react';
import clsx from 'clsx';

// Map service titles to specific icons
const getIconForService = (title: string) => {
  if (title.includes('Maintenance')) return <Wrench size={24} />;
  if (title.includes('Repair')) return <PenTool size={24} />;
  if (title.includes('Modernization')) return <RefreshCcw size={24} />;
  if (title.includes('Installation')) return <HardHat size={24} />;
  if (title.includes('Custom')) return <PaintBucket size={24} />;
  return <Wrench size={24} />;
};

export const Services = () => {
  return (
    <section id="services" className="py-24 md:py-32 bg-secondary text-white relative overflow-hidden">
      
      {/* Brand Watermark / Graphic */}
      <div className="absolute top-0 right-0 w-2/3 h-full opacity-5 pointer-events-none select-none">
        <svg viewBox="0 0 100 100" preserveAspectRatio="none" className="w-full h-full fill-white">
          <polygon points="100,0 100,100 0,100" />
        </svg>
      </div>

      <div className="max-w-7xl mx-auto px-6 lg:px-12 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 md:mb-24">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div className="inline-flex items-center gap-3 px-6 py-2 bg-white/5 border border-white/10 rounded-full mb-8">
              <span className="w-2.5 h-2.5 rounded-full bg-green-500 animate-pulse" />
              <span className="font-semibold text-xs tracking-widest text-white/90 uppercase">24/7 Dispatch Ready</span>
            </div>
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight mb-8">
              Engineered <span className="text-primary italic border-b-4 border-primary/30">Excellence.</span>
            </h2>
            <p className="text-slate-400 text-lg leading-relaxed">
              From emergency repairs to full-scale vertical modernizations, our specialized engineering team guarantees minimal downtime and maximum safety compliance.
            </p>
          </motion.div>
        </div>

        {/* Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-6">
          {services.map((service, index) => {
            // Dynamic span logic for the 5 items
            // Top row: item 0 (col-span-3), item 1 (col-span-3)
            // Bottom row: item 2 (col-span-2), item 3 (col-span-2), item 4 (col-span-2)
            const isTopRow = index < 2;
            const lgSpan = isTopRow ? 'lg:col-span-3' : 'lg:col-span-2';
            const mdSpan = isTopRow || index === 2 || index === 3 ? 'md:col-span-1' : 'md:col-span-2';
            
            return (
              <motion.div
                key={service.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className={clsx(
                  "group relative overflow-hidden rounded-3xl border border-white/10 bg-slate-900/50 min-h-[300px] flex flex-col justify-end p-8 cursor-default",
                  lgSpan, mdSpan
                )}
              >
                {/* Background Image (faded & masked) */}
                <div className="absolute inset-0 z-0">
                  <img 
                    src={service.imageUrl} 
                    alt={service.title} 
                    className="w-full h-full object-cover grayscale opacity-30 group-hover:grayscale-0 group-hover:opacity-60 transition-all duration-700 ease-in-out scale-100 group-hover:scale-110"
                  />
                  {/* Subtle Gradient Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/80 to-transparent" />
                </div>

                {/* Animated Top Border Accent */}
                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-primary to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                {/* Content */}
                <div className="relative z-10">
                  <div className="w-12 h-12 rounded-2xl bg-primary/20 backdrop-blur-md border border-primary/30 text-primary flex items-center justify-center mb-6 group-hover:scale-110 group-hover:bg-primary group-hover:text-white transition-all duration-300">
                    {getIconForService(service.title)}
                  </div>
                  <h3 className="text-2xl font-bold mb-3 text-white group-hover:text-primary transition-colors duration-300">
                    {service.title}
                  </h3>
                  <p className="text-slate-300 leading-relaxed text-sm md:text-base opacity-80 group-hover:opacity-100 transition-opacity duration-300 line-clamp-3">
                    {service.desc}
                  </p>
                </div>
                
              </motion.div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
