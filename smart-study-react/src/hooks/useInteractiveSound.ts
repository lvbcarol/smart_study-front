// src/hooks/useInteractiveSound.ts
import { useSounds } from '../context/SoundContext';

export const useInteractiveSound = () => {
  const { playHoverSound, playClickSound } = useSounds();

  // Retorna um objeto com as propriedades que podemos "espalhar" em um componente
  return {
    onMouseEnter: playHoverSound,
    onClick: playClickSound,
  };
};