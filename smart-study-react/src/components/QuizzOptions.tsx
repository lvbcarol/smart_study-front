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
    if (selectedAnswerIndex === null) {
      return 'bg-purple-500 bg-opacity-30 hover:bg-opacity-50';
    }
    if (index === correctAnswerIndex) {
      return 'bg-green-500';
    }
    if (index === selectedAnswerIndex) {
      return 'bg-red-500';
    }
    return 'bg-gray-700 opacity-50';
  };

  return (
    // Usa flexbox para centralizar os botões filhos
    <div className="mt-4 space-y-3 flex flex-col items-center">
      {options.map((option, index) => {
        const optionLetter = String.fromCharCode(65 + index);
        return (
          <button
            key={index}
            aria-label={`Option ${optionLetter}: ${option}`}
            onClick={() => onSelectAnswer(index)}
            disabled={selectedAnswerIndex !== null}
            // ✅ ESTILIZAÇÃO AQUI: Define uma largura máxima para os botões
            className={`w-full max-w-lg text-left p-3 rounded-lg transition ${getButtonClass(index)}`}
          >
            {optionLetter}. {option}
          </button>
        )
      })}
    </div>
  );
};

export default QuizzOptions;