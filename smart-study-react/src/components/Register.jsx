import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { motion } from "framer-motion";
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
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#1e0050] to-[#6f1ab6] px-4">
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="w-full max-w-6xl bg-white rounded-xl shadow-2xl flex overflow-hidden"
      >
        {/* Lado esquerdo */}
        <div className="w-1/2 bg-white flex flex-col items-center justify-center p-10">
          <img
            src="/images/logo.jpg"
            alt="Smart Study Logo"
            className="w-60 h-60 object-contain mb-4"
          />
          <h1 className="text-4xl font-bold text-[#1e0050]">Smart Study</h1>
        </div>

        {/* Lado direito */}
        <div className="w-1/2 bg-white p-10 flex flex-col justify-center">
          <h2 className="text-2xl font-bold mb-6 text-black uppercase text-center">
            Create your account!
          </h2>

          <form onSubmit={handleRegister} className="space-y-4">
            <input
              type="text"
              className="w-full p-3 border border-black rounded-sm placeholder-gray-500"
              placeholder="name"
              value={nome}
              onChange={(e) => setNome(e.target.value)}
              required
            />
            <input
              type="email"
              className="w-full p-3 border border-black rounded-sm placeholder-gray-500"
              placeholder="e-mail adress"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <input
              type="password"
              className="w-full p-3 border border-black rounded-sm placeholder-gray-500"
              placeholder="password"
              value={senha}
              onChange={(e) => setSenha(e.target.value)}
              required
            />
            <input
              type="password"
              className="w-full p-3 border border-black rounded-sm placeholder-gray-500"
              placeholder="confirm password"
              value={confirmarSenha}
              onChange={(e) => setConfirmarSenha(e.target.value)}
              required
            />

            <motion.button
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              type="submit"
              className="w-full py-3 font-bold text-white text-md rounded-sm bg-gradient-to-r from-blue-600 to-purple-500"
            >
              NEXT
            </motion.button>
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
        </div>
      </motion.div>
    </div>
  );
}

export default Register;
