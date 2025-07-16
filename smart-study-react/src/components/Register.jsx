// src/components/Register.jsx
import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import API from "../api";

function Register() {
  const navigate = useNavigate();
  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [confirmarSenha, setConfirmarSenha] = useState("");

  const handleRegister = async (e) => {
    e.preventDefault();

    if (senha !== confirmarSenha) {
      alert("As senhas não coincidem!");
      return;
    }

    try {
      const res = await API.post("/usuario/cadastro", {
        nomeCompleto: nome,
        email,
        senha,
        confirmarSenha,
      });

      if (res.status === 201) {
        alert("Cadastro realizado com sucesso!");
        navigate("/login");
      } else {
        alert(res.data.message || "Erro ao cadastrar.");
      }
    } catch (err) {
      console.error("Erro ao cadastrar:", err.response?.data?.erro || err.message);
      alert("Erro ao cadastrar.");
    }
  };

  return (
    <div className="container mt-5">
      <div className="row justify-content-center align-items-center vh-100">
        {/* Lado esquerdo */}
        <div className="col-lg-5 col-md-6 text-center bg-primary text-white py-5 rounded-start">
          <img
            src="/images/logo.jpg"
            alt="Smart Study Logo"
            className="img-fluid mb-4"
            style={{ maxWidth: "150px" }}
          />
          <h1 className="fw-bold">Smart Study</h1>
          <p className="mt-3">Join us and revolutionize your learning!</p>
        </div>

        {/* Lado direito */}
        <div className="col-lg-5 col-md-6 bg-white text-dark py-5 rounded-end">
          <h2 className="text-center mb-4">Create Your Account</h2>
          <form onSubmit={handleRegister}>
            <div className="mb-3">
              <label className="form-label">Full Name</label>
              <input
                type="text"
                className="form-control"
                placeholder="Enter your name"
                value={nome}
                onChange={(e) => setNome(e.target.value)}
                required
              />
            </div>

            <div className="mb-3">
              <label className="form-label">Email Address</label>
              <input
                type="email"
                className="form-control"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>

            <div className="mb-3">
              <label className="form-label">Password</label>
              <input
                type="password"
                className="form-control"
                placeholder="Enter your password"
                value={senha}
                onChange={(e) => setSenha(e.target.value)}
                required
              />
            </div>

            <div className="mb-3">
              <label className="form-label">Confirm Password</label>
              <input
                type="password"
                className="form-control"
                placeholder="Confirm your password"
                value={confirmarSenha}
                onChange={(e) => setConfirmarSenha(e.target.value)}
                required
              />
            </div>

            <div className="text-center">
              <button type="submit" className="btn btn-primary btn-lg w-100">
                Sign Up
              </button>
            </div>
          </form>

          <p className="text-center mt-3 text-muted">
            Already have an account?{" "}
            <Link to="/login" className="text-decoration-none">
              Log In
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Register;
