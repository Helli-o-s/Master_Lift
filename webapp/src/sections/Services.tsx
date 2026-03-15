import { services } from '../constants';
import { motion, useReducedMotion } from 'framer-motion';
import { PenTool, Wrench, RefreshCcw, HardHat, PaintBucket } from 'lucide-react';
import clsx from 'clsx';

const getIconForService = (title: string) => {
  if (title.includes('Maintenance')) return <Wrench size={24} aria-hidden="true" />;
  if (title.includes('Repair')) return <PenTool size={24} aria-hidden="true" />;
  if (title.includes('Modernization')) return <RefreshCcw size={24} aria-hidden="true" />;
  if (title.includes('Installation')) return <HardHat size={24} aria-hidden="true" />;
  if (title.includes('Custom')) return <PaintBucket size={24} aria-hidden="true" />;
  return <Wrench size={24} aria-hidden="true" />;
};

// ── Background — motion-aware; Ken Burns only when motion is allowed ──────────
const VideoFeedBackground = ({ src, delay }: { src: string; delay: number }) => {
  const shouldReduceMotion = useReducedMotion();

  return (
    <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
      {/* Ken Burns pan/zoom — disabled for prefers-reduced-motion */}
      <motion.img
        src={src}
        alt=""
        loading="lazy"
        className="absolute w-[120%] h-[120%] -left-[10%] -top-[10%] object-cover grayscale opacity-30 group-hover:grayscale-0 group-hover:opacity-60 transition-all duration-700 ease-in-out"
        {...(!shouldReduceMotion && {
          animate: { x: ['0%', '-3%', '0%'], y: ['0%', '-3%', '0%'], scale: [1, 1.05, 1] },
          transition: { duration: 25, repeat: Infinity, ease: 'linear', delay },
        })}
      />

      {/* Scanline overlay — purely decorative */}
      <div
        className="absolute inset-0 bg-[linear-gradient(transparent_50%,rgba(0,0,0,0.25)_50%)] bg-[length:100%_4px] opacity-20 mix-blend-overlay"
        aria-hidden="true"
      />

      {/* Laser scan — only on hover, only when motion allowed */}
      {!shouldReduceMotion && (
        <motion.div
          className="absolute left-0 right-0 h-32 bg-gradient-to-b from-transparent via-primary/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700"
          style={{ top: '-100px' }}
          animate={{ y: ['0px', '400px'] }}
          transition={{ duration: 3, repeat: Infinity, ease: 'linear', delay: delay % 2 }}
          aria-hidden="true"
        />
      )}

      {/* "Live" badge — visible on hover only */}
      <div
        className="absolute top-6 right-6 flex items-center gap-2 opacity-0 group-hover:opacity-60 transition-opacity duration-300 z-20"
        aria-hidden="true"
      >
        <span className="w-2 h-2 rounded-none bg-red-500 shadow-[0_0_8px_rgba(239,68,68,0.8)]" />
        <span className="text-[10px] uppercase font-mono tracking-widest text-white drop-shadow-md">
          Live
        </span>
      </div>

      {/* Vignette overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/80 to-transparent" />
      <div className="absolute inset-0 bg-slate-900/20 mix-blend-overlay" />
    </div>
  );
};

export const Services = () => {
  return (
    <section
      id="services"
      className="py-24 md:py-32 bg-secondary text-white relative overflow-hidden content-auto"
    >
      {/* Brand watermark */}
      <div
        className="absolute top-0 right-0 w-2/3 h-full opacity-5 pointer-events-none select-none"
        aria-hidden="true"
      >
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
            {/* Status badge — static dot, no decorative animation */}
            <div className="inline-flex items-center gap-3 px-6 py-2 bg-white/5 border border-white/10 mb-8">
              <span className="w-2 h-2 rounded-none bg-green-500" aria-hidden="true" />
              <span className="font-semibold text-xs tracking-widest text-white/90 uppercase">
                Operational Readiness: Active
              </span>
            </div>
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight mb-8">
              Operational{' '}
              <span className="text-primary italic border-b-4 border-primary/30">Authority.</span>
            </h2>
            <p className="text-slate-400 text-lg leading-relaxed">
              From emergency diagnostic repairs to full-scale vertical modernizations, our engineering
              teams execute with minimal downtime, total compliance, and uncompromising precision.
            </p>
          </motion.div>
        </div>

        {/* Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-8" role="list">
          {services.map((service, index) => {
            const isTopRow = index < 2;
            const lgSpan = isTopRow ? 'lg:col-span-3' : 'lg:col-span-2';
            const mdSpan =
              isTopRow || index === 2 || index === 3 ? 'md:col-span-1' : 'md:col-span-2';

            return (
              <motion.article
                key={service.title}
                role="listitem"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-50px' }}
                transition={{ duration: 0.4, delay: index * 0.08, ease: [0.2, 0, 0, 1] }}
                className={clsx(
                  'group relative overflow-hidden border border-white/10 bg-slate-900/50 min-h-[340px] flex flex-col justify-end p-8 cursor-default shadow-xl hover:border-primary/50 transition-colors duration-300',
                  lgSpan,
                  mdSpan
                )}
              >
                <VideoFeedBackground src={service.imageUrl} delay={index * 2} />

                {/* Top border accent on hover */}
                <div
                  className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-primary to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-10"
                  aria-hidden="true"
                />

                {/* Content */}
                <div className="relative z-10">
                  <div
                    className="w-12 h-12 bg-primary/20 backdrop-blur-md border border-primary/30 text-primary flex items-center justify-center mb-6 group-hover:scale-110 group-hover:bg-primary group-hover:text-white transition-all duration-300"
                    aria-hidden="true"
                  >
                    {getIconForService(service.title)}
                  </div>
                  <h3 className="text-2xl font-bold mb-3 text-white group-hover:text-primary transition-colors duration-300 drop-shadow-md">
                    {service.title}
                  </h3>
                  <p className="text-slate-300 leading-relaxed text-sm md:text-base opacity-80 group-hover:opacity-100 transition-opacity duration-300 line-clamp-3 drop-shadow-sm">
                    {service.desc}
                  </p>
                </div>
              </motion.article>
            );
          })}
        </div>

      </div>
    </section>
  );
};
