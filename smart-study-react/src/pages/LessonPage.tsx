// src/pages/LessonPage.tsx
import React from 'react';
import { useParams, Link } from 'react-router-dom';

const LessonPage: React.FC = () => {
  const { notebookId, lessonId } = useParams();

  return (
    <div className="p-8 text-white">
      <h1 className="text-3xl">Página da Aula</h1>
      <p className="mt-4">ID do Caderno: {notebookId}</p>
      <p>ID da Aula: {lessonId}</p>
      <Link to="/my-notebooks" className="text-blue-400 hover:underline mt-8 block">&larr; Voltar para Meus Cadernos</Link>
    </div>
  );
};

export default LessonPage;