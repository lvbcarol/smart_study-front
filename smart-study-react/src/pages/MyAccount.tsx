// src/pages/MyAccount.tsx
import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useAccessibility } from '../context/AccessibilityContext';
import api from '../services/api';
import Navbar from '../components/Navbar';
import ToggleSwitch from '../components/ui/ToggleSwitch';
import Button from '../components/ui/Button';
import toast from 'react-hot-toast';

interface User {
  _id: string; name: string; email: string; language: 'en-US' | 'pt-BR';
  accessibility: { audioDescription: boolean; signLanguage: boolean; };
}

const MyAccount: React.FC = () => {
  const { t, i18n } = useTranslation();
  const { setSignLanguageEnabled, setAudioEnabled } = useAccessibility(); 
  const [user, setUser] = useState<User | null>(null);
  const [initialSettings, setInitialSettings] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await api.get('/usuario/me');
        setUser(response.data);
        setInitialSettings(JSON.stringify(response.data)); 
        i18n.changeLanguage(response.data.language.split('-')[0]);
        setSignLanguageEnabled(response.data.accessibility.signLanguage);
        setAudioEnabled(response.data.accessibility.audioDescription);
      } catch (error) {
        toast.error("Failed to load user data.");
      } finally {
        setIsLoading(false);
      }
    };
    fetchUserData();
  }, [i18n, setSignLanguageEnabled, setAudioEnabled]);

  const handleAccessibilityChange = (field: keyof User['accessibility'], value: boolean) => {
    if (!user) return;
    setUser(prevUser => ({
        ...prevUser!,
        accessibility: { ...prevUser!.accessibility, [field]: value },
    }));
  };
  
  const handleLanguageChange = (lang: 'en-US' | 'pt-BR') => {
    if (!user) return;
    setUser({ ...user, language: lang });
    i18n.changeLanguage(lang.split('-')[0]);
  };

  const handleSaveChanges = async () => {
    if (!user) return;
    const loadingToast = toast.loading('Saving...');
    try {
      const settingsToSave = {
        language: user.language,
        accessibility: user.accessibility,
      };
      await api.put('/usuario/me', settingsToSave);
      
      setSignLanguageEnabled(user.accessibility.signLanguage);
      setAudioEnabled(user.accessibility.audioDescription);
      
      setInitialSettings(JSON.stringify(user));
      toast.dismiss(loadingToast);
      toast.success(t('myAccount.preferencesSaved'));
    } catch (error) {
      toast.dismiss(loadingToast);
      toast.error('Failed to save preferences.');
    }
  };

  const hasChanges = user ? JSON.stringify(user) !== initialSettings : false;
  const backgroundStyle = { background: 'linear-gradient(135deg, #1e0a3c 0%, #2A0E46 100%)' };

  if (isLoading) {
    return (
        <div style={backgroundStyle} className="min-h-screen">
            <Navbar />
            <div className="text-white text-center p-8">Loading Account...</div>
        </div>
    );
  }

  return (
    <div style={backgroundStyle} className="min-h-screen">
      <Navbar />
      <main className="container mx-auto p-4 md:p-8">
        <div className="max-w-2xl mx-auto space-y-8">
          <h1 className="text-4xl font-bold text-white text-center">
            {t('myAccount.welcome', { name: user?.name.split(' ')[0] })}
          </h1>

          <div className="bg-white text-gray-800 p-6 rounded-lg shadow-lg">
            <h2 className="text-2xl font-bold border-b pb-2 mb-4">{t('myAccount.accountInfo')}</h2>
            <div className="space-y-2">
              <p><strong>{t('myAccount.fullName')}:</strong> {user?.name}</p>
              <p><strong>{t('myAccount.email')}:</strong> {user?.email}</p>
            </div>
          </div>

          <div className="bg-white text-gray-800 p-6 rounded-lg shadow-lg">
            <h2 className="text-2xl font-bold border-b pb-2 mb-4">{t('myAccount.languageSettings')}</h2>
            <div className="flex gap-4">
              <button onClick={() => handleLanguageChange('en-US')} className={`p-4 rounded-lg flex-1 text-center font-bold transition ${user?.language === 'en-US' ? 'bg-purple-600 text-white' : 'bg-gray-200 hover:bg-gray-300'}`}>
                ENG-USA
              </button>
              <button onClick={() => handleLanguageChange('pt-BR')} className={`p-4 rounded-lg flex-1 text-center font-bold transition ${user?.language === 'pt-BR' ? 'bg-purple-600 text-white' : 'bg-gray-200 hover:bg-gray-300'}`}>
                PT-BR
              </button>
            </div>
          </div>

          <div className="bg-white text-gray-800 p-6 rounded-lg shadow-lg">
            <h2 className="text-2xl font-bold border-b pb-2 mb-4">{t('myAccount.accessibility')}</h2>
            <div className="space-y-4">
              <ToggleSwitch label={t('myAccount.audioDescription')} enabled={user?.accessibility.audioDescription || false} onChange={(val) => handleAccessibilityChange('audioDescription', val)} />
              <ToggleSwitch label={t('myAccount.signLanguage')} enabled={user?.accessibility.signLanguage || false} onChange={(val) => handleAccessibilityChange('signLanguage', val)} />
            </div>
            {/* ✅ TEXTO EXPLICATIVO ADICIONADO AQUI */}
            <p className="text-xs text-gray-500 mt-4 pt-4 border-t">
              {t('myAccount.accessibilityHelpText')}
            </p>
          </div>
          
          <div className="flex justify-end">
            <Button onClick={handleSaveChanges} disabled={!hasChanges}>
              {t('myAccount.saveChanges')}
            </Button>
          </div>
        </div>
      </main>
    </div>
  );
};

export default MyAccount;