import { services } from '../constants';
import { motion } from 'framer-motion';
import { CheckCircle2 } from 'lucide-react';

export const Services = () => {
  return (
    <section id="services" className="py-32 bg-secondary text-white relative overflow-hidden">
      {/* Background Decorative Geometry */}
      <div className="absolute top-0 right-0 w-1/2 h-full opacity-5 pointer-events-none">
        <svg viewBox="0 0 100 100" preserveAspectRatio="none" className="w-full h-full fill-white">
          <polygon points="100,0 100,100 0,100" />
        </svg>
      </div>

      <div className="max-w-7xl mx-auto px-6 lg:px-12 relative z-10">
        <div className="lg:flex lg:gap-24">
          
          {/* Sticky Left Column */}
          <div className="lg:w-1/3 mb-16 lg:mb-0">
            <div className="sticky top-32">
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
              >
                <div className="w-12 h-1 bg-primary -skew-x-12 mb-6" />
                <h2 className="text-4xl md:text-5xl font-bold tracking-tight mb-6">Our Services.</h2>
                <p className="text-slate-400 text-lg leading-relaxed mb-8">
                  From emergency repairs to full-scale modernizations, our specialized engineering team guarantees minimal downtime and maximum safety compliance.
                </p>
                <div className="inline-flex items-center gap-3 px-6 py-3 bg-white/5 border border-white/10 rounded-xl">
                  <span className="w-3 h-3 rounded-full bg-green-500 animate-pulse" />
                  <span className="font-semibold text-sm tracking-widest text-white/90">24/7 DISPATCH READY</span>
                </div>
              </motion.div>
            </div>
          </div>

          {/* Scrolling Right Column (List) */}
          <div className="lg:w-2/3 space-y-6">
            {services.map((service, index) => (
              <motion.div 
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="group relative overflow-hidden rounded-2xl bg-white/5 border border-white/10 hover:bg-white/10 transition-colors cursor-default"
              >
                {/* Background Image (faded & masked) */}
                <div className="absolute inset-0 z-0 opacity-20 group-hover:opacity-40 transition-opacity duration-500">
                  <img 
                    src={service.imageUrl} 
                    alt={service.title} 
                    className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700 mix-blend-overlay scale-100 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-r from-secondary via-secondary/70 to-transparent" />
                </div>

                {/* Content */}
                <div className="relative z-10 flex flex-col md:flex-row items-start md:items-center gap-6 p-8">
                  <div className="md:mt-0 mt-1 bg-primary/20 text-primary p-3 rounded-xl shrink-0 transition-transform duration-300 group-hover:scale-110">
                    <CheckCircle2 size={24} />
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold mb-3">{service.title}</h3>
                    <p className="text-slate-300 leading-relaxed text-lg max-w-xl">
                      {service.desc}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

        </div>
      </div>
    </section>
  );
};
