// src/pages/QuizzPage.tsx
import React, { useState, useEffect, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import api from '../services/api';
import Navbar from '../components/Navbar';
import ActiveQuiz from '../components/ActiveQuiz';
import ChatMessage from '../components/ChatMessage';
import QuizzOptions from '../components/QuizzOptions';
import toast from 'react-hot-toast';
import { FaArrowLeft, FaPlus } from 'react-icons/fa';

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
interface Attempt {
  _id: string;
  attemptNumber: number;
  score: number;
  date: string;
  chatHistory: Message[];
  quizData: QuizQuestion[];
  userAnswers: (number | null)[];
}

const QuizzPage: React.FC = () => {
  const { lessonId } = useParams<{ lessonId: string }>();
  const navigate = useNavigate();
  const { t } = useTranslation();
  
  const [view, setView] = useState<'list' | 'active_quiz' | 'view_attempt'>('list');
  const [attempts, setAttempts] = useState<Attempt[]>([]);
  const [selectedAttempt, setSelectedAttempt] = useState<Attempt | null>(null);
  const [lessonTitle, setLessonTitle] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const chatEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (view === 'view_attempt') {
      chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
  }, [selectedAttempt, view]);

  const fetchAttempts = async () => {
    if (!lessonId) return;
    setIsLoading(true);
    try {
      const response = await api.get(`/lessons/${lessonId}`);
      setLessonTitle(response.data.lessonTitle);
      setAttempts(response.data.quizzAttempts || []);
    } catch (error) {
      toast.error("Failed to load quiz attempts.");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (view === 'list') {
      fetchAttempts();
    }
  }, [lessonId, view]);

  const handleQuizSave = async (score: number, chatHistory: Message[], quizData: QuizQuestion[], userAnswers: (number | null)[]) => {
    if (!lessonId) return;
    const loadingToast = toast.loading('Saving your attempt...');
    try {
      await api.post(`/lessons/${lessonId}/quizz-attempts`, { 
        score, 
        chatHistory,
        quizData,
        userAnswers,
      });
      toast.dismiss(loadingToast);
      toast.success('Your new attempt has been saved!');
      setView('list');
    } catch (error) {
      toast.dismiss(loadingToast);
      toast.error("Failed to save your quiz attempt.");
    }
  };
  
  const backgroundStyle = { background: 'linear-gradient(135deg, #1e0a3c 0%, #2A0E46 100%)' };

  const renderContent = () => {
    if (isLoading) {
      return <div className="text-center w-full text-xl animate-pulse">Loading...</div>;
    }

    if (view === 'active_quiz') {
      return <ActiveQuiz lessonId={lessonId!} lessonTitle={lessonTitle} onQuizComplete={handleQuizSave} />;
    }

    if (view === 'view_attempt' && selectedAttempt) {
      return (
        <div className="chat-container w-full flex flex-col h-full">
          <div className="flex justify-between items-center mb-4 flex-shrink-0">
            <h2 className="text-2xl font-bold">Reviewing Attempt #{selectedAttempt.attemptNumber} ({selectedAttempt.score}%)</h2>
            <button onClick={() => setView('list')} className="bg-white bg-opacity-20 text-white font-semibold py-2 px-4 rounded-full flex items-center gap-2 hover:bg-opacity-30 transition">
               <FaArrowLeft /> Back to Attempts
            </button>
          </div>
          <div className="flex-grow overflow-y-auto pr-2 bg-black bg-opacity-20 p-4 rounded-lg">
            {selectedAttempt.chatHistory.map((msg, index) => (
              <div key={index}>
                <ChatMessage message={msg} />
                {msg.quizzOptions && selectedAttempt.quizData && selectedAttempt.userAnswers && (
                  <QuizzOptions 
                    options={msg.quizzOptions.options}
                    correctAnswerIndex={msg.quizzOptions.correctAnswerIndex}
                    selectedAnswerIndex={selectedAttempt.userAnswers[msg.questionIndex!]}
                    onSelectAnswer={() => {}}
                  />
                )}
              </div>
            ))}
            <div ref={chatEndRef} />
          </div>
        </div>
      );
    }

    // A view padrão é a lista de tentativas (o "Hub")
    return (
      // ✅ ESTILIZAÇÃO AQUI: Conteúdo centralizado e com largura máxima
      <div className="w-full max-w-3xl mx-auto flex flex-col items-center text-center">
        <div className="flex justify-between items-center mb-8 w-full">
          <h1 className="text-4xl font-bold">{lessonTitle} - Quizzes</h1>
          <button onClick={() => setView('active_quiz')} className="bg-white text-gray-800 font-semibold py-2 px-4 rounded-full flex items-center gap-2 hover:bg-gray-200 transition flex-shrink-0">
            <FaPlus />
            <span className="hidden md:inline">Start New Quiz</span>
          </button>
        </div>
        <div className="space-y-4 w-full">
          {attempts.length > 0 ? (
            attempts.slice().reverse().map((att, index) => (
              <button 
                key={att._id} 
                onClick={() => { setSelectedAttempt(att); setView('view_attempt'); }} 
                // ✅ ESTILIZAÇÃO E ANIMAÇÃO AQUI
                className="w-full text-left p-4 bg-violet-600 rounded-lg shadow-lg hover:bg-violet-500 transition-all transform hover:scale-105 animate-fade-in-up"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className="flex justify-between">
                  <span className="font-bold text-lg">Attempt #{att.attemptNumber}</span>
                  <span className="font-bold text-xl">{att.score}%</span>
                </div>
                <span className="text-sm text-violet-200">{new Date(att.date).toLocaleString()}</span>
              </button>
            ))
          ) : (
            <p className="text-center text-gray-400 py-8">No quiz attempts yet. Start a new one!</p>
          )}
        </div>
        <button onClick={() => navigate(`/subjects/${lessonId}`)} className="mt-16 bg-white bg-opacity-20 text-white font-semibold py-3 px-6 rounded-full flex items-center gap-2 hover:bg-opacity-30 transition">
          <FaArrowLeft /> {t('chat.backToSubject')}
        </button>
      </div>
    );
  };
  
  return (
    <div style={backgroundStyle} className="min-h-screen text-white flex flex-col">
      <Navbar />
      <main className="container mx-auto p-4 md:p-8 flex-grow flex items-center justify-center">
        {renderContent()}
      </main>
    </div>
  );
};

export default QuizzPage;