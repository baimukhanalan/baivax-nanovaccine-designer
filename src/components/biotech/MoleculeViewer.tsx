import { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Float, Sphere, MeshDistortMaterial } from '@react-three/drei';
import * as THREE from 'three';

function Helix({ count = 20, radius = 2, height = 10 }) {
  const ref = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (ref.current) {
      ref.current.rotation.y = state.clock.getElapsedTime() * 0.5;
    }
  });

  const spheres = [];
  for (let i = 0; i < count; i++) {
    const y = (i / count) * height - height / 2;
    const angle1 = (i / count) * Math.PI * 4;
    const angle2 = angle1 + Math.PI;
    
    // Strand 1
    spheres.push(
      <Sphere key={`s1-${i}`} position={[Math.cos(angle1) * radius, y, Math.sin(angle1) * radius]} args={[0.2, 16, 16]}>
        <meshStandardMaterial color="#10B981" emissive="#10B981" emissiveIntensity={0.5} />
      </Sphere>
    );
    
    // Strand 2
    spheres.push(
      <Sphere key={`s2-${i}`} position={[Math.cos(angle2) * radius, y, Math.sin(angle2) * radius]} args={[0.2, 16, 16]}>
        <meshStandardMaterial color="#3B82F6" emissive="#3B82F6" emissiveIntensity={0.5} />
      </Sphere>
    );

    // Connecting bar
    if (i % 2 === 0) {
      spheres.push(
        <mesh key={`b-${i}`} position={[0, y, 0]} rotation={[0, 0, angle1]}>
          <boxGeometry args={[radius * 2, 0.05, 0.05]} />
          <meshStandardMaterial color="#ffffff" opacity={0.3} transparent />
        </mesh>
      );
    }
  }

  return <group ref={ref}>{spheres}</group>;
}

export function MoleculeViewer() {
  return (
    <div className="w-full h-[400px] rounded-2xl bg-primary overflow-hidden relative border border-white/10 shadow-inner">
      <div className="absolute top-4 left-4 z-10">
        <div className="px-3 py-1 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-[10px] text-white font-bold uppercase tracking-widest">
          Interactive 3D Simulation
        </div>
      </div>
      
      <Canvas camera={{ position: [0, 0, 15], fov: 45 }}>
        <color attach="background" args={['#0A192F']} />
        <ambientLight intensity={0.5} />
        <pointLight position={[10, 10, 10]} intensity={1} />
        <spotLight position={[-10, 10, 10]} angle={0.15} penumbra={1} intensity={1} />
        
        <Float speed={2} rotationIntensity={1} floatIntensity={1}>
          <Helix />
        </Float>
        
        <OrbitControls enableZoom={false} autoRotate autoRotateSpeed={0.5} />
      </Canvas>
      
      <div className="absolute bottom-4 right-4 z-10 flex gap-2">
        <div className="w-3 h-3 rounded-full bg-secondary shadow-[0_0_10px_#10B981]" />
        <div className="w-3 h-3 rounded-full bg-accent shadow-[0_0_10px_#3B82F6]" />
      </div>
    </div>
  );
}
