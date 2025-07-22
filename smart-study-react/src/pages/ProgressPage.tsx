import React from 'react';
import { useParams, Link } from 'react-router-dom';

const ProgressPage: React.FC = () => {
  const { lessonId } = useParams();
  return (
    <div className="p-8 text-white"><h1 className="text-3xl">Summary Page</h1><p>Lesson ID: {lessonId}</p><Link to={`/subjects/${lessonId}`} className="text-blue-400 hover:underline mt-4 block">&larr; Back to Subject</Link></div>
  );
};
export default ProgressPage;