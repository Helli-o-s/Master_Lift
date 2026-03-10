import { Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { Environment, ContactShadows } from '@react-three/drei';
import { TechShowcase } from '../canvas/TechShowcase';

export const R3FShowcase = () => {
  return (
    <section className="py-24 bg-secondary text-white relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 lg:px-12 relative z-10">
        
        <div className="text-center md:text-left mb-12">
          <div className="w-12 h-1 bg-primary -skew-x-12 mx-auto md:mx-0 mb-6" />
          <h2 className="text-4xl md:text-5xl font-bold tracking-tight mb-4">
            Precision Engineered.
          </h2>
          <p className="text-slate-400 text-lg max-w-2xl mx-auto md:mx-0">
            Every component inspected. Every installation verified.
          </p>
        </div>

        <div className="w-full h-[40vh] md:h-[50vh] bg-slate-900/50 rounded-3xl border border-white/10 overflow-hidden relative">
          
          {/* Subtle background glow */}
          <div className="absolute inset-0 bg-gradient-radial from-primary/10 to-transparent pointer-events-none" />

          <Canvas camera={{ position: [0, 2, 5], fov: 45 }}>
            <ambientLight intensity={0.5} />
            <spotLight position={[5, 10, 5]} intensity={1} angle={0.5} penumbra={1} castShadow />
            <pointLight position={[-5, -5, -5]} intensity={0.5} color="#E60000" />
            
            <Suspense fallback={null}>
              <TechShowcase />
              <Environment preset="city" />
              <ContactShadows position={[0, -2, 0]} opacity={0.6} scale={10} blur={2.5} far={4} color="#000000" />
            </Suspense>
          </Canvas>
          
        </div>

      </div>
    </section>
  );
};
