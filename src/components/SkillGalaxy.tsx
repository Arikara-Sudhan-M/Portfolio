import React, { useRef, useState, useEffect, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Html, OrbitControls } from '@react-three/drei';
import * as THREE from 'three';

interface Skill {
  name: string;
  category: 'Frontend' | 'Backend' | 'Design' | 'Data' | 'Tools';
  percentage: number;
  details: string;
  color: string;
  radius: number;
  angle: number;
  yOffset: number;
}

const skillsData: Skill[] = [
  // Frontend (Blue-cyan theme)
  { name: 'React', category: 'Frontend', percentage: 90, details: 'Hooks, Context, State management, custom optimization', color: '#00D4FF', radius: 2.2, angle: 0, yOffset: 0.2 },
  { name: 'JavaScript', category: 'Frontend', percentage: 88, details: 'ES6+, DOM Manipulation, Async/Promises, API integrations', color: '#00D4FF', radius: 2.2, angle: 1.25, yOffset: -0.3 },
  { name: 'HTML5', category: 'Frontend', percentage: 95, details: 'Semantic layout, SEO optimizations, DOM architecture', color: '#00D4FF', radius: 2.2, angle: 2.5, yOffset: 0.4 },
  { name: 'CSS3/Tailwind', category: 'Frontend', percentage: 92, details: 'Responsive layouts, grid/flex, keyframe animations', color: '#00D4FF', radius: 2.2, angle: 3.75, yOffset: -0.1 },
  
  // Backend (Purple theme)
  { name: 'SQL Database', category: 'Backend', percentage: 80, details: 'Relational queries, structure optimizations, joints', color: '#8B5CF6', radius: 3.0, angle: 0.6, yOffset: 0.6 },
  { name: 'PHP Scripting', category: 'Backend', percentage: 75, details: 'Server logic, REST APIs development, MVC architectures', color: '#8B5CF6', radius: 3.0, angle: 2.1, yOffset: -0.5 },
  
  // Design (Pink theme)
  { name: 'Figma Designer', category: 'Design', percentage: 85, details: 'Component layout, responsive grids, user research', color: '#EC4899', radius: 1.5, angle: 1.8, yOffset: 0.3 },
  { name: 'UI/UX Design', category: 'Design', percentage: 87, details: 'Wireframing, heuristic testing, typography grids', color: '#EC4899', radius: 1.5, angle: 4.5, yOffset: -0.2 },
  
  // Data (Cyan theme)
  { name: 'Power BI', category: 'Data', percentage: 82, details: 'Interactive dashboard analytics, DAX measures', color: '#06B6D4', radius: 3.5, angle: 5.1, yOffset: 0.5 },
  { name: 'Excel Data', category: 'Data', percentage: 85, details: 'VLOOKUPs, pivot charts, macros automation', color: '#06B6D4', radius: 3.5, angle: 3.2, yOffset: -0.6 },
  
  // Tools (Green theme)
  { name: 'Git versioning', category: 'Tools', percentage: 85, details: 'Branching strategies, conflict merge resolutions', color: '#10B981', radius: 1.0, angle: 5.8, yOffset: 0.1 },
  { name: 'GitHub Action', category: 'Tools', percentage: 88, details: 'Repository deployment workflows, issue setups', color: '#10B981', radius: 1.0, angle: 0.1, yOffset: -0.4 },
];

// Logarithmic Spiral Galaxy Particle System
const CosmicBackground: React.FC = () => {
  const pointsRef = useRef<THREE.Points>(null);
  const particleCount = 1500;
  
  const { pos, col } = useMemo(() => {
    const p = new Float32Array(particleCount * 3);
    const c = new Float32Array(particleCount * 3);
    const colorCore = new THREE.Color('#ffffff');
    const colorArm1 = new THREE.Color('#00D4FF'); // Cyan
    const colorArm2 = new THREE.Color('#8B5CF6'); // Purple
    const colorArm3 = new THREE.Color('#EC4899'); // Pink
    
    for (let i = 0; i < particleCount; i++) {
      const armIndex = i % 3;
      const angleOffset = (armIndex * 2 * Math.PI) / 3;
      const r = Math.pow(Math.random(), 2.0) * 5.0 + 0.15;
      const twist = r * 1.6;
      const spread = (Math.random() - 0.5) * 0.4;
      const angle = angleOffset + twist + spread;
      
      const x = r * Math.cos(angle);
      const z = r * Math.sin(angle);
      const y = (Math.random() - 0.5) * Math.max(0.01, 1.0 * (1.0 - r / 5.2));
      
      p[i * 3] = x;
      p[i * 3 + 1] = y;
      p[i * 3 + 2] = z;
      
      let mixedColor = colorCore.clone();
      if (r > 0.6) {
        const t = Math.min(1.0, (r - 0.6) / 4.4);
        if (armIndex === 0) {
          mixedColor.lerpColors(colorArm1, colorArm2, t);
        } else if (armIndex === 1) {
          mixedColor.lerpColors(colorArm2, colorArm3, t);
        } else {
          mixedColor.lerpColors(colorArm3, colorArm1, t);
        }
      }
      
      c[i * 3] = mixedColor.r;
      c[i * 3 + 1] = mixedColor.g;
      c[i * 3 + 2] = mixedColor.b;
    }
    return { pos: p, col: c };
  }, []);
  
  useFrame((state) => {
    if (pointsRef.current) {
      pointsRef.current.rotation.y = state.clock.getElapsedTime() * 0.03;
    }
  });
  
  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          args={[pos, 3]}
        />
        <bufferAttribute
          attach="attributes-color"
          args={[col, 3]}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.03}
        vertexColors
        transparent
        opacity={0.5}
        sizeAttenuation
        depthWrite={false}
        blending={THREE.AdditiveBlending}
      />
    </points>
  );
};

// Galaxy Center node component
const CoreNode: React.FC = () => {
  const coreRef = useRef<THREE.Mesh>(null);
  const shellRef = useRef<THREE.Mesh>(null);
  const lightRef = useRef<THREE.PointLight>(null);
  
  useFrame((state) => {
    const time = state.clock.getElapsedTime();
    if (coreRef.current) {
      coreRef.current.rotation.y = time * 0.2;
      const scaleOsc = 1.0 + Math.sin(time * 2.0) * 0.05;
      coreRef.current.scale.set(scaleOsc, scaleOsc, scaleOsc);
    }
    if (shellRef.current) {
      shellRef.current.rotation.y = -time * 0.4;
      shellRef.current.rotation.x = time * 0.25;
    }
    if (lightRef.current) {
      lightRef.current.intensity = 3.0 + Math.sin(time * 3.0) * 1.0;
    }
  });

  return (
    <group>
      {/* Inner Glowing Core */}
      <mesh ref={coreRef}>
        <sphereGeometry args={[0.3, 32, 32]} />
        <meshStandardMaterial 
          color="#ffffff" 
          emissive="#ffffff" 
          emissiveIntensity={2.5} 
          roughness={0}
        />
      </mesh>
      
      {/* Outer Holographic Shell */}
      <mesh ref={shellRef}>
        <sphereGeometry args={[0.42, 16, 16]} />
        <meshStandardMaterial 
          color="#00D4FF" 
          emissive="#00D4FF" 
          emissiveIntensity={1.0}
          wireframe
          transparent
          opacity={0.3}
        />
      </mesh>

      {/* Holographic orbital ring close to core */}
      <mesh rotation={[Math.PI / 2, 0, 0]}>
        <ringGeometry args={[0.5, 0.7, 32]} />
        <meshBasicMaterial 
          color="#00D4FF" 
          transparent 
          opacity={0.15} 
          side={THREE.DoubleSide} 
        />
      </mesh>
      
      <pointLight ref={lightRef} intensity={3} color="#00D4FF" distance={8} />
    </group>
  );
};

// Skills planet node component
interface PlanetProps {
  skill: Skill;
  onHover: (skill: Skill | null) => void;
  hoveredSkill: Skill | null;
}

const SkillPlanet: React.FC<PlanetProps> = ({ skill, onHover, hoveredSkill }) => {
  const planetGroupRef = useRef<THREE.Group>(null);
  const planetMeshRef = useRef<THREE.Mesh>(null);
  const ringMeshRef = useRef<THREE.Mesh>(null);
  const lineGeometryRef = useRef<THREE.BufferGeometry>(null);
  
  const isHovered = hoveredSkill?.name === skill.name;
  
  // Generate static orbit ring points
  const orbitPoints = useMemo(() => {
    const points = [];
    const segments = 64;
    for (let i = 0; i <= segments; i++) {
      const theta = (i / segments) * Math.PI * 2;
      points.push(skill.radius * Math.cos(theta), skill.yOffset, skill.radius * Math.sin(theta));
    }
    return new Float32Array(points);
  }, [skill.radius, skill.yOffset]);
  
  // Track animation state with refs for smooth lerping
  const hoverScaleRef = useRef(1.0);
  const hoverGlowRef = useRef(0.6);
  const hoverYRef = useRef(skill.yOffset);
  
  // Trail nodes data structure: 3 trails
  const trailCount = 3;
  const trailRefs = useRef<(THREE.Mesh | null)[]>([]);
  
  // Pre-initialize position values for connection line attribute to avoid warnings
  const initialPositions = useMemo(() => {
    const startX = skill.radius * Math.cos(skill.angle);
    const startZ = skill.radius * Math.sin(skill.angle);
    return new Float32Array([0, 0, 0, startX, skill.yOffset, startZ]);
  }, [skill.radius, skill.angle, skill.yOffset]);

  useFrame((state) => {
    const time = state.clock.getElapsedTime();
    
    // Rotate planet around center
    const speed = 0.15 / skill.radius; 
    const currentAngle = skill.angle + time * speed;
    
    // Lerp hover transitions
    const targetScale = isHovered ? 1.6 : 1.0;
    const targetGlow = isHovered ? 2.5 : 0.6;
    const targetY = isHovered ? skill.yOffset + 0.35 : skill.yOffset;
    
    hoverScaleRef.current = THREE.MathUtils.lerp(hoverScaleRef.current, targetScale, 0.1);
    hoverGlowRef.current = THREE.MathUtils.lerp(hoverGlowRef.current, targetGlow, 0.1);
    hoverYRef.current = THREE.MathUtils.lerp(hoverYRef.current, targetY, 0.1);
    
    // Update planet group position
    const currentX = skill.radius * Math.cos(currentAngle);
    const currentZ = skill.radius * Math.sin(currentAngle);
    const currentY = hoverYRef.current;
    
    if (planetGroupRef.current) {
      planetGroupRef.current.position.set(currentX, currentY, currentZ);
    }
    
    // Spin planet self-axis
    if (planetMeshRef.current) {
      planetMeshRef.current.rotation.y = time * 0.8;
      const s = hoverScaleRef.current * 0.15; // Base radius 0.15
      planetMeshRef.current.scale.set(s, s, s);
    }
    
    // Spin planetary ring in opposite direction
    if (ringMeshRef.current) {
      ringMeshRef.current.rotation.z = -time * 0.4;
      const ringScale = hoverScaleRef.current;
      ringMeshRef.current.scale.set(ringScale, ringScale, ringScale);
    }
    
    // Update trails position (delayed angles)
    for (let i = 0; i < trailCount; i++) {
      const trailMesh = trailRefs.current[i];
      if (trailMesh) {
        const trailDelay = (i + 1) * 0.05; // angle delay
        const trailAngle = currentAngle - trailDelay;
        const trailX = skill.radius * Math.cos(trailAngle);
        const trailZ = skill.radius * Math.sin(trailAngle);
        trailMesh.position.set(trailX, skill.yOffset, trailZ);
      }
    }
    
    // Update dynamic connecting line geometry
    if (lineGeometryRef.current) {
      const positionAttr = lineGeometryRef.current.attributes.position as THREE.BufferAttribute;
      if (positionAttr) {
        positionAttr.setXYZ(0, 0, 0, 0); // Center
        positionAttr.setXYZ(1, currentX, currentY, currentZ); // Planet
        positionAttr.needsUpdate = true;
      }
    }
  });

  return (
    <group>
      {/* 1. Orbit Path Ring */}
      <line>
        <bufferGeometry attach="geometry">
          <bufferAttribute
            attach="attributes-position"
            args={[orbitPoints, 3]}
          />
        </bufferGeometry>
        <lineBasicMaterial 
          attach="material" 
          color={skill.color} 
          opacity={isHovered ? 0.35 : 0.08} 
          transparent 
        />
      </line>
      
      {/* 2. Motion Trails */}
      {Array.from({ length: trailCount }).map((_, idx) => {
        const opacity = (1.0 - (idx + 1) / (trailCount + 1)) * 0.35;
        const sizeScale = 1.0 - (idx + 1) * 0.22;
        return (
          <mesh 
            key={idx} 
            ref={el => { trailRefs.current[idx] = el; }}
          >
            <sphereGeometry args={[0.1 * sizeScale, 8, 8]} />
            <meshBasicMaterial 
              color={skill.color} 
              transparent 
              opacity={opacity} 
            />
          </mesh>
        );
      })}

      {/* 3. Connecting Line */}
      <line>
        <bufferGeometry ref={lineGeometryRef}>
          <bufferAttribute
            attach="attributes-position"
            args={[initialPositions, 3]}
          />
        </bufferGeometry>
        <lineBasicMaterial 
          attach="material" 
          color={skill.color} 
          opacity={isHovered ? 0.6 : 0.15} 
          transparent 
        />
      </line>

      {/* 4. Planet & Label Group */}
      <group 
        ref={planetGroupRef}
        onPointerOver={(e) => {
          e.stopPropagation();
          onHover(skill);
        }}
        onPointerOut={() => onHover(null)}
      >
        {/* Actual Planet Sphere */}
        <mesh ref={planetMeshRef}>
          <sphereGeometry args={[1, 16, 16]} />
          <meshStandardMaterial 
            color={skill.color} 
            emissive={skill.color} 
            emissiveIntensity={isHovered ? 2.5 : 0.6}
            roughness={0.1}
          />
        </mesh>
        
        {/* Mini Saturn-style Ring around Planet */}
        <mesh ref={ringMeshRef} rotation={[Math.PI / 2.5, 0, 0]}>
          <ringGeometry args={[0.22, 0.28, 32]} />
          <meshBasicMaterial 
            color={skill.color} 
            transparent 
            opacity={isHovered ? 0.6 : 0.2} 
            side={THREE.DoubleSide} 
          />
        </mesh>
        
        {/* Floating skill name tag */}
        <Html distanceFactor={2.5} position={[0, 0.38, 0]} className="pointer-events-none select-none">
          <div 
            className="px-2.5 py-0.5 rounded text-[8px] font-mono whitespace-nowrap border bg-[#03030b]/90 transition-all duration-300"
            style={{ 
              borderColor: isHovered ? skill.color : 'rgba(255,255,255,0.05)',
              color: isHovered ? '#ffffff' : '#9ca3af',
              boxShadow: isHovered ? `0 0 10px ${skill.color}77` : 'none',
              transform: isHovered ? 'scale(1.15)' : 'scale(1)'
            }}
          >
            {skill.name}
          </div>
        </Html>
      </group>
    </group>
  );
};

export const SkillGalaxy: React.FC = () => {
  const [hoveredSkill, setHoveredSkill] = useState<Skill | null>(null);
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
    const categories = ['Frontend', 'Backend', 'Design', 'Data', 'Tools'] as const;
    
    return (
      <div className="grid grid-cols-1 gap-6 p-4">
        {categories.map((cat) => (
          <div key={cat} className="p-4 rounded-xl border border-white/5 bg-white/[0.02] backdrop-blur-md">
            <h3 className="font-display font-bold text-sm tracking-wider text-primary mb-3 uppercase border-b border-white/5 pb-1">
              {cat}
            </h3>
            <div className="flex flex-col gap-3">
              {skillsData
                .filter((s) => s.category === cat)
                .map((skill) => (
                  <div key={skill.name} className="flex flex-col gap-1.5">
                    <div className="flex items-center justify-between text-xs font-sans text-gray-300">
                      <span>{skill.name}</span>
                      <span className="font-mono text-primary font-semibold">{skill.percentage}%</span>
                    </div>
                    <div className="w-full h-1 bg-white/10 rounded-full overflow-hidden">
                      <div 
                        className="h-full rounded-full transition-all duration-1000"
                        style={{ width: `${skill.percentage}%`, backgroundColor: skill.color }}
                      />
                    </div>
                    <span className="text-[10px] text-gray-400">{skill.details}</span>
                  </div>
                ))}
            </div>
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className="w-full h-[500px] relative">
      {/* Galaxy Canvas */}
      <Canvas camera={{ position: [0, 4.5, 5.5], fov: 55 }}>
        <ambientLight intensity={0.5} />
        <pointLight position={[10, 10, 10]} intensity={1.5} />
        <CosmicBackground />
        <CoreNode />
        
        {skillsData.map((skill) => (
          <SkillPlanet 
            key={skill.name} 
            skill={skill} 
            onHover={setHoveredSkill} 
            hoveredSkill={hoveredSkill}
          />
        ))}
        
        <OrbitControls 
          enableZoom={false} 
          enablePan={false}
          autoRotate={!hoveredSkill}
          autoRotateSpeed={0.8}
          maxPolarAngle={Math.PI / 2.2}
          minPolarAngle={Math.PI / 4}
        />
      </Canvas>

      {/* Floating HUD Skill Detail Cards (displays at the bottom left overlay) */}
      <div className="absolute bottom-6 left-6 right-6 md:right-auto md:w-80 pointer-events-none">
        <div 
          className="p-5 rounded-2xl glassmorphism border transition-all duration-500 relative overflow-hidden"
          style={{
            borderColor: hoveredSkill ? `${hoveredSkill.color}33` : 'rgba(255, 255, 255, 0.1)',
            boxShadow: hoveredSkill ? `0 0 30px ${hoveredSkill.color}15, inset 0 0 20px ${hoveredSkill.color}08` : 'none'
          }}
        >
          {/* Sci-Fi HUD Corner Crosshairs */}
          <div className="absolute top-2 left-2 w-2 h-2 border-t border-l border-white/20 pointer-events-none" />
          <div className="absolute top-2 right-2 w-2 h-2 border-t border-r border-white/20 pointer-events-none" />
          <div className="absolute bottom-2 left-2 w-2 h-2 border-b border-l border-white/20 pointer-events-none" />
          <div className="absolute bottom-2 right-2 w-2 h-2 border-b border-r border-white/20 pointer-events-none" />

          {hoveredSkill ? (
            <div>
              <span 
                className="text-[9px] font-mono font-bold tracking-widest uppercase px-2 py-0.5 rounded transition-all duration-300"
                style={{ backgroundColor: `${hoveredSkill.color}22`, color: hoveredSkill.color }}
              >
                {hoveredSkill.category}
              </span>
              <h3 className="font-display font-extrabold text-lg text-white mt-2 flex items-center justify-between">
                {hoveredSkill.name}
                <span className="font-mono font-bold text-glow-primary transition-all duration-300" style={{ color: hoveredSkill.color }}>
                  {hoveredSkill.percentage}%
                </span>
              </h3>
              <p className="font-sans text-xs text-gray-300 mt-2 leading-relaxed">
                {hoveredSkill.details}
              </p>
              
              {/* Glowing progress line bar indicator */}
              <div className="mt-3.5 w-full h-[2px] bg-white/10 rounded-full overflow-hidden">
                <div 
                  className="h-full rounded-full transition-all duration-500"
                  style={{ width: `${hoveredSkill.percentage}%`, backgroundColor: hoveredSkill.color }}
                />
              </div>
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center text-center h-[90px] text-gray-400">
              <span className="text-lg animate-pulse">🌌</span>
              <p className="font-sans text-xs mt-1.5 font-medium tracking-wide">
                Hover planet nodes in the galaxy to reveal skill analytics
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
