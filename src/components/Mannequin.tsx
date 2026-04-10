import { useRef, useState, type FC } from 'react';
import { useFrame } from '@react-three/fiber';
import { useSymptomStore } from '../store/useSymptomStore';
import * as THREE from 'three';
import { getSeverityColor } from '../utils/colors';

export const Mannequin: FC = () => {
  const { symptoms, setSelectedRegion } = useSymptomStore();
  
  const regionSeverities = symptoms.reduce((acc, symptom) => {
    if (!acc[symptom.region] || symptom.severity > acc[symptom.region]) {
      acc[symptom.region] = symptom.severity;
    }
    return acc;
  }, {} as Record<string, number>);

  const BodyPart = ({ position, args, type, region, rotation = [0, 0, 0] }: any) => {
    const [hovered, setHovered] = useState(false);
    const severity = regionSeverities[region];
    const baseColor = severity ? getSeverityColor(severity) : '#e2e8f0';
    
    const meshRef = useRef<THREE.Mesh>(null);
    const targetColor = new THREE.Color(hovered ? '#cbd5e1' : baseColor);
    
    if (hovered && severity) {
      targetColor.lerp(new THREE.Color('#ffffff'), 0.2);
    }
    
    useFrame(() => {
      if (meshRef.current) {
        (meshRef.current.material as THREE.MeshStandardMaterial).color.lerp(targetColor, 0.1);
      }
    });

    return (
      <mesh
        ref={meshRef}
        position={position}
        rotation={rotation}
        onClick={(e) => {
          e.stopPropagation();
          setSelectedRegion(region);
        }}
        onPointerOver={(e) => {
          e.stopPropagation();
          setHovered(true);
          document.body.style.cursor = 'pointer';
        }}
        onPointerOut={(e) => {
          e.stopPropagation();
          setHovered(false);
          document.body.style.cursor = 'default';
        }}
        castShadow
        receiveShadow
      >
        {type === 'box' && <boxGeometry args={args} />}
        {type === 'cylinder' && <cylinderGeometry args={args} />}
        {type === 'sphere' && <sphereGeometry args={args} />}
        <meshStandardMaterial roughness={0.6} metalness={0.1} />
      </mesh>
    );
  };

  return (
    <group position={[0, 0, 0]}>
      {/* Front/Core Parts */}
      <BodyPart type="sphere" position={[0, 2.5, 0]} args={[0.5, 32, 32]} region="Head" />
      <BodyPart type="cylinder" position={[0, 1.8, 0]} args={[0.2, 0.2, 0.5, 16]} region="Neck" />
      
      {/* Torso split to front/back, but for simplicity let's make Chest/Abdomen the front half, and Upper/Lower back the rear half */}
      <BodyPart type="box" position={[0, 0.7, 0.15]} args={[1.2, 1.5, 0.3]} region="Chest" />
      <BodyPart type="box" position={[0, -0.4, 0.15]} args={[1.1, 0.7, 0.3]} region="Abdomen" />
      
      <BodyPart type="box" position={[0, 0.7, -0.15]} args={[1.2, 1.5, 0.3]} region="Upper Back" />
      <BodyPart type="box" position={[0, -0.4, -0.15]} args={[1.1, 0.7, 0.3]} region="Lower Back" />
      
      {/* Arms */}
      <BodyPart type="cylinder" position={[-0.8, 0.3, 0]} args={[0.2, 0.15, 2.2, 16]} rotation={[0, 0, 0.2]} region="Right Arm" />
      <BodyPart type="cylinder" position={[0.8, 0.3, 0]} args={[0.2, 0.15, 2.2, 16]} rotation={[0, 0, -0.2]} region="Left Arm" />
      
      {/* Legs */}
      <BodyPart type="cylinder" position={[-0.3, -2.1, 0]} args={[0.25, 0.2, 2.5, 16]} region="Right Leg" />
      <BodyPart type="cylinder" position={[0.3, -2.1, 0]} args={[0.25, 0.2, 2.5, 16]} region="Left Leg" />
    </group>
  );
};
