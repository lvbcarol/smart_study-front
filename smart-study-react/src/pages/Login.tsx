// src/pages/Login.tsx
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import toast from 'react-hot-toast'; // Importar toast
import Input from '../components/ui/Input';
import Button from '../components/ui/Button';
import Logo from '../components/Logo';

const Login: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    const loadingToast = toast.loading('Entrando...');

    try {
      const response = await axios.post('http://localhost:3000/api/usuario/login', { email, password });
      
      if (response.data.token) {
        localStorage.setItem('authToken', response.data.token);
      }
      
      toast.dismiss(loadingToast);
      toast.success('Login bem-sucedido!');
      
      setTimeout(() => {
        navigate('/home');
      }, 1000);

    } catch (err: any) {
      toast.dismiss(loadingToast);
      const errorMessage = err.response?.data?.error || "E-mail ou senha inválidos.";
      toast.error(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    // O JSX permanece o mesmo, sem o display de erro antigo
    <div className="min-h-screen bg-brand-purple flex items-center justify-center p-4 sm:p-6 lg:p-8">
      <div className="w-full max-w-5xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div className="hidden md:flex justify-center"><Logo /></div>
          <div className="bg-white p-8 rounded-xl shadow-2xl w-full max-w-md mx-auto">
            <h2 className="text-2xl font-bold text-center text-gray-900 mb-8 uppercase">WELCOME!</h2>
            <form onSubmit={handleLogin} className="space-y-5">
              <Input id="email" label="e-mail adress" type="email" placeholder="e-mail adress" value={email} onChange={(e) => setEmail(e.target.value)} required disabled={isLoading}/>
              <Input id="password" label="password" type="password" placeholder="password" value={password} onChange={(e) => setPassword(e.target.value)} required disabled={isLoading}/>
              <Button type="submit" variant="primary" disabled={isLoading}>{isLoading ? 'ENTRANDO...' : 'CONFIRM'}</Button>
            </form>
            <p className="text-sm text-center text-gray-500 mt-8">Não tem uma conta?{' '}<Link to="/register" className="font-semibold text-brand-primary hover:underline">Registre-se</Link></p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;