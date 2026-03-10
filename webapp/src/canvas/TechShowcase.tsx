import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { Group } from 'three';
import { Cylinder, Torus } from '@react-three/drei';

// ── Material presets ────────────────────────────────────────────────────────
const DARK    = { color: '#111827', metalness: 0.88, roughness: 0.25 };
const STEEL   = { color: '#a0b0c0', metalness: 0.95, roughness: 0.08 };
const RED     = { color: '#E60000', metalness: 0.55, roughness: 0.20, clearcoat: 1.0 };
const BRASS   = { color: '#c8a855', metalness: 0.90, roughness: 0.15 };

const RUBBER  = { color: '#22252a', metalness: 0.05, roughness: 0.85 };
const BOLT    = { color: '#606878', metalness: 0.80, roughness: 0.30 };

/** Helper: array of evenly-spaced angles */
const angleArr = (n: number) => [...Array(n)].map((_, i) => (i / n) * Math.PI * 2);

export const TechShowcase = () => {
  const groupRef    = useRef<Group>(null);
  const sheaveRef   = useRef<Group>(null);
  const armRef      = useRef<Group>(null);

  const fanRef      = useRef<Group>(null);

  useFrame((state, delta) => {
    const t = state.clock.elapsedTime;

    // Gentle whole-assembly sway
    if (groupRef.current) {
      groupRef.current.rotation.y = Math.sin(t * 0.22) * 0.18 + 0.4;
      groupRef.current.position.y = Math.sin(t * 0.55) * 0.04;
    }

    // Sheave (main wheel) rotates
    if (sheaveRef.current) sheaveRef.current.rotation.z -= delta * 0.65;

    // Brake arm oscillates slightly
    if (armRef.current) armRef.current.rotation.z = Math.sin(t * 1.2) * 0.04;



    // Fan spins fast
    if (fanRef.current) fanRef.current.rotation.z -= delta * 5.0;
  });

  return (
    <group ref={groupRef} scale={1.1}>

      {/* ══════════════════════════════════════════════════════
          BASEPLATE / MACHINE BEDPLATE
      ══════════════════════════════════════════════════════ */}
      <mesh position={[0, -1.35, 0]}>
        <boxGeometry args={[4.4, 0.16, 1.6]} />
        <meshStandardMaterial {...DARK} />
      </mesh>
      {/* Anti-vibration pads */}
      {([-1.8, 0, 1.8] as number[]).flatMap(x =>
        ([-0.65, 0.65] as number[]).map((z, _i) => (
          <mesh key={`${x}${z}`} position={[x, -1.44, z]}>
            <boxGeometry args={[0.28, 0.1, 0.22]} />
            <meshStandardMaterial {...RUBBER} />
          </mesh>
        ))
      )}
      {/* Anchor bolts */}
      {([-2.0, -0.9, 0.9, 2.0] as number[]).flatMap(x =>
        ([-0.62, 0.62] as number[]).map((z) => (
          <mesh key={`bolt${x}${z}`} position={[x, -1.27, z]}>
            <cylinderGeometry args={[0.04, 0.04, 0.22, 8]} />
            <meshStandardMaterial {...BOLT} />
          </mesh>
        ))
      )}

      {/* ══════════════════════════════════════════════════════
          MOTOR STATOR HOUSING (the large cylindrical body)
      ══════════════════════════════════════════════════════ */}
      <group position={[-0.8, 0, 0]}>
        {/* Main stator drum */}
        <Cylinder args={[0.72, 0.78, 1.55, 48]} rotation={[0, 0, Math.PI / 2]}>
          <meshStandardMaterial {...DARK} />
        </Cylinder>
        {/* End cap – brake side */}
        <Cylinder args={[0.72, 0.72, 0.09, 48]} position={[0.82, 0, 0]} rotation={[0, 0, Math.PI / 2]}>
          <meshStandardMaterial {...DARK} />
        </Cylinder>
        {/* End cap – gearbox side */}
        <Cylinder args={[0.72, 0.72, 0.09, 48]} position={[-0.82, 0, 0]} rotation={[0, 0, Math.PI / 2]}>
          <meshStandardMaterial {...DARK} />
        </Cylinder>
        {/* Cooling fins (8 ribs) */}
        {angleArr(8).map((a, i) => (
          <mesh key={i} position={[0, Math.sin(a) * 0.8, Math.cos(a) * 0.8]} rotation={[a, 0, 0]}>
            <boxGeometry args={[1.55, 0.06, 0.12]} />
            <meshStandardMaterial {...DARK} />
          </mesh>
        ))}
        {/* Stator terminal box */}
        <mesh position={[0, 0.88, 0]}>
          <boxGeometry args={[0.55, 0.22, 0.34]} />
          <meshStandardMaterial color="#1a2535" metalness={0.7} roughness={0.35} />
        </mesh>
        {/* Mounting feet */}
        {([-0.55, 0.55] as number[]).map((x) => (
          <mesh key={x} position={[x, -0.84, 0]}>
            <boxGeometry args={[0.22, 0.12, 0.9]} />
            <meshStandardMaterial {...DARK} />
          </mesh>
        ))}
      </group>

      {/* ══════════════════════════════════════════════════════
          TRACTION SHEAVE (the main rope wheel)
      ══════════════════════════════════════════════════════ */}
      <group ref={sheaveRef} position={[0.55, 0, 0]}>
        {/* Rim */}
        <Torus args={[0.88, 0.09, 16, 64]} rotation={[0, 0, Math.PI / 2]}>
          <meshStandardMaterial {...STEEL} />
        </Torus>
        {/* Rope grooves (4) */}
        {[-0.18, -0.06, 0.06, 0.18].map((x, i) => (
          <mesh key={i} position={[x, 0, 0]} rotation={[0, 0, Math.PI / 2]}>
            <torusGeometry args={[0.88, 0.035, 12, 64]} />
            <meshStandardMaterial {...RUBBER} />
          </mesh>
        ))}
        {/* Web disc */}
        <Cylinder args={[0.82, 0.82, 0.05, 48]} rotation={[0, 0, Math.PI / 2]}>
          <meshStandardMaterial {...STEEL} />
        </Cylinder>
        {/* Spokes (6) */}
        {angleArr(6).map((a, i) => (
          <mesh key={i} rotation={[a, Math.PI / 2, 0]}>
            <boxGeometry args={[0.07, 1.56, 0.055]} />
            <meshStandardMaterial {...STEEL} />
          </mesh>
        ))}
        {/* Hub */}
        <Cylinder args={[0.16, 0.16, 0.55, 24]} rotation={[0, 0, Math.PI / 2]}>
          <meshStandardMaterial {...BRASS} />
        </Cylinder>
        {/* Hub bolts */}
        {angleArr(6).map((a, i) => (
          <mesh key={i} position={[0, Math.sin(a) * 0.28, Math.cos(a) * 0.28]} rotation={[0, 0, Math.PI / 2]}>
            <cylinderGeometry args={[0.025, 0.025, 0.45, 8]} />
            <meshStandardMaterial {...BOLT} />
          </mesh>
        ))}
        {/* Hoist ropes passing over sheave */}
        {[-0.18, -0.06, 0.06, 0.18].map((x, i) => (
          <group key={i}>
            <mesh position={[x, -0.88, 0.65]}>
              <cylinderGeometry args={[0.018, 0.018, 1.3, 8]} />
              <meshStandardMaterial color="#808890" metalness={1} roughness={0.05} />
            </mesh>
            <mesh position={[x, -0.88, -0.65]}>
              <cylinderGeometry args={[0.018, 0.018, 1.3, 8]} />
              <meshStandardMaterial color="#808890" metalness={1} roughness={0.05} />
            </mesh>
          </group>
        ))}
      </group>

      {/* ══════════════════════════════════════════════════════
          ELECTROMAGNETIC DISC BRAKE
      ══════════════════════════════════════════════════════ */}
      <group position={[1.46, 0, 0]}>
        {/* Brake housing */}
        <Cylinder args={[0.44, 0.50, 0.45, 32]} rotation={[0, 0, Math.PI / 2]}>
          <meshStandardMaterial {...DARK} />
        </Cylinder>
        {/* Spring pack (visible when open) */}
        {angleArr(6).map((a, i) => (
          <mesh key={i} position={[0.24, Math.sin(a) * 0.28, Math.cos(a) * 0.28]}>
            <cylinderGeometry args={[0.035, 0.035, 0.22, 8]} />
            <meshStandardMaterial color="#667788" metalness={0.7} roughness={0.4} />
          </mesh>
        ))}
        {/* Brake disc */}
        <Cylinder args={[0.36, 0.36, 0.06, 32]} position={[-0.26, 0, 0]} rotation={[0, 0, Math.PI / 2]}>
          <meshStandardMaterial color="#444c58" metalness={0.9} roughness={0.2} />
        </Cylinder>
        {/* Arm lever */}
        <group ref={armRef}>
          <mesh position={[0, 0.55, 0]}>
            <boxGeometry args={[0.32, 0.28, 0.09]} />
            <meshStandardMaterial {...DARK} />
          </mesh>
          <mesh position={[0, 0.8, 0]}>
            <boxGeometry args={[0.09, 0.5, 0.07]} />
            <meshStandardMaterial {...STEEL} />
          </mesh>
        </group>
        {/* Manual release knob */}
        <mesh position={[0, -0.56, 0]}>
          <sphereGeometry args={[0.07, 12, 12]} />
          <meshStandardMaterial {...RED} />
        </mesh>
        {/* Mounting bolts on face */}
        {angleArr(6).map((a, i) => (
          <mesh key={i} position={[-0.24, Math.sin(a) * 0.38, Math.cos(a) * 0.38]}>
            <cylinderGeometry args={[0.025, 0.025, 0.1, 8]} />
            <meshStandardMaterial {...BOLT} />
          </mesh>
        ))}
      </group>

      {/* ══════════════════════════════════════════════════════
          ABSOLUTE ENCODER (opposite side – non-brake end)
          On a real gearless PMSM traction machine there is NO gearbox.
          The motor shaft drives the sheave directly. The encoder reads
          the rotor angular position for the VVVF drive commutation.
      ══════════════════════════════════════════════════════ */}
      <group position={[-2.0, 0, 0]}>

        {/* Motor endshield / bearing cover (the flat face plate) */}
        <mesh rotation={[0, 0, Math.PI / 2]}>
          <cylinderGeometry args={[0.72, 0.72, 0.08, 48]} />
          <meshStandardMaterial {...DARK} />
        </mesh>
        {/* Bearing housing centre boss */}
        <mesh rotation={[0, 0, Math.PI / 2]}>
          <cylinderGeometry args={[0.22, 0.22, 0.18, 24]} />
          <meshStandardMaterial {...STEEL} />
        </mesh>
        {/* Endshield mounting bolts (6) */}
        {angleArr(6).map((a, i) => (
          <mesh key={i} position={[0, Math.sin(a) * 0.56, Math.cos(a) * 0.56]} rotation={[0, 0, Math.PI / 2]}>
            <cylinderGeometry args={[0.025, 0.025, 0.12, 8]} />
            <meshStandardMaterial {...BOLT} />
          </mesh>
        ))}

        {/* Encoder body – small cylindrical housing */}
        <group position={[-0.20, 0, 0]}>
          {/* Main encoder housing */}
          <mesh rotation={[0, 0, Math.PI / 2]}>
            <cylinderGeometry args={[0.15, 0.15, 0.22, 24]} />
            <meshStandardMaterial color="#1a2535" metalness={0.85} roughness={0.2} />
          </mesh>
          {/* Encoder disc (visible through the face) */}
          <mesh position={[-0.07, 0, 0]} rotation={[0, 0, Math.PI / 2]}>
            <cylinderGeometry args={[0.11, 0.11, 0.01, 32]} />
            <meshStandardMaterial color="#334455" metalness={0.6} roughness={0.3} />
          </mesh>
          {/* Optical ring pattern on disc */}
          {angleArr(16).map((a, i) => (
            <mesh key={i} position={[-0.075, Math.sin(a) * 0.075, Math.cos(a) * 0.075]} rotation={[0, 0, Math.PI / 2]}>
              <boxGeometry args={[0.012, 0.018, 0.012]} />
              <meshStandardMaterial color={i % 2 === 0 ? '#ffffff' : '#111111'} />
            </mesh>
          ))}
          {/* Encoder cap / connector snout */}
          <mesh position={[-0.17, 0, 0]} rotation={[0, 0, Math.PI / 2]}>
            <cylinderGeometry args={[0.08, 0.08, 0.1, 16]} />
            <meshStandardMaterial color="#0f1824" metalness={0.7} roughness={0.3} />
          </mesh>
          {/* M12 connector (the signal cable plug) */}
          <mesh position={[-0.23, 0.09, 0]} rotation={[0.4, 0, Math.PI / 2]}>
            <cylinderGeometry args={[0.025, 0.025, 0.1, 12]} />
            <meshStandardMaterial color="#2a3a4a" metalness={0.8} roughness={0.2} />
          </mesh>
          {/* Signal cable running toward cabinet */}
          <mesh position={[-0.03, 0.22, 0.1]} rotation={[0.5, 0.2, 0.1]}>
            <cylinderGeometry args={[0.012, 0.012, 0.55, 8]} />
            <meshStandardMaterial color="#223344" metalness={0.5} roughness={0.6} />
          </mesh>
          {/* Red LED indicator dot (power on) */}
          <mesh position={[-0.24, 0, 0.12]}>
            <sphereGeometry args={[0.016, 10, 10]} />
            <meshBasicMaterial color="#ff2200" />
          </mesh>
          {/* Encoder label plate */}
          <mesh position={[0.02, 0.16, 0]} rotation={[0.3, 0, 0]}>
            <boxGeometry args={[0.16, 0.06, 0.01]} />
            <meshStandardMaterial color="#e0e4ea" metalness={0.2} roughness={0.7} />
          </mesh>
        </group>

        {/* Shaft stub protruding from encoder (the motor shaft end) */}
        <mesh position={[-0.44, 0, 0]} rotation={[0, 0, Math.PI / 2]}>
          <cylinderGeometry args={[0.05, 0.05, 0.18, 16]} />
          <meshStandardMaterial {...STEEL} />
        </mesh>
      </group>

      {/* ══════════════════════════════════════════════════════
          ROPE DEFLECTOR SHEAVE
          On most MRL machines a small cast-iron deflector sheave
          is mounted above the machine on a separate bracket to
          redirect the ropes into the hoistway at the correct angle.
      ══════════════════════════════════════════════════════ */}
      <group position={[-0.6, 1.9, 0]}>
        {/* Bracket upright */}
        <mesh position={[0, -0.6, 0]}>
          <boxGeometry args={[0.1, 1.0, 0.22]} />
          <meshStandardMaterial {...DARK} />
        </mesh>
        {/* Bracket base plate */}
        <mesh position={[0, -1.12, 0]}>
          <boxGeometry args={[0.45, 0.08, 0.5]} />
          <meshStandardMaterial {...DARK} />
        </mesh>
        {/* Bracket base bolts */}
        {([-0.16, 0.16] as number[]).flatMap(x =>
          ([-0.18, 0.18] as number[]).map((z) => (
            <mesh key={`${x}${z}`} position={[x, -1.08, z]}>
              <cylinderGeometry args={[0.022, 0.022, 0.1, 8]} />
              <meshStandardMaterial {...BOLT} />
            </mesh>
          ))
        )}
        {/* Axle pin */}
        <mesh rotation={[0, 0, Math.PI / 2]}>
          <cylinderGeometry args={[0.04, 0.04, 0.7, 16]} />
          <meshStandardMaterial {...STEEL} />
        </mesh>
        {/* Deflector sheave wheel */}
        <mesh rotation={[0, 0, Math.PI / 2]}>
          <torusGeometry args={[0.42, 0.07, 16, 48]} />
          <meshStandardMaterial color="#4a5060" metalness={0.85} roughness={0.25} />
        </mesh>
        {/* Sheave web / disc */}
        <mesh rotation={[0, 0, Math.PI / 2]}>
          <cylinderGeometry args={[0.38, 0.38, 0.04, 32]} />
          <meshStandardMaterial color="#525c6a" metalness={0.75} roughness={0.3} />
        </mesh>
        {/* Two rope grooves */}
        {[-0.07, 0.07].map((x, i) => (
          <mesh key={i} position={[x, 0, 0]} rotation={[0, 0, Math.PI / 2]}>
            <torusGeometry args={[0.42, 0.026, 10, 48]} />
            <meshStandardMaterial {...RUBBER} />
          </mesh>
        ))}
        {/* Sheave spokes (4) */}
        {angleArr(4).map((a, i) => (
          <mesh key={i} rotation={[a, Math.PI / 2, 0]}>
            <boxGeometry args={[0.055, 0.8, 0.04]} />
            <meshStandardMaterial color="#525c6a" metalness={0.8} roughness={0.3} />
          </mesh>
        ))}
        {/* Rope going down into hoistway each side */}
        {[-0.07, 0.07].map((x, i) => (
          <mesh key={i} position={[x, -0.98, 0]}>
            <cylinderGeometry args={[0.016, 0.016, 1.5, 8]} />
            <meshStandardMaterial color="#808890" metalness={1} roughness={0.05} />
          </mesh>
        ))}
      </group>

      {/* ══════════════════════════════════════════════════════
          COOLING FAN (end of motor)
      ══════════════════════════════════════════════════════ */}
      <group position={[-1.62, 0, 0]}>
        {/* Fan cover grille */}
        <Cylinder args={[0.5, 0.52, 0.16, 32]} rotation={[0, 0, Math.PI / 2]}>
          <meshStandardMaterial color="#1e2838" metalness={0.8} roughness={0.3} />
        </Cylinder>
        {/* Grille radial bars */}
        {angleArr(10).map((a, i) => (
          <mesh key={i} position={[0, Math.sin(a) * 0.25, Math.cos(a) * 0.25]} rotation={[a, Math.PI / 2, 0]}>
            <boxGeometry args={[0.14, 0.5, 0.022]} />
            <meshStandardMaterial {...DARK} />
          </mesh>
        ))}
        {/* Fan blades */}
        <group ref={fanRef}>
          {angleArr(7).map((a, i) => (
            <mesh key={i} position={[0.02, Math.sin(a) * 0.3, Math.cos(a) * 0.3]} rotation={[a + 0.3, Math.PI / 2, 0]}>
              <boxGeometry args={[0.06, 0.32, 0.04]} />
              <meshStandardMaterial {...STEEL} />
            </mesh>
          ))}
        </group>
      </group>

      {/* ══════════════════════════════════════════════════════
          CONTROL PANEL / DRIVE INVERTER CABINET
      ══════════════════════════════════════════════════════ */}
      <group position={[2.2, -0.22, 0]}>
        <mesh>
          <boxGeometry args={[0.52, 1.1, 0.7]} />
          <meshStandardMaterial color="#1c2535" metalness={0.75} roughness={0.3} />
        </mesh>
        {/* Display */}
        <mesh position={[0.27, 0.28, 0]}>
          <planeGeometry args={[0.32, 0.22]} />
          <meshBasicMaterial color="#002244" />
        </mesh>
        <mesh position={[0.271, 0.28, 0]}>
          <planeGeometry args={[0.28, 0.18]} />
          <meshBasicMaterial color="#00e5ff" />
        </mesh>
        {/* Indicator LEDs */}
        {[0.1, 0, -0.1].map((z, i) => (
          <mesh key={i} position={[0.27, -0.12, z]}>
            <sphereGeometry args={[0.022, 10, 10]} />
            <meshBasicMaterial color={i === 0 ? '#00ff66' : i === 1 ? '#ffcc00' : '#ff4400'} />
          </mesh>
        ))}
        {/* Ventilation slots */}
        {[-0.25, -0.15, -0.05, 0.05, 0.15, 0.25].map((y, i) => (
          <mesh key={i} position={[0.27, y, 0.25]}>
            <boxGeometry args={[0.28, 0.02, 0.02]} />
            <meshStandardMaterial color="#0f1520" metalness={0.5} roughness={0.5} />
          </mesh>
        ))}
        {/* Door handle */}
        <mesh position={[0.27, -0.35, -0.27]}>
          <boxGeometry args={[0.04, 0.16, 0.04]} />
          <meshStandardMaterial {...STEEL} />
        </mesh>
        {/* Conduit pipe coming out bottom */}
        <mesh position={[0, -0.65, -0.22]} rotation={[Math.PI / 2, 0, 0]}>
          <cylinderGeometry args={[0.04, 0.04, 0.25, 12]} />
          <meshStandardMaterial color="#2a3444" metalness={0.7} roughness={0.4} />
        </mesh>
        {/* Cable glands */}
        {[-0.12, 0, 0.12].map((z, i) => (
          <mesh key={i} position={[0, -0.56, z]} rotation={[Math.PI / 2, 0, 0]}>
            <cylinderGeometry args={[0.035, 0.045, 0.08, 12]} />
            <meshStandardMaterial color="#2a3040" metalness={0.75} roughness={0.3} />
          </mesh>
        ))}
      </group>

      {/* ══════════════════════════════════════════════════════
          CABLE CONDUITS connecting components
      ══════════════════════════════════════════════════════ */}
      {/* Motor to cabinet */}
      <mesh position={[0.6, 0.82, 0.3]}>
        <cylinderGeometry args={[0.04, 0.04, 2.6, 10]} />
        <meshStandardMaterial color="#1a2535" metalness={0.6} roughness={0.5} />
      </mesh>
      {/* Brake cable */}
      <mesh position={[1.8, 0.65, -0.2]} rotation={[0.2, 0, 0.4]}>
        <cylinderGeometry args={[0.025, 0.025, 0.8, 8]} />
        <meshStandardMaterial color="#334455" metalness={0.5} roughness={0.6} />
      </mesh>

      {/* ══════════════════════════════════════════════════════
          MASTER RED BRAND PLATE on motor housing
      ══════════════════════════════════════════════════════ */}
      <mesh position={[-0.8, 0.72, 0]}>
        <boxGeometry args={[0.55, 0.14, 0.04]} />
        <meshStandardMaterial {...RED} />
      </mesh>
      <mesh position={[-0.8, 0.72, 0.025]}>
        <planeGeometry args={[0.5, 0.1]} />
        <meshStandardMaterial color="#ffffff" metalness={0.2} roughness={0.8} />
      </mesh>

    </group>
  );
};
