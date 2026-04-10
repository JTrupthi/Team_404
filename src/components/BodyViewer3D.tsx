import { useRef, useState, type FC } from 'react';
import { Canvas, useThree, useFrame } from '@react-three/fiber';
import { OrbitControls, Environment, ContactShadows } from '@react-three/drei';
import { Mannequin } from './Mannequin';
import { SeverityLegend } from './SeverityLegend';
import * as THREE from 'three';

const CameraRig = ({ targetPosition, controlsRef }: { targetPosition: [number, number, number] | null, controlsRef: any }) => {
  const { camera } = useThree();
  const vec = new THREE.Vector3();
  
  useFrame(() => {
    if (targetPosition && controlsRef.current) {
      vec.set(...targetPosition);
      camera.position.lerp(vec, 0.05);
      
      // Let OrbitControls update correctly by smoothing its target to origin
      controlsRef.current.target.lerp(new THREE.Vector3(0, 0, 0), 0.05);
      controlsRef.current.update();
    }
  });
  return null;
};

export const BodyViewer3D: FC = () => {
  const [cameraTarget, setCameraTarget] = useState<[number, number, number] | null>(null);
  const controlsRef = useRef<any>(null);

  const setView = (x: number, y: number, z: number) => {
    setCameraTarget([x, y, z]);
    // Allow user to interrupt animation after 1 sec
    setTimeout(() => {
      setCameraTarget(null);
    }, 1000);
  };

  return (
    <div className="w-full h-full relative group">
      <div className="absolute top-6 left-1/2 -translate-x-1/2 bg-white/90 backdrop-blur-md px-2 py-1.5 rounded-xl shadow-lg border border-slate-200/60 z-10 flex gap-1 transition-opacity">
        <button onClick={() => setView(0, 0, 7)} className="text-xs font-semibold text-slate-600 hover:text-blue-600 hover:bg-slate-100 px-3 py-1.5 rounded-lg transition-all">Front</button>
        <button onClick={() => setView(0, 0, -7)} className="text-xs font-semibold text-slate-600 hover:text-blue-600 hover:bg-slate-100 px-3 py-1.5 rounded-lg transition-all">Back</button>
        <button onClick={() => setView(7, 0, 0)} className="text-xs font-semibold text-slate-600 hover:text-blue-600 hover:bg-slate-100 px-3 py-1.5 rounded-lg transition-all">Left</button>
        <button onClick={() => setView(-7, 0, 0)} className="text-xs font-semibold text-slate-600 hover:text-blue-600 hover:bg-slate-100 px-3 py-1.5 rounded-lg transition-all">Right</button>
        <div className="w-[1px] h-4 bg-slate-300 self-center mx-2"></div>
        <button onClick={() => setView(0, 0, 7)} className="text-xs font-bold text-slate-400 hover:text-slate-700 hover:bg-slate-100 px-3 py-1.5 rounded-lg transition-all">Reset</button>
      </div>

      <Canvas camera={{ position: [0, 0, 7], fov: 45 }} shadows>
        <ambientLight intensity={0.6} />
        <directionalLight position={[10, 10, 10]} intensity={1.5} castShadow shadow-mapSize={[1024, 1024]} />
        <directionalLight position={[-10, 10, -10]} intensity={0.5} />
        <Environment preset="city" />
        
        <CameraRig targetPosition={cameraTarget} controlsRef={controlsRef} />
        <Mannequin />
        
        <ContactShadows position={[0, -4, 0]} opacity={0.5} scale={15} blur={2.5} far={4} color="#000000" />
        <OrbitControls 
          ref={controlsRef} 
          enablePan={false} 
          minDistance={4} 
          maxDistance={12} 
          maxPolarAngle={Math.PI / 2 + 0.1}
          autoRotate={!cameraTarget}
          autoRotateSpeed={0.5}
        />
      </Canvas>

      <SeverityLegend />
    </div>
  );
};
