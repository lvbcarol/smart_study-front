import React, { useEffect, useState, useRef } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import ChatMessage from "../components/Chat/ChatMessage";
import ChatInput from "../components/Chat/ChatInput";
import SaveButton from "../components/Chat/SaveButton";
import Navbar from "../components/Layout/Navbar";

function Summary() {
  const navigate = useNavigate();
  const location = useLocation();
  const [aulaName, setAulaName] = useState("Unknown Class");
  const [mensagens, setMensagens] = useState([
    { tipo: "bot", texto: "Olá! Qual matéria vamos estudar hoje?" }
  ]);
  const [entrada, setEntrada] = useState("");
  const chatRef = useRef(null);

  useEffect(() => {
    const usuarioId = localStorage.getItem("usuarioId");
    if (!usuarioId) {
      alert("Você precisa estar logado para acessar esta página.");
      navigate("/login");
    }

    const params = new URLSearchParams(location.search);
    const aula = params.get("aula");
    if (aula) setAulaName(decodeURIComponent(aula));
  }, [location, navigate]);

  const enviarMensagem = () => {
    if (!entrada.trim()) return;

    const novaMensagem = { tipo: "user", texto: entrada };
    const respostaBot = {
      tipo: "bot",
      texto: `Aqui está um resumo da matéria "<strong>${entrada}</strong>":<br>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer nec odio. Praesent libero.<br><br>
        <strong>Fontes confiáveis:</strong><br>
        - <a href="https://www.khanacademy.org" target="_blank">Khan Academy</a><br>
        - <a href="https://www.alura.com.br" target="_blank">Alura</a><br>
        - <a href="https://pt.wikipedia.org" target="_blank">Wikipedia</a>`
    };

    setMensagens((msgs) => [...msgs, novaMensagem, respostaBot]);
    setEntrada("");
  };

  useEffect(() => {
    if (chatRef.current) {
      chatRef.current.scrollTop = chatRef.current.scrollHeight;
    }
  }, [mensagens]);

  return (
    <div className="bg-[#3b1a5a] min-h-screen text-white flex flex-col">
      <Navbar aulaName={aulaName} />
      <div className="flex flex-col items-center flex-grow px-4 py-6">
        <div
          className="bg-[#5e2c82] rounded-lg shadow-lg p-4 w-full max-w-3xl overflow-y-auto h-[60vh] space-y-4"
          ref={chatRef}
        >
          {mensagens.map((msg, idx) => (
            <ChatMessage key={idx} tipo={msg.tipo} texto={msg.texto} />
          ))}
        </div>

        <ChatInput
          entrada={entrada}
          setEntrada={setEntrada}
          onEnviar={enviarMensagem}
        />

        <SaveButton />
      </div>
    </div>
  );
}

export default Summary;
