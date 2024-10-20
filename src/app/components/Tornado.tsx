import React, { useRef, useState } from 'react';
import { useFrame } from '@react-three/fiber';
import { Group } from 'three';

export const Tornado: React.FC<{ position: [number, number, number] }> = ({ position }) => {
  const tornadoRef = useRef<Group | null>(null);
  const [rotation, setRotation] = useState(0);

  useFrame((state, delta) => {
    if (tornadoRef.current) {
      setRotation((prev) => prev + delta * 5);
      tornadoRef.current.rotation.y = rotation;
    }
  });

  return (
    <group ref={tornadoRef} position={position}>
      {[...Array(10)].map((_, index) => (
        <mesh key={index} position={[0, index * 0.5, 0]}>
          <cylinderGeometry args={[0.1 + index * 0.1, 0.2 + index * 0.1, 0.4, 16]} />
          <meshPhongMaterial color="#8ED6FF" opacity={0.7} transparent />
        </mesh>
      ))}
    </group>
  );
};
