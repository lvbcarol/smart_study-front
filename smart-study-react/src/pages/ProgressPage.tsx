// src/pages/ProgressPage.tsx
import React, { useEffect, useState, useMemo, useCallback } from 'react';
import api from '../services/api';
import Navbar from '../components/Navbar';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import useEmblaCarousel from 'embla-carousel-react';
import { FaArrowLeft, FaArrowRight } from 'react-icons/fa';
import { useInteractiveSound } from '../hooks/useInteractiveSound'; // 1. Importe o hook

// --- Interfaces ---
interface Attempt { score: number; date: string; attemptNumber: number; }
interface Lesson { _id: string; title: string; quizzAttempts?: Attempt[]; }
interface Notebook { _id: string; title: string; lessons: Lesson[]; }
interface AttemptChartData { name: string; score: number; }
interface LessonAverageChartData { name: string; averageScore: number; }
interface NotebookAverageChartData { name: string; averageScore: number; }

const ProgressPage: React.FC = () => {
  const soundEvents = useInteractiveSound(); // 2. Inicialize o hook
  const [allNotebooks, setAllNotebooks] = useState<Notebook[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [notebookForAttempts, setNotebookForAttempts] = useState<string>('');
  const [lessonForAttempts, setLessonForAttempts] = useState<string>('');
  const [attemptChartData, setAttemptChartData] = useState<AttemptChartData[]>([]);
  const [notebookForLessonAverage, setNotebookForLessonAverage] = useState<string>('');
  const [lessonAverageChartData, setLessonAverageChartData] = useState<LessonAverageChartData[]>([]);
  
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: false });
  const [selectedIndex, setSelectedIndex] = useState(0);
  const scrollPrev = useCallback(() => emblaApi && emblaApi.scrollPrev(), [emblaApi]);
  const scrollNext = useCallback(() => emblaApi && emblaApi.scrollNext(), [emblaApi]);
  const scrollTo = useCallback((index: number) => emblaApi && emblaApi.scrollTo(index), [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;
    const onSelect = () => setSelectedIndex(emblaApi.selectedScrollSnap());
    emblaApi.on('select', onSelect);
    return () => { emblaApi.off('select', onSelect); };
  }, [emblaApi]);

  useEffect(() => {
    const fetchNotebooks = async () => {
      try {
        const response = await api.get('/notebooks');
        setAllNotebooks(response.data);
      } catch (error) {
        console.error("Error fetching notebooks for progress page:", error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchNotebooks();
  }, []);

  useEffect(() => {
    if (notebookForAttempts && lessonForAttempts) {
      const notebook = allNotebooks.find(nb => nb._id === notebookForAttempts);
      const lesson = notebook?.lessons.find(l => l._id === lessonForAttempts);
      if (lesson?.quizzAttempts && lesson.quizzAttempts.length > 0) {
        const dataForChart = lesson.quizzAttempts.map((attempt, index) => ({ name: `Attempt ${index + 1}`, score: attempt.score }));
        setAttemptChartData(dataForChart);
      } else { setAttemptChartData([]); }
    }
  }, [lessonForAttempts, notebookForAttempts, allNotebooks]);

  useEffect(() => {
    if (notebookForLessonAverage) {
      const notebook = allNotebooks.find(nb => nb._id === notebookForLessonAverage);
      if (notebook?.lessons && notebook.lessons.length > 0) {
        const dataForChart = notebook.lessons.map(lesson => {
          let average = 0;
          if (lesson.quizzAttempts && lesson.quizzAttempts.length > 0) {
            const totalScore = lesson.quizzAttempts.reduce((sum, attempt) => sum + attempt.score, 0);
            average = Math.round(totalScore / lesson.quizzAttempts.length);
          }
          return { name: lesson.title, averageScore: average };
        });
        setLessonAverageChartData(dataForChart);
      } else { setLessonAverageChartData([]); }
    }
  }, [notebookForLessonAverage, allNotebooks]);

  const averageByNotebookData = useMemo<NotebookAverageChartData[]>(() => {
    return allNotebooks.map(notebook => {
      let totalScore = 0;
      let attemptCount = 0;
      notebook.lessons.forEach(lesson => {
        if (lesson.quizzAttempts && lesson.quizzAttempts.length > 0) {
          attemptCount += lesson.quizzAttempts.length;
          totalScore += lesson.quizzAttempts.reduce((sum, attempt) => sum + attempt.score, 0);
        }
      });
      return { name: notebook.title, averageScore: attemptCount > 0 ? Math.round(totalScore / attemptCount) : 0, };
    });
  }, [allNotebooks]);

  const selectedNotebookForAttempts = allNotebooks.find(nb => nb._id === notebookForAttempts);
  const backgroundStyle = { background: 'linear-gradient(135deg, #1e0a3c 0%, #2A0E46 100%)' };

  if (isLoading) {
    return (
      <div style={backgroundStyle} className="min-h-screen text-white flex items-center justify-center">
        <p className="text-xl animate-pulse">Loading Data...</p>
      </div>
    );
  }

  return (
    <div style={backgroundStyle} className="min-h-screen text-white">
      <Navbar />
      <main className="container mx-auto p-4 md:p-8 flex flex-col items-center">
        <div className="animate-fade-in-up text-center">
          <h1 className="text-4xl font-bold text-white">My Progress</h1>
          <p className="text-gray-300 mt-2">Here's a visual overview of your study performance.</p>
        </div>

        <div className="embla w-full max-w-6xl mt-8">
          <div className="embla__viewport" ref={emblaRef}>
            <div className="embla__container">

              {/* Slide 1: Média Geral por Caderno */}
              <div className="embla__slide p-4 flex flex-col lg:flex-row items-center gap-8">
                <div className="lg:w-2/3 w-full h-[28rem]"><Card className="w-full h-full bg-white text-black"><CardHeader><CardTitle>Overall Average by Notebook</CardTitle><CardDescription>A general comparison of your performance.</CardDescription></CardHeader><CardContent><ResponsiveContainer width="100%" height={300}><BarChart data={averageByNotebookData}><CartesianGrid strokeDasharray="3 3" /><XAxis dataKey="name" tick={{ fontSize: 12 }} /><YAxis domain={[0, 100]} /><Tooltip cursor={{ fill: '#f3f4f6' }} /><Bar dataKey="averageScore" name="Average" fill="#a78bfa" radius={[4, 4, 0, 0]} /></BarChart></ResponsiveContainer></CardContent></Card></div>
                <div className="lg:w-1/3 w-full text-center lg:text-left"><h3 className="text-2xl font-bold">Subject Overview</h3><p className="mt-2 text-gray-300">This chart shows your overall average score for each notebook. Use it to quickly identify which subjects need more attention.</p></div>
              </div>

              {/* Slide 2: Média por Aula */}
              <div className="embla__slide p-4 flex flex-col lg:flex-row items-center gap-8">
                <div className="lg:w-2/3 w-full h-[28rem]">
                  <Card className="w-full h-full bg-white text-black">
                    <CardHeader>
                      <CardTitle>Average Score by Lesson</CardTitle>
                      <CardDescription>Select a notebook to see the average for each lesson.</CardDescription>
                      <div className="mt-4">
                        <Select onValueChange={(value) => { soundEvents.onClick(); setNotebookForLessonAverage(value); }}>
                          <SelectTrigger {...soundEvents}><SelectValue placeholder="Select a Notebook" /></SelectTrigger>
                          <SelectContent>{allNotebooks.map(notebook => <SelectItem {...soundEvents} key={notebook._id} value={notebook._id}>{notebook.title}</SelectItem>)}</SelectContent>
                        </Select>
                      </div>
                    </CardHeader>
                    <CardContent>
                      {lessonAverageChartData.length > 0 ? (
                        <ResponsiveContainer width="100%" height={220}><BarChart data={lessonAverageChartData}><CartesianGrid strokeDasharray="3 3" /><XAxis dataKey="name" tick={{ fontSize: 12 }} /><YAxis domain={[0, 100]} /><Tooltip cursor={{ fill: '#f3f4f6' }} /><Bar dataKey="averageScore" name="Average" fill="#8b5cf6" radius={[4, 4, 0, 0]} /></BarChart></ResponsiveContainer>
                      ) : ( <div className="h-full flex items-center justify-center text-gray-500"><p>Select a notebook to see the chart.</p></div> )}
                    </CardContent>
                  </Card>
                </div>
                <div className="lg:w-1/3 w-full text-center lg:text-left"><h3 className="text-2xl font-bold">Lesson Analysis</h3><p className="mt-2 text-gray-300">Filter by notebook to compare your average performance in each lesson, helping you pinpoint specific topics for review.</p></div>
              </div>

              {/* Slide 3: Progresso por Tentativa */}
              <div className="embla__slide p-4 flex flex-col lg:flex-row items-center gap-8">
                <div className="lg:w-2/3 w-full h-[28rem]">
                  <Card className="w-full h-full bg-white text-black">
                    <CardHeader>
                      <CardTitle>Progress by Attempt</CardTitle>
                      <CardDescription>Select a notebook and a lesson to track your scores.</CardDescription>
                      <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <Select onValueChange={(value) => { soundEvents.onClick(); setNotebookForAttempts(value); setLessonForAttempts(''); }}>
                          <SelectTrigger {...soundEvents}><SelectValue placeholder="Select a Notebook" /></SelectTrigger>
                          <SelectContent>{allNotebooks.map(notebook => <SelectItem {...soundEvents} key={notebook._id} value={notebook._id}>{notebook.title}</SelectItem>)}</SelectContent>
                        </Select>
                        <Select onValueChange={(value) => { soundEvents.onClick(); setLessonForAttempts(value); }} disabled={!notebookForAttempts} value={lessonForAttempts}>
                          <SelectTrigger {...soundEvents}><SelectValue placeholder="Select a Lesson" /></SelectTrigger>
                          <SelectContent>{selectedNotebookForAttempts?.lessons.map(lesson => <SelectItem {...soundEvents} key={notebook._id} value={lesson._id}>{lesson.title}</SelectItem>)}</SelectContent>
                        </Select>
                      </div>
                    </CardHeader>
                    <CardContent>
                        {attemptChartData.length > 0 ? (
                            <ResponsiveContainer width="100%" height={220}><BarChart data={attemptChartData}><CartesianGrid strokeDasharray="3 3" /><XAxis dataKey="name" /><YAxis domain={[0, 100]} /><Tooltip cursor={{ fill: '#f3f4f6' }} /><Bar dataKey="score" fill="#a78bfa" radius={[4, 4, 0, 0]} /></BarChart></ResponsiveContainer>
                        ) : ( <div className="h-full flex items-center justify-center text-gray-500"><p>{notebookForAttempts ? 'This lesson has no attempts.' : 'Select a notebook and lesson.'}</p></div> )}
                    </CardContent>
                  </Card>
                </div>
                <div className="md:w-1/3 w-full text-center md:text-left"><h3 className="text-2xl font-bold">Deep Dive Analysis</h3><p className="mt-2 text-gray-300">Filter by notebook and lesson to see the score progression for every single attempt. Perfect for tracking improvement on a specific topic.</p></div>
              </div>

            </div>
          </div>
          
          {/* ✅ 3. Adiciona os eventos de som aos controles do carrossel */}
          <div className="flex items-center justify-center mt-8 gap-8">
            <button onMouseEnter={soundEvents.onMouseEnter} onClick={() => { soundEvents.onClick(); scrollPrev(); }} className="bg-white bg-opacity-20 p-3 rounded-full hover:bg-opacity-30 transition"><FaArrowLeft /></button>
            <div className="flex gap-3">
              {[...Array(3).keys()].map(index => (
                <button 
                  key={index}
                  onMouseEnter={soundEvents.onMouseEnter}
                  onClick={() => { soundEvents.onClick(); scrollTo(index); }}
                  className={`w-3 h-3 rounded-full transition ${selectedIndex === index ? 'bg-white' : 'bg-gray-600'}`}
                />
              ))}
            </div>
            <button onMouseEnter={soundEvents.onMouseEnter} onClick={() => { soundEvents.onClick(); scrollNext(); }} className="bg-white bg-opacity-20 p-3 rounded-full hover:bg-opacity-30 transition"><FaArrowRight /></button>
          </div>
        </div>
      </main>
    </div>
  );
};

export default ProgressPage;