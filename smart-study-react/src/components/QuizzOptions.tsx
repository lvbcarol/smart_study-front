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
    <div className="mt-4 space-y-3">
      {options.map((option, index) => {
        const optionLetter = String.fromCharCode(65 + index); // Gera A, B, C...
        return (
          <button
            key={index}
            // ✅ MELHORIA DE ACESSIBILIDADE AQUI:
            // O leitor de tela irá ler, por exemplo: "Botão, Opção A: [Texto da opção]"
            aria-label={`Option ${optionLetter}: ${option}`}
            onClick={() => onSelectAnswer(index)}
            disabled={selectedAnswerIndex !== null}
            className={`w-full text-left p-3 rounded-lg transition ${getButtonClass(index)}`}
          >
            {/* A parte abaixo é apenas visual */}
            {optionLetter}. {option}
          </button>
        )
      })}
    </div>
  );
};

export default QuizzOptions;