// src/pages/MyNotebooks.tsx
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { FaPlus, FaArrowLeft } from 'react-icons/fa';
import { Tooltip } from 'react-tooltip'; // Importação do Tooltip
import api from '../services/api';
import Navbar from '../components/Navbar';
import NotebookCard from '../components/NotebookCard';
import Modal from '../components/ui/Modal';
import Button from '../components/ui/Button';
import Input from '../components/ui/Input';
import toast from 'react-hot-toast';
import { useInteractiveSound } from '../hooks/useInteractiveSound';

interface Lesson { _id: string; title: string; }
interface Notebook { _id: string; title: string; lessons: Lesson[]; }

const MyNotebooks: React.FC = () => {
  const { t } = useTranslation();
  const [notebooks, setNotebooks] = useState<Notebook[] | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newNotebookTitle, setNewNotebookTitle] = useState('');
  const navigate = useNavigate();
  const soundEvents = useInteractiveSound();

  useEffect(() => {
    const fetchNotebooks = async () => {
      setIsLoading(true);
      try {
        const response = await api.get<Notebook[]>('/notebooks');
        setNotebooks(response.data);
      } catch (error) {
        toast.error("Error fetching notebooks.");
        setNotebooks([]);
      } finally {
        setIsLoading(false);
      }
    };
    fetchNotebooks();
  }, []);

  const handleCreateNotebook = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newNotebookTitle.trim() || !notebooks) return;
    try {
      const response = await api.post<Notebook>('/notebooks', { title: newNotebookTitle });
      setNotebooks([...notebooks, response.data]);
      setNewNotebookTitle('');
      setIsModalOpen(false);
      toast.success(t('myNotebooks.createSuccess'));
    } catch (error) {
      toast.error(t('myNotebooks.createError'));
    }
  };

  const handleDeleteNotebook = (deletedId: string) => {
    if (!notebooks) return;
    setNotebooks(notebooks.filter(notebook => notebook._id !== deletedId));
  };
  
  const handleUpdateNotebook = (updatedNotebook: Notebook) => {
    if (!notebooks) return;
    setNotebooks(notebooks.map(nb => nb._id === updatedNotebook._id ? updatedNotebook : nb));
  };
  
  const backgroundStyle = { background: 'linear-gradient(135deg, #1e0a3c 0%, #2A0E46 100%)' };

  if (isLoading) {
    return (
      <div style={backgroundStyle} className="min-h-screen text-white flex items-center justify-center">
        <p className="text-xl animate-pulse">{t('myNotebooks.loading')}</p>
      </div>
    );
  }

  return (
    <div style={backgroundStyle} className="min-h-screen text-white">
      <Navbar />
      <main className="container mx-auto p-4 md:p-8">
        <div className="flex justify-between items-center mb-4">
          <div>
            <h1 className="text-4xl font-bold">{t('myNotebooks.title')}</h1>
            <p className="text-gray-400 mt-2 max-w-2xl">{t('myNotebooks.subtitle')}</p>
          </div>
          <button 
            {...soundEvents} 
            onClick={() => { soundEvents.onClick(); setIsModalOpen(true); }}
            data-tooltip-id="notebooks-tooltip"
            data-tooltip-content={t('myNotebooks.tooltipNewNotebook')}
            className="bg-white text-gray-800 font-semibold py-2 px-4 rounded-full flex items-center gap-2 hover:bg-gray-200 transition flex-shrink-0"
          >
            <FaPlus />
            <span className="hidden md:inline">{t('myNotebooks.newNotebook')}</span>
          </button>
        </div>

        {notebooks && notebooks.length > 0 ? (
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
        ) : (
            <div className="text-center text-gray-400 py-16">
                <h2 className="text-2xl font-semibold">No notebooks yet!</h2>
                <p className="mt-2">Click on "New notebook" to get started.</p>
            </div>
        )}

        <div className="mt-16">
          <button 
            {...soundEvents}
            onClick={() => {
              soundEvents.onClick();
              navigate('/home');
            }}
            className="bg-white bg-opacity-20 text-white font-semibold py-3 px-6 rounded-full flex items-center gap-3 hover:bg-opacity-30 transition"
          >
            <FaArrowLeft />
            <span>{t('myNotebooks.goBackToHome')}</span>
          </button>
        </div>

      </main>

      <Modal title={t('myNotebooks.modalTitle')} isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
        <form onSubmit={handleCreateNotebook}>
          <div className="space-y-4">
            <Input id="notebookTitle" label="Notebook Title" type="text" placeholder={t('myNotebooks.modalPlaceholder')} value={newNotebookTitle} onChange={(e) => setNewNotebookTitle(e.target.value)} />
            <div className="flex justify-end gap-2">
              <Button type="button" variant="secondary" onClick={() => setIsModalOpen(false)}>{t('myNotebooks.cancel')}</Button>
              <Button type="submit">{t('myNotebooks.create')}</Button>
            </div>
          </div>
        </form>
      </Modal>

      <Tooltip 
        id="notebooks-tooltip" 
        place="bottom"
        style={{ backgroundColor: '#2A0E46', color: 'white', borderRadius: '8px', maxWidth: '300px', textAlign: 'center' }}
      />
    </div>
  );
};

export default MyNotebooks;