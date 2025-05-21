
import { useRef, useEffect } from 'react';
import { useTheme } from '@/contexts/ThemeContext';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Sphere } from '@react-three/drei';
import * as THREE from 'three';

export function Earth3D({ isVisible }: { isVisible: boolean }) {
  const { resolvedTheme } = useTheme();

  return (
    <div 
      className={`w-full h-full min-h-[400px] transition-all duration-1000 transform ${
        isVisible ? "opacity-100 scale-100" : "opacity-0 scale-95"
      }`}
      style={{ transitionDelay: "500ms" }}
    >
      <Canvas className="w-full h-full">
        <ambientLight intensity={0.1} />
        <directionalLight position={[2, 2, 5]} intensity={1} />
        
        <Globe resolvedTheme={resolvedTheme} />
        
        <OrbitControls 
          enableZoom={false}
          autoRotate
          autoRotateSpeed={0.5}
          minPolarAngle={Math.PI / 3}
          maxPolarAngle={Math.PI / 1.5}
        />
      </Canvas>
    </div>
  );
}

function Globe({ resolvedTheme }: { resolvedTheme: 'light' | 'dark' }) {
  const earthRef = useRef<THREE.Mesh>(null);
  const cloudsRef = useRef<THREE.Mesh>(null);

  // Load textures
  const earthTexture = new THREE.TextureLoader().load('/textures/earth_daymap.jpg');
  const earthBumpMap = new THREE.TextureLoader().load('/textures/earth_bumpmap.jpg');
  const cloudTexture = new THREE.TextureLoader().load('/textures/earth_clouds.png');
  
  // University locations - longitude and latitude
  const universities = [
    { name: "Harvard", lat: 42.3744, lng: -71.1169 },
    { name: "Oxford", lat: 51.7548, lng: -1.2544 },
    { name: "Tokyo University", lat: 35.7128, lng: 139.7628 },
    { name: "Stanford", lat: 37.4275, lng: -122.1697 },
    { name: "Melbourne University", lat: -37.7982, lng: 144.9614 },
    { name: "Sorbonne", lat: 48.8503, lng: 2.3433 }
  ];

  // Animation
  useFrame(() => {
    if (earthRef.current) {
      earthRef.current.rotation.y += 0.001;
    }
    if (cloudsRef.current) {
      cloudsRef.current.rotation.y += 0.0015;
    }
  });

  return (
    <group>
      {/* Earth */}
      <Sphere ref={earthRef} args={[1, 64, 64]} scale={2}>
        <meshPhongMaterial 
          map={earthTexture} 
          bumpMap={earthBumpMap} 
          bumpScale={0.1}
        />
      </Sphere>
      
      {/* Clouds */}
      <Sphere ref={cloudsRef} args={[1, 64, 64]} scale={2.01}>
        <meshPhongMaterial 
          map={cloudTexture} 
          transparent={true} 
          opacity={0.4}
        />
      </Sphere>

      {/* University markers */}
      {universities.map((uni, i) => {
        const phi = (90 - uni.lat) * (Math.PI / 180);
        const theta = (uni.lng + 180) * (Math.PI / 180);
        
        // Convert from spherical to Cartesian coordinates
        const x = -(2.1 * Math.sin(phi) * Math.cos(theta));
        const y = 2.1 * Math.cos(phi);
        const z = 2.1 * Math.sin(phi) * Math.sin(theta);
        
        return (
          <group key={i} position={[x, y, z]}>
            {/* University point */}
            <mesh>
              <sphereGeometry args={[0.025, 16, 16]} />
              <meshBasicMaterial color={resolvedTheme === 'dark' ? "#60a5fa" : "#3b82f6"} />
            </mesh>
            
            {/* Pulsing effect */}
            <mesh>
              <sphereGeometry args={[0.035, 16, 16]} />
              <meshBasicMaterial 
                color={resolvedTheme === 'dark' ? "#60a5fa" : "#3b82f6"} 
                transparent={true} 
                opacity={0.6} 
              />
            </mesh>
          </group>
        );
      })}
    </group>
  );
}
