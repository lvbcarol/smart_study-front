import React from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Layout/Navbar";
import HomeSectionButton from "../components/UI/HomeSectionButton";

function Home() {
  const navigate = useNavigate();

  const handleNavigate = (path) => navigate(path);

  return (
    <div className="bg-[#2a003f] min-h-screen text-white">
      <Navbar onNavigate={handleNavigate} />

      <div className="container mx-auto px-4 py-12">
        <div className="grid md:grid-cols-2 gap-10 items-center">
          {/* Seção esquerda */}
          <div>
            <span className="bg-white text-[#2a003f] text-lg font-semibold rounded px-4 py-2 inline-block mb-4">
              #studysmart
            </span>
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              Who said that studying is boring?
            </h1>
            <p className="text-lg mb-6">
              We are going to help you achieve your goals, no matter what!
            </p>
            <div className="flex items-center gap-4">
              <img
                src="/images/books.jpg"
                alt="Books Icon"
                className="w-28"
              />
              <HomeSectionButton onClick={() => handleNavigate("/notebooks")}>
                My Notebooks
              </HomeSectionButton>
            </div>
          </div>

          {/* Seção direita */}
          <div className="rounded-2xl overflow-hidden shadow-xl">
            <img
              src="/images/home.jpg"
              alt="Laptop and Study"
              className="w-full max-w-lg mx-auto"
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;
