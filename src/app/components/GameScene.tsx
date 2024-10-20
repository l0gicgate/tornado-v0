import React, { Dispatch, SetStateAction, useEffect, useState } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import { Environment } from '@react-three/drei';
import { Tornado } from '@/app/components/Tornado';
import { House } from '@/app/components/House';
import { Explosion } from '@/app/components/Explosion';
import { Grass } from '@/app/components/Grass';
import { useKeyboard } from '@/app/hooks/useKeyboard';

export const GameScene: React.FC<{ setScore: Dispatch<SetStateAction<number>> }> = ({ setScore }) => {
  const [tornadoPosition, setTornadoPosition] = useState([0, 0, 0]);
  const [houses, setHouses] = useState<number[][]>([]);
  const [explosions, setExplosions] = useState<
    {
      position: number[];
      id: number;
    }[]
  >([]);
  const { camera } = useThree();
  const keys = useKeyboard();

  useEffect(() => {
    generateHouses();
  }, []);

  useFrame((state, delta) => {
    const speed = 5;
    let newX = tornadoPosition[0];
    let newZ = tornadoPosition[2];

    if (keys['ArrowUp']) newZ -= speed * delta;
    if (keys['ArrowDown']) newZ += speed * delta;
    if (keys['ArrowLeft']) newX -= speed * delta;
    if (keys['ArrowRight']) newX += speed * delta;

    setTornadoPosition([newX, tornadoPosition[1], newZ]);

    camera.position.set(newX, tornadoPosition[1] + 5, newZ + 10);
    camera.lookAt(newX, tornadoPosition[1], newZ);

    checkCollisions();
  });

  const generateHouses = () => {
    const newHouses = [];
    for (let i = 0; i < 20; i++) {
      newHouses.push([Math.random() * 40 - 20, 0, Math.random() * 40 - 20]);
    }
    setHouses(newHouses);
  };

  const checkCollisions = () => {
    const tornadoRadius = 1;
    setHouses((prevHouses) => {
      const newHouses = prevHouses.filter((house) => {
        const distance = Math.sqrt(
          Math.pow(house[0] - tornadoPosition[0], 2) + Math.pow(house[2] - tornadoPosition[2], 2),
        );
        if (distance < tornadoRadius + 0.5) {
          setScore((prevScore) => prevScore + 1);
          setExplosions((prevExplosions) => [...prevExplosions, { position: house, id: Date.now() }]);
          return false;
        }
        return true;
      });

      if (newHouses.length < 10) {
        for (let i = 0; i < 5; i++) {
          newHouses.push([Math.random() * 40 - 20, 0, Math.random() * 40 - 20]);
        }
      }

      return newHouses;
    });
  };

  return (
    <>
      <Environment preset="sunset" />
      <ambientLight intensity={0.5} />
      <directionalLight position={[10, 10, 5]} intensity={1.5} castShadow />
      <Tornado position={tornadoPosition as [number, number, number]} />
      {houses.map((position, index) => (
        <House key={index} position={position as [number, number, number]} />
      ))}
      {explosions.map((explosion) => (
        <Explosion key={explosion.id} position={explosion.position as [number, number, number]} />
      ))}
      <Grass />
    </>
  );
};
