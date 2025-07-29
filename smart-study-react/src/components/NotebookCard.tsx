// src/components/NotebookCard.tsx
import React, { useState, useEffect } from 'react';
import { FaPlus, FaTrash, FaPencilAlt } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import toast from 'react-hot-toast';
import api from '../services/api';
import Modal from './ui/Modal';
import Button from './ui/Button';
import { useSounds } from '../context/SoundContext';
import { useInteractiveSound } from '../hooks/useInteractiveSound';

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
  const { playAppearSound } = useSounds();
  const soundEvents = useInteractiveSound();
  
  const [isEditingTitle, setIsEditingTitle] = useState(false);
  const [currentTitle, setCurrentTitle] = useState(notebook.title);
  const [isAddingLesson, setIsAddingLesson] = useState(false);
  const [newLessonTitle, setNewLessonTitle] = useState('');
  const [editingLessonId, setEditingLessonId] = useState<string | null>(null);
  const [editingLessonTitle, setEditingLessonTitle] = useState('');
  const navigate = useNavigate();

  const [confirmModal, setConfirmModal] = useState({
    isOpen: false,
    type: '' as 'notebook' | 'lesson',
    id: '',
    title: ''
  });

  useEffect(() => {
    const timer = setTimeout(() => {
      playAppearSound();
    }, index * 100);
    return () => clearTimeout(timer);
  }, [playAppearSound, index]);

  const handleTitleUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (currentTitle.trim() === '' || currentTitle === notebook.title) {
        setIsEditingTitle(false);
        setCurrentTitle(notebook.title);
        return;
    }
    try {
      const response = await api.put(`/notebooks/${notebook._id}`, { title: currentTitle });
      onUpdate(response.data);
      setIsEditingTitle(false);
      toast.success(t('myNotebooks.titleUpdatedSuccess'));
    } catch (error) {
      toast.error(t('myNotebooks.titleUpdatedError'));
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
      toast.success(t('myNotebooks.lessonAddedSuccess'));
    } catch (error) {
      toast.error(t('myNotebooks.lessonAddedError'));
    }
  };

  const handleDeleteNotebookRequest = () => {
    setConfirmModal({ isOpen: true, type: 'notebook', id: notebook._id, title: notebook.title });
  };

  const handleDeleteLessonRequest = (lesson: Lesson) => {
    setConfirmModal({ isOpen: true, type: 'lesson', id: lesson._id, title: lesson.title });
  };

  const handleStartEditLesson = (lesson: Lesson) => {
    setEditingLessonId(lesson._id);
    setEditingLessonTitle(lesson.title);
  };

  const handleUpdateLesson = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingLessonId || editingLessonTitle.trim() === '') return;
    try {
      const response = await api.put(`/notebooks/${notebook._id}/lessons/${editingLessonId}`, { title: editingLessonTitle });
      onUpdate(response.data);
      setEditingLessonId(null);
      toast.success(t('myNotebooks.lessonUpdatedSuccess'));
    } catch (error) {
      toast.error(t('myNotebooks.lessonUpdatedError'));
    }
  };

  const handleConfirmDelete = async () => {
    if (confirmModal.type === 'notebook') {
      try {
        await api.delete(`/notebooks/${confirmModal.id}`);
        toast.success(t('myNotebooks.deleteSuccess'));
        onDelete(confirmModal.id);
      } catch (error) {
        toast.error(t('myNotebooks.deleteError'));
      }
    } else if (confirmModal.type === 'lesson') {
      try {
        const response = await api.delete(`/notebooks/${notebook._id}/lessons/${confirmModal.id}`);
        onUpdate(response.data);
        toast.success(t('myNotebooks.lessonDeletedSuccess'));
      } catch (error) {
        toast.error(t('myNotebooks.lessonDeletedError'));
      }
    }
    setConfirmModal({ isOpen: false, type: '', id: '', title: '' });
  };

  return (
    <>
      <div 
        className="flex bg-violet-500 bg-opacity-30 backdrop-blur-sm rounded-2xl shadow-lg border border-violet-700 overflow-hidden transition-all duration-300 transform hover:scale-105 animate-fade-in-up"
        style={{ animationDelay: `${index * 100}ms` }}
        onMouseEnter={soundEvents.onMouseEnter}
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
                  <button {...soundEvents} onClick={() => { soundEvents.onClick(); setIsEditingTitle(true); }} className="text-gray-300 hover:text-white"><FaPencilAlt size={14} /></button>
                </div>
              )}
              <button {...soundEvents} onClick={() => { soundEvents.onClick(); handleDeleteNotebookRequest(); }} className="text-gray-300 hover:text-red-500"><FaTrash /></button>
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
                      <button 
                        {...soundEvents} 
                        onClick={() => {
                          soundEvents.onClick();
                          navigate(`/subjects/${lesson._id}`);
                        }} 
                        className="flex-grow text-left p-2 rounded hover:bg-violet-800 transition"
                      >
                        {lesson.title}
                      </button>
                      <div className="flex items-center opacity-0 group-hover:opacity-100 transition-opacity">
                        <button {...soundEvents} onClick={() => { soundEvents.onClick(); handleStartEditLesson(lesson); }} className="p-1 text-gray-300 hover:text-white"><FaPencilAlt size={12} /></button>
                        <button {...soundEvents} onClick={() => { soundEvents.onClick(); handleDeleteLessonRequest(lesson); }} className="p-1 text-gray-300 hover:text-red-500"><FaTrash size={12} /></button>
                      </div>
                    </>
                  )}
                </div>
              ))}
            </div>

            {isAddingLesson ? (
              <form onSubmit={handleAddLesson} className="mt-4 flex gap-2">
                <input type="text" value={newLessonTitle} onChange={(e) => setNewLessonTitle(e.target.value)} placeholder={t('myNotebooks.newLessonPlaceholder')} className="flex-grow bg-violet-900 rounded px-2 py-1 focus:outline-none focus:ring-2 focus:ring-white" autoFocus />
                <Button type="submit">{t('myNotebooks.save')}</Button>
                <Button type="button" variant="secondary" onClick={() => setIsAddingLesson(false)}>X</Button>
              </form>
            ) : (
              <button 
                {...soundEvents} 
                onClick={() => { 
                  soundEvents.onClick(); 
                  setIsAddingLesson(true); 
                }} 
                data-tooltip-id="notebooks-tooltip"
                data-tooltip-content={t('myNotebooks.tooltipNewLesson')}
                className="mt-4 text-gray-300 hover:text-white flex items-center gap-2"
              >
                <FaPlus size={12} /> {t('myNotebooks.newLesson')}
              </button>
            )}
          </div>
        </div>
      </div>

      <Modal 
        isOpen={confirmModal.isOpen} 
        onClose={() => setConfirmModal({ ...confirmModal, isOpen: false })}
        title={confirmModal.type === 'notebook' ? t('myNotebooks.deleteModal.titleNotebook') : t('myNotebooks.deleteModal.titleLesson')}
      >
        <p className="text-gray-600">
            {confirmModal.type === 'notebook' 
                ? t('myNotebooks.deleteModal.bodyNotebook') 
                : t('myNotebooks.deleteModal.bodyLesson')
            }
        </p>
        <div className="flex justify-end gap-4 mt-6">
            <Button 
                variant="secondary" 
                onClick={() => setConfirmModal({ ...confirmModal, isOpen: false })}
            >
                {t('myNotebooks.deleteModal.cancel')}
            </Button>
            <button 
                onMouseEnter={soundEvents.onMouseEnter}
                onClick={() => {
                    soundEvents.onClick();
                    handleConfirmDelete();
                }} 
                className="bg-red-600 text-white font-semibold py-2 px-4 rounded-md hover:bg-red-700 transition"
            >
                {t('myNotebooks.deleteModal.confirm')}
            </button>
        </div>
      </Modal>
    </>
  );
};

export default NotebookCard;