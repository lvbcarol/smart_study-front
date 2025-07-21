import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Toaster } from 'react-hot-toast'; // 1. Importar o Toaster
import Register from './pages/Register';
import Login from './pages/Login';
import Home from './pages/Home';
import MyNotebooks from './pages/MyNotebooks';
import ForgotPassword from './pages/ForgotPassword';
import ResetPassword from './pages/ResetPassword';
import SubjectPage from './pages/SubjectPage';

function App() {
  return (
    <Router>
      {/* 2. Adicionar o componente Toaster aqui */}
      <Toaster 
        position="top-right"
        toastOptions={{
          success: {
            style: {
              background: 'white',
              color: 'green',
            },
          },
          error: {
            style: {
              background: 'white',
              color: 'red',
            },
          },
        }}
      />
      <Routes>
        <Route path="/" element={<Navigate to="/register" />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/home" element={<Home />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/reset-password/:token" element={<ResetPassword />} />
        <Route path="/my-notebooks" element={<MyNotebooks />} />I
        <Route path="/subjects/:lessonId" element={<SubjectPage />} />
      </Routes>
    </Router>
  );
}

export default App;