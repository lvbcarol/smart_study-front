import React, { useEffect, useState, useRef } from "react";
import { useNavigate, useLocation } from "react-router-dom";

function Summary() {
  const navigate = useNavigate();
  const location = useLocation();
  const [aulaName, setAulaName] = useState("Unknown Class");
  const [mensagens, setMensagens] = useState([
    { tipo: "bot", texto: "Olá! Qual matéria vamos estudar hoje?" }
  ]);
  const [entrada, setEntrada] = useState("");
  const chatRef = useRef(null);

  // Checa login e extrai aula da URL
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

  // Envia mensagem do usuário e resposta do bot
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

  // Scroll automático para a última mensagem
  useEffect(() => {
    if (chatRef.current) {
      chatRef.current.scrollTop = chatRef.current.scrollHeight;
    }
  }, [mensagens]);

  const salvarConversa = () => {
    alert("Função de salvar em desenvolvimento...");
    // Futuro: exportar texto ou enviar para backend
  };

  return (
    <div style={{ backgroundColor: "#3b1a5a", color: "white", minHeight: "100vh", display: "flex", flexDirection: "column" }}>
      {/* Navbar */}
      <nav className="navbar navbar-dark px-4 mb-4" style={{ backgroundColor: "#4a148c" }}>
        <a className="navbar-brand fw-bold d-flex align-items-center" href="#">
          <img src="/images/logo.jpg" alt="Logo" className="img-fluid me-2" style={{ maxWidth: "30px" }} />
          Smart Study
        </a>
        <span className="btn btn-outline-light">{aulaName}</span>
      </nav>

      {/* Chat Container */}
      <div className="container flex-grow-1 d-flex flex-column align-items-center">
        <div
          className="chat-box bg-dark p-4 rounded mb-3 w-100"
          style={{ maxWidth: "800px", maxHeight: "60vh", overflowY: "auto", backgroundColor: "#5e2c82" }}
          ref={chatRef}
        >
          {mensagens.map((msg, idx) => (
            <div key={idx} className={`message d-flex ${msg.tipo === "bot" ? "" : "justify-content-end"}`}>
              {msg.tipo === "bot" ? (
                <>
                  <img src="/images/chatbot.png" alt="Bot" className="bot-avatar me-2" style={{ width: "40px", height: "40px" }} />
                  <div
                    className="text p-3 rounded"
                    style={{ backgroundColor: "#845ec2", color: "white" }}
                    dangerouslySetInnerHTML={{ __html: msg.texto }}
                  />
                </>
              ) : (
                <>
                  <div
                    className="text p-3 rounded"
                    style={{ backgroundColor: "#f1f1f1", color: "black", maxWidth: "70%" }}
                  >
                    {msg.texto}
                  </div>
                  <i className="bi bi-person-circle fs-3 ms-2 text-white"></i>
                </>
              )}
            </div>
          ))}
        </div>

        {/* Input */}
        <div className="chat-input w-100" style={{ maxWidth: "800px", display: "flex", gap: "10px" }}>
          <input
            type="text"
            className="form-control"
            placeholder="Digite sua resposta..."
            value={entrada}
            onChange={(e) => setEntrada(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && enviarMensagem()}
          />
          <button className="btn btn-light" onClick={enviarMensagem}>Enviar</button>
        </div>

        {/* Botão de salvar */}
        <button className="btn btn-outline-light mt-4" onClick={salvarConversa}>
          <i className="bi bi-save"></i> Salvar conversa
        </button>
      </div>
    </div>
  );
}

export default Summary;
