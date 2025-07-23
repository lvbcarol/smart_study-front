// src/context/AccessibilityContext.tsx
import React, { createContext, useState, useContext, ReactNode, useEffect } from 'react';

interface AccessibilityContextType {
  isSignLanguageEnabled: boolean;
  setSignLanguageEnabled: (enabled: boolean) => void;
  // Podemos adicionar outras opções de acessibilidade aqui no futuro
}

// Cria o contexto com um valor padrão
const AccessibilityContext = createContext<AccessibilityContextType | undefined>(undefined);

// Cria o "provedor" que irá gerenciar o estado
export const AccessibilityProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [isSignLanguageEnabled, setSignLanguageEnabledState] = useState(() => {
    // Tenta ler o valor do localStorage na primeira vez que carrega
    return localStorage.getItem('signLanguageEnabled') === 'true';
  });

  // Função para atualizar o estado e o localStorage
  const setSignLanguageEnabled = (enabled: boolean) => {
    localStorage.setItem('signLanguageEnabled', String(enabled));
    setSignLanguageEnabledState(enabled);
  };

  return (
    <AccessibilityContext.Provider value={{ isSignLanguageEnabled, setSignLanguageEnabled }}>
      {children}
    </AccessibilityContext.Provider>
  );
};

// Hook customizado para facilitar o uso do contexto em outras páginas
export const useAccessibility = (): AccessibilityContextType => {
  const context = useContext(AccessibilityContext);
  if (context === undefined) {
    throw new Error('useAccessibility must be used within an AccessibilityProvider');
  }
  return context;
};