// src/pages/Home.tsx
import React from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import booksIllustration from '../assets/books-illustration.png';
import laptopUserImage from '../assets/laptop-user-image.png';
import { FaArrowRight } from 'react-icons/fa';

const Home: React.FC = () => {
  const navigate = useNavigate();
  // Estilo para o background com gradiente sutil
  const backgroundStyle = {
    background: 'linear-gradient(135deg, #1e0a3c 0%, #2A0E46 100%)',
  };

  return (
    <div style={backgroundStyle} className="min-h-screen text-white overflow-hidden">
      <Navbar />

      <main className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
          
          {/* Coluna Esquerda: Conteúdo de Texto */}
          <div className="flex flex-col gap-6">
            <span className="bg-gray-700 bg-opacity-50 text-white text-sm font-semibold px-4 py-1 rounded-full self-start">
              #studysmart
            </span>
            <h1 className="text-5xl md:text-6xl font-bold leading-tight">
              Who said that studying is boring?
            </h1>
            <p className="text-lg text-gray-300 max-w-lg">
              We are going to help you achieve your goals, no matter what!
            </p>
            <img 
              src={booksIllustration} 
              alt="Stack of books" 
              className="w-40 h-auto mt-4"
            />
            <button 
              onClick={() => navigate('/my-notebooks')}
              className="bg-white text-gray-800 font-semibold py-3 px-6 rounded-full flex items-center gap-3 self-start mt-4 hover:bg-gray-200 transition-transform transform hover:scale-105"
            >
              <span>My notebooks</span>
              <FaArrowRight />
            </button>
          </div>

          {/* Coluna Direita: Imagem Hexagonal */}
          <div className="relative hidden lg:flex justify-center items-center">
            <div 
              className="w-[500px] h-[500px] bg-cover bg-center [clip-path:polygon(50%_0%,_100%_25%,_100%_75%,_50%_100%,_0%_75%,_0%_25%)]"
              style={{ backgroundImage: `url(${laptopUserImage})` }}
            >
            </div>
          </div>
          
        </div>
      </main>
    </div>
  );
};

export default Home;