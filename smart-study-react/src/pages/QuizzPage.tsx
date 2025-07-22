// src/pages/QuizzPage.tsx
import React, { useState, useEffect, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import api from '../services/api';
import Navbar from '../components/Navbar';
import ChatMessage from '../components/ChatMessage';
import QuizzOptions from '../components/QuizzOptions';
import { FaPaperPlane, FaSave, FaArrowLeft } from 'react-icons/fa';
import toast from 'react-hot-toast';

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

const QuizzPage: React.FC = () => {
  const { lessonId } = useParams();
  const navigate = useNavigate();
  const [messages, setMessages] = useState<Message[]>([]);
  const [userInput, setUserInput] = useState('');
  const [lessonTitle, setLessonTitle] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [quizData, setQuizData] = useState<QuizQuestion[]>([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [userAnswers, setUserAnswers] = useState<(number | null)[]>([]);
  const [quizState, setQuizState] = useState<'initial' | 'started' | 'finished'>('initial');
  const [isQuizzSaved, setIsQuizzSaved] = useState(false);
  const chatEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let isMounted = true;
    api.get(`/lessons/${lessonId}`).then(res => {
      if (!isMounted) return;
      setLessonTitle(res.data.lessonTitle);
      const savedQuizz = res.data.quizzChatHistory;
      if (savedQuizz && savedQuizz.length > 0) {
        setMessages(savedQuizz);
        setQuizState('finished');
        setIsQuizzSaved(true);
      } else {
        if (messages.length === 0) {
          addMessage('bot', `What topic do you want to study today? Send me the subject for the quizz.`);
        }
      }
    });
    return () => { isMounted = false; };
  }, [lessonId]);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isLoading]);

  const addMessage = (sender: 'user' | 'bot', text: string, quizzOptions?: QuizQuestion, questionIndex?: number) => {
    setMessages(prev => [...prev, { sender, text, quizzOptions, questionIndex }]);
  };

  const handleTopicSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const topic = userInput.trim();
    if (!topic) return;

    addMessage('user', topic);
    setUserInput('');
    setIsLoading(true);

    try {
      const response = await api.post('/ai/generate-quizz', { topic, context: lessonTitle });
      const quizz = response.data.quizz;
      setQuizData(quizz);
      setCurrentQuestionIndex(0);
      setUserAnswers(Array(quizz.length).fill(null));
      setQuizState('started');
      addMessage('bot', `Question 1: ${quizz[0].question}`, quizz[0], 0);
    } catch (error) {
      addMessage('bot', 'Sorry, I had trouble creating the quizz. Please try another topic.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleAnswerSelect = (selectedIndex: number, questionIndex: number) => {
    const updatedAnswers = [...userAnswers];
    updatedAnswers[questionIndex] = selectedIndex;
    setUserAnswers(updatedAnswers);

    setTimeout(() => {
      addMessage('bot', `Explanation: ${quizData[questionIndex].explanation}`);
      
      setTimeout(() => {
        const nextIndex = questionIndex + 1;
        if (nextIndex < quizData.length) {
          setCurrentQuestionIndex(nextIndex);
          addMessage('bot', `Question ${nextIndex + 1}: ${quizData[nextIndex].question}`, quizData[nextIndex], nextIndex);
        } else {
          finishQuizz(updatedAnswers);
        }
      }, 2000);
    }, 1000);
  };

  const finishQuizz = async (finalAnswers: (number | null)[]) => {
    setQuizState('finished');
    const correctAnswersCount = finalAnswers.filter((answer, index) => answer === quizData[index].correctAnswerIndex).length;
    const score = Math.round((correctAnswersCount / quizData.length) * 100);

    addMessage('bot', `Quizz finished! 🏆\n\nYou got ${correctAnswersCount} out of ${quizData.length} correct (${score}%).`);
    setIsLoading(true);

    const mistakes = quizData
      .filter((q, index) => finalAnswers[index] !== q.correctAnswerIndex)
      .map(q => ({ question: q.question, explanation: q.explanation }));

    try {
      await api.post(`/lessons/${lessonId}/quizz-attempts`, { score, mistakes });
      toast.success('Your score has been saved!');
    } catch (error) {
      toast.error('Could not save your score.');
    }

    try {
      const feedbackResponse = await api.post('/ai/analyze-quizz', { quizzData, userAnswers: finalAnswers });
      addMessage('bot', feedbackResponse.data.feedback);
    } catch (error) {
      addMessage('bot', "Keep studying! Review your answers and, if necessary, go back to the 'Summary' tab to dive deeper into the topics you had the most trouble with. You are doing great!");
    } finally {
      setIsLoading(false);
    }
  };
  
  const handleSaveQuizz = async () => {
    try {
        await api.put(`/lessons/${lessonId}/quizz-chat`, {messages});
        setIsQuizzSaved(true);
        toast.success('Quizz saved successfully!');
    } catch (error) {
        toast.error('Error saving quizz.');
    }
  };
  
  const backgroundStyle = { background: 'linear-gradient(135deg, #1e0a3c 0%, #2A0E46 100%)' };

  return (
    <div style={backgroundStyle} className="min-h-screen text-white flex flex-col">
      <Navbar />
      <main className="container mx-auto p-4 flex-grow flex flex-col">
        <div className="flex-grow flex flex-col justify-end overflow-hidden">
          <div className="overflow-y-auto pr-2">
            {messages.map((msg, index) => (
              <div key={index}>
                <ChatMessage message={msg} />
                {msg.quizzOptions && (
                  <QuizzOptions 
                    options={msg.quizzOptions.options}
                    correctAnswerIndex={msg.quizzOptions.correctAnswerIndex}
                    selectedAnswerIndex={userAnswers[msg.questionIndex!]}
                    onSelectAnswer={(selectedIndex) => handleAnswerSelect(selectedIndex, msg.questionIndex!)}
                  />
                )}
              </div>
            ))}
            {isLoading && <ChatMessage message={{ sender: 'bot', text: 'Thinking...' }} />}
            <div ref={chatEndRef} />
          </div>
        </div>

        {quizState === 'initial' && (
          <form onSubmit={handleTopicSubmit} className="mt-4 flex items-center gap-3">
            <input type="text" value={userInput} onChange={e => setUserInput(e.target.value)} placeholder="Type the subject for the quizz..." className="w-full bg-white bg-opacity-10 backdrop-blur-sm rounded-full p-3 pl-5 focus:outline-none focus:ring-2 focus:ring-purple-400" disabled={isLoading} />
            <button type="submit" className="bg-purple-600 rounded-full p-4 hover:bg-purple-500 transition disabled:opacity-50" disabled={isLoading}><FaPaperPlane /></button>
          </form>
        )}
        
        {(quizState === 'finished' && !isQuizzSaved && !isLoading) && (
            <div className="flex justify-center mt-4">
                <button onClick={handleSaveQuizz} className="bg-green-600 font-semibold py-2 px-5 rounded-full flex items-center gap-2 hover:bg-green-500 transition">
                    <FaSave /> Save Quizz
                </button>
            </div>
        )}

        {(isQuizzSaved) && (
            <div className="flex justify-center mt-4">
                <button 
                  onClick={() => navigate(`/subjects/${lessonId}`)} 
                  className="bg-white bg-opacity-20 font-semibold py-2 px-5 rounded-full flex items-center gap-2 hover:bg-opacity-30 transition"
                >
                    <FaArrowLeft /> Back to Subject
                </button>
            </div>
        )}
      </main>
    </div>
  );
};

export default QuizzPage;