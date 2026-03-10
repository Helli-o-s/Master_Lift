import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { Group, Mesh } from 'three';
import { Cylinder } from '@react-three/drei';

// ── Material presets ────────────────────────────────────────────────────────
const DARK_METAL  = { color: '#111827', metalness: 0.85, roughness: 0.3 };
const STEEL       = { color: '#a0b0c0', metalness: 0.95, roughness: 0.2 };
const BRUSHED_ALU = { color: '#cfd8dc', metalness: 0.8, roughness: 0.4 };
const BRAND_RED   = { color: '#E60000', metalness: 0.5, roughness: 0.2, clearcoat: 1.0 };
const BRAND_NAVY  = { color: '#0f172a', metalness: 0.6, roughness: 0.4 };
const GLASS       = { color: '#1e293b', transparent: true, opacity: 0.4, metalness: 0.9, roughness: 0.1 };
const ROPE_STEEL  = { color: '#808890', metalness: 1.0, roughness: 0.4 };

export const TechShowcase = () => {
  const mainAssemRef = useRef<Group>(null);
  const cabRef       = useRef<Group>(null);
  const leftDoorRef  = useRef<Mesh>(null);
  const rightDoorRef = useRef<Mesh>(null);
  const sheaveRef    = useRef<Group>(null);
  const copLightRef  = useRef<Mesh>(null);

  useFrame((state) => {
    const t = state.clock.elapsedTime;

    // 1. Overall Assembly Sway (Very subtle architectural hum)
    if (mainAssemRef.current) {
      mainAssemRef.current.rotation.y = Math.sin(t * 0.1) * 0.1 + 0.3;
    }

    // 2. Elevator Motion Cycle (Travel up, stop, open doors, close doors, travel down)
    const cycleTime = 12; // 12 second total cycle
    const phase = t % cycleTime;
    
    let cabY = 0;
    let doorOpenProgress = 0;
    let sheaveRotation = 0;

    if (phase < 4) {
      // Phase 1: Going UP (0 to 4s)
      const progress = phase / 4;
      // Smooth step easing
      const ease = progress * progress * (3 - 2 * progress);
      cabY = -2 + ease * 4; // Travel from -2 to +2
      sheaveRotation = ease * Math.PI * 4;
    } else if (phase < 6) {
      // Phase 2: Stopped at Top, Doors Opening (4 to 6s)
      cabY = 2;
      const progress = (phase - 4) / 2;
      // Open doors (max open is 0.45 units)
      doorOpenProgress = Math.min(progress * 1.5, 1) * 0.45;
    } else if (phase < 8) {
      // Phase 3: Stopped at Top, Doors Closing (6 to 8s)
      cabY = 2;
      const progress = (phase - 6) / 2;
      doorOpenProgress = Math.max(1 - (progress * 1.5), 0) * 0.45;
    } else if (phase < 12) {
      // Phase 4: Going DOWN (8 to 12s)
      const progress = (phase - 8) / 4;
      const ease = progress * progress * (3 - 2 * progress);
      cabY = 2 - ease * 4;
      sheaveRotation = (1 - ease) * Math.PI * 4;
    }

    // Apply Cab Position
    if (cabRef.current) cabRef.current.position.y = cabY;

    // Apply Door Positions
    if (leftDoorRef.current) leftDoorRef.current.position.x = -0.22 - doorOpenProgress;
    if (rightDoorRef.current) rightDoorRef.current.position.x = 0.22 + doorOpenProgress;

    // Apply Drive Sheave Rotation
    if (sheaveRef.current) sheaveRef.current.rotation.z = -sheaveRotation;

    // Pulse COP Light when doors are open
    if (copLightRef.current) {
      if (doorOpenProgress > 0.1) {
        // Copied the red brand color into an emissive pulse
        const pulse = (Math.sin(t * 8) + 1) / 2;
        (copLightRef.current.material as any).emissiveIntensity = 0.5 + pulse * 2.5;
      } else {
        (copLightRef.current.material as any).emissiveIntensity = 0.2;
      }
    }
  });

  return (
    <group ref={mainAssemRef} scale={1.2}>

      {/* ══════════════════════════════════════════════════════
          THE SHAFT INFRASTRUCTURE (Guide Rails & Brackets)
      ══════════════════════════════════════════════════════ */}
      <group position={[0, 0, 0]}>
        {/* Main T-Rails (Left & Right) */}
        <mesh position={[-1.1, 0, 0]}>
          <boxGeometry args={[0.08, 10, 0.12]} />
          <meshStandardMaterial {...STEEL} />
        </mesh>
        <mesh position={[1.1, 0, 0]}>
          <boxGeometry args={[0.08, 10, 0.12]} />
          <meshStandardMaterial {...STEEL} />
        </mesh>

        {/* Rail Brackets (Wall Tie-ins) */}
        {[-4, -2, 0, 2, 4].map((y, i) => (
          <group key={`bracket-${i}`} position={[0, y, -0.6]}>
            <mesh position={[-1.1, 0, 0.3]}>
              <boxGeometry args={[0.15, 0.3, 0.6]} />
              <meshStandardMaterial {...DARK_METAL} />
            </mesh>
            <mesh position={[1.1, 0, 0.3]}>
              <boxGeometry args={[0.15, 0.3, 0.6]} />
              <meshStandardMaterial {...DARK_METAL} />
            </mesh>
          </group>
        ))}

        {/* Pit Buffer Springs (Bottom) */}
        <group position={[0, -4.5, 0]}>
          <mesh position={[0, -0.2, 0]}>
            <boxGeometry args={[1.5, 0.2, 1.5]} />
            <meshStandardMaterial {...DARK_METAL} />
          </mesh>
          {[-0.5, 0.5].map((x, i) => (
            <group key={`buffer-${i}`} position={[x, 0.2, 0]}>
              <Cylinder args={[0.1, 0.1, 0.6, 16]}>
                <meshStandardMaterial {...BRAND_RED} />
              </Cylinder>
              <Cylinder args={[0.12, 0.12, 0.05, 16]} position={[0, 0.3, 0]}>
                <meshStandardMaterial color="#222" roughness={0.9} />
              </Cylinder>
            </group>
          ))}
        </group>
      </group>


      {/* ══════════════════════════════════════════════════════
          THE CABIN (Passenger Experience & Custom Interiors)
      ══════════════════════════════════════════════════════ */}
      <group ref={cabRef}>
        {/* Sling / Frame (The structural steel holding the cab) */}
        <mesh position={[0, -1.05, 0]}>
          <boxGeometry args={[2.0, 0.1, 1.6]} />
          <meshStandardMaterial {...DARK_METAL} />
        </mesh>
        <mesh position={[0, 1.05, 0]}>
          <boxGeometry args={[2.0, 0.1, 1.6]} />
          <meshStandardMaterial {...DARK_METAL} />
        </mesh>
        {/* Side Stiles */}
        <mesh position={[-0.95, 0, 0]}>
          <boxGeometry args={[0.1, 2.0, 1.6]} />
          <meshStandardMaterial {...DARK_METAL} />
        </mesh>
        <mesh position={[0.95, 0, 0]}>
          <boxGeometry args={[0.1, 2.0, 1.6]} />
          <meshStandardMaterial {...DARK_METAL} />
        </mesh>

        {/* Roller Guides (Shoes riding the rails) */}
        {[-1.0, 1.0].map((y) => (
          <group key={`rollers-${y}`} position={[0, y, 0]}>
            <mesh position={[-1.05, 0, 0]}>
              <boxGeometry args={[0.15, 0.2, 0.2]} />
              <meshStandardMaterial {...BRAND_RED} />
            </mesh>
            <mesh position={[1.05, 0, 0]}>
              <boxGeometry args={[0.15, 0.2, 0.2]} />
              <meshStandardMaterial {...BRAND_RED} />
            </mesh>
          </group>
        ))}

        {/* The Glass Cab Shell */}
        <mesh position={[0, 0, 0.05]}>
          <boxGeometry args={[1.8, 2.0, 1.4]} />
          <meshPhysicalMaterial {...GLASS} />
        </mesh>

        {/* Cab Interior Back Wall (Custom Panel) */}
        <mesh position={[0, 0, -0.64]}>
          <boxGeometry args={[1.78, 1.98, 0.02]} />
          <meshStandardMaterial {...BRAND_NAVY} />
        </mesh>

        {/* Handrail */}
        <mesh position={[0, -0.1, -0.6]} rotation={[0, 0, Math.PI/2]}>
          <cylinderGeometry args={[0.02, 0.02, 1.6, 12]} />
          <meshStandardMaterial {...BRUSHED_ALU} />
        </mesh>

        {/* Interior Lighting (Ceiling panel) */}
        <mesh position={[0, 0.98, 0.05]} rotation={[Math.PI/2, 0, 0]}>
          <planeGeometry args={[1.5, 1.0]} />
          <meshStandardMaterial color="#ffffff" emissive="#ffffff" emissiveIntensity={1.5} />
        </mesh>
        <pointLight position={[0, 0.8, 0]} intensity={1.5} color="#e0f2fe" distance={3} />

        {/* Control Operating Panel (COP) */}
        <group position={[0.6, 0.1, -0.62]}>
          <mesh>
            <boxGeometry args={[0.2, 1.2, 0.02]} />
            <meshStandardMaterial {...BRUSHED_ALU} />
          </mesh>
          {/* LCD Screen on COP */}
          <mesh position={[0, 0.45, 0.015]}>
            <planeGeometry args={[0.12, 0.15]} />
            <meshStandardMaterial color="#000" emissive="#0284c7" emissiveIntensity={0.8} />
          </mesh>
          {/* Floor Buttons (Glowing) */}
          {[0.2, 0.05, -0.1, -0.25, -0.4].map((y, i) => (
            <mesh key={`btn-${i}`} position={[0, y, 0.015]} ref={i === 0 ? copLightRef : undefined} rotation={[Math.PI/2, 0, 0]}>
              <cylinderGeometry args={[0.015, 0.015, 0.01, 16]} />
              <meshStandardMaterial 
                color="#ffffff" 
                emissive={i === 0 ? "#E60000" : "#ffffff"} 
                emissiveIntensity={i === 0 ? 0.2 : 0.5} 
              />
            </mesh>
          ))}
        </group>

        {/* The Sliding Doors (Front face) */}
        <group position={[0, 0, 0.74]}>
          {/* Left Door */}
          <mesh ref={leftDoorRef} position={[-0.22, 0, 0]}>
            <boxGeometry args={[0.45, 1.98, 0.03]} />
            <meshStandardMaterial {...BRUSHED_ALU} />
          </mesh>
          {/* Right Door */}
          <mesh ref={rightDoorRef} position={[0.22, 0, 0]}>
            <boxGeometry args={[0.45, 1.98, 0.03]} />
            <meshStandardMaterial {...BRUSHED_ALU} />
          </mesh>
          {/* Header/Track */}
          <mesh position={[0, 1.0, 0]}>
            <boxGeometry args={[1.8, 0.1, 0.05]} />
            <meshStandardMaterial {...DARK_METAL} />
          </mesh>
        </group>
      </group>


      {/* ══════════════════════════════════════════════════════
          MACHINE ROOM / HEADROOM (Drive, Ropes, Controller)
      ══════════════════════════════════════════════════════ */}
      <group position={[0, 3.8, 0]}>
        
        {/* Support Steel Bedplate */}
        <mesh position={[0, -0.2, 0]}>
          <boxGeometry args={[2.5, 0.15, 1.5]} />
          <meshStandardMaterial {...DARK_METAL} />
        </mesh>

        {/* Modernization Controller Cabinet (The Brains) */}
        <group position={[0.8, 0.6, -0.4]} rotation={[0, -0.2, 0]}>
          <mesh>
            <boxGeometry args={[0.6, 1.4, 0.3]} />
            <meshStandardMaterial color="#cbd5e1" metalness={0.4} roughness={0.3} />
          </mesh>
          <mesh position={[0, 0, 0.16]}>
            <boxGeometry args={[0.5, 1.3, 0.02]} />
            <meshStandardMaterial color="#f1f5f9" />
          </mesh>
          {/* Diagnostic Display */}
          <mesh position={[0, 0.4, 0.18]}>
            <planeGeometry args={[0.3, 0.2]} />
            <meshStandardMaterial color="#000" emissive="#10b981" emissiveIntensity={1.2} />
          </mesh>
          {/* Red/Blue status lights */}
          <mesh position={[-0.1, 0.1, 0.18]}>
            <sphereGeometry args={[0.02]} />
            <meshBasicMaterial color="#ef4444" />
          </mesh>
          <mesh position={[0.1, 0.1, 0.18]}>
            <sphereGeometry args={[0.02]} />
            <meshBasicMaterial color="#3b82f6" />
          </mesh>
          {/* Brand Plate */}
          <mesh position={[0, -0.4, 0.18]}>
            <boxGeometry args={[0.2, 0.08, 0.01]} />
            <meshStandardMaterial {...BRAND_RED} />
          </mesh>
        </group>

        {/* Gearless Traction Machine (Simplified representation) */}
        <group position={[-0.4, 0.3, 0]}>
          {/* Motor Body */}
          <Cylinder args={[0.25, 0.25, 0.6, 32]} rotation={[Math.PI/2, 0, 0]}>
            <meshStandardMaterial {...BRAND_NAVY} />
          </Cylinder>
          {/* Brake Arms */}
          <mesh position={[0, 0.3, 0]}>
            <boxGeometry args={[0.4, 0.1, 0.3]} />
            <meshStandardMaterial {...STEEL} />
          </mesh>
          {/* Traction Sheave */}
          <group ref={sheaveRef} position={[0, 0, 0.35]}>
            <Cylinder args={[0.35, 0.35, 0.1, 32]} rotation={[Math.PI/2, 0, 0]}>
              <meshStandardMaterial {...STEEL} />
            </Cylinder>
            {[-0.03, 0, 0.03].map((z, i) => (
              <Cylinder key={`groove-${i}`} args={[0.36, 0.36, 0.005, 32]} position={[0, 0, z]} rotation={[Math.PI/2, 0, 0]}>
                <meshStandardMaterial color="#222" />
              </Cylinder>
            ))}
          </group>
        </group>

        {/* ══════════════════════════════════════════════════════
            SUSPENSION ROPES (Connecting Cab to Machine)
        ══════════════════════════════════════════════════════ */}
        <group position={[-0.4, 0, 0]}>
          {[-0.03, 0, 0.03].map((z, i) => (
            <group key={`rope-${i}`}>
              {/* Rope going down to Cab */}
              <mesh position={[0.35, -2.5, 0.35 + z]}>
                <cylinderGeometry args={[0.005, 0.005, 5, 8]} />
                <meshStandardMaterial {...ROPE_STEEL} />
              </mesh>
              {/* Rope wrapping over sheave */}
              <mesh position={[0, 0.3, 0.35 + z]} rotation={[0, 0, Math.PI/2]}>
                <cylinderGeometry args={[0.005, 0.005, 0.7, 8]} />
                <meshStandardMaterial {...ROPE_STEEL} />
              </mesh>
              {/* Rope going down to Counterweight (Back shaft) */}
              <mesh position={[-0.35, -2.5, 0.35 + z]}>
                <cylinderGeometry args={[0.005, 0.005, 5, 8]} />
                <meshStandardMaterial {...ROPE_STEEL} />
              </mesh>
            </group>
          ))}
        </group>
      </group>

    </group>
  );
};
