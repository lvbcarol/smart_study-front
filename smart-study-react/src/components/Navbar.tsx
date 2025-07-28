// src/components/Navbar.tsx
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import navLogo from '../assets/navbar-logo.png';
import { FaBars, FaTimes } from 'react-icons/fa';
import { useTranslation } from 'react-i18next';
import { useSounds } from '../context/SoundContext';

const Navbar: React.FC = () => {
  const { t } = useTranslation();
  const { playHoverSound, playClickSound } = useSounds();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navLinks = [
    { href: '/home', label: t('navbar.home') },
    { href: '/my-notebooks', label: t('navbar.myNotebooks') },
    { href: '/progress', label: t('navbar.progress') },
    { href: '/about-us', label: t('navbar.aboutUs') },
    { href: '/my-account', label: t('navbar.myAccount') },
  ];

  return (
    // ✅ CORREÇÃO 1: Adiciona 'z-50' para garantir que a navbar fique acima de outros conteúdos relativos.
    <header className="w-full text-white p-4 border-b border-purple-800 relative z-50">
      <div className="container mx-auto flex items-center justify-between">

        {/* --- Seção Esquerda: Logo --- */}
        <div className="w-1/3">
          <Link 
            to="/home" 
            className="flex items-center gap-3"
            onMouseEnter={playHoverSound}
            onClick={playClickSound}
          >
            <img src={navLogo} alt="Smart Study Logo" className="h-8 w-auto" />
            <span className="text-xl font-bold hidden sm:inline">Smart Study</span>
          </Link>
        </div>

        {/* --- Seção Central (Navegação Desktop) --- */}
        <nav className="hidden md:flex items-center justify-center gap-8 w-1/3">
          {navLinks.map((link) => (
            <Link 
              key={link.href} 
              to={link.href} 
              className="text-gray-300 hover:text-white transition whitespace-nowrap"
              onMouseEnter={playHoverSound}
              onClick={playClickSound}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        {/* --- Seção Direita (Botão Hambúrguer) --- */}
        <div className="w-1/3 flex justify-end">
            <button 
              onClick={() => {
                playClickSound();
                setIsMenuOpen(!isMenuOpen);
              }} 
              className="md:hidden z-50 p-2" 
              aria-label="Toggle menu"
            >
                {isMenuOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
            </button>
        </div>

      </div>

      {/* --- Menu Overlay (Mobile) --- */}
      {/* ✅ CORREÇÃO 2: Garante que o fundo cubra toda a tela e o conteúdo seja centralizado. */}
      <div 
        className={`fixed top-0 left-0 w-full h-screen bg-purple-900 bg-opacity-95 backdrop-blur-sm md:hidden transition-transform duration-300 ease-in-out ${isMenuOpen ? 'translate-x-0' : '-translate-x-full'}`}
      >
        <nav className="flex flex-col items-center justify-center h-full gap-8">
          {navLinks.map((link) => (
            <Link 
              key={link.href} 
              to={link.href} 
              className="text-2xl text-white hover:text-purple-300 transition"
              onMouseEnter={playHoverSound}
              onClick={() => {
                playClickSound();
                setIsMenuOpen(false);
              }} 
            >
              {link.label}
            </Link>
          ))}
        </nav>
      </div>
    </header>
  );
};

export default Navbar;