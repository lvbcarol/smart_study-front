import React from "react";
import { useNavigate } from "react-router-dom";

function Home() {
  const navigate = useNavigate();

  const handleNavigate = (path) => {
    navigate(path);
  };

  return (
    <div style={{ backgroundColor: "#2a003f", minHeight: "100vh", color: "white" }}>
      {/* Navbar */}
      <nav className="navbar navbar-expand-lg navbar-dark bg-primary px-4" style={{ borderBottom: "2px solid #ffffff30" }}>
        <span className="navbar-brand fw-bold d-flex align-items-center">
          <img src="/images/logo.jpg" alt="Smart Study Logo" className="img-fluid" style={{ maxWidth: "30px", marginRight: "8px" }} />
          Smart Study
        </span>
        <div className="ms-auto d-flex gap-3">
          <button className="btn btn-outline-light d-flex align-items-center" onClick={() => handleNavigate("/home")}>
            <i className="bi bi-house me-1"></i> Home
          </button>
          <button className="btn btn-outline-light" onClick={() => handleNavigate("/aboutus")}>About Us</button>
          <button className="btn btn-outline-light" onClick={() => handleNavigate("/myaccount")}>My Account</button>
        </div>
      </nav>

      {/* Conteúdo principal */}
      <div className="container mt-5">
        <div className="row align-items-center">
          {/* Seção da esquerda */}
          <div className="col-lg-6 col-md-6">
            <span className="badge mb-3 fs-4 px-3 py-2" style={{ backgroundColor: "#fff", color: "#2a003f" }}>#studysmart</span>
            <h1 className="fw-bold">Who said that studying is boring?</h1>
            <p className="fs-5 mt-3">
              We are going to help you achieve your goals, no matter what!
            </p>
            <div className="d-flex align-items-center mt-4">
              <img src="/images/books.jpg" alt="Books Icon" className="me-3" style={{ maxWidth: "120px" }} />
              <button className="btn btn-light px-4 py-2 d-flex align-items-center" onClick={() => handleNavigate("/notebooks")}>
                My Notebooks
                <i className="bi bi-arrow-right ms-2"></i>
              </button>
            </div>
          </div>

          {/* Seção da direita */}
          <div className="col-lg-6 col-md-6">
            <div className="rounded-3 overflow-hidden shadow-lg">
              <img src="/images/home.jpg" alt="Laptop and Study" className="img-fluid" style={{ maxWidth: "80%" }} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;
