// src/App.tsx
import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { useTranslation } from 'react-i18next';

// Provedores de Contexto
import { AccessibilityProvider, useAccessibility } from './context/AccessibilityContext';
import { MusicProvider } from './context/MusicContext';
import { SoundProvider } from './context/SoundContext';

// Componentes Globais e Widgets
import VLibrasWidget from './components/VLibrasWidget';
import ASLHelperButton from './components/ASLHelperButton';
import ScreenReaderHelper from './components/ScreenReaderHelper';
import AudioSettingsButton from './components/AudioSettingsButton';
import Footer from './components/Footer';

// Todas as Páginas
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

const AppContent: React.FC = () => {
  const { isSignLanguageEnabled, isAudioEnabled } = useAccessibility();
  const { i18n } = useTranslation();

  return (
    <Router>
      {/* O container flex flex-col garante que o footer fique no final */}
      <div className="min-h-screen flex flex-col">
        <Toaster 
          position="top-right"
          toastOptions={{
            success: { style: { background: 'white', color: 'green' } },
            error: { style: { background: 'white', color: 'red' } },
          }}
        />
        
        {/* Widgets Globais */}
        {isSignLanguageEnabled && (i18n.language === 'pt' || i18n.language === 'pt-BR') && <VLibrasWidget />}
        {isSignLanguageEnabled && i18n.language === 'en' && <ASLHelperButton />}
        {isAudioEnabled && <ScreenReaderHelper />}
        <AudioSettingsButton />

        {/* O 'flex-grow' faz esta seção ocupar todo o espaço disponível, empurrando o footer para baixo */}
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<Navigate to="/register" />} />
            <Route path="/register" element={<Register />} />
            <Route path="/login" element={<Login />} />
            <Route path="/forgot-password" element={<ForgotPassword />} />
            <Route path="/reset-password/:token" element={<ResetPassword />} />
            <Route path="/home" element={<Home />} />
            <Route path="/my-notebooks" element={<MyNotebooks />} />
            <Route path="/progress" element={<ProgressPage />} />
            <Route path="/about-us" element={<AboutUs />} />
            <Route path="/my-account" element={<MyAccount />} />
            <Route path="/subjects/:lessonId" element={<SubjectPage />} />
            <Route path="/summary/:lessonId" element={<SummaryPage />} />
            <Route path="/quizz/:lessonId" element={<QuizzPage />} />
            <Route path="/terms-of-use" element={<TermsOfUse />} />
            <Route path="/notebook/:notebookId/lesson/:lessonId" element={<LessonPage />} />
          </Routes>
        </main>
        
        <Footer />
      </div>
    </Router>
  );
}

function App() {
  return (
    // Ordem correta dos provedores
    <SoundProvider>
      <MusicProvider>
        <AccessibilityProvider>
          <AppContent />
        </AccessibilityProvider>
      </MusicProvider>
    </SoundProvider>
  );
}

export default App;