import { Activity, ShieldCheck, Zap, Cog } from 'lucide-react';
import { motion } from 'framer-motion';
import { SectionHeading } from '../components/ui/SectionHeading';

const features = [
  {
    icon: <ShieldCheck size={32} />,
    title: '100% Safety Compliance',
    desc: 'Rigorous testing protocols strictly exceeding Bahrain national standards.'
  },
  {
    icon: <Activity size={32} />,
    title: '24/7 Rapid Response',
    desc: 'Emergency diagnostic and dispatch teams continuously available.'
  },
  {
    icon: <Zap size={32} />,
    title: 'Multi-Brand Expertise',
    desc: 'Engineering certification and diagnostic capability across all major global component brands.'
  },
  {
    icon: <Cog size={32} />,
    title: 'Architectural Integration',
    desc: 'Custom infrastructure modifications executed to exact architectural blueprints.'
  }
];

export const Stats = () => {
  return (
    <section className="py-20 bg-white border-t border-white/5 content-auto">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <SectionHeading title="The Safety Audit." subtitle="Factual trust markers establishing our operational superiority." />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.4, delay: idx * 0.1, ease: [0.2, 0, 0, 1] }}
              className="group flex flex-col items-center text-center p-8 border border-slate-200 bg-white hover:border-primary/30 hover:shadow-xl hover:shadow-slate-200/50 hover:-translate-y-1 transition-all duration-500"
            >
              <div className="w-16 h-16 bg-slate-50 border border-slate-100 rounded-lg text-primary flex items-center justify-center mb-6 group-hover:bg-primary group-hover:text-white transition-colors duration-300">
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
