// src/components/QuizzOptions.tsx
import React from 'react';

interface QuizzOptionsProps {
  options: string[];
  correctAnswerIndex: number;
  selectedAnswerIndex: number | null;
  onSelectAnswer: (index: number) => void;
}

const QuizzOptions: React.FC<QuizzOptionsProps> = ({ options, correctAnswerIndex, selectedAnswerIndex, onSelectAnswer }) => {
  const getButtonClass = (index: number) => {
    // Se a pergunta ainda não foi respondida, aplica o estilo padrão/hover
    if (selectedAnswerIndex === null) {
      return 'bg-purple-500 bg-opacity-30 hover:bg-opacity-50';
    }
    // Se a pergunta já foi respondida
    if (index === correctAnswerIndex) {
      return 'bg-green-500'; // Mostra a resposta correta em verde
    }
    if (index === selectedAnswerIndex) {
      return 'bg-red-500'; // Mostra a resposta incorreta (que o usuário clicou) em vermelho
    }
    // Mostra as outras opções incorretas com opacidade
    return 'bg-gray-700 opacity-50';
  };

  return (
    <div className="mt-4 space-y-3">
      {options.map((option, index) => (
        <button
          key={index}
          onClick={() => onSelectAnswer(index)}
          disabled={selectedAnswerIndex !== null} // Desabilita os botões após uma resposta ser selecionada
          className={`w-full text-left p-3 rounded-lg transition ${getButtonClass(index)}`}
        >
          {String.fromCharCode(65 + index)}. {option}
        </button>
      ))}
    </div>
  );
};

export default QuizzOptions;