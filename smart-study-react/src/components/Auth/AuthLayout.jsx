import React from "react";

const AuthLayout = ({ children, title }) => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#1e0050] to-[#6f1ab6] px-4">
      <div className="w-full max-w-6xl bg-white rounded-xl shadow-2xl flex overflow-hidden">
        {/* Lado esquerdo */}
        <div className="w-1/2 bg-white flex flex-col items-center justify-center p-10">
          <img
            src="/images/logo.jpg"
            alt="Smart Study Logo"
            className="w-60 h-60 object-contain mb-4"
          />
          <h1 className="text-4xl font-bold text-[#1e0050]">Smart Study</h1>
        </div>

        {/* Lado direito */}
        <div className="w-1/2 bg-white p-10 flex flex-col justify-center">
          <h2 className="text-2xl font-bold mb-6 text-black uppercase text-center">
            {title}
          </h2>
          {children}
        </div>
      </div>
    </div>
  );
};

export default AuthLayout;
