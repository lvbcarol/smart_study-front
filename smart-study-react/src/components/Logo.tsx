// src/components/Logo.tsx
import React from 'react';
import logoImage from '../assets/logo.png'; 

const Logo: React.FC = () => {
  return (
    <div className="flex flex-col items-center justify-center">
      <img 
        src={logoImage} 
        alt="Smart Study Logo" 
        // ✅ Alterado de w-40 para w-52 para aumentar o tamanho
        className="w-62 h-auto mb-4" 
      />
      <h1 className="text-5xl font-bold text-white tracking-wider">
        Smart Study
      </h1>
    </div>
  );
};

export default Logo;