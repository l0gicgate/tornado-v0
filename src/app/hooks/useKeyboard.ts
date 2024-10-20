import { useEffect, useState } from 'react';

export function useKeyboard(): { [key: string]: boolean } {
  const [keys, setKeys] = useState({});

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => setKeys((keys) => ({ ...keys, [e.code]: true }));
    const handleKeyUp = (e: KeyboardEvent) => setKeys((keys) => ({ ...keys, [e.code]: false }));

    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('keyup', handleKeyUp);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('keyup', handleKeyUp);
    };
  }, []);

  return keys;
}
