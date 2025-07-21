// src/components/NotebookCard.tsx
import React, { useState } from 'react';
import { FaArrowRight, FaPlus, FaTrash } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import api from '../services/api';

interface Lesson { _id: string; title: string; }
interface Notebook { _id:string; title: string; lessons: Lesson[]; }
interface NotebookCardProps {
  notebook: Notebook;
  onDelete: (id: string) => void;
}

const NotebookCard: React.FC<NotebookCardProps> = ({ notebook, onDelete }) => {
  const [lessons, setLessons] = useState<Lesson[]>(notebook.lessons);
  const [newLessonTitle, setNewLessonTitle] = useState('');
  const [isAddingLesson, setIsAddingLesson] = useState(false);
  const navigate = useNavigate();

  const handleAddLesson = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newLessonTitle.trim()) return;
    try {
      const response = await api.post(`/notebooks/${notebook._id}/lessons`, { title: newLessonTitle });
      setLessons(response.data.lessons);
      setNewLessonTitle('');
      setIsAddingLesson(false);
      toast.success('Lesson added!');
    } catch (error) {
      toast.error('Error adding lesson.');
      console.error(error);
    }
  };

  const handleDeleteNotebook = async () => {
    if (window.confirm(`Are you sure you want to delete the notebook "${notebook.title}"?`)) {
      try {
        await api.delete(`/notebooks/${notebook._id}`);
        toast.success('Notebook deleted!');
        onDelete(notebook._id);
      } catch (error) {
        toast.error('Error deleting notebook.');
      }
    }
  };

  return (
    <div className="flex bg-[#2a0e46] rounded-2xl shadow-lg border border-purple-700 overflow-hidden">
      <div className="bg-white p-2 flex flex-col items-center gap-2 shadow-inner">
        {Array.from({ length: 12 }).map((_, i) => (
          <div key={i} className="w-4 h-4 bg-gray-300 rounded-full"></div>
        ))}
      </div>
      <div className="p-6 flex flex-col justify-between w-full">
        <div>
          <div className="flex justify-between items-start">
            <h3 className="text-2xl font-bold">{notebook.title}</h3>
            <button onClick={handleDeleteNotebook} className="text-gray-400 hover:text-red-500 transition">
              <FaTrash />
            </button>
          </div>
          <div className="mt-4 space-y-2">
            {lessons.map(lesson => (
              <button key={lesson._id} className="w-full text-left p-2 rounded hover:bg-purple-800 transition">
                {lesson.title}
              </button>
            ))}
          </div>
          {isAddingLesson ? (
            <form onSubmit={handleAddLesson} className="mt-4 flex gap-2">
              <input 
                type="text"
                value={newLessonTitle}
                onChange={(e) => setNewLessonTitle(e.target.value)}
                placeholder="New lesson name"
                className="flex-grow bg-purple-800 rounded px-2 py-1 focus:outline-none focus:ring-2 focus:ring-white"
                autoFocus
              />
              <button type="submit" className="bg-green-500 p-2 rounded hover:bg-green-400">Save</button>
              <button type="button" onClick={() => setIsAddingLesson(false)} className="bg-gray-600 p-2 rounded hover:bg-gray-500">X</button>
            </form>
          ) : (
            <button onClick={() => setIsAddingLesson(true)} className="mt-4 text-gray-300 hover:text-white flex items-center gap-2">
              <FaPlus size={12} /> New lesson
            </button>
          )}
        </div>
        <button className="mt-6 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full p-2 flex justify-between items-center text-left w-full hover:opacity-90">
          <span className="pl-3">Go!</span>
          <div className="bg-black bg-opacity-50 rounded-full p-2">
            <FaArrowRight />
          </div>
        </button>
      </div>
    </div>
  );
};

export default NotebookCard;