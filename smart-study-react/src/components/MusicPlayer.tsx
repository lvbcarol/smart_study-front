// src/components/MusicPlayer.tsx
import React from 'react';
import { useMusic } from '../context/MusicContext';
import { FaPlay, FaPause } from 'react-icons/fa';

const MusicPlayer: React.FC = () => {
  const { isPlaying, togglePlayPause } = useMusic();

  return (
    <button
      onClick={togglePlayPause}
      title={isPlaying ? "Pause music" : "Play music"}
      // Posiciona o botão no canto inferior esquerdo
      className="fixed bottom-4 left-4 z-50 bg-white bg-opacity-20 text-white w-14 h-14 rounded-full flex items-center justify-center shadow-lg transform hover:scale-110 transition-transform backdrop-blur-sm"
    >
      {/* Mostra o ícone de Pause se estiver tocando, e o de Play se estiver pausado */}
      {isPlaying ? <FaPause size={20} /> : <FaPlay size={20} />}
    </button>
  );
};

export default MusicPlayer;