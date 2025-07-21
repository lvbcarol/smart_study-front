import React from "react";
import { useNavigate, useLocation } from "react-router-dom";

function Subjects() {
  const navigate = useNavigate();
  const location = useLocation();
  const aula = new URLSearchParams(location.search).get("aula");

  const goTo = (path) => {
    navigate(`${path}?aula=${encodeURIComponent(aula || "Aula")}`);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 to-indigo-900 flex flex-col items-center justify-center text-white px-4">
      <h1 className="text-3xl font-bold mb-6 text-center">Selecione uma opção para a aula: {aula}</h1>
      <div className="flex flex-col gap-6 w-full max-w-md">
        <button onClick={() => goTo("/summary")} className="bg-white text-purple-800 text-lg font-semibold px-6 py-4 rounded-xl shadow hover:scale-105 transition">
          📖 Summary
        </button>
        <button onClick={() => goTo("/quizz")} className="bg-white text-purple-800 text-lg font-semibold px-6 py-4 rounded-xl shadow hover:scale-105 transition">
          🧠 Quizz
        </button>
        <button onClick={() => goTo("/progress")} className="bg-white text-purple-800 text-lg font-semibold px-6 py-4 rounded-xl shadow hover:scale-105 transition">
          📊 Progress
        </button>
      </div>
    </div>
  );
}

export default Subjects;
