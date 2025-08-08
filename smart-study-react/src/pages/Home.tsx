// src/pages/Home.tsx
import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

import Navbar from '../components/Navbar';
import booksIllustration from '../assets/books-illustration.png';
import laptopUserImage from '../assets/laptop-user-image.png';
import { FaBook } from 'react-icons/fa';

const Home: React.FC = () => {
  const { t } = useTranslation();
  const location = useLocation();
  const navigate = useNavigate();
  
  const userName = location.state?.userName?.split(' ')[0] || 'Student';
  const [animationKey, setAnimationKey] = useState(0);

  const backgroundStyle = {
    background: 'linear-gradient(135deg, #1e0a3c 0%, #2A0E46 100%)',
  };

  const handleReplayAnimation = () => {
    setAnimationKey(prevKey => prevKey + 1);
  };

  return (
    <div style={backgroundStyle} className="min-h-screen text-white overflow-x-hidden">
      <Navbar />
      <main 
        className="container mx-auto px-12 lg:px-24 py-24 cursor-pointer"
        onClick={handleReplayAnimation}
      >
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div 
            key={`left-col-${animationKey}`}
            className="flex flex-col gap-6 text-left animate-fade-in-up"
          >
            <span className="bg-gray-700 bg-opacity-50 text-white text-sm font-semibold px-4 py-1 rounded-full self-start">
              #studysmart
            </span>
            <h1 className="text-5xl md:text-6xl font-bold leading-tight">
              {t('home.title')}
            </h1>
            <p className="text-lg text-gray-300 max-w-xl">
              {t('home.subtitle')}
            </p>
            <img 
              src={booksIllustration} 
              alt="Illustration of a stack of three colorful books" 
              className="w-48 h-auto mt-4 animate-float"
            />
            {/* ✅ 3. APLIQUE OS EFEITOS DE SOM AO BOTÃO */}
            <button 
              
              onClick={(e) => {
                e.stopPropagation(); // Impede que o clique reinicie a animação da página
                
                navigate('/my-notebooks'); // Executa a navegação
              }}
              className="bg-white text-gray-900 font-bold py-3 px-8 rounded-full flex items-center gap-3 self-start mt-4 hover:bg-gray-200 transition-transform transform hover:scale-105"
            >
              <FaBook />
              <span>{t('home.cta')}</span>
            </button>
          </div>

          <div 
            key={`right-col-${animationKey}`}
            className="relative hidden lg:flex justify-center items-center animate-fade-in-right"
          >
            <div 
              className="w-[500px] h-[500px] bg-cover bg-center animate-float"
              role="img"
              aria-label="Stylized image of a person's hands typing on a laptop in a dark room"
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