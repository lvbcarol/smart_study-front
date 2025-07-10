import React from 'react';

const AboutUs = () => {
  return (
    <div style={{ backgroundColor: '#3b1a5a', color: 'white', minHeight: '100vh' }}>
      <nav className="navbar navbar-dark px-4" style={{ backgroundColor: '#4a148c' }}>
        <a className="navbar-brand fw-bold d-flex align-items-center" href="#">
          <img src="/images/logo.jpg" alt="Smart Study Logo" className="img-fluid me-2" style={{ maxWidth: '30px' }} />
          Smart Study
        </a>
      </nav>

      <div className="container text-center py-5">
        <h1>Sobre o Smart Study</h1>
        <p className="mt-3">
          O Smart Study é uma plataforma pensada para potencializar seus estudos com resumos inteligentes, quizzes,
          progresso e muito mais.
        </p>
        <img src="/images/aboutus.jpg" alt="Estudos" className="img-fluid mt-4 rounded shadow" style={{ maxWidth: '600px' }} />
      </div>
    </div>
  );
};

export default AboutUs;
