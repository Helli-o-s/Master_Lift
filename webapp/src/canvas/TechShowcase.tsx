import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { Group } from 'three';
import { Cylinder, Torus, Box } from '@react-three/drei';

export const TechShowcase = () => {
  const groupRef = useRef<Group>(null);
  const ringRef = useRef<Group>(null);
  const planetRef = useRef<Group>(null);

  useFrame((state, delta) => {
    if (!groupRef.current || !ringRef.current || !planetRef.current) return;
    
    // Core rotation
    const time = state.clock.elapsedTime;
    groupRef.current.rotation.x = Math.sin(time * 0.3) * 0.15;
    groupRef.current.position.y = Math.sin(time * 0.8) * 0.05;

    // Gear mechanics
    ringRef.current.rotation.y += delta * 0.2;
    planetRef.current.rotation.y -= delta * 0.5;
  });

  const chromeMaterial = { color: '#ffffff', metalness: 1, roughness: 0.05 };
  const darkMetal = { color: '#111827', metalness: 0.8, roughness: 0.3 };
  const masterRed = { color: '#E60000', metalness: 0.5, roughness: 0.2, clearcoat: 1 };

  return (
    <group ref={groupRef} scale={1.2}>
      
      {/* Outer Housing Ring */}
      <group ref={ringRef}>
        <Torus args={[1.6, 0.15, 32, 64]} rotation={[Math.PI / 2, 0, 0]}>
          <meshStandardMaterial {...darkMetal} />
        </Torus>
        {/* Teeth / Outer ridges */}
        {[...Array(16)].map((_, i) => (
          <Box key={i} args={[0.4, 0.3, 0.1]} position={[Math.cos((i / 16) * Math.PI * 2) * 1.6, 0, Math.sin((i / 16) * Math.PI * 2) * 1.6]} rotation={[0, -(i / 16) * Math.PI * 2, 0]}>
            <meshStandardMaterial {...darkMetal} />
          </Box>
        ))}
      </group>

      {/* Internal Planetary Gears */}
      <group ref={planetRef}>
        {/* Sun Gear (Center) */}
        <Cylinder args={[0.6, 0.6, 0.8, 32]}>
          <meshStandardMaterial {...masterRed} />
        </Cylinder>
        <Cylinder args={[0.65, 0.65, 0.2, 32]} position={[0, 0.45, 0]}>
          <meshStandardMaterial {...chromeMaterial} />
        </Cylinder>
        <Cylinder args={[0.65, 0.65, 0.2, 32]} position={[0, -0.45, 0]}>
          <meshStandardMaterial {...chromeMaterial} />
        </Cylinder>

        {/* Planet Gears */}
        {[0, 1, 2].map((i) => {
          const angle = (i / 3) * Math.PI * 2;
          return (
            <group key={i} position={[Math.cos(angle) * 1.1, 0, Math.sin(angle) * 1.1]}>
              <Cylinder args={[0.4, 0.4, 0.6, 24]}>
                <meshStandardMaterial {...chromeMaterial} />
              </Cylinder>
              <Cylinder args={[0.1, 0.1, 0.9, 16]}>
                <meshStandardMaterial {...darkMetal} />
              </Cylinder>
            </group>
          );
        })}
      </group>

      {/* Center Shaft / Axle */}
      <Cylinder args={[0.15, 0.15, 4, 16]} rotation={[Math.PI / 2, 0, 0]}>
        <meshStandardMaterial {...chromeMaterial} />
      </Cylinder>

      {/* Shaft brackets */}
      <Box args={[0.8, 0.8, 0.2]} position={[0, 0, 1.8]}>
        <meshStandardMaterial {...darkMetal} />
      </Box>
      <Box args={[0.8, 0.8, 0.2]} position={[0, 0, -1.8]}>
        <meshStandardMaterial {...darkMetal} />
      </Box>

    </group>
  );
};
