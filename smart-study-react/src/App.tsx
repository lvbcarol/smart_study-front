// src/App.tsx
import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { useTranslation } from 'react-i18next';

// Importação dos Provedores de Contexto
import { AccessibilityProvider, useAccessibility } from './context/AccessibilityContext';

// Importação dos Componentes e Páginas
import VLibrasWidget from './components/VLibrasWidget';
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
import ForgotPassword from './pages/ForgotPassword';
import ResetPassword from './pages/ResetPassword';

// Componente interno para ter acesso aos hooks de contexto (useAccessibility, useTranslation)
// que precisam estar dentro dos seus provedores.
const AppContent: React.FC = () => {
  const { isSignLanguageEnabled } = useAccessibility();
  const { i18n } = useTranslation();

 // ✅ LOG DE DEPURAÇÃO: Verificando as condições
  console.log({
    isSignLanguageEnabled: isSignLanguageEnabled,
    language: i18n.language,
    shouldRenderWidget: isSignLanguageEnabled && (i18n.language === 'pt' || i18n.language === 'pt-BR')
  });


  return (
    <Router>
      <Toaster 
        position="top-right"
        toastOptions={{
          success: { style: { background: 'white', color: 'green' } },
          error: { style: { background: 'white', color: 'red' } },
        }}
      />
      
      {/* Lógica condicional para renderizar o widget do VLibras */}
      {/* Só mostra se a opção estiver ativa E o idioma for português */}
      {isSignLanguageEnabled && i18n.language === 'pt' && <VLibrasWidget />}

      <Routes>
        {/* Rotas Principais e de Autenticação */}
        <Route path="/" element={<Navigate to="/register" />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/reset-password/:token" element={<ResetPassword />} />
        
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

// Componente principal que "abraça" a aplicação com os provedores de contexto
function App() {
  return (
    <AccessibilityProvider>
      <AppContent />
    </AccessibilityProvider>
  );
}

export default App;