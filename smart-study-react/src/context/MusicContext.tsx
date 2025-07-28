// src/context/MusicContext.tsx
import React, { createContext, useState, useContext, ReactNode, useRef, useEffect } from 'react';

interface MusicContextType {
  isPlaying: boolean;
  togglePlayPause: () => void;
}

const MusicContext = createContext<MusicContextType | undefined>(undefined);

export const MusicProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  // O useRef é essencial aqui. Ele garante que teremos apenas UMA instância do áudio
  // que persiste durante toda a vida do aplicativo, em vez de ser recriada.
  const audioRef = useRef<HTMLAudioElement | null>(null);
  
  const [isPlaying, setIsPlaying] = useState(false);

  // Este useEffect roda apenas uma vez, quando o app é carregado
  useEffect(() => {
    // Cria o objeto de áudio e o atribui à nossa referência
    audioRef.current = new Audio('/study-music.mp3');
    audioRef.current.loop = true; // Faz a música tocar em loop
  }, []);

  const togglePlayPause = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  return (
    <MusicContext.Provider value={{ isPlaying, togglePlayPause }}>
      {children}
    </MusicContext.Provider>
  );
};

// Hook customizado para facilitar o uso do contexto
export const useMusic = (): MusicContextType => {
  const context = useContext(MusicContext);
  if (context === undefined) {
    throw new Error('useMusic must be used within a MusicProvider');
  }
  return context;
};