import { Suspense, useRef, useState } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Environment, ContactShadows } from '@react-three/drei';
import { TechShowcase } from '../canvas/TechShowcase';
import { motion } from 'framer-motion';
import { ShieldCheck, Wrench, Cpu, TrendingUp, RotateCcw } from 'lucide-react';

const FEATURES = [
  {
    icon: Cpu,
    title: 'Gearless Traction Drives',
    desc: 'Permanent magnet motors with precision sheaves for smooth, virtually silent movement.',
  },
  {
    icon: ShieldCheck,
    title: 'ISO-Compliant Safety',
    desc: 'EN 81-20 / EN 81-50 certified components tested to the latest international standards.',
  },
  {
    icon: Wrench,
    title: '24 / 7 Preventive Maintenance',
    desc: 'Scheduled inspections and remote diagnostics before issues can develop.',
  },
  {
    icon: TrendingUp,
    title: 'Modernization Ready',
    desc: 'Smart controllers, IoT connectivity and energy-efficient drives retrofitted to any shaft.',
  },
];

export const R3FShowcase = () => {
  const [autoRotate, setAutoRotate] = useState(true);
  const controlsRef = useRef<{ reset: () => void } | null>(null);

  return (
    <section className="py-16 md:py-24 lg:py-28 bg-secondary text-white relative overflow-hidden">

      {/* Ambient background decorations */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-0 w-[600px] h-[600px] bg-primary/5 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2" />
        <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-primary/5 rounded-full blur-3xl translate-x-1/3 translate-y-1/3" />
        {/* Dotted grid */}
        <svg className="absolute inset-0 w-full h-full opacity-[0.035]" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
              <circle cx="1" cy="1" r="1" fill="white" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#grid)" />
        </svg>
      </div>

      <div className="max-w-7xl mx-auto px-6 lg:px-12 relative z-10">

        {/* ── Section header ──────────────────────────────── */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-16"
        >
          <div className="flex items-center gap-4 mb-4">
            <div className="w-10 h-[3px] bg-primary -skew-x-12" />
            <span className="text-primary font-semibold tracking-widest text-xs uppercase">Engineering Excellence</span>
          </div>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight max-w-2xl leading-tight">
            Precision<br />
            <span className="text-primary">Engineered.</span>
          </h2>
          <p className="text-slate-400 text-lg mt-4 max-w-xl leading-relaxed">
            Every component inspected. Every installation verified. Drag the model to explore the real machine inside your building.
          </p>
        </motion.div>

        {/* ── Two-column grid ─────────────────────────────── */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">

          {/* LEFT — feature callouts */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="space-y-5 order-2 lg:order-1"
          >
            {FEATURES.map((f, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="group flex gap-5 p-5 rounded-2xl bg-white/5 border border-white/10 hover:bg-white/10 hover:border-primary/30 transition-all duration-300"
              >
                <div className="shrink-0 w-12 h-12 rounded-xl bg-primary/15 text-primary flex items-center justify-center group-hover:bg-primary/25 transition-colors">
                  <f.icon size={22} />
                </div>
                <div>
                  <h3 className="font-bold text-lg mb-1 text-white">{f.title}</h3>
                  <p className="text-slate-400 text-sm leading-relaxed group-hover:text-slate-300 transition-colors">{f.desc}</p>
                </div>
              </motion.div>
            ))}

            {/* Stats row */}
            <div className="flex flex-wrap gap-x-8 gap-y-4 pt-4 pl-2">
              {[['20+', 'Years expertise'], ['500+', 'Units installed'], ['24/7', 'Response team']].map(([val, label]) => (
                <div key={label}>
                  <p className="text-3xl font-bold text-primary">{val}</p>
                  <p className="text-xs text-slate-400 uppercase tracking-wider mt-1">{label}</p>
                </div>
              ))}
            </div>
          </motion.div>

          {/* RIGHT — interactive 3D canvas */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="relative order-1 lg:order-2"
          >
            {/* Canvas container */}
            <div className="relative w-full h-[300px] sm:h-[380px] md:h-[440px] lg:h-[520px] bg-slate-900/60 rounded-3xl border border-white/10 overflow-hidden shadow-2xl">

              {/* Radial glow behind model */}
              <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_rgba(230,0,0,0.12)_0%,_transparent_70%)] pointer-events-none" />

              <Canvas camera={{ position: [0, 1.5, 6], fov: 42 }}>
                <ambientLight intensity={0.4} />
                <spotLight position={[6, 10, 6]} intensity={2.2} angle={0.4} penumbra={1} castShadow />
                <spotLight position={[-6, 4, -4]} intensity={0.8} angle={0.6} penumbra={1} color="#4488cc" />
                <pointLight position={[0, -3, 4]} intensity={0.9} color="#E60000" />

                <Suspense fallback={null}>
                  <TechShowcase />
                  <Environment preset="city" />
                  <ContactShadows position={[0, -2, 0]} opacity={0.7} scale={14} blur={3} far={5} color="#000000" />
                </Suspense>

                <OrbitControls
                  ref={controlsRef as any}
                  autoRotate={autoRotate}
                  autoRotateSpeed={1.0}
                  enablePan={false}
                  minDistance={3}
                  maxDistance={10}
                  minPolarAngle={Math.PI / 6}
                  maxPolarAngle={Math.PI / 1.8}
                  onStart={() => setAutoRotate(false)}
                />
              </Canvas>

              {/* Drag hint badge */}
              <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex items-center gap-2 px-4 py-2 bg-black/40 backdrop-blur-md border border-white/10 rounded-full text-xs text-white/70 pointer-events-none select-none">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M8 3H5a2 2 0 0 0-2 2v3m18 0V5a2 2 0 0 0-2-2h-3m0 18h3a2 2 0 0 0 2-2v-3M3 16v3a2 2 0 0 0 2 2h3" />
                </svg>
                <span className="hidden sm:inline">Drag to rotate · Scroll to zoom</span>
                <span className="sm:hidden">Drag · Zoom</span>
              </div>

              {/* Auto-rotate reset button (appears after user interacts) */}
              {!autoRotate && (
                <button
                  onClick={() => { setAutoRotate(true); }}
                  className="absolute top-4 right-4 flex items-center gap-2 px-3 py-1.5 bg-black/50 hover:bg-primary/80 backdrop-blur-sm border border-white/15 rounded-full text-xs text-white/80 hover:text-white transition-all duration-200"
                >
                  <RotateCcw size={13} />
                  Auto-rotate
                </button>
              )}

              {/* Corner accent lines */}
              <div className="absolute top-0 left-0 w-8 h-8 border-t-2 border-l-2 border-primary/60 rounded-tl-3xl pointer-events-none" />
              <div className="absolute top-0 right-0 w-8 h-8 border-t-2 border-r-2 border-primary/60 rounded-tr-3xl pointer-events-none" />
              <div className="absolute bottom-0 left-0 w-8 h-8 border-b-2 border-l-2 border-primary/60 rounded-bl-3xl pointer-events-none" />
              <div className="absolute bottom-0 right-0 w-8 h-8 border-b-2 border-r-2 border-primary/60 rounded-br-3xl pointer-events-none" />
            </div>

            {/* Caption below canvas */}
            <p className="text-center text-slate-500 text-xs mt-4 tracking-wide uppercase">
              Gearless Traction Machine · Interactive Model
            </p>
          </motion.div>

        </div>
      </div>
    </section>
  );
};
