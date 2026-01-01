import React, { useEffect } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, useGLTF, Environment, PerspectiveCamera, Center } from '@react-three/drei';
import * as THREE from 'three';
// @ts-ignore
import cityModelPath from '../../../assets/3d model/city.glb?url';

const CityModel = () => {
  const { scene } = useGLTF(cityModelPath);
  
  // Clean up material or add effects if needed
  useEffect(() => {
    scene.traverse((child: THREE.Object3D) => {
      if ((child as THREE.Mesh).isMesh) {
         // Optional: Enable shadows if we had lights setup for ShadowMap
         child.castShadow = true;
         child.receiveShadow = true;
      }
    });
  }, [scene]);

  return <primitive object={scene} scale={3} />; // Increased scale for visibility
};

// Preload the model
useGLTF.preload(cityModelPath);

const CityScene = () => {
  return (
    <Canvas shadows>
      <PerspectiveCamera makeDefault position={[50, 50, 50]} fov={45} />
      <color attach="background" args={['#ffffff']} /> {/* White background as requested previously */}

      <ambientLight intensity={1} />
      <directionalLight 
        position={[10, 20, 10]} 
        intensity={2} 
        castShadow 
        shadow-mapSize={[1024, 1024]}
      />
      
      <group position={[0, 0, 0]}>
        {/* Suspense is needed for async asset loading */}
        <React.Suspense fallback={null}>
          <Center>
             <CityModel />
          </Center>
        </React.Suspense>
      </group>

      <Environment preset="city" />
      
      {/* 
        Controls:
        - enableRotate: true
        - maxPolarAngle = minPolarAngle = Math.PI / 4 (45 degrees fixed)
        - enableZoom={false} (optional but standard for hero)
      */}
      <OrbitControls 
        enablePan={false}
        enableZoom={false}
        minPolarAngle={Math.PI / 4} // ~45 degrees
        maxPolarAngle={Math.PI / 4} // Fixed at 45 degrees
        autoRotate={true}
        autoRotateSpeed={0.5}
      />
    </Canvas>
  );
};

export default CityScene;
