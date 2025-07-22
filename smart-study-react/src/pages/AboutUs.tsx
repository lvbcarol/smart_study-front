// src/pages/AboutUs.tsx
import React, { useCallback, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import useEmblaCarousel from 'embla-carousel-react';
import Navbar from '../components/Navbar';
import aboutUsImage from '../assets/aboutus.png';
import { FaArrowLeft, FaArrowRight } from 'react-icons/fa';

const AboutUs: React.FC = () => {
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true });
  const [selectedIndex, setSelectedIndex] = useState(0);

  const scrollPrev = useCallback(() => emblaApi && emblaApi.scrollPrev(), [emblaApi]);
  const scrollNext = useCallback(() => emblaApi && emblaApi.scrollNext(), [emblaApi]);
  const scrollTo = useCallback((index: number) => emblaApi && emblaApi.scrollTo(index), [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;
    const onSelect = () => setSelectedIndex(emblaApi.selectedScrollSnap());
    emblaApi.on('select', onSelect);
    return () => { emblaApi.off('select', onSelect) };
  }, [emblaApi]);

  const backgroundStyle = { background: 'linear-gradient(135deg, #1e0a3c 0%, #2A0E46 100%)' };

  const techStack = [
    { name: 'React', description: 'For building our fast and interactive user interface.' },
    { name: 'Node.js', description: 'The engine of our backend, handling all server-side logic.' },
    { name: 'MongoDB Atlas', description: 'Our flexible cloud database where your study data is securely stored.' },
    { name: 'Tailwind CSS', description: 'For crafting the modern, responsive design you see.' },
    { name: 'TypeScript', description: 'To ensure our code is robust, scalable, and error-free.' },
    { name: 'Gemini AI API', description: 'The powerful AI brain that generates your summaries and quizzes.' },
    { name: 'Brevo', description: 'The service that reliably delivers important emails, like password resets.' },
    { name: 'Tremor', description: 'To create the beautiful and insightful graphs on your Progress page.' },
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
                  <h1 className="text-5xl md:text-6xl font-bold">About Us</h1>
                  <p className="mt-4 text-lg text-gray-300 leading-relaxed max-w-3xl">
                    Smart Study was designed to be a powerful ally for a <strong>deep, individual, and lasting learning experience.</strong> We developed a method where every user can create their own study environment, based on three pillars:
                  </p>
                  <div className="mt-8 w-full grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="bg-purple-500 bg-opacity-20 p-6 rounded-lg animate-fade-in-up" style={{ animationDelay: '200ms' }}>
                      <h3 className="text-2xl font-bold">Summary</h3>
                      <p className="mt-2 text-gray-400">Content Absorption</p>
                    </div>
                    <div className="bg-purple-500 bg-opacity-20 p-6 rounded-lg animate-fade-in-up" style={{ animationDelay: '400ms' }}>
                      <h3 className="text-2xl font-bold">Quizz</h3>
                      <p className="mt-2 text-gray-400">Applied Learning</p>
                    </div>
                    <div className="bg-purple-500 bg-opacity-20 p-6 rounded-lg animate-fade-in-up" style={{ animationDelay: '600ms' }}>
                      <h3 className="text-2xl font-bold">Progress</h3>
                      <p className="mt-2 text-gray-400">Instant & Motivating Feedback</p>
                    </div>
                  </div>
                </div>

                {/* --- Slide 2: A História --- */}
                <div className="embla__slide flex flex-col lg:flex-row items-center gap-8 p-4">
                  <div className="lg:w-1/2 flex justify-center">
                    <img src={aboutUsImage} alt="About Smart Study" className="w-full max-w-sm mx-auto rounded-lg shadow-2xl" />
                  </div>
                  <div className="lg:w-1/2 text-center lg:text-left">
                    <h2 className="text-4xl font-bold">Our Story</h2>
                    <p className="mt-4 text-lg text-gray-300 leading-relaxed">
                      This project was conceived and developed by Information Systems student <strong>Carolina Lansoni Vilas Boas</strong>, in partnership with the <strong>Instituto Mauá de Tecnologia</strong> and the global <strong>Grand Challenges Scholarship Program</strong>. We are committed to inclusivity, with future developments planned for enhanced accessibility.
                    </p>
                    <p className="mt-6 text-2xl font-bold text-purple-300 italic">Study smart, always!</p>
                  </div>
                </div>
                
                {/* --- Slide 3: Ficha Técnica --- */}
                <div className="embla__slide flex flex-col items-center text-center p-4">
                   <h2 className="text-4xl font-bold">Tech Stack</h2>
                   <p className="mt-2 text-gray-400">The technologies that power Smart Study</p>
                    <div className="mt-6 w-full grid grid-cols-2 md:grid-cols-4 gap-4">
                      {techStack.map(tech => (
                        <div key={tech.name} className="bg-gray-900 bg-opacity-40 p-4 rounded-lg">
                          <h4 className="font-bold text-white">{tech.name}</h4>
                          <p className="text-sm text-gray-400">{tech.description}</p>
                        </div>
                      ))}
                    </div>
                </div>

              </div>
            </div>
          </div>

          {/* Controles do Carrossel: Setas e Bolinhas */}
          <div className="flex items-center justify-center mt-8 gap-8">
            <button onClick={scrollPrev} className="bg-white bg-opacity-20 p-3 rounded-full hover:bg-opacity-30 transition">
              <FaArrowLeft />
            </button>
            <div className="flex gap-3">
              {[...Array(3).keys()].map(index => (
                <button 
                  key={index} 
                  onClick={() => scrollTo(index)}
                  className={`w-3 h-3 rounded-full transition ${selectedIndex === index ? 'bg-white' : 'bg-gray-600'}`}
                />
              ))}
            </div>
            <button onClick={scrollNext} className="bg-white bg-opacity-20 p-3 rounded-full hover:bg-opacity-30 transition">
              <FaArrowRight />
            </button>
          </div>

        </div>
      </main>
    </div>
  );
};

export default AboutUs;