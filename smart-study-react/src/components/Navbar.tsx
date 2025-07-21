// src/components/Navbar.tsx
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import navLogo from '../assets/navbar-logo.png';
import { FaBars, FaTimes } from 'react-icons/fa'; // Ícones de Hambúrguer e Fechar

const Navbar: React.FC = () => {
  // Estado para controlar se o menu mobile está aberto ou fechado
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // Array de links para não repetir código (boa prática)
  const navLinks = [
    { href: '/home', label: 'Home' },
    { href: '/my-notebooks', label: 'My notebooks' },
    { href: '/about-us', label: 'About us' },
    { href: '/my-account', label: 'My account' },
  ];

  return (
    <header className="w-full text-white p-4 border-b border-purple-800 relative">
      <div className="container mx-auto flex items-center justify-between">

        {/* --- Seção Esquerda: Logo --- */}
        <div>
          <Link to="/home" className="flex items-center gap-3">
            <img src={navLogo} alt="Smart Study Logo" className="h-8 w-auto" />
            <span className="text-xl font-bold">Smart Study</span>
          </Link>
        </div>

        {/* --- Seção Central (Navegação Desktop) --- */}
        {/* Esta seção só aparece em telas médias (md) ou maiores */}
        <nav className="hidden md:flex items-center justify-center gap-8">
          {navLinks.map((link) => (
            <Link key={link.href} to={link.href} className="text-gray-300 hover:text-white transition">
              {link.label}
            </Link>
          ))}
        </nav>

        {/* --- Botão Hambúrguer (Mobile) --- */}
        {/* Este botão só aparece em telas menores que médias (md) */}
        <div className="md:hidden">
          <button onClick={() => setIsMenuOpen(!isMenuOpen)} aria-label="Toggle menu">
            {isMenuOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
          </button>
        </div>
      </div>

      {/* --- Menu Overlay (Mobile) --- */}
      {/* Este menu só aparece em telas pequenas E quando isMenuOpen é true */}
      <div className={`absolute top-full left-0 w-full bg-purple-900 bg-opacity-95 backdrop-blur-sm md:hidden ${isMenuOpen ? 'block' : 'hidden'}`}>
        <nav className="flex flex-col items-center gap-6 py-8">
          {navLinks.map((link) => (
            <Link 
              key={link.href} 
              to={link.href} 
              className="text-xl text-white hover:text-purple-300 transition"
              // Fecha o menu ao clicar em um link
              onClick={() => setIsMenuOpen(false)} 
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