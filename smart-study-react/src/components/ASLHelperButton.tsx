// src/components/ASLHelperButton.tsx
import React from 'react';
import { FaHandsHelping } from 'react-icons/fa'; // Um ícone representativo

const ASLHelperButton: React.FC = () => {
  const openASLDictionary = () => {
    // Abre o dicionário de ASL em uma nova aba
    window.open('https://www.handspeak.com/', '_blank');
  };

  return (
    <button
      onClick={openASLDictionary}
      title="Open ASL Dictionary"
      className="fixed bottom-4 right-4 z-50 bg-purple-600 text-white w-16 h-16 rounded-full flex items-center justify-center shadow-lg transform hover:scale-110 transition-transform animate-fade-in-up"
    >
      <FaHandsHelping size={28} />
    </button>
  );
};

export default ASLHelperButton;