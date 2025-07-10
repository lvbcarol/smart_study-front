import React, { useState } from 'react';

const Quizz = () => {
  const perguntas = [
    {
      pergunta: 'Qual a capital do Brasil?',
      alternativas: ['São Paulo', 'Rio de Janeiro', 'Brasília', 'Salvador'],
      resposta: 2
    },
    {
      pergunta: 'Quanto é 7 x 6?',
      alternativas: ['42', '36', '49', '48'],
      resposta: 0
    }
  ];

  const [index, setIndex] = useState(0);
  const [respostaSelecionada, setRespostaSelecionada] = useState(null);
  const [mostrarResultado, setMostrarResultado] = useState(false);

  const responder = (i) => {
    setRespostaSelecionada(i);
    setMostrarResultado(true);
  };

  const proxima = () => {
    setRespostaSelecionada(null);
    setMostrarResultado(false);
    setIndex((prev) => prev + 1);
  };

  const perguntaAtual = perguntas[index];

  return (
    <div style={{ backgroundColor: '#3b1a5a', color: 'white', minHeight: '100vh' }}>
      <nav className="navbar navbar-dark px-4" style={{ backgroundColor: '#4a148c' }}>
        <a className="navbar-brand fw-bold d-flex align-items-center" href="#">
          <img src="/images/logo.jpg" alt="Logo" className="img-fluid me-2" style={{ maxWidth: '30px' }} />
          Smart Study
        </a>
      </nav>

      <div className="container text-center py-5">
        {index < perguntas.length ? (
          <div>
            <h2>{perguntaAtual.pergunta}</h2>
            <div className="mt-4">
              {perguntaAtual.alternativas.map((alt, i) => (
                <button
                  key={i}
                  className={`btn m-2 ${mostrarResultado
                    ? i === perguntaAtual.resposta
                      ? 'btn-success'
                      : i === respostaSelecionada
                      ? 'btn-danger'
                      : 'btn-secondary'
                    : 'btn-outline-light'
                  }`}
                  onClick={() => !mostrarResultado && responder(i)}
                >
                  {alt}
                </button>
              ))}
            </div>
            {mostrarResultado && (
              <button className="btn btn-light mt-4" onClick={proxima}>Próxima</button>
            )}
          </div>
        ) : (
          <h3>Fim do Quiz!</h3>
        )}
      </div>
    </div>
  );
};

export default Quizz;
