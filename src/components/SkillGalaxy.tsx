import React, { useRef, useState, useEffect } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Html, OrbitControls } from '@react-three/drei';
import * as THREE from 'three';

interface Skill {
  name: string;
  category: 'Frontend' | 'Backend' | 'Design' | 'Data' | 'Tools';
  percentage: number;
  details: string;
  color: string;
  // Polar coordinates for placement
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

// Galaxy Center node component
const CoreNode: React.FC = () => {
  const meshRef = useRef<THREE.Mesh>(null);
  
  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.y = state.clock.getElapsedTime() * 0.4;
      meshRef.current.rotation.x = state.clock.getElapsedTime() * 0.2;
    }
  });

  return (
    <mesh ref={meshRef}>
      <sphereGeometry args={[0.4, 32, 32]} />
      <meshStandardMaterial 
        color="#ffffff" 
        emissive="#00D4FF" 
        emissiveIntensity={1.5} 
        roughness={0}
      />
      <pointLight intensity={3} color="#00D4FF" distance={6} />
    </mesh>
  );
};

// Skills planet node component
interface PlanetProps {
  skill: Skill;
  onHover: (skill: Skill | null) => void;
  hoveredSkill: Skill | null;
}

const SkillPlanet: React.FC<PlanetProps> = ({ skill, onHover, hoveredSkill }) => {
  const planetRef = useRef<THREE.Group>(null);
  const isHovered = hoveredSkill?.name === skill.name;

  // Calculate position
  const x = skill.radius * Math.cos(skill.angle);
  const z = skill.radius * Math.sin(skill.angle);
  const y = skill.yOffset;

  useFrame((state) => {
    if (planetRef.current && !isHovered) {
      // Rotate planet around center
      const speed = 0.15 / skill.radius; // Closer planets rotate faster
      const currentAngle = skill.angle + state.clock.getElapsedTime() * speed;
      planetRef.current.position.x = skill.radius * Math.cos(currentAngle);
      planetRef.current.position.z = skill.radius * Math.sin(currentAngle);
    }
  });

  return (
    <group 
      ref={planetRef} 
      position={[x, y, z]}
      onPointerOver={(e) => {
        e.stopPropagation();
        onHover(skill);
      }}
      onPointerOut={() => onHover(null)}
    >
      <mesh>
        <sphereGeometry args={[isHovered ? 0.22 : 0.15, 16, 16]} />
        <meshStandardMaterial 
          color={skill.color} 
          emissive={skill.color} 
          emissiveIntensity={isHovered ? 1.8 : 0.6}
          roughness={0.1}
        />
      </mesh>
      
      {/* Dynamic line connecting to core */}
      <line>
        <bufferGeometry attach="geometry" />
        <lineBasicMaterial attach="material" color={skill.color} opacity={isHovered ? 0.8 : 0.2} transparent />
      </line>

      {/* Floating skill name tag */}
      <Html distanceFactor={2.5} position={[0, 0.35, 0]} className="pointer-events-none select-none">
        <div 
          className="px-2 py-0.5 rounded text-[8px] font-mono whitespace-nowrap border bg-[#03030b]/90"
          style={{ 
            borderColor: isHovered ? skill.color : 'rgba(255,255,255,0.05)',
            color: isHovered ? '#white' : '#9ca3af',
            boxShadow: isHovered ? `0 0 10px ${skill.color}55` : 'none'
          }}
        >
          {skill.name}
        </div>
      </Html>
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
    // Elegant mobile lists grouped by category with skill percentages
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
        <CoreNode />
        
        {skillsData.map((skill) => (
          <SkillPlanet 
            key={skill.name} 
            skill={skill} 
            onHover={setHoveredSkill} 
            hoveredSkill={hoveredSkill}
          />
        ))}
        
        {/* Enable mouse-control rotation */}
        <OrbitControls 
          enableZoom={false} 
          enablePan={false}
          autoRotate={!hoveredSkill} // Pause auto-rotation when hovering a skill node
          autoRotateSpeed={0.8}
          maxPolarAngle={Math.PI / 2.2} // Prevent user from looking fully under ground
          minPolarAngle={Math.PI / 4}
        />
      </Canvas>

      {/* Floating HUD Skill Detail Cards (displays at the bottom left overlay) */}
      <div className="absolute bottom-6 left-6 right-6 md:right-auto md:w-80 pointer-events-none">
        <div className="p-5 rounded-2xl glassmorphism border border-white/10 min-h-[120px] transition-all duration-300 relative overflow-hidden">
          {hoveredSkill ? (
            <div>
              <span 
                className="text-[9px] font-mono font-bold tracking-widest uppercase px-2 py-0.5 rounded"
                style={{ backgroundColor: `${hoveredSkill.color}22`, color: hoveredSkill.color }}
              >
                {hoveredSkill.category}
              </span>
              <h3 className="font-display font-extrabold text-lg text-white mt-2 flex items-center justify-between">
                {hoveredSkill.name}
                <span className="font-mono font-bold text-glow-primary" style={{ color: hoveredSkill.color }}>
                  {hoveredSkill.percentage}%
                </span>
              </h3>
              <p className="font-sans text-xs text-gray-300 mt-2 leading-relaxed">
                {hoveredSkill.details}
              </p>
              
              {/* Glowing progress line bar indicator */}
              <div className="mt-3.5 w-full h-[2px] bg-white/10 rounded-full overflow-hidden">
                <div 
                  className="h-full rounded-full transition-all duration-300"
                  style={{ width: `${hoveredSkill.percentage}%`, backgroundColor: hoveredSkill.color }}
                />
              </div>
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center text-center h-[90px] text-gray-400">
              <span className="text-lg animate-bounce">🌌</span>
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
