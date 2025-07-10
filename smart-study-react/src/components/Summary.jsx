import React, { useState } from 'react';

const Summary = () => {
  const [mensagens, setMensagens] = useState([
    { tipo: 'bot', texto: 'Olá! Qual matéria vamos estudar hoje?' }
  ]);
  const [entrada, setEntrada] = useState('');

  const enviarMensagem = () => {
    if (!entrada.trim()) return;
    const novaMensagem = { tipo: 'user', texto: entrada };
    const respostaBot = {
      tipo: 'bot',
      texto: `Aqui está um resumo da matéria "${entrada}": Lorem ipsum dolor sit amet... \n\nFontes confiáveis:\n- Khan Academy\n- Alura\n- Wikipedia`
    };

    setMensagens([...mensagens, novaMensagem, respostaBot]);
    setEntrada('');
  };

  return (
    <div style={{ backgroundColor: '#3b1a5a', color: 'white', minHeight: '100vh' }}>
      <nav className="navbar navbar-dark px-4" style={{ backgroundColor: '#4a148c' }}>
        <a className="navbar-brand fw-bold d-flex align-items-center" href="#">
          <img src="/images/logo.jpg" alt="Logo" className="img-fluid me-2" style={{ maxWidth: '30px' }} />
          Smart Study
        </a>
      </nav>

      <div className="container py-5">
        <div className="bg-secondary p-4 rounded" style={{ maxHeight: '60vh', overflowY: 'auto' }}>
          {mensagens.map((m, i) => (
            <div key={i} className={`my-2 ${m.tipo === 'bot' ? 'text-start' : 'text-end'}`}>
              <div className={`p-3 rounded ${m.tipo === 'bot' ? 'bg-primary' : 'bg-light text-dark'}`}>
                {m.texto}
              </div>
            </div>
          ))}
        </div>

        <div className="input-group mt-3">
          <input
            type="text"
            className="form-control"
            placeholder="Digite sua pergunta..."
            value={entrada}
            onChange={(e) => setEntrada(e.target.value)}
          />
          <button className="btn btn-light" onClick={enviarMensagem}>Enviar</button>
        </div>

        <button className="btn btn-outline-light mt-3">
          Salvar conversa
        </button>
      </div>
    </div>
  );
};

export default Summary;
