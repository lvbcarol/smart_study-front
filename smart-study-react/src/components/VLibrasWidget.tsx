// src/components/VLibrasWidget.tsx
import React, { useEffect } from 'react';

const VLibrasWidget: React.FC = () => {
  useEffect(() => {
    // Procura pelo botão do widget que o script no index.html já criou
    const accessButton = document.querySelector('.vw-access-button');

    // ✅ LOG DE DEPURAÇÃO: Verificando se o botão foi encontrado
    console.log("VLibrasWidget foi ativado! Botão de acesso encontrado:", accessButton);
    
    if (accessButton) {
      accessButton.classList.add('vw-access-button-activated');
    }
    
    if (accessButton) {
      // Adiciona nossa classe especial para mostrá-lo
      accessButton.classList.add('vw-access-button-activated');
    }

    // Função de limpeza: é executada quando o componente é "desmontado"
    // (por exemplo, quando o usuário desativa a opção ou muda o idioma)
    return () => {
      if (accessButton) {
        // Remove nossa classe especial para escondê-lo novamente
        accessButton.classList.remove('vw-access-button-activated');
      }
    };
  }, []); // O array vazio [] garante que este efeito rode apenas uma vez ao montar e a limpeza rode ao desmontar

  return null; // Este componente não renderiza nada visível por si só, ele apenas manipula o DOM.
};

// Declaração para o TypeScript entender o objeto global VLibras que o script externo cria
declare global {
  interface Window {
    VLibras: any;
  }
}

export default VLibrasWidget;