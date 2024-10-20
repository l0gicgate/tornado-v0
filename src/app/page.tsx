'use client';

import React, { useState } from 'react';
import { Canvas } from '@react-three/fiber';
import { PerspectiveCamera } from '@react-three/drei';
import { GameScene } from '@/app/components/GameScene';

export default function Game() {
  const [score, setScore] = useState(0);

  return (
    <div className="w-full h-screen relative">
      <Canvas shadows>
        <PerspectiveCamera makeDefault position={[0, 5, 10]} />
        <GameScene setScore={setScore} />
      </Canvas>
      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 text-white text-center">
        <p className="bg-black bg-opacity-50 p-2 rounded">
          Use arrow keys to move the tornado: Up (forward), Down (backward), Left, Right
        </p>
      </div>
      <div className="absolute bottom-4 left-4 bg-black bg-opacity-50 rounded-full w-16 h-16 flex items-center justify-center">
        <span className="text-white text-2xl font-bold">{score}</span>
      </div>
    </div>
  );
}
