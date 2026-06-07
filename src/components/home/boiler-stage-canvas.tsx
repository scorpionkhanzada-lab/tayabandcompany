import { Suspense, useMemo, useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { ContactShadows, Environment, Html, OrbitControls } from "@react-three/drei";
import * as THREE from "three";

type Stage = "clean" | "wool" | "cladding";
type Wool = "rockwool" | "glasswool";

function Pipe({ stage, wool, autoRotate }: { stage: Stage; wool: Wool; autoRotate: boolean }) {
  const group = useRef<THREE.Group>(null!);

  useFrame((_, delta) => {
    if (autoRotate && group.current) {
      group.current.rotation.y += delta * 0.3;
    }
  });

  const mats = useMemo(
    () => ({
      steel: new THREE.MeshStandardMaterial({ color: "#7d8794", metalness: 0.95, roughness: 0.22 }),
      primer: new THREE.MeshStandardMaterial({ color: "#a14a23", metalness: 0.4, roughness: 0.7 }),
      rock: new THREE.MeshStandardMaterial({ color: "#8b5a2b", metalness: 0.05, roughness: 0.95 }),
      glass: new THREE.MeshStandardMaterial({ color: "#e6c64b", metalness: 0.05, roughness: 0.9 }),
      cladding: new THREE.MeshStandardMaterial({ color: "#d2dbe4", metalness: 0.95, roughness: 0.16 }),
      band: new THREE.MeshStandardMaterial({ color: "#9aa6b2", metalness: 0.95, roughness: 0.18 }),
      bolt: new THREE.MeshStandardMaterial({ color: "#3a4350", metalness: 0.9, roughness: 0.4 }),
      dark: new THREE.MeshStandardMaterial({ color: "#1f2933", metalness: 0.6, roughness: 0.5 }),
      red: new THREE.MeshStandardMaterial({ color: "#b32a2a", metalness: 0.6, roughness: 0.4 }),
      brass: new THREE.MeshStandardMaterial({ color: "#c9a14a", metalness: 0.95, roughness: 0.25 }),
      gauge: new THREE.MeshStandardMaterial({ color: "#f4f1e8", metalness: 0.1, roughness: 0.4 }),
    }),
    []
  );

  const PIPE_LEN = 3.4;
  const R_STEEL = 0.55;
  const R_ROCK = 0.78;
  const R_GLASS = 0.92;
  const R_CLAD = 1.0;

  const showRock = stage !== "clean" && wool === "rockwool";
  const showGlass = stage !== "clean" && wool === "glasswool";
  const showClad = stage === "cladding";

  return (
    <group ref={group} position={[0, 0, 0]}>
      <mesh position={[0, -1.35, 0]} material={mats.dark} receiveShadow castShadow>
        <boxGeometry args={[3.6, 0.14, 1.5]} />
      </mesh>
      {[-1.4, 1.4].map((x) => (
        <mesh key={x} position={[x, -1.05, 0]} material={mats.dark} castShadow>
          <boxGeometry args={[0.18, 0.55, 1.4]} />
        </mesh>
      ))}
      {[-1.0, 1.0].map((x) => (
        <mesh key={`sad-${x}`} position={[x, -0.6, 0]} material={mats.dark} castShadow>
          <boxGeometry args={[0.15, 0.65, 0.9]} />
        </mesh>
      ))}

      <group rotation={[0, 0, Math.PI / 2]}>
        <mesh material={stage === "clean" ? mats.primer : mats.steel} castShadow receiveShadow>
          <cylinderGeometry args={[R_STEEL, R_STEEL, PIPE_LEN, 64]} />
        </mesh>
        {[-PIPE_LEN / 2, PIPE_LEN / 2].map((y) => (
          <group key={`flange-${y}`} position={[0, y, 0]}>
            <mesh material={mats.steel} castShadow>
              <cylinderGeometry args={[R_STEEL + 0.16, R_STEEL + 0.16, 0.09, 48]} />
            </mesh>
            {Array.from({ length: 8 }).map((_, i) => {
              const a = (i / 8) * Math.PI * 2;
              const r = R_STEEL + 0.1;
              return (
                <mesh key={i} position={[Math.cos(a) * r, 0, Math.sin(a) * r]} material={mats.bolt}>
                  <cylinderGeometry args={[0.025, 0.025, 0.12, 12]} />
                </mesh>
              );
            })}
          </group>
        ))}

        {showRock && (
          <mesh material={mats.rock} castShadow>
            <cylinderGeometry args={[R_ROCK, R_ROCK, PIPE_LEN - 0.5, 64]} />
          </mesh>
        )}
        {showRock && !showClad && [-0.8, -0.2, 0.4, 1.0].map((y) => (
          <mesh key={`wire-${y}`} position={[0, y, 0]} material={mats.steel}>
            <torusGeometry args={[R_ROCK + 0.005, 0.012, 8, 48]} />
          </mesh>
        ))}
        {showGlass && (
          <mesh material={mats.glass} castShadow>
            <cylinderGeometry args={[R_GLASS, R_GLASS, PIPE_LEN - 0.7, 64]} />
          </mesh>
        )}

        {showClad && (
          <>
            <mesh material={mats.cladding} castShadow>
              <cylinderGeometry args={[R_CLAD, R_CLAD, PIPE_LEN - 0.85, 64]} />
            </mesh>
            {[-1.1, -0.55, 0, 0.55, 1.1].map((y) => (
              <mesh key={`band-${y}`} position={[0, y, 0]} material={mats.band}>
                <cylinderGeometry args={[R_CLAD + 0.014, R_CLAD + 0.014, 0.05, 64]} />
              </mesh>
            ))}
            <mesh position={[0, 0, R_CLAD + 0.005]} material={mats.band}>
              <boxGeometry args={[0.06, PIPE_LEN - 0.85, 0.012]} />
            </mesh>
          </>
        )}
      </group>

      <group position={[0.6, 0, 0]}>
        <mesh position={[0, 0.4, 0]} material={mats.steel} castShadow>
          <cylinderGeometry args={[0.18, 0.18, 0.8, 24]} />
        </mesh>
        <mesh position={[0, 0.85, 0]} material={mats.steel} castShadow>
          <cylinderGeometry args={[0.3, 0.3, 0.07, 32]} />
        </mesh>
        <mesh position={[0, 1.1, 0]} material={mats.red} castShadow>
          <sphereGeometry args={[0.27, 24, 24]} />
        </mesh>
        <mesh position={[0, 1.45, 0]} material={mats.steel} castShadow>
          <cylinderGeometry args={[0.04, 0.04, 0.4, 16]} />
        </mesh>
        <mesh position={[0, 1.7, 0]} material={mats.brass} castShadow>
          <torusGeometry args={[0.18, 0.03, 12, 32]} />
        </mesh>
        {Array.from({ length: 6 }).map((_, i) => {
          const a = (i / 6) * Math.PI * 2;
          return (
            <mesh
              key={i}
              position={[Math.cos(a) * 0.09, 1.7, Math.sin(a) * 0.09]}
              rotation={[Math.PI / 2, 0, a]}
              material={mats.brass}
            >
              <cylinderGeometry args={[0.012, 0.012, 0.18, 8]} />
            </mesh>
          );
        })}
      </group>

      <group position={[-0.9, 0.05, 0.4]}>
        <mesh position={[0, 0.3, 0]} material={mats.steel}>
          <cylinderGeometry args={[0.05, 0.05, 0.55, 16]} />
        </mesh>
        <mesh position={[0, 0.65, 0]} rotation={[Math.PI / 2, 0, 0]} material={mats.gauge}>
          <cylinderGeometry args={[0.16, 0.16, 0.06, 32]} />
        </mesh>
        <mesh position={[0, 0.65, 0.035]} rotation={[Math.PI / 2, 0, 0]} material={mats.bolt}>
          <cylinderGeometry args={[0.02, 0.02, 0.005, 16]} />
        </mesh>
        <mesh position={[0.05, 0.7, 0.04]} rotation={[Math.PI / 2, 0.6, 0]} material={mats.red}>
          <boxGeometry args={[0.01, 0.11, 0.005]} />
        </mesh>
      </group>
    </group>
  );
}

function Loader() {
  return (
    <Html center>
      <div className="text-xs text-muted-foreground">Loading model…</div>
    </Html>
  );
}

export function BoilerStageCanvas({ stage, wool, autoRotate }: { stage: Stage; wool: Wool; autoRotate: boolean }) {
  return (
    <Canvas
      shadows={{ type: THREE.PCFShadowMap }}
      camera={{ position: [0, 1.4, 6.2], fov: 38 }}
      dpr={[1, 2]}
      gl={{ antialias: true, powerPreference: "high-performance" }}
      onCreated={({ gl }) => {
        gl.domElement.addEventListener("webglcontextlost", (e) => e.preventDefault());
      }}
    >
      <ambientLight intensity={0.55} />
      <directionalLight position={[5, 6, 4]} intensity={1.2} castShadow />
      <directionalLight position={[-4, 3, -3]} intensity={0.5} color="#5b8def" />
      <Suspense fallback={<Loader />}>
        <Pipe stage={stage} wool={wool} autoRotate={autoRotate} />
        <ContactShadows position={[0, -1.45, 0]} opacity={0.5} scale={10} blur={2.6} far={3} />
        <Environment preset="warehouse" />
      </Suspense>
      <OrbitControls
        enablePan={false}
        target={[0, 0, 0]}
        minDistance={4}
        maxDistance={10}
        minPolarAngle={Math.PI / 6}
        maxPolarAngle={Math.PI / 1.9}
      />
    </Canvas>
  );
}