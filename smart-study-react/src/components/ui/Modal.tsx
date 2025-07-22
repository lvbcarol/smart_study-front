// src/components/ui/Modal.tsx
import React, { ReactNode } from 'react';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: ReactNode;
}

const Modal: React.FC<ModalProps> = ({ isOpen, onClose, title, children }) => {
  if (!isOpen) return null;

  return (
    // Overlay
    <div 
      onClick={onClose} 
      className="fixed inset-0 bg-black bg-opacity-60 z-50 flex justify-center items-center p-4"
    >
      {/* Conteúdo do Modal */}
      <div 
        onClick={(e) => e.stopPropagation()} // Impede que o clique dentro do modal o feche
        className="bg-white text-black rounded-lg shadow-lg p-6 w-full max-w-md animate-fade-in-up"
        style={{ animationDuration: '0.3s' }}
      >
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-xl font-bold">{title}</h3>
          <button onClick={onClose} className="text-2xl text-gray-500 hover:text-black">&times;</button>
        </div>
        <div>{children}</div>
      </div>
    </div>
  );
};

export default Modal;