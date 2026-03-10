import { Activity, ShieldCheck, Zap, Cog } from 'lucide-react';
import { motion } from 'framer-motion';
import { SectionHeading } from '../components/ui/SectionHeading';

const features = [
  {
    icon: <ShieldCheck size={32} />,
    title: '100% Safety Compliance',
    desc: 'Rigorous testing exceeding Bahrain national standards.'
  },
  {
    icon: <Activity size={32} />,
    title: '24/7 Rapid Response',
    desc: 'Emergency standby teams ready to dispatch immediately.'
  },
  {
    icon: <Zap size={32} />,
    title: 'Multi-Brand Expertise',
    desc: 'Engineers certified across all major global elevator brands.'
  },
  {
    icon: <Cog size={32} />,
    title: 'Seamless Integrations',
    desc: 'Custom cab designs fitted perfectly to your architectural vision.'
  }
];

export const Stats = () => {
  return (
    <section className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <SectionHeading title="Why Master Elevator?" subtitle="Our commitment to engineering excellence sets us apart." />
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, idx) => (
            <motion.div 
              key={idx}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.4, delay: idx * 0.1 }}
              className="flex flex-col items-center text-center p-6 border border-slate-100 rounded-2xl bg-slate-50 hover:bg-white hover:shadow-xl hover:-translate-y-1 transition-all"
            >
              <div className="w-16 h-16 bg-primary/10 text-primary rounded-full flex items-center justify-center mb-6">
                {feature.icon}
              </div>
              <h3 className="text-xl font-bold text-secondary mb-3">{feature.title}</h3>
              <p className="text-slate-600 leading-relaxed text-sm">
                {feature.desc}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
