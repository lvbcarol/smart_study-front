// src/context/SoundContext.tsx
import React, { createContext, useContext, ReactNode, useRef, useEffect } from 'react'; // ✅ useEffect adicionado aqui

// Funções para tocar os sons
const playSound = (audioRef: React.RefObject<HTMLAudioElement>) => {
  if (audioRef.current) {
    audioRef.current.currentTime = 0; // Reinicia o som para que possa ser tocado de novo rapidamente
    audioRef.current.play().catch(error => console.error("Error playing sound:", error)); // Adicionado .catch para evitar erros
  }
};

interface SoundContextType {
  playAppearSound: () => void;
  playHoverSound: () => void;
  playClickSound: () => void;
}

const SoundContext = createContext<SoundContextType | undefined>(undefined);

export const SoundProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  // Criamos uma referência para cada efeito sonoro
  const appearSoundRef = useRef<HTMLAudioElement>(new Audio('/sound-appear.mp3'));
  const hoverSoundRef = useRef<HTMLAudioElement>(new Audio('/sound-hover.mp3'));
  const clickSoundRef = useRef<HTMLAudioElement>(new Audio('/sound-click.mp3'));

  // Ajusta o volume para não ser muito alto
  useEffect(() => {
    if (appearSoundRef.current) appearSoundRef.current.volume = 0.3;
    if (hoverSoundRef.current) hoverSoundRef.current.volume = 0.2;
    if (clickSoundRef.current) clickSoundRef.current.volume = 0.5;
  }, []); // Este useEffect estava causando o erro por não ter sido importado

  const value = {
    playAppearSound: () => playSound(appearSoundRef),
    playHoverSound: () => playSound(hoverSoundRef),
    playClickSound: () => playSound(clickSoundRef),
  };

  return (
    <SoundContext.Provider value={value}>
      {children}
    </SoundContext.Provider>
  );
};

// Hook customizado para facilitar o uso
export const useSounds = (): SoundContextType => {
  const context = useContext(SoundContext);
  if (context === undefined) {
    throw new Error('useSounds must be used within a SoundProvider');
  }
  return context;
};