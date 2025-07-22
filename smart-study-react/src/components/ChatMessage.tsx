// src/components/ChatMessage.tsx
import React from 'react';
import botAvatar from '../assets/bot-avatar.png';
import { FaUser } from 'react-icons/fa';
import ReactMarkdown from 'react-markdown'; // Importa a biblioteca para renderizar a formatação

interface ChatMessageProps {
  message: {
    sender: 'user' | 'bot';
    text: string;
  };
}

const ChatMessage: React.FC<ChatMessageProps> = ({ message }) => {
  const isBot = message.sender === 'bot';

  // Renderiza a mensagem do Bot
  if (isBot) {
    return (
      <div className="flex items-start gap-3 my-4 animate-fade-in-up w-full">
        <img src={botAvatar} alt="Bot Avatar" className="w-10 h-10 rounded-full flex-shrink-0" />
        <div className="bg-blue-800 rounded-2xl rounded-bl-none p-4 max-w-lg">
          {/* ✅ Usa ReactMarkdown para interpretar a formatação da IA */}
          <ReactMarkdown className="prose prose-invert prose-p:text-white prose-strong:text-white prose-ul:text-white prose-li:text-white">
            {message.text}
          </ReactMarkdown>
        </div>
      </div>
    );
  }

  // Renderiza a mensagem do Usuário
  return (
    <div className="flex items-start justify-end gap-3 my-4 animate-fade-in-up w-full">
      <div className="bg-purple-300 rounded-2xl rounded-br-none p-4 max-w-lg">
        <p className="text-gray-900">{message.text}</p>
      </div>
      <div className="w-10 h-10 rounded-full bg-purple-500 flex items-center justify-center flex-shrink-0">
        <FaUser className="text-white" />
      </div>
    </div>
  );
};

export default ChatMessage;