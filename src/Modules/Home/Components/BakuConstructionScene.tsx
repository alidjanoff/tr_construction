import { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Environment, Float, PerspectiveCamera, ContactShadows } from '@react-three/drei';
import * as THREE from 'three';

const FlameTower = ({ position, scale, color }: { position: [number, number, number], scale: [number, number, number], color: string }) => {
  return (
    <group position={position} scale={scale}>
      {/* Abstract Flame Shape using tapered cylinder */}
      <mesh position={[0, 2.5, 0]}>
        <cylinderGeometry args={[0.1, 1, 5, 32]} />
        <meshStandardMaterial color={color} roughness={0.2} metalness={0.8} />
      </mesh>
    </group>
  );
};

const Crane = ({ position, rotation }: { position: [number, number, number], rotation: [number, number, number] }) => {
  // Simple crane: Tower, Jib, Counterweight, Cab
  return (
    <group position={position} rotation={rotation}>
      {/* Tower */}
      <mesh position={[0, 3, 0]}>
        <boxGeometry args={[0.2, 6, 0.2]} />
        <meshStandardMaterial color="#FFD700" />
      </mesh>
      {/* Top Structure */}
      <group position={[0, 6, 0]} rotation={[0, Math.PI / 4, 0]}>
         {/* Jib */}
        <mesh position={[1.5, 0, 0]}>
           <boxGeometry args={[3, 0.1, 0.1]} />
           <meshStandardMaterial color="#FFD700" />
        </mesh>
        {/* Counter Jib */}
        <mesh position={[-0.8, 0, 0]}>
           <boxGeometry args={[1.6, 0.1, 0.1]} />
           <meshStandardMaterial color="#333" />
        </mesh>
        {/* Cab */}
        <mesh position={[0, 0, 0.2]}>
          <boxGeometry args={[0.3, 0.3, 0.3]} />
          <meshStandardMaterial color="#333" />
        </mesh>
         {/* Cable */}
        <mesh position={[2.5, -1.5, 0]}>
           <cylinderGeometry args={[0.01, 0.01, 3]} />
           <meshStandardMaterial color="#000" />
        </mesh>
        {/* Hook/Load */}
         <mesh position={[2.5, -3, 0]}>
           <boxGeometry args={[0.4, 0.4, 0.4]} />
           <meshStandardMaterial color="#ff4444" />
        </mesh>
      </group>
    </group>
  );
};

const BuildingBlock = ({ position, args, color = "#e0e0e0" }: { position: [number, number, number], args: [number, number, number], color?: string }) => (
    <mesh position={position}>
        <boxGeometry args={args} />
        <meshStandardMaterial color={color} roughness={0.1} />
    </mesh>
);

const BakuSkyline = () => {
    const groupRef = useRef<THREE.Group>(null);
    
    useFrame((state) => {
        if (groupRef.current) {
             // Gentle rotation
             groupRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.1) * 0.1;
        }
    });

  return (
    <group ref={groupRef} position={[2, -1, 0]}>
       {/* Flame Towers Representation */}
       <FlameTower position={[-1, 0, -2]} scale={[1, 1, 1]} color="#1a73e8" />
       <FlameTower position={[1, 0, -2]} scale={[1, 1.2, 1]} color="#1a73e8" />
       <FlameTower position={[0, 0, -1]} scale={[1, 1.1, 1]} color="#1a73e8" />

       {/* Maiden Tower Abstract (Cylinder + Buttress) */}
       <group position={[-4, 0, 1]}>
         <mesh position={[0, 1.5, 0]}>
            <cylinderGeometry args={[0.8, 0.8, 3, 32]} />
            <meshStandardMaterial color="#d2b48c" />
         </mesh>
         <mesh position={[0.8, 0.5, 0]}>
             <boxGeometry args={[0.6, 1, 1.5]} />
             <meshStandardMaterial color="#d2b48c" />
         </mesh>
       </group>
       
       {/* Modern Buildings / Construction Sites */}
       <BuildingBlock position={[3, 1, 2]} args={[1.5, 2, 1.5]} color="#f5f5f5" />
       <BuildingBlock position={[4.5, 1.5, 0]} args={[1, 3, 1]} color="#ccc" />
       
       {/* Construction Elements */}
       <Crane position={[3.5, 0, 2]} rotation={[0, -0.5, 0]} />
       <Crane position={[-3, 0, -1]} rotation={[0, 2, 0]} />

       {/* Floating UI Elements or Particles (Abstract Construction) */}
       <Float speed={2} rotationIntensity={0.5} floatIntensity={0.5}>
            <mesh position={[-2, 3, 3]}>
                <icosahedronGeometry args={[0.2, 0]} />
                <meshStandardMaterial color="#4CAF50" wireframe />
            </mesh>
             <mesh position={[2, 4, 1]}>
                <octahedronGeometry args={[0.2, 0]} />
                <meshStandardMaterial color="#2196F3" wireframe />
            </mesh>
       </Float>
    </group>
  );
};

const BakuConstructionScene = () => {
  return (
    <Canvas>
      <PerspectiveCamera makeDefault position={[0, 2, 8]} fov={50} />
      <color attach="background" args={['#F6F8FA']} /> {/* Light background */}
      
      <ambientLight intensity={0.7} />
      <directionalLight position={[10, 10, 5]} intensity={1.5} castShadow />
      <pointLight position={[-10, -5, -5]} intensity={0.5} color="#blue" />

      <BakuSkyline />
      
      <ContactShadows opacity={0.4} scale={20} blur={2} far={4.5} />
      <Environment preset="city" />
      
      {/* Enable controls but maybe limit interaction to keep focus on text */}
      <OrbitControls 
         enableZoom={false} 
         enablePan={false} 
         minPolarAngle={Math.PI / 3} 
         maxPolarAngle={Math.PI / 2}
         autoRotate
         autoRotateSpeed={0.5}
      />
    </Canvas>
  );
};

export default BakuConstructionScene;
