import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { Group } from 'three';
import { RoundedBox } from '@react-three/drei';

export const ElevatorModel = () => {
  const groupRef = useRef<Group>(null);

  useFrame((state) => {
    if (!groupRef.current) return;
    // Gentle floating effect to simulate suspended cabin
    groupRef.current.position.y = Math.sin(state.clock.elapsedTime * 0.5) * 0.1;
  });

  const glassMaterialProps = {
    color: '#ffffff',
    metalness: 0.9,
    roughness: 0.1,
    transmission: 0.9,
    thickness: 0.5,
    transparent: true,
    opacity: 0.6
  };

  const metalMaterialProps = {
    color: '#333333',
    metalness: 0.8,
    roughness: 0.2
  };

  return (
    <group ref={groupRef}>
      {/* Outer Inner Cabin Glass Box */}
      <mesh castShadow receiveShadow>
        <boxGeometry args={[1.9, 2.9, 1.9]} />
        <meshPhysicalMaterial {...glassMaterialProps} />
      </mesh>
      
      {/* Outer Metal Frame Outline using RoundedBox */}
      <RoundedBox args={[2.0, 3.0, 2.0]} radius={0.05} >
        <meshPhysicalMaterial 
            color="#1e293b" 
            metalness={0.9} 
            roughness={0.1}
            transmission={0.4}
            thickness={0.5} 
            opacity={0.3} 
            transparent 
            wireframe={true}
        />
      </RoundedBox>

      {/* Frame Posts (corners) */}
      <mesh position={[-0.95, 0, -0.95]}><boxGeometry args={[0.1, 3, 0.1]} /><meshStandardMaterial {...metalMaterialProps} /></mesh>
      <mesh position={[0.95, 0, -0.95]}><boxGeometry args={[0.1, 3, 0.1]} /><meshStandardMaterial {...metalMaterialProps} /></mesh>
      <mesh position={[-0.95, 0, 0.95]}><boxGeometry args={[0.1, 3, 0.1]} /><meshStandardMaterial {...metalMaterialProps} /></mesh>
      <mesh position={[0.95, 0, 0.95]}><boxGeometry args={[0.1, 3, 0.1]} /><meshStandardMaterial {...metalMaterialProps} /></mesh>

      {/* Base/Floor */}
      <mesh position={[0, -1.45, 0]}>
        <boxGeometry args={[2.1, 0.1, 2.1]} />
        <meshStandardMaterial color="#E60000" metalness={0.4} roughness={0.3} />
      </mesh>
      
      {/* Ceiling/Roof */}
      <mesh position={[0, 1.45, 0]}>
        <boxGeometry args={[2.1, 0.1, 2.1]} />
        <meshStandardMaterial {...metalMaterialProps} />
      </mesh>

      {/* Control Panel inside */}
      <mesh position={[0.8, -0.2, 0]}>
        <boxGeometry args={[0.1, 1.2, 0.4]} />
        <meshStandardMaterial color="#222222" metalness={0.9} roughness={0.1} />
      </mesh>
      
      {/* Little screen emitting light */}
      <mesh position={[0.86, 0.2, 0]} rotation={[0, Math.PI / 2, 0]}>
        <planeGeometry args={[0.2, 0.1]} />
        <meshBasicMaterial color="#00ffcc" />
      </mesh>
      
      {/* Cabin Lights on Ceiling */}
      <mesh position={[-0.5, 1.39, 0]} rotation={[Math.PI / 2, 0, 0]}>
        <circleGeometry args={[0.2, 32]} />
        <meshBasicMaterial color="#ffffff" />
      </mesh>
      <mesh position={[0.5, 1.39, 0]} rotation={[Math.PI / 2, 0, 0]}>
        <circleGeometry args={[0.2, 32]} />
        <meshBasicMaterial color="#ffffff" />
      </mesh>

      {/* Guide Rails */}
      <mesh position={[-1.2, 0, 0]}>
        <boxGeometry args={[0.1, 8, 0.2]} />
        <meshStandardMaterial color="#1a1a1a" metalness={0.7} roughness={0.4} />
      </mesh>
      <mesh position={[1.2, 0, 0]}>
        <boxGeometry args={[0.1, 8, 0.2]} />
        <meshStandardMaterial color="#1a1a1a" metalness={0.7} roughness={0.4} />
      </mesh>
      
      {/* Support Brackets for rails */}
      <mesh position={[-1.2, 2, 0]}><boxGeometry args={[0.3, 0.1, 0.3]} /><meshStandardMaterial {...metalMaterialProps} /></mesh>
      <mesh position={[1.2, 2, 0]}><boxGeometry args={[0.3, 0.1, 0.3]} /><meshStandardMaterial {...metalMaterialProps} /></mesh>
      <mesh position={[-1.2, -2, 0]}><boxGeometry args={[0.3, 0.1, 0.3]} /><meshStandardMaterial {...metalMaterialProps} /></mesh>
      <mesh position={[1.2, -2, 0]}><boxGeometry args={[0.3, 0.1, 0.3]} /><meshStandardMaterial {...metalMaterialProps} /></mesh>

      {/* Suspension Cables */}
      <mesh position={[-0.2, 2.5, 0]}>
        <cylinderGeometry args={[0.02, 0.02, 2]} />
        <meshStandardMaterial color="#888888" metalness={1} roughness={0} />
      </mesh>
      <mesh position={[0.2, 2.5, 0]}>
        <cylinderGeometry args={[0.02, 0.02, 2]} />
        <meshStandardMaterial color="#888888" metalness={1} roughness={0} />
      </mesh>
      
      {/* Top Motor Gear Assembly (simplified representation) */}
      <mesh position={[0, 3.5, 0]} rotation={[0, 0, Math.PI / 2]}>
        <cylinderGeometry args={[0.4, 0.4, 0.3, 16]} />
        <meshStandardMaterial color="#1f2937" metalness={0.8} roughness={0.5} />
      </mesh>
      
      {/* Motor Shaft */}
      <mesh position={[0, 3.5, 0]}>
        <boxGeometry args={[1, 0.1, 0.1]} />
        <meshStandardMaterial color="#475569" metalness={0.6} roughness={0.4} />
      </mesh>
    </group>
  );
};
