import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import API from "../api";
import AuthLayout from "../components/Auth/AuthLayout";
import AuthInput from "../components/Auth/AuthInput";
import GradientButton from "../components/UI/GradientButton";

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
    <AuthLayout title="Create your account!">
      <form onSubmit={handleRegister} className="space-y-4">
        <AuthInput type="text" placeholder="name" value={nome} onChange={(e) => setNome(e.target.value)} />
        <AuthInput type="email" placeholder="e-mail address" value={email} onChange={(e) => setEmail(e.target.value)} />
        <AuthInput type="password" placeholder="password" value={senha} onChange={(e) => setSenha(e.target.value)} />
        <AuthInput type="password" placeholder="confirm password" value={confirmarSenha} onChange={(e) => setConfirmarSenha(e.target.value)} />
        <GradientButton type="submit">NEXT</GradientButton>
      </form>

      <div className="text-center mt-5 text-black">
        <p className="text-sm">Already have an account?</p>
        <Link
          to="/login"
          className="inline-block border border-black mt-2 px-6 py-2 hover:bg-gray-200 transition"
        >
          LOG IN
        </Link>
      </div>

      <p className="mt-6 text-[11px] text-center text-gray-600">
        By registering, You agree to the <br />
        <span className="underline">Terms, Conditions and Policies</span> of Borcelle
        & Privacy Policy
      </p>
    </AuthLayout>
  );
}

export default Register;
