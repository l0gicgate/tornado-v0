import React, { useEffect, useRef } from 'react';
import { Box } from '@react-three/drei';
import { Group } from 'three';

export const House: React.FC<{ position: [number, number, number] }> = ({ position }) => {
  const houseRef = useRef<Group | null>(null);

  useEffect(() => {
    if (houseRef.current) {
      houseRef.current.position.set(...position);
    }
  }, [position]);

  return (
    <group ref={houseRef}>
      <Box args={[1, 1, 1]} position={[0, 0.5, 0]}>
        <meshStandardMaterial color="#FFD700" />
      </Box>
      <mesh position={[0, 1.25, 0]} rotation={[0, Math.PI / 4, 0]}>
        <coneGeometry args={[0.8, 0.7, 4]} />
        <meshStandardMaterial color="#FF6347" />
      </mesh>
      <Box args={[0.3, 0.5, 0.1]} position={[0, 0.5, 0.5]}>
        <meshStandardMaterial color="#4169E1" />
      </Box>
    </group>
  );
};
