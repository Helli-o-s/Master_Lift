import { Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Environment, ContactShadows } from '@react-three/drei';
import { ElevatorModel } from '../canvas/ElevatorModel';
import { Button } from '../components/ui/Button';
import { motion } from 'framer-motion';

export const Hero = () => {
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
            <div className="w-8 h-1 bg-primary -skew-x-12" />
            <span className="text-sm font-bold tracking-widest text-slate-500 uppercase">Engineered for Excellence</span>
          </motion.div>
          
          <motion.h1 
            variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } }}
            className="text-5xl md:text-6xl lg:text-7xl font-extrabold text-secondary leading-[1.1] mb-8 tracking-tight"
          >
            The Best Way<br/>To <span className="text-primary relative">
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
            Premium vertical mobility solutions in Bahrain. We deliver safety, speed, and continuous 24/7 technical support.
          </motion.p>
          
          <motion.div 
            variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } }}
            className="flex flex-col sm:flex-row gap-4"
          >
            <Button size="lg" onClick={() => document.getElementById('products')?.scrollIntoView({ behavior: 'smooth' })}>
              Explore Solutions
            </Button>
            <Button variant="outline" size="lg" onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}>
              Request Service
            </Button>
          </motion.div>
        </motion.div>

        {/* 3D Canvas Area */}
        <div className="relative h-[38vh] sm:h-[44vh] lg:h-[80vh] w-full mt-8 lg:mt-0 touch-none">
          <div className="absolute inset-0 bg-gradient-to-tr from-slate-100 to-transparent rounded-[2rem] rounded-bl-[6rem] opacity-50 pointer-events-none" />
          
          <Canvas camera={{ position: [5, 2, 5], fov: 45 }}>
            <ambientLight intensity={0.5} />
            <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} intensity={1} castShadow />
            <pointLight position={[-10, -10, -10]} intensity={0.5} color="#0f172a" />
            <pointLight position={[0, -5, 0]} intensity={2} color="#E60000" distance={10} />
            
            <Suspense fallback={null}>
              <ElevatorModel />
              <Environment preset="city" />
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
        </div>

      </div>
    </section>
  );
};
