// src/components/ActiveQuiz.tsx
import React, { useState, useEffect, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import api from '../services/api';
import ChatMessage from './ChatMessage';
import QuizzOptions from './QuizzOptions';
import { FaPaperPlane, FaSave } from 'react-icons/fa';
import { useInteractiveSound } from '../hooks/useInteractiveSound';

interface QuizQuestion {
  question: string;
  options: string[];
  correctAnswerIndex: number;
  explanation: string;
}
interface Message {
  sender: 'user' | 'bot';
  text: string;
  quizzOptions?: QuizQuestion;
  questionIndex?: number;
}

interface ActiveQuizProps {
  lessonTitle: string;
  onQuizComplete: (score: number, chatHistory: Message[], quizData: QuizQuestion[], userAnswers: (number | null)[]) => void;
}

const ActiveQuiz: React.FC<ActiveQuizProps> = ({ lessonTitle, onQuizComplete }) => {
  const { t, i18n } = useTranslation();
  const soundEvents = useInteractiveSound();
  const [messages, setMessages] = useState<Message[]>([]);
  const [userInput, setUserInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [quizData, setQuizData] = useState<QuizQuestion[]>([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [userAnswers, setUserAnswers] = useState<(number | null)[]>([]);
  const [quizFlowState, setQuizFlowState] = useState<'initial' | 'started' | 'finished'>('initial');
  const hasInitialized = useRef(false);
  const chatEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!hasInitialized.current) {
      addMessage('bot', t('chat.quizzInitial'));
      hasInitialized.current = true;
    }
  }, [t]);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isLoading]);

  const addMessage = (sender: 'user' | 'bot', text: string, quizzOptions?: QuizQuestion, questionIndex?: number) => {
    setMessages(prev => [...prev, { sender, text, quizzOptions, questionIndex }]);
  };

  const handleTopicSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const topic = userInput.trim();
    if (!topic || isLoading) return;

    addMessage('user', topic);
    setUserInput('');
    setIsLoading(true);
    setQuizFlowState('started');

    try {
      const response = await api.post('/ai/generate-quizz', { 
        topic, 
        context: lessonTitle,
        language: i18n.language // Envia o idioma para a IA
      });
      const quizz = response.data.quizz;
      setQuizData(quizz);
      setCurrentQuestionIndex(0);
      setUserAnswers(Array(quizz.length).fill(null));
      addMessage('bot', `${t('chat.questionLabel', { number: 1 })}: ${quizz[0].question}`, quizz[0], 0);
    } catch (error) {
      addMessage('bot', t('chat.aiError'));
      setQuizFlowState('initial');
    } finally {
      setIsLoading(false);
    }
  };

  const handleAnswerSelect = (selectedIndex: number, questionIndex: number) => {
    const updatedAnswers = [...userAnswers];
    updatedAnswers[questionIndex] = selectedIndex;
    setUserAnswers(updatedAnswers);

    setTimeout(() => {
      addMessage('bot', `${t('chat.explanationLabel')}: ${quizData[questionIndex].explanation}`);
      
      setTimeout(() => {
        const nextIndex = questionIndex + 1;
        if (nextIndex < quizData.length) {
          setCurrentQuestionIndex(nextIndex);
          addMessage('bot', `${t('chat.questionLabel', { number: nextIndex + 1 })}: ${quizData[nextIndex].question}`, quizData[nextIndex], nextIndex);
        } else {
          finishQuizz(updatedAnswers);
        }
      }, 2000);
    }, 1000);
  };

  const finishQuizz = (finalAnswers: (number | null)[]) => {
    setQuizFlowState('finished');
    const correctAnswersCount = finalAnswers.filter((answer, index) => answer === quizData[index].correctAnswerIndex).length;
    const score = Math.round((correctAnswersCount / quizData.length) * 100);
    const scoreMessageText = t('chat.quizzFinished', { correct: correctAnswersCount, total: quizData.length, score: score });
    addMessage('bot', scoreMessageText);
    // A função para aqui, esperando o usuário clicar em "Salvar".
  };

  const handleSaveAndExit = () => {
    const correctAnswersCount = userAnswers.filter((answer, index) => answer === quizData[index].correctAnswerIndex).length;
    const score = Math.round((correctAnswersCount / quizData.length) * 100);
    // Passa todos os dados para a QuizzPage salvar
    onQuizComplete(score, messages, quizData, userAnswers);
  };

  return (
    <div className="chat-container h-full flex flex-col">
       <div className="flex-grow flex flex-col justify-end overflow-hidden">
          <div className="overflow-y-auto pr-2">
            {messages.map((msg, index) => (
              <div key={index}>
                <ChatMessage message={msg} />
                {msg.quizzOptions && (
                  <div onMouseEnter={soundEvents.onMouseEnter}>
                    <QuizzOptions 
                      options={msg.quizzOptions.options}
                      correctAnswerIndex={msg.quizzOptions.correctAnswerIndex}
                      selectedAnswerIndex={userAnswers[msg.questionIndex!]}
                      onSelectAnswer={(selectedIndex) => {
                        soundEvents.onClick();
                        handleAnswerSelect(selectedIndex, msg.questionIndex!);
                      }}
                    />
                  </div>
                )}
              </div>
            ))}
            {isLoading && <ChatMessage message={{ sender: 'bot', text: t('chat.thinking') }} />}
            <div ref={chatEndRef} />
          </div>
        </div>

        <div className="mt-4 flex-shrink-0">
          {quizFlowState === 'initial' && (
            <form onSubmit={handleTopicSubmit} className="flex items-center gap-3">
                <input 
                  type="text" 
                  value={userInput} 
                  onChange={e => setUserInput(e.target.value)} 
                  placeholder={t('chat.typeSubject')} 
                  className="w-full bg-white bg-opacity-10 backdrop-blur-sm rounded-full p-3 pl-5 focus:outline-none focus:ring-2 focus:ring-purple-400" 
                  disabled={isLoading} 
                />
                <button 
                  {...soundEvents}
                  type="submit" 
                  className="bg-purple-600 rounded-full p-4 hover:bg-purple-500 transition disabled:opacity-50" 
                  disabled={isLoading}
                >
                  <FaPaperPlane />
                </button>
            </form>
          )}
          
          {quizFlowState === 'finished' && (
            <div className="flex justify-center">
              <button 
                {...soundEvents}
                onClick={handleSaveAndExit} 
                className="bg-green-600 font-semibold py-2 px-5 rounded-full flex items-center gap-2 hover:bg-green-500 transition animate-fade-in-up"
              >
                <FaSave /> {t('chat.saveQuizz')}
              </button>
            </div>
          )}
        </div>
    </div>
  );
};

export default ActiveQuiz;