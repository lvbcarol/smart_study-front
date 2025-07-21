import React from "react";

const Navbar = ({ onNavigate }) => {
  return (
    <nav className="bg-[#4a0082] px-6 py-4 shadow-md border-b border-white/20 flex items-center justify-between">
      <div className="flex items-center gap-2 font-bold text-white text-lg">
        <img
          src="/images/logo.jpg"
          alt="Smart Study Logo"
          className="w-8 h-8 rounded"
        />
        Smart Study
      </div>

      <div className="flex gap-3">
        <button
          onClick={() => onNavigate("/home")}
          className="text-white border border-white px-4 py-2 rounded hover:bg-white hover:text-[#4a0082] transition"
        >
          Home
        </button>
        <button
          onClick={() => onNavigate("/aboutus")}
          className="text-white border border-white px-4 py-2 rounded hover:bg-white hover:text-[#4a0082] transition"
        >
          About Us
        </button>
        <button
          onClick={() => onNavigate("/myaccount")}
          className="text-white border border-white px-4 py-2 rounded hover:bg-white hover:text-[#4a0082] transition"
        >
          My Account
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
