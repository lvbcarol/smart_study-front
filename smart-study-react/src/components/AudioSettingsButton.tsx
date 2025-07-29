// src/components/AudioSettingsButton.tsx
import React, { useState } from 'react';
import { FaCog } from 'react-icons/fa'; // Importa apenas o ícone de engrenagem
import AudioSettingsModal from './AudioSettingsModal';

const AudioSettingsButton: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <>
      {/* Este é o único botão flutuante visível na tela */}
      <button
        onClick={() => setIsModalOpen(true)}
        title="Audio Settings"
        className="fixed bottom-4 left-4 z-50 bg-white bg-opacity-20 text-white w-14 h-14 rounded-full flex items-center justify-center shadow-lg backdrop-blur-sm hover:scale-110 transition-transform"
      >
        <FaCog size={24} />
      </button>

      <AudioSettingsModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </>
  );
};

export default AudioSettingsButton;