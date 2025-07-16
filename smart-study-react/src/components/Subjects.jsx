import React, { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";

function Subjects() {
  const navigate = useNavigate();
  const location = useLocation();
  const [aulaName, setAulaName] = useState("Unknown Class");

  // Checagem de login e leitura da aula via URL
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

  const handleVoltar = () => {
    navigate("/notebooks");
  };

  const irPara = (rota) => {
    navigate(`/${rota}?aula=${encodeURIComponent(aulaName)}`);
  };

  return (
    <div style={{ backgroundColor: "#3b1a5a", color: "white", minHeight: "100vh" }}>
      {/* Navbar */}
      <nav className="navbar navbar-expand-lg navbar-dark px-4 mb-5" style={{ backgroundColor: "#4a148c" }}>
        <a className="navbar-brand fw-bold d-flex align-items-center" href="#">
          <img src="/images/logo.jpg" alt="Logo" className="img-fluid me-2" style={{ maxWidth: "30px" }} />
          Smart Study
        </a>
        <div className="ms-auto">
          <span className="btn btn-outline-light">{aulaName}</span>
        </div>
      </nav>

      {/* Conteúdo principal */}
      <div className="container py-5 text-center">
        <h2 className="fw-bold mb-4">{aulaName}</h2>
        <h1 className="fw-bold mb-5">What would you like to do today?</h1>

        <div className="row g-4 justify-content-center">
          {/* Study Card */}
          <div className="col-md-6 col-lg-4">
            <div className="card text-white rounded shadow h-100 wider-card" style={{ backgroundColor: "#5e2c82", cursor: "pointer" }} onClick={() => irPara("summary")}>
              <div className="card-body">
                <span className="badge mb-3" style={{ backgroundColor: "#845ec2" }}>#one</span>
                <h3 className="card-title fw-bold">Study</h3>
                <p className="card-text">Keep in mind the main topics of each class!</p>
              </div>
            </div>
          </div>

          {/* Tests Card */}
          <div className="col-md-6 col-lg-4">
            <div className="card text-white rounded shadow h-100 wider-card" style={{ backgroundColor: "#5e2c82", cursor: "pointer" }} onClick={() => irPara("quizz")}>
              <div className="card-body">
                <span className="badge mb-3" style={{ backgroundColor: "#845ec2" }}>#two</span>
                <h3 className="card-title fw-bold">Tests</h3>
                <p className="card-text">Test your knowledge with the approaches that most suit you!</p>
              </div>
            </div>
          </div>

          {/* Progress Card */}
          <div className="col-md-6 col-lg-4">
            <div className="card text-white rounded shadow h-100 wider-card" style={{ backgroundColor: "#5e2c82", cursor: "pointer" }} onClick={() => irPara("progress")}>
              <div className="card-body">
                <span className="badge mb-3" style={{ backgroundColor: "#845ec2" }}>#three</span>
                <h3 className="card-title fw-bold">Progress</h3>
                <p className="card-text">Take a look on how far you came!</p>
              </div>
            </div>
          </div>
        </div>

        {/* Botão Voltar */}
        <div className="text-center mt-5">
          <button className="btn btn-light rounded-pill px-4 py-2" onClick={handleVoltar}>
            <i className="bi bi-arrow-left"></i> Go Back
          </button>
        </div>
      </div>
    </div>
  );
}

export default Subjects;
