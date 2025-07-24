/*src/components/VLibrasWidget.tsx
//esse aqui só vai funcionar se o vlibras estiver no ar
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

export default VLibrasWidget;*/

//esse aqui só direciona para o site do vlibras, alternativa para quando ele não estiver funcionando.

// src/components/VLibrasWidget.tsx
import React from 'react';
import { FaHandsHelping } from 'react-icons/fa'; // Reutilizando o mesmo ícone

const VLibrasWidget: React.FC = () => {
  const openVLibrasWebsite = () => {
    // Abre o site oficial do VLibras em uma nova aba
    window.open('https://www.gov.br/vlibras/pt-br', '_blank');
  };

  return (
    <button
      onClick={openVLibrasWebsite}
      title="Abrir site do VLibras"
      className="fixed bottom-4 right-4 z-50 bg-blue-600 text-white w-16 h-16 rounded-full flex items-center justify-center shadow-lg transform hover:scale-110 transition-transform animate-fade-in-up"
    >
      <FaHandsHelping size={28} />
    </button>
  );
};

// A declaração global não é mais estritamente necessária, mas podemos manter por enquanto
declare global {
  interface Window {
    VLibras: any;
  }
}

export default VLibrasWidget;