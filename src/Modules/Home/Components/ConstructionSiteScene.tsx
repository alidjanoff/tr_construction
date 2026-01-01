import { Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, PerspectiveCamera, useGLTF, Center, Stage } from '@react-three/drei';
// @ts-ignore
import materialsModelUrl from '../../../assets/3d model/materials.glb?url';

const MaterialsModel = () => {
  const { scene } = useGLTF(materialsModelUrl);
  
  // Enable shadows for the model
  scene.traverse((child: any) => {
    if (child.isMesh) {
      child.castShadow = true;
      child.receiveShadow = true;
    }
  });

  return <primitive object={scene} />;
};

const ConstructionSiteScene = () => {
    return (
        <Canvas shadows>
            <PerspectiveCamera makeDefault position={[5, 5, 5]} fov={45} />
            <ambientLight intensity={0.7} />
            <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} intensity={1} castShadow />
            
            <Suspense fallback={null}>
                <Stage environment="city" intensity={0.5} shadows="contact" adjustCamera={true}>
                    <Center>
                        <MaterialsModel />
                    </Center>
                </Stage>
            </Suspense>

            <OrbitControls 
                enableZoom={false} 
                enablePan={false} 
                minPolarAngle={Math.PI/4} 
                maxPolarAngle={Math.PI/2}
                autoRotate
                autoRotateSpeed={1}
            />
        </Canvas>
    );
};

export default ConstructionSiteScene;
