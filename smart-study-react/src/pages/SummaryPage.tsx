// src/pages/SummaryPage.tsx
import React, { useState, useEffect, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import api from '../services/api';
import Navbar from '../components/Navbar';
import ChatMessage from '../components/ChatMessage';
import { FaPaperPlane, FaSave, FaArrowLeft } from 'react-icons/fa';
import toast from 'react-hot-toast';
import { useInteractiveSound } from '../hooks/useInteractiveSound';

interface Message {
  sender: 'user' | 'bot';
  text: string;
}

const SummaryPage: React.FC = () => {
  const { t, i18n } = useTranslation();
  const { lessonId } = useParams();
  const navigate = useNavigate();
  const soundEvents = useInteractiveSound();
  const [lessonTitle, setLessonTitle] = useState('your subject');
  const [messages, setMessages] = useState<Message[]>([]);
  const [userInput, setUserInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isChatSaved, setIsChatSaved] = useState(false);
  const chatEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setIsLoading(true);
    api.get(`/lessons/${lessonId}`).then(response => {
      const { lessonTitle, chatHistory } = response.data;
      setLessonTitle(lessonTitle);
      if (chatHistory && chatHistory.length > 0) {
        setMessages(chatHistory);
        setIsChatSaved(true);
      } else {
        setMessages([{ sender: 'bot', text: t('chat.summaryInitial', { title: lessonTitle }) }]);
      }
    }).finally(() => setIsLoading(false));
  }, [lessonId, t]);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isLoading]);

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    const trimmedInput = userInput.trim();
    if (!trimmedInput || isLoading) return;

    const newMessages: Message[] = [...messages, { sender: 'user', text: trimmedInput }];
    setMessages(newMessages);
    setUserInput('');
    setIsLoading(true);
    setIsChatSaved(false);

    try {
      const response = await api.post('/ai/summarize', { 
        topic: trimmedInput, 
        context: lessonTitle,
        language: i18n.language // Envia o idioma atual para a IA
      });
      setMessages([...newMessages, { sender: 'bot', text: response.data.summary }]);
    } catch (error) {
      setMessages([...newMessages, { sender: 'bot', text: 'The AI service is currently busy. Please wait a moment and try submitting your topic again.' }]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSaveChat = async () => {
    try {
      await api.put(`/lessons/${lessonId}/chat`, { messages });
      setIsChatSaved(true);
      toast.success('Conversation saved!');
    } catch (error) {
      toast.error('Failed to save conversation.');
    }
  };

  const hasSummary = messages.length > 1;
  const backgroundStyle = { background: 'linear-gradient(135deg, #1e0a3c 0%, #2A0E46 100%)' };

  return (
    <div style={backgroundStyle} className="min-h-screen text-white flex flex-col">
      <Navbar />
      <main className="chat-container container mx-auto p-4 flex-grow flex flex-col">
        <div className="flex-grow flex flex-col justify-end overflow-hidden">
          <div className="overflow-y-auto pr-2">
            {messages.map((msg, index) => <ChatMessage key={index} message={msg} />)}
            {isLoading && <ChatMessage message={{ sender: 'bot', text: t('chat.thinking') }} />}
            <div ref={chatEndRef} />
          </div>
        </div>

        {(!isChatSaved || !hasSummary) && (
          <form onSubmit={handleSendMessage} className="mt-4 flex items-center gap-3">
            <input type="text" value={userInput} onChange={(e) => setUserInput(e.target.value)} placeholder={t('chat.typeSubject')} className="w-full bg-white bg-opacity-10 backdrop-blur-sm rounded-full p-3 pl-5 focus:outline-none focus:ring-2 focus:ring-purple-400" disabled={isLoading} />
            <button {...soundEvents} type="submit" className="bg-purple-600 rounded-full p-4 hover:bg-purple-500 transition disabled:opacity-50" disabled={isLoading}>
              <FaPaperPlane />
            </button>
          </form>
        )}
        
        {(hasSummary && !isChatSaved && !isLoading) && (
            <div className="flex justify-center mt-4">
                <button 
                  {...soundEvents} 
                  onClick={() => {
                    soundEvents.onClick();
                    handleSaveChat();
                  }}
                  className="bg-green-600 font-semibold py-2 px-5 rounded-full flex items-center gap-2 hover:bg-green-500 transition"
                >
                    <FaSave /> {t('chat.saveConversation')}
                </button>
            </div>
        )}

        {(isChatSaved) && (
            <div className="flex justify-center mt-4">
                <button 
                  {...soundEvents}
                  onClick={() => {
                    soundEvents.onClick();
                    navigate(`/subjects/${lessonId}`);
                  }}
                  className="bg-white bg-opacity-20 font-semibold py-2 px-5 rounded-full flex items-center gap-2 hover:bg-opacity-30 transition"
                >
                    <FaArrowLeft /> {t('chat.backToSubject')}
                </button>
            </div>
        )}
      </main>
    </div>
  );
};

export default SummaryPage;