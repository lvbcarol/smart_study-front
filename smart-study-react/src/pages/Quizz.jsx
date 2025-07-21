import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function Quizz() {
  const navigate = useNavigate();

  const quizData = [
    {
      pergunta: "Qual é a capital do Brasil?",
      alternativas: ["São Paulo", "Brasília", "Rio de Janeiro", "Belo Horizonte"],
      resposta: 1,
      explicacao: "Brasília foi fundada em 1960 e é a capital planejada do Brasil."
    },
    {
      pergunta: "Qual estrutura de dados funciona como uma pilha?",
      alternativas: ["Fila", "Heap", "Stack", "Árvore"],
      resposta: 2,
      explicacao: "Stack segue o princípio LIFO (Last In, First Out)."
    },
    {
      pergunta: "O que significa HTML?",
      alternativas: ["HyperText Markup Language", "Hyper Training Machine Language", "HighText Machine Language", "None"],
      resposta: 0,
      explicacao: "HTML é a linguagem de marcação usada para construir páginas web."
    }
  ];

  const [index, setIndex] = useState(0);
  const [respostaSelecionada, setRespostaSelecionada] = useState(null);
  const [mostrarExplicacao, setMostrarExplicacao] = useState(false);
  const [erros, setErros] = useState([]);

  const perguntaAtual = quizData[index];

  const handleResposta = (i) => {
    setRespostaSelecionada(i);
    setMostrarExplicacao(true);

    if (i !== perguntaAtual.resposta) {
      setErros((prev) => [
        ...prev,
        {
          pergunta: perguntaAtual.pergunta,
          correta: perguntaAtual.alternativas[perguntaAtual.resposta],
          explicacao: perguntaAtual.explicacao
        }
      ]);
    }
  };

  const proximaPergunta = () => {
    setRespostaSelecionada(null);
    setMostrarExplicacao(false);
    setIndex((prev) => prev + 1);
  };

  const salvarRelatorio = () => {
    const conteudo = erros.map(e => 
      `Pergunta: ${e.pergunta}\nCorreta: ${e.correta}\nExplicação: ${e.explicacao}\n`
    ).join("\n");

    const blob = new Blob([conteudo], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "relatorio_quizz.txt";
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div style={{ backgroundColor: "#3b1a5a", color: "white", minHeight: "100vh" }}>
      <nav className="navbar navbar-dark px-4" style={{ backgroundColor: "#4a148c" }}>
        <a className="navbar-brand fw-bold d-flex align-items-center" href="#">
          <img src="/images/logo.jpg" alt="Logo" className="img-fluid me-2" style={{ maxWidth: "30px" }} />
          Smart Study
        </a>
      </nav>

      <div className="container py-5">
        {index < quizData.length ? (
          <>
            <h4 className="mb-4">{perguntaAtual.pergunta}</h4>
            <div className="d-flex flex-column">
              {perguntaAtual.alternativas.map((alt, i) => (
                <button
                  key={i}
                  className={`btn my-1 ${
                    mostrarExplicacao
                      ? i === perguntaAtual.resposta
                        ? "btn-success"
                        : i === respostaSelecionada
                        ? "btn-danger"
                        : "btn-secondary"
                      : "btn-outline-light"
                  }`}
                  disabled={mostrarExplicacao}
                  onClick={() => handleResposta(i)}
                >
                  {String.fromCharCode(65 + i)}. {alt}
                </button>
              ))}
            </div>

            {mostrarExplicacao && (
              <>
                <div className="mt-3 alert alert-info text-dark">
                  {perguntaAtual.explicacao}
                </div>
                <button className="btn btn-light mt-3" onClick={proximaPergunta}>
                  Próxima
                </button>
              </>
            )}
          </>
        ) : (
          <>
            <h3>Quiz finalizado!</h3>
            {erros.length === 0 ? (
              <p className="mt-3">Parabéns! Você acertou todas as perguntas!</p>
            ) : (
              <>
                <p className="mt-3">Você errou {erros.length} perguntas. Veja os detalhes:</p>
                <ul>
                  {erros.map((err, idx) => (
                    <li key={idx} className="mb-3">
                      <strong>{err.pergunta}</strong><br />
                      Resposta correta: {err.correta}<br />
                      Explicação: {err.explicacao}
                    </li>
                  ))}
                </ul>
              </>
            )}

            <button className="btn btn-warning mt-4 me-2" onClick={salvarRelatorio}>
              Salvar Relatório
            </button>

            <button className="btn btn-outline-light mt-4" onClick={() => navigate("/home")}>
              Voltar à Home
            </button>
          </>
        )}
      </div>
    </div>
  );
}

export default Quizz;
