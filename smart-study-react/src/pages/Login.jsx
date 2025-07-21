import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import API from "../api";
import AuthLayout from "../components/Auth/AuthLayout";
import AuthInput from "../components/Auth/AuthInput";
import GradientButton from "../components/UI/GradientButton";

function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const res = await API.post("/usuario/login", { email, senha });
      const { token, user } = res.data;

      localStorage.setItem("token", token);
      localStorage.setItem("user", JSON.stringify(user));

      navigate("/home");
    } catch (err) {
      console.error("Erro ao fazer login:", err.response?.data?.erro || err.message);
      alert("Login falhou");
    }
  };

  return (
    <AuthLayout title="Welcome Back!">
      <form onSubmit={handleLogin} className="space-y-4">
        <AuthInput
          type="email"
          placeholder="e-mail address"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <AuthInput
          type="password"
          placeholder="password"
          value={senha}
          onChange={(e) => setSenha(e.target.value)}
        />
        <GradientButton type="submit">LOGIN</GradientButton>
      </form>

      <div className="text-center mt-5 text-black">
        <p className="text-sm">Don't have an account?</p>
        <Link
          to="/register"
          className="inline-block border border-black mt-2 px-6 py-2 hover:bg-gray-200 transition"
        >
          SIGN UP
        </Link>
      </div>

      <p className="mt-6 text-[11px] text-center text-gray-600">
        By logging in, You agree to the <br />
        <span className="underline">Terms, Conditions and Policies</span> of Borcelle
        & Privacy Policy
      </p>
    </AuthLayout>
  );
}

export default Login;
