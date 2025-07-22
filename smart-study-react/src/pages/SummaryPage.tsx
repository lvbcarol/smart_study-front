// src/pages/SummaryPage.tsx
import React, { useState, useEffect, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import api from '../services/api';
import Navbar from '../components/Navbar';
import ChatMessage from '../components/ChatMessage';
import { FaPaperPlane, FaSave, FaArrowLeft } from 'react-icons/fa';
import toast from 'react-hot-toast';

interface Message {
  sender: 'user' | 'bot';
  text: string;
}

const SummaryPage: React.FC = () => {
  const { lessonId } = useParams();
  const navigate = useNavigate();
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
        setMessages([{ sender: 'bot', text: `Hello! What specific subject within "${lessonTitle}" would you like me to summarize today?` }]);
      }
    }).finally(() => setIsLoading(false));
  }, [lessonId]);

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
      const response = await api.post('/ai/summarize', { topic: trimmedInput, context: lessonTitle });
      setMessages([...newMessages, { sender: 'bot', text: response.data.summary }]);
    } catch (error) {
      setMessages([...newMessages, { sender: 'bot', text: 'Sorry, I encountered an error. Please try again.' }]);
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
      <main className="container mx-auto p-4 flex-grow flex flex-col">
        <div className="flex-grow flex flex-col justify-end overflow-hidden">
          <div className="overflow-y-auto pr-2">
            {messages.map((msg, index) => <ChatMessage key={index} message={msg} />)}
            {isLoading && <ChatMessage message={{ sender: 'bot', text: 'Thinking...' }} />}
            <div ref={chatEndRef} />
          </div>
        </div>

        {(!isChatSaved || !hasSummary) && (
          <form onSubmit={handleSendMessage} className="mt-4 flex items-center gap-3">
            <input type="text" value={userInput} onChange={(e) => setUserInput(e.target.value)} placeholder="Type your subject here..." className="w-full bg-white bg-opacity-10 backdrop-blur-sm rounded-full p-3 pl-5 focus:outline-none focus:ring-2 focus:ring-purple-400" disabled={isLoading} />
            <button type="submit" className="bg-purple-600 rounded-full p-4 hover:bg-purple-500 transition disabled:opacity-50" disabled={isLoading}><FaPaperPlane /></button>
          </form>
        )}
        
        {(hasSummary && !isChatSaved && !isLoading) && (
            <div className="flex justify-center mt-4">
                <button onClick={handleSaveChat} className="bg-green-600 font-semibold py-2 px-5 rounded-full flex items-center gap-2 hover:bg-green-500 transition">
                    <FaSave /> Save Conversation
                </button>
            </div>
        )}

        {(isChatSaved) && (
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

export default SummaryPage;