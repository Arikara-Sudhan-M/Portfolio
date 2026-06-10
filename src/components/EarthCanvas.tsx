import React, { useRef, useState, useEffect } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Html } from '@react-three/drei';
import * as THREE from 'three';

const DottedGlobe: React.FC = () => {
  const globeRef = useRef<THREE.Group>(null);
  
  // Rotate the globe slowly
  useFrame((state) => {
    if (globeRef.current) {
      globeRef.current.rotation.y = state.clock.getElapsedTime() * 0.15;
    }
  });

  // Calculate India (Thoothukudi, Tamil Nadu) coordinates on a sphere of radius 1.8
  const radius = 1.8;
  const lat = (8.7642 * Math.PI) / 180;
  const lon = (78.1348 * Math.PI) / 180;
  
  const y = radius * Math.sin(lat);
  const x = radius * Math.cos(lat) * Math.sin(lon);
  const z = radius * Math.cos(lat) * Math.cos(lon);

  return (
    <group ref={globeRef}>
      {/* Base Solid sphere for glow depth */}
      <mesh>
        <sphereGeometry args={[1.78, 32, 32]} />
        <meshStandardMaterial 
          color="#080824" 
          transparent 
          opacity={0.3} 
          roughness={0.5} 
          metalness={0.8} 
        />
      </mesh>

      {/* Holographic Wireframe sphere */}
      <mesh>
        <sphereGeometry args={[1.8, 30, 30]} />
        <meshBasicMaterial 
          color="#8B5CF6" 
          wireframe 
          transparent 
          opacity={0.12} 
        />
      </mesh>

      {/* Particle shell (Dotted Globe effect) */}
      <points>
        <sphereGeometry args={[1.81, 40, 40]} />
        <pointsMaterial 
          color="#00D4FF" 
          size={0.03} 
          sizeAttenuation 
          transparent 
          opacity={0.65} 
        />
      </points>

      {/* Location coordinate pin */}
      <group position={[x, y, z]}>
        {/* Glow point */}
        <mesh>
          <sphereGeometry args={[0.06, 8, 8]} />
          <meshBasicMaterial color="#FF0077" />
        </mesh>
        
        {/* Interactive Pulse Rings */}
        <mesh scale={[1.5, 1.5, 1.5]}>
          <sphereGeometry args={[0.08, 8, 8]} />
          <meshBasicMaterial color="#FF0077" transparent opacity={0.3} wireframe />
        </mesh>

        {/* Floating HTML Coordinates Text */}
        <Html distanceFactor={3.2} position={[0, 0.25, 0]}>
          <div className="px-2 py-1 bg-black/90 border border-[#FF0077]/50 rounded text-[8px] font-mono text-white whitespace-nowrap shadow-lg">
            <div className="font-bold text-[#FF0077]">Arikara's Base</div>
            <div className="text-[7px] text-gray-400">8.76° N, 78.13° E</div>
          </div>
        </Html>
      </group>
    </group>
  );
};

export const EarthCanvas: React.FC = () => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  if (isMobile) {
    // A elegant visual 2D placeholder for mobile
    return (
      <div className="w-full h-72 flex flex-col items-center justify-center border border-white/5 bg-white/[0.01] rounded-2xl p-6 relative">
        <div className="absolute w-40 h-40 bg-secondary/10 rounded-full blur-2xl animate-pulse-slow" />
        <div className="w-20 h-20 rounded-full border border-primary/50 flex items-center justify-center animate-spin" style={{ animationDuration: '20s' }}>
          <span className="text-2xl">🌍</span>
        </div>
        <div className="mt-6 text-center font-mono">
          <p className="text-xs text-gray-300 font-bold">Thoothukudi, Tamil Nadu, India</p>
          <p className="text-[10px] text-gray-500 mt-1">Geo-Location: 8.7642° N, 78.1348° E</p>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full h-80 relative">
      <Canvas camera={{ position: [0, 0, 3.8], fov: 60 }}>
        <ambientLight intensity={0.4} />
        <pointLight position={[10, 10, 10]} intensity={1.5} />
        <DottedGlobe />
        <OrbitControls enableZoom={false} enablePan={false} autoRotate autoRotateSpeed={0.5} />
      </Canvas>
    </div>
  );
};
