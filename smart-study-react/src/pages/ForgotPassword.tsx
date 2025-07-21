// src/pages/ForgotPassword.tsx
import React, { useState } from 'react';
import axios from 'axios';
import toast from 'react-hot-toast';
import Input from '../components/ui/Input';
import Button from '../components/ui/Button';
import { Link } from 'react-router-dom';

const ForgotPassword = () => {
    const [email, setEmail] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);
        try {
            await axios.post('http://localhost:3000/api/usuario/forgot-password', { email });
            toast.success('Se o e-mail existir em nossa base, um link de recuperação será enviado!');
        } catch (error: any) {
            const errorMessage = error.response?.data?.error || 'Ocorreu um erro.';
            toast.error(errorMessage);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-brand-purple flex items-center justify-center p-4">
            <div className="bg-white p-8 rounded-xl shadow-2xl w-full max-w-md">
                <h2 className="text-2xl font-bold text-center mb-6">Recuperar Senha</h2>
                <p className="text-center text-gray-600 mb-6">Digite seu e-mail e enviaremos um link para você redefinir sua senha.</p>
                <form onSubmit={handleSubmit} className="space-y-5">
                    <Input id="email" label="email" type="email" placeholder="Digite seu e-mail" value={email} onChange={(e) => setEmail(e.target.value)} required />
                    <Button type="submit" variant="primary" disabled={isLoading}>
                        {isLoading ? 'Enviando...' : 'Enviar Link de Recuperação'}
                    </Button>
                </form>
                <div className="text-center mt-6">
                    <Link to="/login" className="text-sm text-gray-600 hover:text-brand-primary hover:underline">&larr; Voltar para o Login</Link>
                </div>
            </div>
        </div>
    );
};

export default ForgotPassword;