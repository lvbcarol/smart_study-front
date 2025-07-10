import React from 'react';
import { Link } from 'react-router-dom';

const Progress = () => {
  return (
    <div style={{ backgroundColor: '#3b1a5a', color: 'white', minHeight: '100vh' }}>
      <nav className="navbar navbar-dark px-4" style={{ backgroundColor: '#4a148c' }}>
        <a className="navbar-brand fw-bold d-flex align-items-center" href="#">
          <img src="/images/logo.jpg" alt="Smart Study Logo" className="img-fluid me-2" style={{ maxWidth: '30px' }} />
          Smart Study
        </a>
      </nav>

      <div className="container text-center py-5">
        <div className="message-box bg-secondary p-4 rounded" style={{ maxWidth: '600px', margin: 'auto' }}>
          <h1>Seu progresso ainda não está salvo</h1>
          <p className="mt-3">Em breve, você poderá acompanhar seu desempenho com gráficos e relatórios personalizados aqui.</p>
          <Link to="/summary" className="btn mt-4" style={{ backgroundColor: '#845ec2', color: 'white' }}>⬅ Voltar</Link>
        </div>
      </div>
    </div>
  );
};

export default Progress;
