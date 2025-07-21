// src/pages/TermsOfUse.tsx
import React from 'react';
import { Link } from 'react-router-dom';

const TermsOfUse: React.FC = () => {
  return (
    <div className="min-h-screen bg-white p-8">
      <h1 className="text-3xl font-bold mb-4">Terms of Use</h1>
      <p className="mb-4">This is where the terms of use content will go.</p>
      <Link to="/register" className="text-blue-600 hover:underline">
        &larr; Back to Register
      </Link>
    </div>
  );
};

export default TermsOfUse;