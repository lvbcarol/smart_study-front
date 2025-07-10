import React from 'react';

const Subjects = () => {
  const materias = ['Matemática', 'Português', 'História', 'Física', 'Geografia'];

  return (
    <div style={{ backgroundColor: '#3b1a5a', color: 'white', minHeight: '100vh' }}>
      <nav className="navbar navbar-dark px-4" style={{ backgroundColor: '#4a148c' }}>
        <a className="navbar-brand fw-bold d-flex align-items-center" href="#">
          <img src="/images/logo.jpg" alt="Logo" className="img-fluid me-2" style={{ maxWidth: '30px' }} />
          Smart Study
        </a>
      </nav>

      <div className="container py-5 text-center">
        <h1>Escolha uma matéria</h1>
        <div className="mt-4 d-flex flex-wrap justify-content-center">
          {materias.map((m, idx) => (
            <button key={idx} className="btn btn-outline-light m-2 px-4 py-2">{m}</button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Subjects;
