// src/components/Footer.tsx
import React from 'react';
import { useTranslation } from 'react-i18next'; // Importa a ferramenta de tradução

const Footer: React.FC = () => {
  const { t } = useTranslation(); // Inicializa a ferramenta
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gray-900 bg-opacity-40 text-gray-400 mt-auto py-6">
      <div className="container mx-auto px-6 text-center text-sm">
        
        {/* Linha de Copyright e Direitos Reservados */}
        <p>&copy; {currentYear} Smart Study - {t('footer.rights')}</p>
        
        {/* Linha de "Desenvolvido por" */}
        <p className="mt-1">{t('footer.description')}</p>

        {/* Linha de "Descrição" */}
        <p className="mt-1">{t('footer.developedBy')}</p>

      </div>
    </footer>
  );
};

export default Footer;