import React from 'react';
import { Link } from 'react-router-dom';

const MyNotebooks: React.FC = () => (
  <div className="p-8 text-white"><h1 className="text-3xl">Página Meus Cadernos</h1><Link to="/home" className="text-blue-400 hover:underline">&larr; Voltar para Home</Link></div>
);
export default MyNotebooks;