// src/context/AccessibilityContext.tsx
import React, { createContext, useState, useContext, ReactNode } from 'react';

interface AccessibilityContextType {
  isSignLanguageEnabled: boolean;
  setSignLanguageEnabled: (enabled: boolean) => void;
  isAudioEnabled: boolean;
  setAudioEnabled: (enabled: boolean) => void;
}

const AccessibilityContext = createContext<AccessibilityContextType | undefined>(undefined);

export const AccessibilityProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [isSignLanguageEnabled, setSignLanguageEnabledState] = useState(() => {
    return localStorage.getItem('signLanguageEnabled') === 'true';
  });
  
  const [isAudioEnabled, setAudioEnabledState] = useState(() => {
    return localStorage.getItem('audioEnabled') === 'true';
  });

  const setSignLanguageEnabled = (enabled: boolean) => {
    localStorage.setItem('signLanguageEnabled', String(enabled));
    setSignLanguageEnabledState(enabled);
  };
  
  const setAudioEnabled = (enabled: boolean) => {
    localStorage.setItem('audioEnabled', String(enabled));
    setAudioEnabledState(enabled);
  };

  return (
    <AccessibilityContext.Provider value={{ isSignLanguageEnabled, setSignLanguageEnabled, isAudioEnabled, setAudioEnabled }}>
      {children}
    </AccessibilityContext.Provider>
  );
};

export const useAccessibility = (): AccessibilityContextType => {
  const context = useContext(AccessibilityContext);
  if (context === undefined) {
    throw new Error('useAccessibility must be used within an AccessibilityProvider');
  }
  return context;
};