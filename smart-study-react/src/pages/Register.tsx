// src/pages/Register.tsx
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import toast from 'react-hot-toast';
import Input from '../components/ui/Input';
import Button from '../components/ui/Button';
import Logo from '../components/Logo';

const Register: React.FC = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleLoginRedirect = () => navigate('/login');

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    if (password.length < 6) {
      toast.error('Password must be at least 6 characters long.');
      setIsLoading(false);
      return;
    }
    const loadingToast = toast.loading('Registering...');
    try {
      await axios.post('http://localhost:3000/api/usuario/register', { name, email, password });
      toast.dismiss(loadingToast);
      toast.success('Registration successful!');
      setTimeout(() => {
        navigate('/login');
      }, 1500);
    } catch (err: any) {
      toast.dismiss(loadingToast);
      const errorMessage = err.response?.data?.error || "An error occurred. Please try again.";
      toast.error(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-brand-purple flex items-center justify-center p-4 sm:p-6 lg:p-8">
      <div className="w-full max-w-5xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div className="hidden md:flex justify-center"><Logo /></div>
          <div className="bg-white p-8 rounded-xl shadow-2xl w-full max-w-md mx-auto">
            <h2 className="text-2xl font-bold text-center text-gray-900 mb-6 uppercase">CREATE YOUR ACCOUNT!</h2>
            <form onSubmit={handleRegister} className="space-y-5">
              <Input id="name" label="full name" type="text" placeholder="full name" value={name} onChange={(e) => setName(e.target.value)} required disabled={isLoading}/>
              <Input id="email" label="e-mail address" type="email" placeholder="e-mail address" value={email} onChange={(e) => setEmail(e.target.value)} required disabled={isLoading}/>
              <Input id="password" label="password" type="password" placeholder="password" value={password} onChange={(e) => setPassword(e.target.value)} required disabled={isLoading}/>
              <Button type="submit" variant="primary" disabled={isLoading}>{isLoading ? 'PLEASE WAIT...' : 'NEXT'}</Button>
            </form>
            <div className="text-center my-6"><span className="text-sm text-gray-500">Already have an account?</span></div>
            <Button variant="secondary" onClick={handleLoginRedirect}>LOG IN</Button>
            <p className="text-xs text-center text-gray-500 mt-6">By registering, you agree to the{' '}<Link to="/terms-of-use" className="underline hover:text-brand-primary">Terms, Conditions and Policies of Borcelle & Privacy Policy</Link></p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;