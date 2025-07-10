// src/components/Register.jsx
import React, { useState } from "react";
import API from "../api";
import { useNavigate } from "react-router-dom";

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
      const res = await API.post("/register", { nome, email, senha });
      alert("Cadastro realizado com sucesso!");
      navigate("/"); // redireciona para login
    } catch (err) {
      console.error("Erro ao cadastrar:", err.response?.data?.erro || err.message);
      alert("Erro ao cadastrar.");
    }
  };

  return (
    <div className="container mt-5">
      <h2 className="mb-4">Crie sua conta</h2>
      <form onSubmit={handleRegister}>
        <input
          type="text"
          className="form-control mb-3"
          placeholder="Nome completo"
          value={nome}
          onChange={(e) => setNome(e.target.value)}
          required
        />
        <input
          type="email"
          className="form-control mb-3"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          className="form-control mb-3"
          placeholder="Senha"
          value={senha}
          onChange={(e) => setSenha(e.target.value)}
          required
        />
        <input
          type="password"
          className="form-control mb-3"
          placeholder="Confirmar Senha"
          value={confirmarSenha}
          onChange={(e) => setConfirmarSenha(e.target.value)}
          required
        />
        <button type="submit" className="btn btn-success w-100">Cadastrar</button>
      </form>
    </div>
  );
}

export default Register;
