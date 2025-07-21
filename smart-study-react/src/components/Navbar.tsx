// src/components/Navbar.tsx
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaUserCircle } from 'react-icons/fa'; // Ícone de usuário
import navLogo from '../assets/navbar-logo.png'; // Logo da Navbar

const Navbar: React.FC = () => {
  const navigate = useNavigate();

  return (
    <header className="w-full text-white p-4">
      <div className="container mx-auto flex items-center justify-between">
        {/* Lado Esquerdo da Navbar */}
        <div className="flex items-center gap-6">
          <Link to="/home" className="flex items-center gap-3">
            <img src={navLogo} alt="Smart Study Logo" className="h-8 w-auto" />
            <span className="text-xl font-bold">Smart Study</span>
          </Link>
          <nav className="hidden md:flex">
            <Link to="/about-us" className="text-gray-300 hover:text-white transition">About us</Link>
          </nav>
        </div>

        {/* Lado Direito da Navbar */}
        <button 
          onClick={() => navigate('/my-account')}
          className="bg-white text-gray-800 font-semibold py-2 px-5 rounded-full flex items-center gap-2 hover:bg-gray-200 transition"
        >
          <FaUserCircle />
          <span>My account</span>
        </button>
      </div>
    </header>
  );
};

export default Navbar;