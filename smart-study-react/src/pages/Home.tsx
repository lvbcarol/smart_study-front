// src/pages/Home.tsx
import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import booksIllustration from '../assets/books-illustration.png';
import laptopUserImage from '../assets/laptop-user-image.png';
import { FaBook } from 'react-icons/fa';

const Home: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();

  // ✅ LÓGICA ATUALIZADA AQUI
  // 1. Tenta pegar o nome do estado da navegação (após o login).
  // 2. Se não conseguir, tenta pegar do localStorage (se a página for atualizada).
  // 3. Se não conseguir nenhum, usa "Student" como padrão.
  const userName = location.state?.userName?.split(' ')[0] || localStorage.getItem('userName')?.split(' ')[0] || 'Student';

  const backgroundStyle = {
    background: 'linear-gradient(135deg, #1e0a3c 0%, #2A0E46 100%)',
  };

  return (
    <div style={backgroundStyle} className="min-h-screen text-white overflow-x-hidden">
      <Navbar />

      <main className="container mx-auto px-6 py-12">
        <div className="flex flex-col items-center text-center animate-fade-in-up">
          
          <h1 className="text-4xl md:text-5xl font-bold leading-tight">
            Welcome back, <span className="text-purple-400">{userName}</span>.
          </h1>

          <h2 className="mt-4 text-2xl md:text-3xl font-bold text-gray-200">
            Stop memorizing. Start understanding.
          </h2>

          <p className="mt-4 text-lg text-gray-300 max-w-2xl">
            Smart Study is your personal AI study assistant. Transform your notes into interactive summaries, generate practice quizzes on any topic, and track your learning progress to ace your exams with confidence.
          </p>

          <div className="relative flex items-center justify-center gap-8 mt-10 h-64">
            <img 
              src={laptopUserImage}
              alt="Person using a laptop"
              className="w-52 h-auto rounded-2xl shadow-lg opacity-80 animate-float"
              style={{ animationDelay: '0.5s' }}
            />
            <img 
              src={booksIllustration} 
              alt="Illustration of a stack of books" 
              className="w-56 h-auto relative z-10 animate-float"
            />
          </div>

          <button 
            onClick={() => navigate('/my-notebooks')}
            className="bg-white text-gray-900 font-bold py-3 px-8 rounded-full flex items-center gap-3 self-center mt-10 hover:bg-gray-200 transition-transform transform hover:scale-105"
          >
            <FaBook />
            <span>Go to My Notebooks</span>
          </button>

        </div>
      </main>
    </div>
  );
};

export default Home;