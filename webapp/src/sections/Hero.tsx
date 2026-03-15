import { Suspense, useState, useEffect } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Environment, ContactShadows, Lightformer } from '@react-three/drei';
import { ElevatorModel } from '../canvas/ElevatorModel';
import { Button } from '../components/ui/Button';
import { motion, useReducedMotion } from 'framer-motion';
import { Clock, ShieldCheck, Wrench, PhoneCall, MessageCircle, ChevronDown } from 'lucide-react';

export const Hero = () => {
  const [mounted, setMounted] = useState(false);
  const shouldReduceMotion = useReducedMotion();

  useEffect(() => {
    const timer = setTimeout(() => setMounted(true), 100);
    return () => clearTimeout(timer);
  }, []);

  const isMobile = typeof window !== 'undefined' && window.innerWidth < 768;

  const scrollToAbout = () => {
    document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section id="hero" className="relative min-h-screen pt-24 bg-background overflow-hidden flex items-center">
      <div className="max-w-7xl mx-auto px-6 lg:px-12 w-full grid grid-cols-1 lg:grid-cols-2 gap-12 items-center relative z-10">

        {/* Text Area */}
        <motion.div
          className="pt-12 lg:pt-0"
          initial="hidden"
          animate="visible"
          variants={{
            hidden: { opacity: 0 },
            visible: {
              opacity: 1,
              transition: { staggerChildren: 0.2 }
            }
          }}
        >
          <motion.div
            variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } }}
            className="flex items-center gap-3 mb-6"
          >
            <div className="w-8 h-[1px] bg-primary" />
            <span className="text-xs font-bold tracking-widest text-slate-400 uppercase">
              Elevators • Escalators • Travelators • Dumbwaiters • Cradles
            </span>
          </motion.div>

          <motion.h1
            variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } }}
            className="text-5xl md:text-6xl lg:text-7xl font-extrabold text-secondary leading-[1.1] mb-8 tracking-tight"
          >
            The Best Way<br />To <span className="text-primary relative">
              Rise High.
              <svg className="absolute w-full h-3 -bottom-1 left-0 text-primary/20" viewBox="0 0 100 10" preserveAspectRatio="none">
                <path d="M0 5 Q 50 10 100 5" stroke="currentColor" strokeWidth="2" fill="none" />
              </svg>
            </span>
          </motion.h1>

          <motion.p
            variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } }}
            className="text-lg md:text-xl text-slate-600 mb-10 max-w-lg leading-relaxed"
          >
            Mastering vertical mobility in the Kingdom of Bahrain. We engineer safety, speed, and continuous 24/7 technical support.
          </motion.p>

          <motion.div
            variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } }}
            className="flex flex-col sm:flex-row gap-4 mb-10"
          >
            <Button size="lg" className="font-semibold flex items-center justify-center gap-2" onClick={() => window.open('https://wa.me/', '_blank')}>
              <MessageCircle size={18} /> WhatsApp Us
            </Button>
            <Button variant="outline" size="lg" className="flex items-center justify-center gap-2" onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}>
              <PhoneCall size={18} /> Request Service
            </Button>
          </motion.div>

          <motion.div
            variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } }}
            className="grid grid-cols-2 md:grid-cols-4 gap-6 pt-8 border-t border-slate-800/50"
          >
            <div className="flex flex-col gap-1">
              <div className="flex items-center gap-2 text-slate-400 text-sm font-medium">
                <Clock size={16} className="text-primary" /> 24/7 Support
              </div>
              <span className="text-xs text-slate-500 font-mono tracking-wider">BAHRAIN COVERAGE</span>
            </div>
            <div className="flex flex-col gap-1">
              <div className="flex items-center gap-2 text-slate-400 text-sm font-medium">
                <ShieldCheck size={16} className="text-primary" /> 20+ Years
              </div>
              <span className="text-xs text-slate-500 font-mono tracking-wider">FOUNDER EXPERTISE</span>
            </div>
            <div className="flex flex-col gap-1 md:col-span-2">
              <div className="flex items-center gap-2 text-slate-400 text-sm font-medium">
                <Wrench size={16} className="text-primary" /> Full Lifecycle
              </div>
              <span className="text-xs text-slate-500 font-mono tracking-tight">INSTALL • MAINTAIN • REPAIR • MODERNIZE</span>
            </div>
          </motion.div>
        </motion.div>

        {/* 3D Canvas Area */}
        <div className="relative h-[38vh] sm:h-[44vh] lg:h-[80vh] w-full mt-8 lg:mt-0 touch-none rounded-2xl overflow-hidden border border-slate-200 shadow-xl" role="img" aria-label="Interactive 3D elevator model">
          <div className="absolute inset-0 bg-gradient-to-tr from-slate-100 to-transparent opacity-50 pointer-events-none" />
          
          {/* LCP structural placeholder */}
          {!mounted && (
            <div className="absolute inset-0 flex items-center justify-center">
              <img 
                src="/images/elevators.webp" 
                alt="Master Elevator System" 
                fetchPriority="high"
                aria-hidden="true"
                className="w-full h-full object-contain opacity-30 grayscale blur-[2px]"
              />
            </div>
          )}

          {mounted && (
            <Canvas
              camera={{ position: [5, 2, 5], fov: 45 }}
              dpr={isMobile ? 1 : [1, 2]}
              gl={{ antialias: !isMobile, powerPreference: "high-performance" }}
            >
              <ambientLight intensity={0.5} />
              <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} intensity={1} castShadow />
              <pointLight position={[-10, -10, -10]} intensity={0.5} color="#0f172a" />
              <pointLight position={[0, -5, 0]} intensity={2} color="#E60000" distance={10} />

              <Suspense fallback={null}>
                <ElevatorModel />
                <Environment resolution={128}>
                  <group rotation={[-Math.PI / 2, 0, 0]}>
                    <Lightformer intensity={1} rotation-x={Math.PI / 2} position={[0, 5, -9]} scale={[10, 10, 1]} />
                    <Lightformer intensity={0.5} rotation-y={Math.PI / 2} position={[-5, 1, -1]} scale={[20, 0.5, 1]} />
                    <Lightformer intensity={0.5} rotation-y={Math.PI / 2} position={[5, 1, -1]} scale={[20, 0.5, 1]} />
                    <Lightformer intensity={1} rotation-y={-Math.PI / 2} position={[10, 1, 0]} scale={[20, 1, 1]} />
                  </group>
                </Environment>
                <ContactShadows position={[0, -4.5, 0]} opacity={0.4} scale={20} blur={2} far={4.5} />
              </Suspense>

              <OrbitControls
                enableZoom={false}
                enablePan={false}
                minPolarAngle={Math.PI / 4}
                maxPolarAngle={Math.PI / 2}
                autoRotate
                autoRotateSpeed={0.5}
              />
            </Canvas>
          )}
        </div>

      </div>

      {/* Scroll indicator */}
      {!shouldReduceMotion && (
        <motion.button
          onClick={scrollToAbout}
          aria-label="Scroll to About section"
          className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1 text-slate-400 hover:text-primary transition-colors duration-200 cursor-pointer z-10"
          initial={{ opacity: 0, y: -8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.2, duration: 0.6 }}
        >
          <span className="text-[10px] font-mono tracking-widest uppercase">Scroll</span>
          <motion.div
            animate={{ y: [0, 6, 0] }}
            transition={{ duration: 1.6, repeat: Infinity, ease: 'easeInOut' }}
          >
            <ChevronDown size={20} aria-hidden="true" />
          </motion.div>
        </motion.button>
      )}
    </section>
  );
};
