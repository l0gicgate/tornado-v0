import React, { useEffect, useState } from 'react';
import { useFrame, Vector3 } from '@react-three/fiber';
import { Instance, Instances } from '@react-three/drei';

type ParticleState = {
  position: Vector3;
  velocity: Vector3;
  color: string;
}[];

export const Explosion: React.FC<{ position: [number, number, number] }> = ({ position }) => {
  const [particles, setParticles] = useState<
    {
      position: Vector3;
      velocity: Vector3;
      color: string;
    }[]
  >([]);

  useEffect(() => {
    const newParticles = [];
    for (let i = 0; i < 50; i++) {
      newParticles.push({
        position: [
          position[0] + (Math.random() - 0.5) * 2,
          position[1] + (Math.random() - 0.5) * 2,
          position[2] + (Math.random() - 0.5) * 2,
        ],
        velocity: [(Math.random() - 0.5) * 0.1, (Math.random() - 0.5) * 0.1, (Math.random() - 0.5) * 0.1],
        color: Math.random() > 0.5 ? '#FFD700' : '#FF6347',
      });
    }
    setParticles(newParticles as ParticleState);
  }, [position]);

  useFrame(() => {
    setParticles((prevParticles) =>
      prevParticles.map((particle) => ({
        ...particle,
        position: [
          // @ts-expect-error - stupid
          particle.position[0] + particle.velocity[0],
          // @ts-expect-error - stupid
          particle.position[1] + particle.velocity[1],
          // @ts-expect-error - stupid
          particle.position[2] + particle.velocity[2],
        ],
      })),
    );
  });

  return (
    <Instances limit={50}>
      <boxGeometry args={[0.1, 0.1, 0.1]} />
      <meshStandardMaterial />
      {particles.map((particle, index) => (
        <Instance key={index} position={particle.position} color={particle.color} />
      ))}
    </Instances>
  );
};
