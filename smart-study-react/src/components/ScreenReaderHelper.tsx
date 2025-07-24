// src/components/ScreenReaderHelper.tsx
import React from 'react';
import { FaHeadphones } from 'react-icons/fa';

const ScreenReaderHelper: React.FC = () => {
  const openScreenReaderWebsite = () => {
    window.open('https://www.nvaccess.org/download/', '_blank');
  };

  return (
    <button
      onClick={openScreenReaderWebsite}
      title="Learn about NVDA, a free screen reader"
      className="fixed bottom-4 left-4 z-50 bg-cyan-500 text-white w-16 h-16 rounded-full flex items-center justify-center shadow-lg transform hover:scale-110 transition-transform animate-fade-in-up"
    >
      <FaHeadphones size={28} />
    </button>
  );
};

export default ScreenReaderHelper;