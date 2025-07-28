// src/components/MusicPlayer.tsx
import React, { useState, useRef, useCallback } from 'react';
import { useMusic } from '../context/MusicContext';
import { FaPlay, FaPause } from 'react-icons/fa';
import { Tooltip } from 'react-tooltip'; // ✅ 1. Importe o Tooltip

const MusicPlayer: React.FC = () => {
  const { isPlaying, togglePlayPause } = useMusic();
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const playerRef = useRef<HTMLButtonElement>(null);
  const dragStartPos = useRef({ x: 0, y: 0 });
  const dragDelta = useRef({ x: 0, y: 0 });

  const handleDragMove = useCallback((event: MouseEvent) => {
    const dx = event.clientX - dragStartPos.current.x;
    const dy = event.clientY - dragStartPos.current.y;
    setPosition({ x: dx, y: dy });
    dragDelta.current = { x: dx, y: dy };
  }, []);

  const handleDragEnd = useCallback(() => {
    setIsDragging(false);
    window.removeEventListener('mousemove', handleDragMove);
    window.removeEventListener('mouseup', handleDragEnd);
  }, [handleDragMove]);

  const handleDragStart = (event: React.MouseEvent<HTMLButtonElement>) => {
    setIsDragging(true);
    dragStartPos.current = {
      x: event.clientX - position.x,
      y: event.clientY - position.y,
    };
    dragDelta.current = { x: 0, y: 0 };
    window.addEventListener('mousemove', handleDragMove);
    window.addEventListener('mouseup', handleDragEnd);
  };
  
  const handleClick = () => {
    if (Math.abs(dragDelta.current.x) < 5 && Math.abs(dragDelta.current.y) < 5) {
      togglePlayPause();
    }
  };

  const tooltipContent = "Click to play/pause music. <br /> Hold and drag to move the button.";
  const tooltipContentPt = "Clique para ligar/desligar a música. <br /> Segure e arraste para mover o botão na tela.";

  return (
    <>
      <button
        ref={playerRef}
        onMouseDown={handleDragStart}
        onClick={handleClick}
        // ✅ 2. Adicione o ID para o Tooltip encontrar o botão
        data-tooltip-id="music-player-tooltip"
        // ✅ 3. Adicione o conteúdo do tooltip em um atributo
        data-tooltip-html={tooltipContentPt} // Você pode usar um 't()' do i18next aqui se quiser
        className={`fixed bottom-4 left-4 z-50 bg-white bg-opacity-20 text-white w-14 h-14 rounded-full flex items-center justify-center shadow-lg backdrop-blur-sm transition-transform duration-100 ${isDragging ? 'cursor-grabbing scale-110' : 'cursor-grab'}`}
        style={{
          transform: `translate(${position.x}px, ${position.y}px)`,
        }}
      >
        {isPlaying ? <FaPause size={20} /> : <FaPlay size={20} />}
      </button>

      {/* ✅ 4. Adicione o componente Tooltip à página */}
      <Tooltip 
        id="music-player-tooltip" 
        place="top"
        effect="solid"
        style={{ backgroundColor: '#2A0E46', color: 'white', borderRadius: '8px' }}
      />
    </>
  );
};

export default MusicPlayer;