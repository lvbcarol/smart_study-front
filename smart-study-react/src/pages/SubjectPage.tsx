// src/pages/SubjectPage.tsx
import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import api from '../services/api';
import Navbar from '../components/Navbar';
import FeatureCard from '../components/FeatureCard';
import { FaArrowLeft } from 'react-icons/fa';

interface SubjectDetails {
  notebookTitle: string;
  lessonTitle: string;
}

const SubjectPage: React.FC = () => {
  const { t } = useTranslation();
  const { lessonId } = useParams<{ lessonId: string }>();
  const navigate = useNavigate();
  const [details, setDetails] = useState<SubjectDetails | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (!lessonId) return;
    
    const fetchDetails = async () => {
      try {
        const response = await api.get(`/lessons/${lessonId}`);
        setDetails(response.data);
      } catch (error) {
        console.error("Error fetching lesson details:", error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchDetails();
  }, [lessonId]);
  
  const features = [
    { tag: '#one', title: t('subject.summaryTitle'), description: t('subject.summaryDesc'), to: `/summary/${lessonId}` },
    { tag: '#two', title: t('subject.quizzTitle'), description: t('subject.quizzDesc'), to: `/quizz/${lessonId}` },
  ];

  const backgroundStyle = { background: 'linear-gradient(135deg, #1e0a3c 0%, #2A0E46 100%)' };

  return (
    <div style={backgroundStyle} className="min-h-screen text-white">
      <Navbar />
      <main className="container mx-auto p-4 md:p-8">
        {isLoading ? (
          <div className="text-center text-xl mt-16">Loading subject details...</div>
        ) : (
          <>
            <div className="flex justify-end mb-12">
              <div className="bg-white text-gray-800 font-semibold py-2 px-5 rounded-full">
                {details ? `${details.notebookTitle} - ${details.lessonTitle}` : 'Lesson'}
              </div>
            </div>

            <div className="text-center">
              <h1 className="text-4xl md:text-5xl font-bold">{t('subject.title')}</h1>
            </div>

            <div className="mt-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8 max-w-4xl mx-auto">
              {features.map((feature, index) => (
                <FeatureCard 
                  key={feature.tag}
                  index={index}
                  {...feature}
                />
              ))}
            </div>

            <div className="mt-16">
              <button 
                onClick={() => navigate('/my-notebooks')}
                className="bg-white bg-opacity-20 text-white font-semibold py-3 px-6 rounded-full flex items-center gap-3 hover:bg-opacity-30 transition"
              >
                <FaArrowLeft />
                <span>{t('subject.goBack')}</span>
              </button>
            </div>
          </>
        )}
      </main>
    </div>
  );
};

export default SubjectPage;