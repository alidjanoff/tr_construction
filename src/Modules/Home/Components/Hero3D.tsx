import { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Float, ContactShadows, Environment, Sky } from '@react-three/drei';
import * as THREE from 'three';

// --- High-Fidelity Tower Crane ---
const HighRiseCrane = () => {
  const jibRef = useRef<THREE.Group>(null);
  const trolleyRef = useRef<THREE.Group>(null);
  const hookRef = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (jibRef.current) {
      jibRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.15) * 0.3; // Slow rotation
    }
    if (trolleyRef.current) {
      trolleyRef.current.position.x = 8 + Math.sin(state.clock.elapsedTime * 0.4) * 3;
    }
    if (hookRef.current) {
       hookRef.current.rotation.z = Math.sin(state.clock.elapsedTime) * 0.05;
       hookRef.current.position.y = -3 + Math.sin(state.clock.elapsedTime * 0.8) * 0.5;
    }
  });

  const yellow = '#FFB800'; // Caterpillar Yellow
  const darkGray = '#333';

  return (
    <group position={[4, 0, -4]} scale={0.8}>
      {/* Concrete Base Block */}
      <mesh position={[0, 0.5, 0]}>
        <boxGeometry args={[2, 1, 2]} />
        <meshStandardMaterial color="#7a7a7a" roughness={0.7} />
      </mesh>

      {/* Mast Sections */}
      <group position={[0, 1, 0]}>
        {Array.from({ length: 14 }).map((_, i) => (
          <group key={i} position={[0, i * 1.5 + 0.75, 0]}>
             {/* 4 Pillars */}
             <mesh position={[0.4, 0, 0.4]}><cylinderGeometry args={[0.05, 0.05, 1.5]} /><meshStandardMaterial color={yellow} /></mesh>
             <mesh position={[-0.4, 0, 0.4]}><cylinderGeometry args={[0.05, 0.05, 1.5]} /><meshStandardMaterial color={yellow} /></mesh>
             <mesh position={[0.4, 0, -0.4]}><cylinderGeometry args={[0.05, 0.05, 1.5]} /><meshStandardMaterial color={yellow} /></mesh>
             <mesh position={[-0.4, 0, -0.4]}><cylinderGeometry args={[0.05, 0.05, 1.5]} /><meshStandardMaterial color={yellow} /></mesh>
             {/* ZigZag Lattice */}
             <mesh rotation={[0, 0, 0.5]} position={[0, 0, 0.4]}><cylinderGeometry args={[0.02, 0.02, 1.8]} /><meshStandardMaterial color={yellow} /></mesh>
             <mesh rotation={[0, 0, -0.5]} position={[0, 0, -0.4]}><cylinderGeometry args={[0.02, 0.02, 1.8]} /><meshStandardMaterial color={yellow} /></mesh>
             <mesh rotation={[0.5, 0, 0]} position={[0.4, 0, 0]}><cylinderGeometry args={[0.02, 0.02, 1.8]} /><meshStandardMaterial color={yellow} /></mesh>
             <mesh rotation={[-0.5, 0, 0]} position={[-0.4, 0, 0]}><cylinderGeometry args={[0.02, 0.02, 1.8]} /><meshStandardMaterial color={yellow} /></mesh>
          </group>
        ))}
      </group>

      {/* Top Unit (Slewing Unit + Jib) */}
      <group position={[0, 22.5, 0]} ref={jibRef}>
        {/* Cabin */}
        <group position={[-0.8, 0.5, 0.8]}>
           <mesh>
             <boxGeometry args={[1, 1.2, 1.2]} />
             <meshStandardMaterial color="#eee" />
           </mesh>
           <mesh position={[0, 0.2, 0.61]}>
             <planeGeometry args={[0.8, 0.6]} />
             <meshStandardMaterial color="#88ccee" metalness={0.9} roughness={0.1} />
           </mesh>
        </group>

        {/* Counter Jib */}
        <mesh position={[-3, 0.8, 0]}>
          <boxGeometry args={[6, 0.8, 0.8]} />
          <meshStandardMaterial color={yellow} />
        </mesh>
        {/* Counterweights */}
        <mesh position={[-5, 0, 0]}>
           <boxGeometry args={[2, 1.2, 1.2]} />
           <meshStandardMaterial color="#444" />
        </mesh>

        {/* Main Jib */}
        <mesh position={[8, 0.8, 0]}>
          <boxGeometry args={[16, 0.6, 0.6]} />
          <meshStandardMaterial color={yellow} />
        </mesh>
        
        {/* Trolley */}
        <group ref={trolleyRef} position={[5, 0.5, 0]}>
           <mesh>
             <boxGeometry args={[0.8, 0.5, 0.8]} />
             <meshStandardMaterial color={darkGray} />
           </mesh>
           {/* Hook Cable */}
           <mesh position={[0, -2, 0]}>
             <cylinderGeometry args={[0.01, 0.01, 4]} />
             <meshStandardMaterial color="#111" />
           </mesh>
           {/* Hook */}
           <group position={[0, -4, 0]} ref={hookRef}>
              <mesh>
                <cylinderGeometry args={[0.2, 0.2, 0.5]} />
                <meshStandardMaterial color="red" />
              </mesh>
              {/* Load (I-Beams) */}
              <group position={[0, -0.5, 0]} rotation={[0, 0, Math.PI/2]}>
                 <mesh position={[0, 0.2, 0]}><boxGeometry args={[0.2, 3, 0.2]} /><meshStandardMaterial color="#555" /></mesh>
                 <mesh position={[0, -0.2, 0]}><boxGeometry args={[0.2, 3, 0.2]} /><meshStandardMaterial color="#555" /></mesh>
              </group>
           </group>
        </group>
      </group>
    </group>
  );
};

// --- High-Rise Construction Site ---
const HighRiseSite = () => {
  const concrete = "#8c8c8c";
  
  return (
    <group position={[-1, 0, 0]}>
       {/* Foundation */}
       <mesh position={[0, 0.1, 0]} receiveShadow>
         <boxGeometry args={[10, 0.2, 8]} />
         <meshStandardMaterial color={concrete} roughness={0.9} />
       </mesh>

       {/* Concrete Core */}
       <group position={[-2, 5, -1]}>
          <mesh>
             <boxGeometry args={[3, 10, 3]} />
             <meshStandardMaterial color={concrete} />
          </mesh>
          {/* Formwork on top of core */}
          <mesh position={[0, 5.2, 0]}>
             <boxGeometry args={[3.2, 0.8, 3.2]} />
             <meshStandardMaterial color="#a0522d" />
          </mesh>
       </group>

       {/* Steel Framework (Floors) */}
       {[1.5, 4.5, 7.5].map((y, i) => (
         <group key={i} position={[2, y, 0]}>
            {/* Floor Slab */}
            <mesh position={[0, 0, 0]}>
               <boxGeometry args={[6, 0.2, 6]} />
               <meshStandardMaterial color="#777" />
            </mesh>
            {/* Beams */}
            <mesh position={[0, -0.2, 2.9]}>
               <boxGeometry args={[6, 0.2, 0.2]} />
               <meshStandardMaterial color="#333" />
            </mesh>
            <mesh position={[0, -0.2, -2.9]}>
               <boxGeometry args={[6, 0.2, 0.2]} />
               <meshStandardMaterial color="#333" />
            </mesh>
            <mesh position={[2.9, -0.2, 0]} rotation={[0, Math.PI/2, 0]}>
               <boxGeometry args={[6, 0.2, 0.2]} />
               <meshStandardMaterial color="#333" />
            </mesh>
         </group>
       ))}

       {/* Steel Columns */}
       <group position={[2, 5, 0]}>
          <mesh position={[2.8, 0, 2.8]}><boxGeometry args={[0.2, 10, 0.2]} /><meshStandardMaterial color="#aa2222" /></mesh>
          <mesh position={[-0.3, 0, 2.8]}><boxGeometry args={[0.2, 10, 0.2]} /><meshStandardMaterial color="#aa2222" /></mesh>
          <mesh position={[2.8, 0, -2.8]}><boxGeometry args={[0.2, 10, 0.2]} /><meshStandardMaterial color="#aa2222" /></mesh>
          <mesh position={[-0.3, 0, -2.8]}><boxGeometry args={[0.2, 10, 0.2]} /><meshStandardMaterial color="#aa2222" /></mesh>
       </group>
       
       {/* Debris / Ground Elements */}
       <mesh position={[3, 0.4, 3]}>
           <boxGeometry args={[1, 0.8, 1]} />
           <meshStandardMaterial color="#333" />
       </mesh>
    </group>
  );
};

const Hero3D = () => {
  return (
    <div className="hero-3d">
      <Canvas
        camera={{ position: [15, 12, 15], fov: 35 }}
        style={{ background: 'transparent' }}
        shadows
        dpr={[1, 2]}
      >
        <Sky sunPosition={[100, 20, 100]} turbidity={0.5} rayleigh={0.5} />
        <Environment preset="city" />
        <ambientLight intensity={0.7} />
        <directionalLight 
          position={[5, 10, 5]} 
          intensity={1.5} 
          castShadow 
          shadow-mapSize={[1024, 1024]} 
        />
        
        <Float speed={0.5} rotationIntensity={0.05} floatIntensity={0.1}>
          <group position={[0, -2, 0]} scale={0.35}>
            <HighRiseCrane />
            <HighRiseSite />
            
            {/* Ground Plane */}
            <mesh position={[0, 0, 0]} rotation={[-Math.PI / 2, 0, 0]} receiveShadow>
               <planeGeometry args={[60, 60]} />
               <meshStandardMaterial color="#dcdcdc" opacity={0.6} transparent />
            </mesh>
          </group>
        </Float>

        <ContactShadows position={[0, -2, 0]} opacity={0.5} scale={30} blur={2.5} far={4} color="#000" />

        <OrbitControls
          enableZoom={false} // Disable zoom to keep the curated view
          enablePan={false}
          autoRotate
          autoRotateSpeed={0.5}
          maxPolarAngle={Math.PI / 2.2}
          minPolarAngle={Math.PI / 4}
        />
      </Canvas>
    </div>
  );
};

export default Hero3D;
