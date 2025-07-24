// src/components/FeatureCard.tsx
import React from 'react';
import { Link } from 'react-router-dom';

interface FeatureCardProps {
  to: string;
  tag: string;
  title: string;
  description: string;
  index: number;
}

const FeatureCard: React.FC<FeatureCardProps> = ({ to, tag, title, description, index }) => {
  return (
    <Link 
      to={to}
      className="bg-purple-300 bg-opacity-30 backdrop-blur-sm p-8 rounded-2xl flex flex-col gap-4 hover:bg-opacity-40 transition-all duration-300 transform hover:-translate-y-1 animate-fade-in-up"
      style={{ animationDelay: `${index * 100}ms` }}
    >
      <span className="bg-white bg-opacity-10 text-white text-xs font-semibold px-3 py-1 rounded-full self-start">
        {tag}
      </span>
      <h3 className="text-2xl font-bold">{title}</h3>
      <p className="text-gray-300">{description}</p>
    </Link>
  );
};

export default FeatureCard;