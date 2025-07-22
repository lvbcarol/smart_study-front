// src/pages/MyNotebooks.tsx
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaPlus, FaArrowLeft } from 'react-icons/fa';
import api from '../services/api';
import Navbar from '../components/Navbar';
import NotebookCard from '../components/NotebookCard';
import Modal from '../components/ui/Modal';
import Button from '../components/ui/Button';
import Input from '../components/ui/Input';
import toast from 'react-hot-toast';

interface Lesson { _id: string; title: string; }
interface Notebook { _id: string; title: string; lessons: Lesson[]; }

const MyNotebooks: React.FC = () => {
  const [notebooks, setNotebooks] = useState<Notebook[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newNotebookTitle, setNewNotebookTitle] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchNotebooks = async () => {
      setIsLoading(true);
      try {
        const response = await api.get<Notebook[]>('/notebooks');
        setNotebooks(response.data);
      } catch (error) {
        toast.error("Error fetching notebooks.");
      } finally {
        setIsLoading(false);
      }
    };
    fetchNotebooks();
  }, []);

  const handleCreateNotebook = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newNotebookTitle.trim()) return;
    try {
      const response = await api.post<Notebook>('/notebooks', { title: newNotebookTitle });
      setNotebooks([...notebooks, response.data]);
      setNewNotebookTitle('');
      setIsModalOpen(false);
      toast.success('Notebook created!');
    } catch (error) {
      toast.error('Error creating notebook.');
    }
  };

  const handleDeleteNotebook = (deletedId: string) => {
    setNotebooks(notebooks.filter(notebook => notebook._id !== deletedId));
  };
  
  const handleUpdateNotebook = (updatedNotebook: Notebook) => {
    setNotebooks(notebooks.map(nb => nb._id === updatedNotebook._id ? updatedNotebook : nb));
  };
  
  const backgroundStyle = { background: 'linear-gradient(135deg, #1e0a3c 0%, #2A0E46 100%)' };

  if (isLoading) {
    return <div style={backgroundStyle} className="min-h-screen text-white text-center p-8">Loading...</div>;
  }

  return (
    <div style={backgroundStyle} className="min-h-screen text-white">
      <Navbar />
      <main className="container mx-auto p-4 md:p-8">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-4xl font-bold">My notebooks</h1>
          <button onClick={() => setIsModalOpen(true)} className="bg-white text-gray-800 font-semibold py-2 px-4 rounded-full flex items-center gap-2 hover:bg-gray-200 transition">
            <FaPlus />
            <span className="hidden md:inline">New notebook</span>
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {notebooks.map((notebook, index) => (
            <NotebookCard 
              key={notebook._id} 
              notebook={notebook} 
              onDelete={handleDeleteNotebook} 
              onUpdate={handleUpdateNotebook}
              index={index} 
            />
          ))}
        </div>

        {/* ✅ BOTÃO "GO BACK" ADICIONADO AQUI */}
        <div className="mt-16">
          <button 
            onClick={() => navigate('/home')}
            className="bg-white bg-opacity-20 text-white font-semibold py-3 px-6 rounded-full flex items-center gap-3 hover:bg-opacity-30 transition"
          >
            <FaArrowLeft />
            <span>go back to Home</span>
          </button>
        </div>

      </main>

      <Modal title="Create New Notebook" isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
        <form onSubmit={handleCreateNotebook}>
          <div className="space-y-4">
            <Input id="notebookTitle" label="Notebook Title" type="text" placeholder="E.g., Object-Oriented Programming" value={newNotebookTitle} onChange={(e) => setNewNotebookTitle(e.target.value)} />
            <div className="flex justify-end gap-2">
              <Button type="button" variant="secondary" onClick={() => setIsModalOpen(false)}>Cancel</Button>
              <Button type="submit">Create</Button>
            </div>
          </div>
        </form>
      </Modal>
    </div>
  );
};

export default MyNotebooks;