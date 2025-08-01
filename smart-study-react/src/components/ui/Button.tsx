// src/components/ui/Button.tsx
import React from 'react';
// ✅ CORREÇÃO: A importação do hook de som estava faltando
import { useInteractiveSound } from '../../hooks/useInteractiveSound';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  variant?: 'primary' | 'secondary';
}

const Button: React.FC<ButtonProps> = ({ children, variant = 'primary', ...props }) => {
  // ✅ CORREÇÃO: A chamada para o hook estava faltando
  const soundEvents = useInteractiveSound();
  
  const baseStyle = "w-full py-2.5 px-4 rounded-md font-semibold text-center transition-transform transform hover:scale-105 disabled:opacity-50 disabled:scale-100";

  const styles = {
    primary: "bg-gradient-to-r from-blue-600 to-purple-600 text-white",
    secondary: "bg-white text-gray-800 border border-gray-400 hover:bg-gray-100",
  };

  return (
    <button {...soundEvents} {...props} className={`${baseStyle} ${styles[variant]}`}>
      {children}
    </button>
  );
};

export default Button;