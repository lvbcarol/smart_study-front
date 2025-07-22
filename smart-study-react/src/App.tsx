// src/App.tsx
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';

// Importação de todas as nossas páginas
import Register from './pages/Register';
import Login from './pages/Login';
import Home from './pages/Home';
import AboutUs from './pages/AboutUs';
import MyAccount from './pages/MyAccount';
import MyNotebooks from './pages/MyNotebooks';
import SubjectPage from './pages/SubjectPage';
import SummaryPage from './pages/SummaryPage';
import QuizzPage from './pages/QuizzPage';
import ProgressPage from './pages/ProgressPage';
import TermsOfUse from './pages/TermsOfUse';
import LessonPage from './pages/LessonPage';

function App() {
  return (
    <Router>
      <Toaster 
        position="top-right"
        toastOptions={{
          success: { style: { background: 'white', color: 'green' } },
          error: { style: { background: 'white', color: 'red' } },
        }}
      />
      <Routes>
        {/* Rotas Principais e de Autenticação */}
        <Route path="/" element={<Navigate to="/register" />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        
        {/* Rotas da Aplicação (após login) */}
        <Route path="/home" element={<Home />} />
        <Route path="/my-notebooks" element={<MyNotebooks />} />
        <Route path="/progress" element={<ProgressPage />} />
        <Route path="/about-us" element={<AboutUs />} />
        <Route path="/my-account" element={<MyAccount />} />
        
        {/* Rotas de Aulas e Atividades */}
        <Route path="/subjects/:lessonId" element={<SubjectPage />} />
        <Route path="/summary/:lessonId" element={<SummaryPage />} />
        <Route path="/quizz/:lessonId" element={<QuizzPage />} />
        
        {/* Rotas Adicionais */}
        <Route path="/terms-of-use" element={<TermsOfUse />} />
        <Route path="/notebook/:notebookId/lesson/:lessonId" element={<LessonPage />} />
      </Routes>
    </Router>
  );
}

export default App;