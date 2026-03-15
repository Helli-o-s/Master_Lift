import { useRef, useEffect, useState } from 'react';
import { Activity, ShieldCheck, Zap, Cog } from 'lucide-react';
import { motion } from 'framer-motion';
import { SectionHeading } from '../components/ui/SectionHeading';

// ── Count-up hook (respects prefers-reduced-motion) ──────────────────────────
function useCountUp(target: number, duration = 1800) {
  const [count, setCount] = useState(0);
  const [started, setStarted] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  // Detect reduced-motion preference
  const reducedMotion =
    typeof window !== 'undefined' &&
    window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  // IntersectionObserver — start once in view
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setStarted(true); },
      { threshold: 0.3 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!started) return;
    if (reducedMotion) { setCount(target); return; }

    let startTime: number | null = null;
    const step = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);
      // Ease-out cubic
      const eased = 1 - Math.pow(1 - progress, 3);
      setCount(Math.floor(eased * target));
      if (progress < 1) requestAnimationFrame(step);
      else setCount(target);
    };
    const raf = requestAnimationFrame(step);
    return () => cancelAnimationFrame(raf);
  }, [started, target, duration, reducedMotion]);

  return { count, ref };
}

// ── Feature card ─────────────────────────────────────────────────────────────
const features = [
  {
    icon: <ShieldCheck size={32} aria-hidden="true" />,
    title: '100% Safety Compliance',
    desc: 'Rigorous testing protocols strictly exceeding Bahrain national standards.',
  },
  {
    icon: <Activity size={32} aria-hidden="true" />,
    title: '24/7 Rapid Response',
    desc: 'Emergency diagnostic and dispatch teams continuously available.',
  },
  {
    icon: <Zap size={32} aria-hidden="true" />,
    title: 'Multi-Brand Expertise',
    desc: 'Engineering certification across all major global component brands.',
  },
  {
    icon: <Cog size={32} aria-hidden="true" />,
    title: 'Architectural Integration',
    desc: 'Custom modifications executed to exact architectural blueprints.',
  },
];

// ── Animated metric ───────────────────────────────────────────────────────────
function Metric({
  value,
  suffix,
  label,
  sublabel,
}: {
  value: number;
  suffix: string;
  label: string;
  sublabel: string;
}) {
  const { count, ref } = useCountUp(value, 2000);
  return (
    <div ref={ref} className="flex flex-col items-center text-center">
      <p
        className="text-5xl md:text-6xl font-extrabold text-secondary tabular-nums"
        aria-label={`${value}${suffix} ${label}`}
        style={{ fontVariantNumeric: 'tabular-nums' }}
      >
        {count}
        <span className="text-primary">{suffix}</span>
      </p>
      <p className="mt-2 text-base font-semibold text-secondary uppercase tracking-wider">{label}</p>
      <p className="mt-1 text-xs font-mono text-slate-400 uppercase tracking-widest">{sublabel}</p>
    </div>
  );
}

export const Stats = () => {
  return (
    <section className="py-20 bg-white border-t border-slate-100 content-auto">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">

        {/* Animated Metrics Strip */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.5 }}
          className="grid grid-cols-2 lg:grid-cols-4 gap-10 mb-20 py-12 border border-slate-200 bg-slate-50/60 px-8"
        >
          <Metric value={20} suffix="+" label="Years Experience" sublabel="Founder Expertise" />
          <Metric value={500} suffix="+" label="Units Installed" sublabel="Across Bahrain" />
          <Metric value={24} suffix="/7" label="Response Time" sublabel="Always On-Call" />
          <Metric value={100} suffix="%" label="Safety Focused" sublabel="Zero Compromises" />
        </motion.div>

        {/* Feature Cards */}
        <SectionHeading title="The Safety Audit." subtitle="Factual trust markers establishing our operational superiority." />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ duration: 0.4, delay: idx * 0.08, ease: [0.2, 0, 0, 1] }}
              className="group flex flex-col items-center text-center p-8 border border-slate-200 bg-white hover:border-primary/30 hover:shadow-xl hover:shadow-slate-200/50 hover:-translate-y-1 transition-all duration-300 cursor-default"
            >
              <div
                className="w-16 h-16 bg-slate-50 border border-slate-100 text-primary flex items-center justify-center mb-6 group-hover:bg-primary group-hover:text-white transition-colors duration-300"
                aria-hidden="true"
              >
                {feature.icon}
              </div>
              <h3 className="text-xl font-bold text-secondary mb-3">{feature.title}</h3>
              <p className="text-slate-600 leading-relaxed text-sm">{feature.desc}</p>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
};
