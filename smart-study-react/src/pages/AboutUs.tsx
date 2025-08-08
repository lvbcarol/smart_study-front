// src/pages/AboutUs.tsx
import React, { useCallback, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import useEmblaCarousel from 'embla-carousel-react';
import Navbar from '../components/Navbar';
import aboutUsImage from '../assets/aboutus.png';
import { FaArrowLeft, FaArrowRight } from 'react-icons/fa';


const AboutUs: React.FC = () => {
  const { t } = useTranslation();
 
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true });
  const [selectedIndex, setSelectedIndex] = useState(0);

  const scrollPrev = useCallback(() => {
    if (emblaApi) emblaApi.scrollPrev();
  }, [emblaApi]);

  const scrollNext = useCallback(() => {
    if (emblaApi) emblaApi.scrollNext();
  }, [emblaApi]);
  
  const scrollTo = useCallback((index: number) => {
    if (emblaApi) emblaApi.scrollTo(index);
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;
    const onSelect = () => setSelectedIndex(emblaApi.selectedScrollSnap());
    emblaApi.on('select', onSelect);
    return () => { emblaApi.off('select', onSelect) };
  }, [emblaApi]);

  const backgroundStyle = { background: 'linear-gradient(135deg, #1e0a3c 0%, #2A0E46 100%)' };

  const techStack = [
    { name: 'React', descriptionKey: 'aboutUs.techStack.react' },
    { name: 'Node.js', descriptionKey: 'aboutUs.techStack.nodejs' },
    { name: 'MongoDB Atlas', descriptionKey: 'aboutUs.techStack.mongodb' },
    { name: 'Tailwind CSS', descriptionKey: 'aboutUs.techStack.tailwind' },
    { name: 'TypeScript', descriptionKey: 'aboutUs.techStack.typescript' },
    { name: 'Gemini AI API', descriptionKey: 'aboutUs.techStack.gemini' },
    { name: 'Brevo', descriptionKey: 'aboutUs.techStack.brevo' },
    { name: 'Recharts and Shadcn/ui', descriptionKey: 'aboutUs.techStack.recharts and shadcn/ui' },
  ];

  return (
    <div style={backgroundStyle} className="min-h-screen text-white overflow-hidden flex flex-col">
      <Navbar />
      <main className="container mx-auto px-6 py-12 flex-grow flex flex-col justify-center">
        <div className="w-full max-w-5xl mx-auto">
          {/* Carrossel Principal */}
          <div className="embla">
            <div className="embla__viewport" ref={emblaRef}>
              <div className="embla__container">

                {/* --- Slide 1: A Filosofia --- */}
                <div className="embla__slide flex flex-col items-center text-center p-4">
                  <h1 className="text-5xl md:text-6xl font-bold">{t('aboutUs.title')}</h1>
                  <p className="mt-4 text-lg text-gray-300 leading-relaxed max-w-3xl"
                     dangerouslySetInnerHTML={{ __html: t('aboutUs.philosophy.text') }} />
                  <div className="mt-8 w-full grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="bg-purple-500 bg-opacity-20 p-6 rounded-lg animate-fade-in-up" style={{ animationDelay: '200ms' }}>
                      <h3 className="text-2xl font-bold">{t('aboutUs.pillars.summary.title')}</h3>
                      <p className="mt-2 text-gray-400">{t('aboutUs.pillars.summary.desc')}</p>
                    </div>
                    <div className="bg-purple-500 bg-opacity-20 p-6 rounded-lg animate-fade-in-up" style={{ animationDelay: '400ms' }}>
                      <h3 className="text-2xl font-bold">{t('aboutUs.pillars.quizz.title')}</h3>
                      <p className="mt-2 text-gray-400">{t('aboutUs.pillars.quizz.desc')}</p>
                    </div>
                    <div className="bg-purple-500 bg-opacity-20 p-6 rounded-lg animate-fade-in-up" style={{ animationDelay: '600ms' }}>
                      <h3 className="text-2xl font-bold">{t('aboutUs.pillars.progress.title')}</h3>
                      <p className="mt-2 text-gray-400">{t('aboutUs.pillars.progress.desc')}</p>
                    </div>
                  </div>
                </div>

                {/* --- Slide 2: A História --- */}
                <div className="embla__slide flex flex-col lg:flex-row items-center gap-8 p-4">
                  <div className="lg:w-1/2 flex justify-center">
                    <img src={aboutUsImage} alt="About Smart Study" className="w-full max-w-sm mx-auto rounded-lg shadow-2xl" />
                  </div>
                  <div className="lg:w-1/2 text-center lg:text-left">
                    <h2 className="text-4xl font-bold">{t('aboutUs.story.title')}</h2>
                    <p className="mt-4 text-lg text-gray-300 leading-relaxed" 
                       dangerouslySetInnerHTML={{ __html: t('aboutUs.story.text') }} />
                    <p className="mt-6 text-2xl font-bold text-purple-300 italic">
                      {t('aboutUs.story.motto')}
                    </p>
                  </div>
                </div>
                
                {/* --- Slide 3: Ficha Técnica --- */}
                <div className="embla__slide flex flex-col items-center text-center p-4">
                   <h2 className="text-4xl font-bold">{t('aboutUs.techStack.title')}</h2>
                   <p className="mt-2 text-gray-400">{t('aboutUs.techStack.subtitle')}</p>
                    <div className="mt-6 w-full grid grid-cols-2 md:grid-cols-4 gap-4">
                      {techStack.map(tech => (
                        <div key={tech.name} className="bg-gray-900 bg-opacity-40 p-4 rounded-lg">
                          <h4 className="font-bold text-white">{tech.name}</h4>
                          <p className="text-sm text-gray-400">{t(tech.descriptionKey)}</p>
                        </div>
                      ))}
                    </div>
                </div>

              </div>
            </div>
          </div>

          {/* ✅ 3. Adiciona os eventos de som aos controles do carrossel */}
          <div className="flex items-center justify-center mt-8 gap-8">
            <button 
              
              onClick={() => {
                
                scrollPrev();
              }}
              className="bg-white bg-opacity-20 p-3 rounded-full hover:bg-opacity-30 transition"
            >
              <FaArrowLeft />
            </button>
            <div className="flex gap-3">
              {[...Array(3).keys()].map(index => (
                <button 
                  key={index} 
                 
                  onClick={() => {
                    
                    scrollTo(index);
                  }}
                  className={`w-3 h-3 rounded-full transition ${selectedIndex === index ? 'bg-white' : 'bg-gray-600'}`}
                />
              ))}
            </div>
            <button 
             
              onClick={() => {
                
                scrollNext();
              }}
              className="bg-white bg-opacity-20 p-3 rounded-full hover:bg-opacity-30 transition"
            >
              <FaArrowRight />
            </button>
          </div>

        </div>
      </main>
    </div>
  );
};

export default AboutUs;