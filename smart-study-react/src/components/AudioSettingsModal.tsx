// src/components/AudioSettingsModal.tsx
import React, { useState, useEffect } from 'react';
import { useMusic } from '../context/MusicContext';
import { useSounds } from '../context/SoundContext';
import { FaMusic, FaVolumeUp } from 'react-icons/fa';
import Button from './ui/Button'; // Usaremos nosso componente de botão
import toast from 'react-hot-toast';

interface AudioSettingsModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const AudioSettingsModal: React.FC<AudioSettingsModalProps> = ({ isOpen, onClose }) => {
  const { musicVolume, setMusicVolume } = useMusic();
  const { soundVolume, setSoundVolume } = useSounds();

  // Estados de "rascunho" que só são aplicados ao clicar em "Salvar"
  const [draftMusicVolume, setDraftMusicVolume] = useState(musicVolume);
  const [draftSoundVolume, setDraftSoundVolume] = useState(soundVolume);

  // Sincroniza o estado de rascunho com o estado global sempre que o modal abre
  useEffect(() => {
    if (isOpen) {
      setDraftMusicVolume(musicVolume);
      setDraftSoundVolume(soundVolume);
    }
  }, [isOpen, musicVolume, soundVolume]);


  const handleSaveChanges = () => {
    // Aplica os valores do rascunho ao estado global
    setMusicVolume(draftMusicVolume);
    setSoundVolume(draftSoundVolume);
    toast.success("Audio settings saved!");
    onClose(); // Fecha o modal
  };

  if (!isOpen) return null;

  // Converte volumes de 0-1 para 0-10 para os sliders
  const musicSliderValue = Math.round(draftMusicVolume * 10);
  const soundSliderValue = Math.round(draftSoundVolume * 10);

  return (
    <div 
      className="fixed inset-0 bg-black bg-opacity-60 z-50 flex justify-center items-center p-4"
      onClick={onClose}
    >
      <div 
        onClick={(e) => e.stopPropagation()}
        className="bg-white text-black rounded-lg shadow-lg p-6 w-full max-w-sm animate-fade-in-up"
        style={{ animationDuration: '0.3s' }}
      >
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-xl font-bold">Audio Settings</h3>
          <button onClick={onClose} className="text-2xl text-gray-500 hover:text-black">&times;</button>
        </div>
        
        <div className="space-y-6">
          {/* Controle de Música */}
          <div>
            <label htmlFor="music-volume" className="font-semibold text-gray-700">Music</label>
            <div className="flex items-center gap-4 mt-2">
              <FaMusic className="text-purple-600" />
              <input 
                id="music-volume" type="range" min="0" max="10" 
                value={musicSliderValue}
                onChange={(e) => setDraftMusicVolume(parseFloat(e.target.value) / 10)}
                className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-purple-600"
              />
              <span className="font-bold w-8 text-center">{musicSliderValue}</span>
            </div>
          </div>

          {/* Controle de Efeitos Sonoros */}
          <div>
            <label htmlFor="sound-volume" className="font-semibold text-gray-700">Sound Effects</label>
            <div className="flex items-center gap-4 mt-2">
              <FaVolumeUp className="text-cyan-500" />
              <input 
                id="sound-volume" type="range" min="0" max="10"
                value={soundSliderValue}
                onChange={(e) => setDraftSoundVolume(parseFloat(e.target.value) / 10)}
                className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-cyan-500"
              />
              <span className="font-bold w-8 text-center">{soundSliderValue}</span>
            </div>
          </div>
        </div>

        {/* Botão de Salvar */}
        <div className="mt-8 flex justify-end">
          <Button onClick={handleSaveChanges}>
            Save Settings
          </Button>
        </div>
      </div>
    </div>
  );
};

export default AudioSettingsModal;