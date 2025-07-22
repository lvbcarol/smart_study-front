// src/components/Navbar.tsx
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import navLogo from '../assets/navbar-logo.png';
import { FaBars, FaTimes } from 'react-icons/fa';

const Navbar: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // ✅ ADICIONADO "PROGRESS" AO ARRAY DE LINKS
  const navLinks = [
    { href: '/home', label: 'Home' },
    { href: '/my-notebooks', label: 'My notebooks' },
    { href: '/progress', label: 'Progress' },
    { href: '/about-us', label: 'About us' },
    { href: '/my-account', label: 'My account' },
  ];

  return (
    <header className="w-full text-white p-4 border-b border-purple-800 relative">
      <div className="container mx-auto flex items-center justify-between">
        <div className="w-1/3">
          <Link to="/home" className="flex items-center gap-3">
            <img src={navLogo} alt="Smart Study Logo" className="h-8 w-auto" />
            <span className="text-xl font-bold hidden sm:inline">Smart Study</span>
          </Link>
        </div>
        <nav className="hidden md:flex items-center justify-center gap-8 w-1/3">
          {navLinks.map((link) => (
            <Link key={link.href} to={link.href} className="text-gray-300 hover:text-white transition whitespace-nowrap">
              {link.label}
            </Link>
          ))}
        </nav>
        <div className="w-1/3 flex justify-end">
            <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="md:hidden z-50" aria-label="Toggle menu">
                {isMenuOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
            </button>
        </div>
      </div>
      <div 
        className={`absolute top-0 left-0 w-full h-screen bg-purple-900 bg-opacity-95 backdrop-blur-sm md:hidden transition-transform duration-300 ease-in-out ${isMenuOpen ? 'translate-x-0' : '-translate-x-full'}`}
      >
        <nav className="flex flex-col items-center justify-center h-full gap-8">
          {navLinks.map((link) => (
            <Link 
              key={link.href} 
              to={link.href} 
              className="text-2xl text-white hover:text-purple-300 transition"
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