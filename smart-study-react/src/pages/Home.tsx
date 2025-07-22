// src/pages/Home.tsx
import React, { useState } from 'react'; // 1. Importar useState
import { useLocation, useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import booksIllustration from '../assets/books-illustration.png';
import laptopUserImage from '../assets/laptop-user-image.png';
import { FaBook } from 'react-icons/fa';

const Home: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const userName = location.state?.userName?.split(' ')[0] || 'Student';

  // 2. Estado para controlar a "chave" da animação
  const [animationKey, setAnimationKey] = useState(0);

  const backgroundStyle = {
    background: 'linear-gradient(135deg, #1e0a3c 0%, #2A0E46 100%)',
  };

  // 3. Função para mudar a chave e reiniciar a animação
  const handleReplayAnimation = () => {
    setAnimationKey(prevKey => prevKey + 1);
  };

  return (
    <div style={backgroundStyle} className="min-h-screen text-white overflow-x-hidden">
      <Navbar />

      <main 
        className="container mx-auto px-12 lg:px-24 py-24 cursor-pointer"
        // 4. Adiciona o evento de clique ao container principal
        onClick={handleReplayAnimation}
      >
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          
          {/* --- Coluna Esquerda: Conteúdo de Texto e CTA --- */}
          <div 
            // 5. Adiciona a 'key' para forçar a remontagem
            key={`left-col-${animationKey}`}
            className="flex flex-col gap-6 text-left animate-fade-in-up"
          >
            <span className="bg-gray-700 bg-opacity-50 text-white text-sm font-semibold px-4 py-1 rounded-full self-start">
              #studysmart
            </span>
            <h1 className="text-5xl md:text-6xl font-bold leading-tight">
              Stop memorizing. Start understanding.
            </h1>
            <p className="text-lg text-gray-300 max-w-xl">
              Smart Study is your personal AI study assistant. Transform your notes into interactive summaries, generate practice quizzes, and track your progress to ace your exams with confidence.
            </p>
            <img 
              src={booksIllustration} 
              alt="Illustration of a stack of books" 
              className="w-48 h-auto mt-4 animate-float"
            />
            <button 
              onClick={(e) => {
                e.stopPropagation(); // Impede que o clique no botão reinicie a animação
                navigate('/my-notebooks');
              }}
              className="bg-white text-gray-900 font-bold py-3 px-8 rounded-full flex items-center gap-3 self-start mt-4 hover:bg-gray-200 transition-transform transform hover:scale-105"
            >
              <FaBook />
              <span>Go to My Notebooks</span>
            </button>
          </div>

          {/* --- Coluna Direita: Imagem Hexagonal --- */}
          <div 
            // 5. Adiciona a 'key' aqui também
            key={`right-col-${animationKey}`}
            className="relative hidden lg:flex justify-center items-center animate-fade-in-right"
          >
            <div 
              className="w-[500px] h-[500px] bg-cover bg-center animate-float"
              style={{ 
                backgroundImage: `url(${laptopUserImage})`,
                clipPath: 'polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)' 
              }}
            >
            </div>
          </div>
          
        </div>
      </main>
    </div>
  );
};

export default Home;