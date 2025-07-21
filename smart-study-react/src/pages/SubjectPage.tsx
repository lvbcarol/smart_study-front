// src/pages/SubjectPage.tsx
import React from 'react';
import { useParams, Link } from 'react-router-dom';

const SubjectPage: React.FC = () => {
  const { lessonId } = useParams();

  return (
    <div className="p-8 text-white">
      <h1 className="text-3xl">Subject Page</h1>
      <p className="mt-4">Content for Lesson ID: {lessonId}</p>
      <Link to="/my-notebooks" className="text-blue-400 hover:underline mt-8 block">&larr; Back to My Notebooks</Link>
    </div>
  );
};

export default SubjectPage;