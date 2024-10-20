import { useTexture } from '@react-three/drei';
import * as THREE from 'three';
import React from 'react';

export const Grass: React.FC = () => {
  const texture = useTexture('/images/grass-pattern.jpg');
  texture.wrapS = texture.wrapT = THREE.RepeatWrapping;
  texture.repeat.set(100, 100);

  return (
    <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.1, 0]}>
      <planeGeometry args={[1000, 1000]} />
      <meshStandardMaterial map={texture} color="#7CFC00" />
    </mesh>
  );
};
