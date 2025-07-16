// src/components/MyAccount.jsx
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function MyAccount() {
  const navigate = useNavigate();
  const [nomeUsuario, setNomeUsuario] = useState("");

  useEffect(() => {
    const nome = localStorage.getItem("usuarioNome");
    if (nome) {
      setNomeUsuario(nome);
    }
  }, []);

  return (
    <div style={{ backgroundColor: "#2b0a3d", color: "#fff", minHeight: "100vh" }}>
      {/* Navbar */}
      <nav className="navbar navbar-expand-lg navbar-dark bg-primary px-4">
        <span className="navbar-brand fw-bold d-flex align-items-center">
          <img
            src="/images/logo.jpg"
            alt="Smart Study Logo"
            className="img-fluid"
            style={{ maxWidth: "30px", marginRight: "8px" }}
          />
          Smart Study
        </span>
        <div className="ms-auto d-flex gap-3">
          <button className="btn btn-outline-light d-flex align-items-center" onClick={() => navigate("/home")}>
            <i className="bi bi-house me-1"></i> Home
          </button>
          <button
            className="btn active-page"
            style={{
              backgroundColor: "#ffffff",
              color: "#6f42c1",
              fontWeight: "bold",
              pointerEvents: "none",
            }}
          >
            My Account
          </button>
          <button className="btn btn-outline-light" onClick={() => navigate("/aboutus")}>
            About Us
          </button>
        </div>
      </nav>

      {/* Conteúdo principal */}
      <div
        className="account-container"
        style={{
          maxWidth: "600px",
          margin: "80px auto",
          padding: "30px",
          backgroundColor: "#3c1173",
          borderRadius: "15px",
          boxShadow: "0 0 20px rgba(0,0,0,0.3)",
          textAlign: "center",
        }}
      >
        <h1 className="fw-bold mb-3">My Account</h1>
        <h4 className="mb-4">Welcome, {nomeUsuario || "User"}</h4>
        <img
          src="/images/myaccount.jpg"
          alt="User Icon"
          className="mb-4"
          style={{ maxWidth: "100px" }}
        />
        <div className="d-grid gap-3 mt-3">
          <button
            className="btn py-2"
            style={{
              backgroundColor: "#ffffff",
              color: "#6f42c1",
              fontWeight: 500,
            }}
          >
            Sign Language
          </button>
          <button
            className="btn py-2"
            style={{
              backgroundColor: "#ffffff",
              color: "#6f42c1",
              fontWeight: 500,
            }}
          >
            Audio Resources
          </button>
        </div>
      </div>
    </div>
  );
}

export default MyAccount;
