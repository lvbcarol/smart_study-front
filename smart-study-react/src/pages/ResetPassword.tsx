// src/pages/ResetPassword.tsx
import React, { useState } from 'react';
import axios from 'axios';
import toast from 'react-hot-toast';
import { useParams, useNavigate } from 'react-router-dom';
import Input from '../components/ui/Input';
import Button from '../components/ui/Button';

const ResetPassword = () => {
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const { token } = useParams(); // Pega o token da URL
    const navigate = useNavigate();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (password !== confirmPassword) {
            return toast.error('As senhas não coincidem.');
        }
        if (!token) {
            return toast.error('Token de redefinição não encontrado.');
        }
        setIsLoading(true);
        try {
            await axios.post('http://localhost:3000/api/usuario/reset-password', { token, password });
            toast.success('Senha redefinida com sucesso!');
            navigate('/login');
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
                <h2 className="text-2xl font-bold text-center mb-6">Redefinir Senha</h2>
                <form onSubmit={handleSubmit} className="space-y-5">
                    <Input id="password" label="Nova Senha" type="password" placeholder="Digite a nova senha" value={password} onChange={(e) => setPassword(e.target.value)} required />
                    <Input id="confirmPassword" label="Confirmar Nova Senha" type="password" placeholder="Confirme a nova senha" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} required />
                    <Button type="submit" variant="primary" disabled={isLoading}>
                        {isLoading ? 'Salvando...' : 'Redefinir Senha'}
                    </Button>
                </form>
            </div>
        </div>
    );
};

export default ResetPassword;