// src/context/SoundContext.tsx
import React, { createContext, useContext, ReactNode, useRef, useEffect, useCallback } from 'react';

interface SoundContextType {
  playAppearSound: () => void;
  playHoverSound: () => void;
  playClickSound: () => void;
}

const SoundContext = createContext<SoundContextType | undefined>(undefined);

export const SoundProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const appearSoundRef = useRef<HTMLAudioElement | null>(null);
  const hoverSoundRef = useRef<HTMLAudioElement | null>(null);
  const clickSoundRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    // Carrega os sons e define um volume padrão
    appearSoundRef.current = new Audio('/sound-appear.mp3');
    appearSoundRef.current.volume = 0.3;
    
    hoverSoundRef.current = new Audio('/sound-hover.mp3');
    hoverSoundRef.current.volume = 0.2;

    clickSoundRef.current = new Audio('/sound-click.mp3');
    clickSoundRef.current.volume = 0.5;
  }, []);
  
  const playSound = useCallback((audioRef: React.RefObject<HTMLAudioElement>) => {
    if (audioRef.current) {
      audioRef.current.currentTime = 0;
      audioRef.current.play().catch(error => console.error("Error playing sound:", error));
    }
  }, []);

  const value = {
    playAppearSound: () => playSound(appearSoundRef),
    playHoverSound: () => playSound(hoverSoundRef),
    playClickSound: () => playSound(clickSoundRef),
  };

  return <SoundContext.Provider value={value}>{children}</SoundContext.Provider>;
};

export const useSounds = (): SoundContextType => {
  const context = useContext(SoundContext);
  if (context === undefined) {
    throw new Error('useSounds must be used within a SoundProvider');
  }
  return context;
};