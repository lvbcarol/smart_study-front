// src/components/NotebookCard.tsx
import React, { useState } from 'react';
import { FaPlus, FaTrash, FaPencilAlt } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import toast from 'react-hot-toast';
import api from '../services/api';

interface Lesson { _id: string; title: string; }
interface Notebook { _id: string; title: string; lessons: Lesson[]; }
interface NotebookCardProps {
  notebook: Notebook;
  onDelete: (id: string) => void;
  onUpdate: (updatedNotebook: Notebook) => void;
  index: number;
}

const NotebookCard: React.FC<NotebookCardProps> = ({ notebook, onDelete, onUpdate, index }) => {
  const { t } = useTranslation();
  const [isEditingTitle, setIsEditingTitle] = useState(false);
  const [currentTitle, setCurrentTitle] = useState(notebook.title);
  const [isAddingLesson, setIsAddingLesson] = useState(false);
  const [newLessonTitle, setNewLessonTitle] = useState('');
  const [editingLessonId, setEditingLessonId] = useState<string | null>(null);
  const [editingLessonTitle, setEditingLessonTitle] = useState('');
  const navigate = useNavigate();

  const handleTitleUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (currentTitle === notebook.title) return setIsEditingTitle(false);
    try {
      const response = await api.put(`/notebooks/${notebook._id}`, { title: currentTitle });
      onUpdate(response.data);
      setIsEditingTitle(false);
      toast.success('Notebook title updated!');
    } catch (error) {
      toast.error('Error updating title.');
    }
  };
  
  const handleAddLesson = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newLessonTitle.trim()) return;
    try {
      const response = await api.post(`/notebooks/${notebook._id}/lessons`, { title: newLessonTitle });
      onUpdate(response.data);
      setNewLessonTitle('');
      setIsAddingLesson(false);
      toast.success('Lesson added!');
    } catch (error) {
      toast.error('Error adding lesson.');
    }
  };

  const handleDeleteNotebook = async () => {
    if (window.confirm(t('myNotebooks.confirmDelete', { title: notebook.title }))) {
      try {
        await api.delete(`/notebooks/${notebook._id}`);
        toast.success('Notebook deleted!');
        onDelete(notebook._id);
      } catch (error) {
        toast.error('Error deleting notebook.');
      }
    }
  };

  const handleStartEditLesson = (lesson: Lesson) => {
    setEditingLessonId(lesson._id);
    setEditingLessonTitle(lesson.title);
  };

  const handleUpdateLesson = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingLessonId) return;
    try {
      const response = await api.put(`/notebooks/${notebook._id}/lessons/${editingLessonId}`, { title: editingLessonTitle });
      onUpdate(response.data);
      setEditingLessonId(null);
      toast.success('Lesson updated!');
    } catch (error) {
      toast.error('Error updating lesson.');
    }
  };

  return (
    // ✅ ANIMAÇÃO DE HOVER CORRIGIDA AQUI: trocamos 'hover:-translate-y-2' por 'hover:scale-105'
    <div 
      className="flex bg-violet-500 bg-opacity-30 backdrop-blur-sm rounded-2xl shadow-lg border border-violet-700 overflow-hidden transition-all duration-300 transform hover:scale-105 animate-fade-in-up"
      style={{ animationDelay: `${index * 100}ms` }}
    >
      <div className="bg-white bg-opacity-10 p-2 flex flex-col items-center gap-2">
        {Array.from({ length: 12 }).map((_, i) => <div key={i} className="w-4 h-4 bg-gray-400 bg-opacity-50 rounded-full"></div>)}
      </div>

      <div className="p-6 flex flex-col justify-between w-full text-white">
        <div>
          <div className="flex justify-between items-start mb-4">
            {isEditingTitle ? (
              <form onSubmit={handleTitleUpdate} className="flex-grow">
                <input type="text" value={currentTitle} onChange={(e) => setCurrentTitle(e.target.value)} className="w-full bg-violet-900 text-2xl font-bold rounded px-2 py-1 focus:outline-none focus:ring-2 focus:ring-white" autoFocus onBlur={handleTitleUpdate} />
              </form>
            ) : (
              <div className="flex items-center gap-2">
                <h3 className="text-2xl font-bold">{notebook.title}</h3>
                <button onClick={() => setIsEditingTitle(true)} className="text-gray-300 hover:text-white"><FaPencilAlt size={14} /></button>
              </div>
            )}
            <button onClick={handleDeleteNotebook} className="text-gray-300 hover:text-red-500"><FaTrash /></button>
          </div>
          
          <div className="space-y-2">
            {notebook.lessons && notebook.lessons.map(lesson => (
              <div key={lesson._id} className="flex items-center gap-2 group">
                {editingLessonId === lesson._id ? (
                  <form onSubmit={handleUpdateLesson} className="flex-grow">
                    <input type="text" value={editingLessonTitle} onChange={(e) => setEditingLessonTitle(e.target.value)} className="w-full bg-violet-900 rounded px-2 py-1 focus:outline-none" autoFocus onBlur={handleUpdateLesson} />
                  </form>
                ) : (
                  <>
                    <button onClick={() => navigate(`/subjects/${lesson._id}`)} className="flex-grow text-left p-2 rounded hover:bg-violet-800 transition">
                      {lesson.title}
                    </button>
                    <button onClick={() => handleStartEditLesson(lesson)} className="text-gray-400 hover:text-white opacity-0 group-hover:opacity-100 transition-opacity"><FaPencilAlt size={12} /></button>
                  </>
                )}
              </div>
            ))}
          </div>

          {isAddingLesson ? (
            <form onSubmit={handleAddLesson} className="mt-4 flex gap-2">
              <input type="text" value={newLessonTitle} onChange={(e) => setNewLessonTitle(e.target.value)} placeholder="New lesson name" className="flex-grow bg-violet-900 rounded px-2 py-1 focus:outline-none focus:ring-2 focus:ring-white" autoFocus />
              <button type="submit" className="bg-green-500 p-2 rounded hover:bg-green-400">Save</button>
              <button type="button" onClick={() => setIsAddingLesson(false)} className="bg-gray-600 p-2 rounded hover:bg-gray-500">X</button>
            </form>
          ) : (
            <button onClick={() => setIsAddingLesson(true)} className="mt-4 text-gray-300 hover:text-white flex items-center gap-2">
              <FaPlus size={12} /> New lesson
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default NotebookCard;