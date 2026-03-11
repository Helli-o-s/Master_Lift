import { SectionHeading } from '../components/ui/SectionHeading';
import { motion } from 'framer-motion';

export const About = () => {
  return (
    <section id="about" className="py-24 md:py-32 bg-secondary relative overflow-hidden content-auto">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">

          {/* Image/Graphic Side */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
            className="relative order-2 lg:order-1"
          >
            {/* Dark technical frame */}
            <div className="absolute -inset-4 bg-secondary rounded-2xl z-0 opacity-5" />

            {/* The Image (placeholder colored block for now, user can swap) */}
            <div className="relative z-10 aspect-[4/5] max-h-[340px] sm:max-h-none bg-slate-200 rounded-2xl overflow-hidden border border-slate-300 shadow-xl group">
              <img
                src="/images/about-new.jpg"
                alt="Master Elevator Profile"
                className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-tr from-secondary/80 via-secondary/20 to-transparent flex items-end p-8">
                <div className="glass-panel text-secondary p-6 rounded-none w-full transition-all duration-300 group-hover:translate-x-2 border border-white/20">
                  <p className="text-4xl font-bold mb-1 border-l-4 border-primary pl-4">20+</p>
                  <p className="text-sm tracking-widest uppercase opacity-90 pl-5">Years of Experience</p>
                </div>
              </div>
            </div>

            {/* Red Accent Graphic */}
            <div className="absolute -bottom-6 -right-6 w-32 h-32 bg-primary/10 rounded-full blur-2xl z-0" />
            <div className="absolute -right-4 top-12 w-2 h-24 bg-primary rounded-none z-20" />
          </motion.div>

          {/* Text Side */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="order-1 lg:order-2"
          >
            <SectionHeading
              title={<span className="text-white">The Architecture of Ascent.</span>}
              alignment="left"
              className="mb-8"
            />

            <div className="space-y-6 text-lg text-slate-300 leading-relaxed mb-10">
              <p>
                Established in 2022 and backed by over two decades of founder expertise, Master Elevator Trading Co. W.L.L. engineers the vertical infrastructure of Bahrain.
              </p>
              <p>
                We do not just install components; we deliver seamless, safe, and entirely reliable vertical journeys. Our technical teams execute precision installations, rigorous maintenance, and complete system modernizations without ever compromising on safety.
              </p>
              <p className="font-medium text-secondary border-l-4 border-primary pl-4 py-2 bg-slate-50">
                Operating 24/7 across the Kingdom of Bahrain. We ensure your systems, and your people, never stop moving.
              </p>
            </div>

            <div className="grid grid-cols-2 gap-6">
              <div className="flex flex-col gap-2">
                <span className="text-3xl font-bold text-primary">24/7</span>
                <span className="text-sm font-semibold text-white uppercase tracking-wider">Service Support</span>
              </div>
              <div className="flex flex-col gap-2">
                <span className="text-3xl font-bold text-primary">100%</span>
                <span className="text-sm font-semibold text-white uppercase tracking-wider">Safety Focused</span>
              </div>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
};
