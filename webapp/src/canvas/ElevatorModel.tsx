import { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import { Group } from 'three';
import { RoundedBox, Cylinder, Sphere } from '@react-three/drei';

// ── Reusable material defs ──────────────────────────────────────────────────
const STEEL   = { color: '#8090a0', metalness: 0.95, roughness: 0.12 };
const DARK    = { color: '#1a2030', metalness: 0.85, roughness: 0.25 };
const RED     = { color: '#E60000', metalness: 0.55, roughness: 0.20 };
const GLASS   = { color: '#aac8e8', metalness: 0.1,  roughness: 0.05, transmission: 0.92, thickness: 0.4, transparent: true, opacity: 0.35 };
const BRASS   = { color: '#c8a855', metalness: 0.9,  roughness: 0.15 };
const CABLE   = { color: '#999999', metalness: 1.0,  roughness: 0.05 };
const FLOOR_M = { color: '#c0c8d0', metalness: 0.6,  roughness: 0.35 };
const INNER_W = { color: '#f0f2f4', metalness: 0.2,  roughness: 0.7  };
const DOOR_M  = { color: '#b0bac5', metalness: 0.92, roughness: 0.1  };

export const ElevatorModel = () => {
  const groupRef   = useRef<Group>(null);
  const doorLRef   = useRef<Group>(null);
  const doorRRef   = useRef<Group>(null);
  const motorRef   = useRef<Group>(null);
  const cwtRef     = useRef<Group>(null);

  // Door animation: open ↔ close cycle
  const doorPhase = useRef(0);

  useFrame((state, delta) => {
    const t = state.clock.elapsedTime;

    // Gentle floating of whole cabin
    if (groupRef.current) {
      groupRef.current.position.y = Math.sin(t * 0.45) * 0.12;
      groupRef.current.rotation.y = Math.sin(t * 0.18) * 0.04;
    }

    // Door open/close every ~5 s
    doorPhase.current = (doorPhase.current + delta * 0.2) % (Math.PI * 2);
    const doorOpen = Math.max(0, Math.sin(doorPhase.current)) * 0.55;
    if (doorLRef.current) doorLRef.current.position.x = -doorOpen;
    if (doorRRef.current) doorRRef.current.position.x =  doorOpen;

    // Motor sheave spinning
    if (motorRef.current) motorRef.current.rotation.z -= delta * 0.9;

    // Counterweight moving opposite to cabin float
    if (cwtRef.current) {
      cwtRef.current.position.y = -Math.sin(t * 0.45) * 0.12;
    }
  });

  // Pre-compute cable positions
  const cableXZ = useMemo(() => [
    [-0.28, -0.28], [-0.28, 0.28], [0.28, -0.28], [0.28, 0.28]
  ] as [number,number][], []);

  return (
    <group ref={groupRef}>

      {/* ── SHAFT WALLS (translucent, behind cabin) ─────────── */}
      {[[ 0, 0, -1.7], [ 0, 0,  1.7], [-1.7, 0, 0], [ 1.7, 0, 0]].map(([x,y,z], i) => (
        <mesh key={i} position={[x as number, y as number, z as number]}>
          <boxGeometry args={[i < 2 ? 3.4 : 0.06, 10, i < 2 ? 0.06 : 3.4]} />
          <meshStandardMaterial color="#c8cdd5" metalness={0.1} roughness={0.9} transparent opacity={0.10} />
        </mesh>
      ))}

      {/* Shaft horizontal ribs */}
      {[-3.5, -1.5, 0.5, 2.5].map((y, i) => (
        <mesh key={i} position={[0, y, 0]}>
          <boxGeometry args={[3.4, 0.06, 3.4]} />
          <meshStandardMaterial color="#b0b8c4" metalness={0.5} roughness={0.5} transparent opacity={0.15} />
        </mesh>
      ))}

      {/* ── GUIDE RAILS (T-section, both sides) ──────────────── */}
      {([-1.35, 1.35] as number[]).map((x, i) => (
        <group key={i} position={[x, 0, 0]}>
          {/* Web */}
          <mesh><boxGeometry args={[0.06, 10, 0.14]} /><meshStandardMaterial {...DARK} /></mesh>
          {/* Flange */}
          <mesh position={[x > 0 ? 0.05 : -0.05, 0, 0]}>
            <boxGeometry args={[0.04, 10, 0.32]} /><meshStandardMaterial {...DARK} />
          </mesh>
          {/* Bracket clips every 2 units */}
          {[-3, -1, 1, 3].map((y, j) => (
            <mesh key={j} position={[x > 0 ? 0.17 : -0.17, y, 0]}>
              <boxGeometry args={[0.28, 0.1, 0.28]} /><meshStandardMaterial {...STEEL} />
            </mesh>
          ))}
        </group>
      ))}

      {/* ── CABIN STRUCTURE ──────────────────────────────────── */}
      {/* Floor */}
      <mesh position={[0, -1.5, 0]}>
        <boxGeometry args={[2.1, 0.08, 2.1]} />
        <meshStandardMaterial {...FLOOR_M} />
      </mesh>
      {/* Floor edge trim (red stripe) */}
      <mesh position={[0, -1.43, 0]}>
        <boxGeometry args={[2.12, 0.04, 2.12]} />
        <meshStandardMaterial {...RED} />
      </mesh>

      {/* Ceiling */}
      <mesh position={[0, 1.5, 0]}>
        <boxGeometry args={[2.1, 0.08, 2.1]} />
        <meshStandardMaterial {...STEEL} />
      </mesh>

      {/* Corner posts (4) */}
      {([-0.96, 0.96] as number[]).flatMap(x =>
        ([-0.96, 0.96] as number[]).map((z, i) => (
          <mesh key={`${x}${z}`} position={[x, 0, z]}>
            <boxGeometry args={[0.08, 3.08, 0.08]} />
            <meshStandardMaterial {...STEEL} />
          </mesh>
        ))
      )}

      {/* Horizontal frame rails top & bottom */}
      {([-1.47, 1.47] as number[]).flatMap(y =>
        [
          <mesh key={`ht${y}f`} position={[0, y, -0.96]}><boxGeometry args={[1.92, 0.07, 0.07]} /><meshStandardMaterial {...STEEL} /></mesh>,
          <mesh key={`ht${y}b`} position={[0, y,  0.96]}><boxGeometry args={[1.92, 0.07, 0.07]} /><meshStandardMaterial {...STEEL} /></mesh>,
          <mesh key={`ht${y}l`} position={[-0.96, y, 0]}><boxGeometry args={[0.07, 0.07, 1.92]} /><meshStandardMaterial {...STEEL} /></mesh>,
          <mesh key={`ht${y}r`} position={[0.96, y, 0]}><boxGeometry args={[0.07, 0.07, 1.92]} /><meshStandardMaterial {...STEEL} /></mesh>,
        ]
      )}

      {/* Glass side walls (3 sides — front is door opening) */}
      {/* Back */}
      <mesh position={[0, 0, -0.97]}>
        <boxGeometry args={[1.88, 2.95, 0.04]} />
        <meshPhysicalMaterial {...GLASS} />
      </mesh>
      {/* Left */}
      <mesh position={[-0.97, 0, 0]}>
        <boxGeometry args={[0.04, 2.95, 1.88]} />
        <meshPhysicalMaterial {...GLASS} />
      </mesh>
      {/* Right */}
      <mesh position={[0.97, 0, 0]}>
        <boxGeometry args={[0.04, 2.95, 1.88]} />
        <meshPhysicalMaterial {...GLASS} />
      </mesh>

      {/* Interior back wall panel */}
      <mesh position={[0, 0, -0.93]}>
        <boxGeometry args={[1.70, 2.85, 0.02]} />
        <meshStandardMaterial {...INNER_W} />
      </mesh>
      {/* Interior chair rail (decorative stripe) */}
      <mesh position={[0, -0.35, -0.92]}>
        <boxGeometry args={[1.70, 0.06, 0.02]} />
        <meshStandardMaterial {...BRASS} />
      </mesh>
      {/* Handrail (back) */}
      <mesh position={[0, 0.0, -0.91]}>
        <boxGeometry args={[1.50, 0.05, 0.05]} />
        <meshStandardMaterial {...BRASS} />
      </mesh>

      {/* ── SLIDING DOORS (front face, Z+ side) ──────────────── */}
      <group ref={doorLRef} position={[-0.48, 0, 0.98]}>
        <RoundedBox args={[0.94, 2.94, 0.05]} radius={0.01}>
          <meshStandardMaterial {...DOOR_M} />
        </RoundedBox>
        {/* Door handle */}
        <mesh position={[0.45, 0, 0.03]}>
          <boxGeometry args={[0.03, 0.28, 0.03]} />
          <meshStandardMaterial {...BRASS} />
        </mesh>
        {/* Door seam line */}
        <mesh position={[0.47, 0, 0.02]}>
          <boxGeometry args={[0.006, 2.94, 0.008]} />
          <meshStandardMaterial color="#606878" metalness={0.5} roughness={0.3} />
        </mesh>
      </group>
      <group ref={doorRRef} position={[0.48, 0, 0.98]}>
        <RoundedBox args={[0.94, 2.94, 0.05]} radius={0.01}>
          <meshStandardMaterial {...DOOR_M} />
        </RoundedBox>
        <mesh position={[-0.45, 0, 0.03]}>
          <boxGeometry args={[0.03, 0.28, 0.03]} />
          <meshStandardMaterial {...BRASS} />
        </mesh>
        <mesh position={[-0.47, 0, 0.02]}>
          <boxGeometry args={[0.006, 2.94, 0.008]} />
          <meshStandardMaterial color="#606878" metalness={0.5} roughness={0.3} />
        </mesh>
      </group>

      {/* Door frame (sill / header) */}
      <mesh position={[0, 1.55, 0.97]}>
        <boxGeometry args={[2.05, 0.12, 0.08]} />
        <meshStandardMaterial {...STEEL} />
      </mesh>
      <mesh position={[0, -1.55, 0.97]}>
        <boxGeometry args={[2.05, 0.12, 0.08]} />
        <meshStandardMaterial {...STEEL} />
      </mesh>

      {/* ── CONTROL PANEL (right inner wall) ─────────────────── */}
      <group position={[0.92, -0.1, 0]}>
        {/* Panel face */}
        <mesh>
          <boxGeometry args={[0.04, 1.3, 0.45]} />
          <meshStandardMaterial color="#1c2330" metalness={0.9} roughness={0.1} />
        </mesh>
        {/* Display screen */}
        <mesh position={[0.03, 0.43, 0]}>
          <planeGeometry args={[0.28, 0.12]} />
          <meshBasicMaterial color="#00e5ff" />
        </mesh>
        {/* Floor buttons (8 small circles) */}
        {[...Array(8)].map((_, i) => {
          const row = Math.floor(i / 2);
          const col = (i % 2) - 0.5;
          return (
            <mesh key={i} position={[0.026, 0.24 - row * 0.14, col * 0.16]}>
              <cylinderGeometry args={[0.025, 0.025, 0.02, 12]} />
              <meshStandardMaterial color={i === 3 ? '#E60000' : '#c8a855'} metalness={0.8} roughness={0.2} />
            </mesh>
          );
        })}
        {/* Emergency button */}
        <mesh position={[0.026, -0.48, 0]}>
          <cylinderGeometry args={[0.035, 0.035, 0.02, 16]} />
          <meshStandardMaterial color="#E60000" metalness={0.8} roughness={0.2} />
        </mesh>
      </group>

      {/* ── CEILING LIGHTS (LED strips) ──────────────────────── */}
      {[-0.6, 0, 0.6].map((z, i) => (
        <mesh key={i} position={[0, 1.47, z]}>
          <boxGeometry args={[1.5, 0.025, 0.08]} />
          <meshBasicMaterial color="#e8f0ff" />
        </mesh>
      ))}

      {/* ── SUSPENSION ASSEMBLY ──────────────────────────────── */}
      {/* Cross-head beam */}
      <mesh position={[0, 1.65, 0]}>
        <boxGeometry args={[1.9, 0.1, 0.12]} />
        <meshStandardMaterial {...STEEL} />
      </mesh>
      <mesh position={[0, 1.65, 0]}>
        <boxGeometry args={[0.12, 0.1, 1.9]} />
        <meshStandardMaterial {...STEEL} />
      </mesh>
      {/* Hitch point */}
      <mesh position={[0, 1.82, 0]}>
        <cylinderGeometry args={[0.1, 0.1, 0.24, 16]} />
        <meshStandardMaterial {...STEEL} />
      </mesh>

      {/* Hoist cables */}
      {cableXZ.map(([x, z], i) => (
        <mesh key={i} position={[x, 4.2, z]}>
          <cylinderGeometry args={[0.018, 0.018, 5.0, 8]} />
          <meshStandardMaterial {...CABLE} />
        </mesh>
      ))}

      {/* ── MOTOR ROOM (top) ─────────────────────────────────── */}
      <group position={[0, 6.8, 0]}>
        {/* Machine beam */}
        <mesh>
          <boxGeometry args={[2.4, 0.22, 0.5]} />
          <meshStandardMaterial {...DARK} />
        </mesh>
        {/* Traction sheave (motor wheel) */}
        <group ref={motorRef} position={[0, 0.2, 0]} rotation={[0, 0, 0]}>
          <mesh rotation={[Math.PI / 2, 0, 0]}>
            <cylinderGeometry args={[0.42, 0.42, 0.22, 32]} />
            <meshStandardMaterial {...DARK} />
          </mesh>
          {/* Groove ring */}
          <mesh rotation={[Math.PI / 2, 0, 0]}>
            <torusGeometry args={[0.38, 0.03, 8, 32]} />
            <meshStandardMaterial {...STEEL} />
          </mesh>
          {/* Spokes */}
          {[0,1,2,3,4,5].map(i => (
            <mesh key={i} rotation={[Math.PI/2, 0, (i/6)*Math.PI*2]}>
              <boxGeometry args={[0.03, 0.76, 0.04]} />
              <meshStandardMaterial {...STEEL} />
            </mesh>
          ))}
        </group>
        {/* Motor housing */}
        <mesh position={[0.9, 0.18, 0]}>
          <boxGeometry args={[0.9, 0.5, 0.48]} />
          <meshStandardMaterial {...DARK} />
        </mesh>
        {/* Fan cover */}
        <mesh position={[1.36, 0.18, 0]} rotation={[0, 0, Math.PI / 2]}>
          <cylinderGeometry args={[0.22, 0.22, 0.06, 24]} />
          <meshStandardMaterial color="#2a3444" metalness={0.8} roughness={0.3} />
        </mesh>
        {/* Control cabinet */}
        <mesh position={[-1.1, 0.3, 0]}>
          <boxGeometry args={[0.5, 0.8, 0.46]} />
          <meshStandardMaterial color="#2e3d50" metalness={0.7} roughness={0.3} />
        </mesh>
        <mesh position={[-1.05, 0.45, 0.24]}>
          <planeGeometry args={[0.28, 0.35]} />
          <meshBasicMaterial color="#223366" />
        </mesh>
      </group>

      {/* ── COUNTERWEIGHT ────────────────────────────────────── */}
      <group ref={cwtRef} position={[1.55, -1.0, 0]}>
        {/* Main CWT frame */}
        <mesh>
          <boxGeometry args={[0.28, 2.2, 0.28]} />
          <meshStandardMaterial {...DARK} />
        </mesh>
        {/* Filler blocks */}
        {[-0.75, -0.35, 0.05, 0.45, 0.85].map((y, i) => (
          <mesh key={i} position={[0, y, 0]}>
            <boxGeometry args={[0.22, 0.28, 0.22]} />
            <meshStandardMaterial color="#4a5568" metalness={0.6} roughness={0.4} />
          </mesh>
        ))}
        {/* CWT cables */}
        {([-0.06, 0.06] as number[]).map((x, i) => (
          <mesh key={i} position={[x, 4.8, 0]}>
            <cylinderGeometry args={[0.016, 0.016, 5.8, 8]} />
            <meshStandardMaterial {...CABLE} />
          </mesh>
        ))}
      </group>

      {/* ── BUFFER SPRINGS (pit, bottom) ─────────────────────── */}
      {([-0.5, 0.5] as number[]).map((x, i) => (
        <group key={i} position={[x, -5.8, 0]}>
          <mesh><cylinderGeometry args={[0.12, 0.12, 0.7, 16]} /><meshStandardMaterial color="#556070" metalness={0.6} roughness={0.4} /></mesh>
          <mesh position={[0, 0.5, 0]}><torusGeometry args={[0.1, 0.035, 8, 20]} /><meshStandardMaterial {...STEEL} /></mesh>
          <mesh position={[0, 0.65, 0]}><torusGeometry args={[0.1, 0.035, 8, 20]} /><meshStandardMaterial {...STEEL} /></mesh>
          <mesh position={[0, 0.80, 0]}><torusGeometry args={[0.1, 0.035, 8, 20]} /><meshStandardMaterial {...STEEL} /></mesh>
        </group>
      ))}

      {/* ── FLOOR INDICATOR PANEL (above door exterior) ────── */}
      <group position={[0, 1.85, 1.02]}>
        <mesh>
          <boxGeometry args={[0.5, 0.22, 0.03]} />
          <meshStandardMaterial color="#111827" metalness={0.9} roughness={0.1} />
        </mesh>
        {/* Arrow up lit */}
        <mesh position={[-0.08, 0.0, 0.018]}>
          <cylinderGeometry args={[0.005, 0.015, 0.06, 3]} />
          <meshBasicMaterial color="#00ff88" />
        </mesh>
        {/* Digital floor number */}
        <mesh position={[0.06, 0, 0.018]}>
          <planeGeometry args={[0.2, 0.14]} />
          <meshBasicMaterial color="#00cfaa" />
        </mesh>
      </group>

    </group>
  );
};
