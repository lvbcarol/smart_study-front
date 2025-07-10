import React from 'react';

const MyAccount = () => {
  return (
    <div style={{ backgroundColor: '#3b1a5a', color: 'white', minHeight: '100vh' }}>
      <nav className="navbar navbar-dark px-4" style={{ backgroundColor: '#4a148c' }}>
        <a className="navbar-brand fw-bold d-flex align-items-center" href="#">
          <img src="/images/logo.jpg" alt="Smart Study Logo" className="img-fluid me-2" style={{ maxWidth: '30px' }} />
          Smart Study
        </a>
      </nav>

      <div className="container text-center py-5">
        <h1>Minha Conta</h1>
        <p>Gerencie seus dados, senha e preferências.</p>
        <div className="card bg-light text-dark p-4 mt-4 mx-auto" style={{ maxWidth: '400px', borderRadius: '15px' }}>
          <h5>Nome:</h5>
          <p>Maria Estudante</p>
          <h5>Email:</h5>
          <p>maria@email.com</p>
          <button className="btn btn-warning mt-3">Editar Perfil</button>
        </div>
      </div>
    </div>
  );
};

export default MyAccount;
