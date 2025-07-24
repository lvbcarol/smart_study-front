// src/pages/ProgressPage.tsx
import React, { useEffect, useState, useMemo } from 'react';
import api from '../services/api';
import Navbar from '../components/Navbar';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

// --- Interfaces para organizar nossos dados ---
interface Attempt {
  score: number;
  date: string;
  attemptNumber: number;
}
interface Lesson {
  _id: string;
  title: string;
  quizzAttempts?: Attempt[];
}
interface Notebook {
  _id: string;
  title: string;
  lessons: Lesson[];
}

// Interfaces para os formatos de dados dos gráficos
interface AttemptChartData {
  name: string; // Ex: "Attempt 1"
  score: number;
}
interface LessonAverageChartData {
  name: string; // Ex: "Lesson Title"
  averageScore: number;
}
interface NotebookAverageChartData {
    name: string; // Ex: "Notebook Title"
    averageScore: number;
}

const ProgressPage: React.FC = () => {
  const [allNotebooks, setAllNotebooks] = useState<Notebook[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  // Estados para o GRÁFICO 1 (Progresso por Tentativa)
  const [notebookForAttempts, setNotebookForAttempts] = useState<string>('');
  const [lessonForAttempts, setLessonForAttempts] = useState<string>('');
  const [attemptChartData, setAttemptChartData] = useState<AttemptChartData[]>([]);

  // Estados para o GRÁFICO 2 (Média por Aula)
  const [notebookForLessonAverage, setNotebookForLessonAverage] = useState<string>('');
  const [lessonAverageChartData, setLessonAverageChartData] = useState<LessonAverageChartData[]>([]);

  // Busca todos os cadernos na primeira vez que a página carrega
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

  // Efeito para preparar os dados do GRÁFICO 1
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

  // Efeito para preparar os dados do GRÁFICO 2
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

  // ✅ DADOS PARA O GRÁFICO 3 (Média por Caderno), calculado com useMemo para eficiência
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
      return {
        name: notebook.title,
        averageScore: attemptCount > 0 ? Math.round(totalScore / attemptCount) : 0,
      };
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
      <main className="container mx-auto p-4 md:p-8">
        <div className="animate-fade-in-up">
          <h1 className="text-4xl font-bold text-white">My Progress</h1>
          <p className="text-gray-300 mt-2">Here's a visual overview of your study performance.</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mt-8">
          
          {/* Card do Gráfico 1: Progresso por Tentativa (com filtros) */}
          <Card className="bg-background/50 border-border text-card-foreground animate-fade-in-up" style={{ animationDelay: '200ms' }}>
            <CardHeader>
              <CardTitle>Progress by Attempt</CardTitle>
              <CardDescription className="text-muted-foreground">Select a notebook and a lesson to view the specific quiz scores.</CardDescription>
              <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-4">
                <Select onValueChange={(value) => { setNotebookForAttempts(value); setLessonForAttempts(''); setAttemptChartData([]); }}>
                  <SelectTrigger><SelectValue placeholder="Select a Notebook" /></SelectTrigger>
                  <SelectContent>{allNotebooks.map(notebook => <SelectItem key={notebook._id} value={notebook._id}>{notebook.title}</SelectItem>)}</SelectContent>
                </Select>
                <Select onValueChange={setLessonForAttempts} disabled={!notebookForAttempts} value={lessonForAttempts}>
                  <SelectTrigger><SelectValue placeholder="Select a Lesson" /></SelectTrigger>
                  <SelectContent>{selectedNotebookForAttempts?.lessons.map(lesson => <SelectItem key={lesson._id} value={lesson._id}>{lesson.title}</SelectItem>)}</SelectContent>
                </Select>
              </div>
            </CardHeader>
            <CardContent>
              <div className="w-full h-80">
                {attemptChartData.length > 0 ? (
                    <ResponsiveContainer width="100%" height="100%"><BarChart data={attemptChartData}><CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--muted))" /><XAxis dataKey="name" stroke="hsl(var(--muted-foreground))" /><YAxis domain={[0, 100]} stroke="hsl(var(--muted-foreground))" /><Tooltip cursor={{ fill: 'hsla(var(--primary)/0.1)' }} contentStyle={{ backgroundColor: 'hsl(var(--background))', borderColor: 'hsl(var(--border))' }} /><Bar dataKey="score" fill="hsl(var(--primary))" radius={[4, 4, 0, 0]} /></BarChart></ResponsiveContainer>
                ) : ( <div className="h-full flex items-center justify-center text-muted-foreground"><p>{notebookForAttempts ? 'This lesson has no quiz attempts yet.' : 'Please select a notebook and lesson.'}</p></div> )}
              </div>
            </CardContent>
          </Card>

          {/* Card do Gráfico 2: Média por Aula (com filtro) */}
          <Card className="bg-background/50 border-border text-card-foreground animate-fade-in-up" style={{ animationDelay: '400ms' }}>
            <CardHeader>
              <CardTitle>Average Score by Lesson</CardTitle>
              <CardDescription className="text-muted-foreground">Select a notebook to compare the average scores of its lessons.</CardDescription>
              <div className="mt-4">
                <Select onValueChange={setNotebookForLessonAverage}>
                  <SelectTrigger><SelectValue placeholder="Select a Notebook" /></SelectTrigger>
                  <SelectContent>{allNotebooks.map(notebook => <SelectItem key={notebook._id} value={notebook._id}>{notebook.title}</SelectItem>)}</SelectContent>
                </Select>
              </div>
            </CardHeader>
            <CardContent>
              <div className="w-full h-80">
                {lessonAverageChartData.length > 0 ? (
                    <ResponsiveContainer width="100%" height="100%"><BarChart data={lessonAverageChartData}><CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--muted))" /><XAxis dataKey="name" stroke="hsl(var(--muted-foreground))" tick={{ fontSize: 12 }} /><YAxis domain={[0, 100]} stroke="hsl(var(--muted-foreground))" /><Tooltip cursor={{ fill: 'hsla(var(--primary)/0.1)' }} contentStyle={{ backgroundColor: 'hsl(var(--background))', borderColor: 'hsl(var(--border))' }} /><Bar dataKey="averageScore" name="Average Score" fill="#a78bfa" radius={[4, 4, 0, 0]} /></BarChart></ResponsiveContainer>
                ) : ( <div className="h-full flex items-center justify-center text-muted-foreground"><p>Please select a notebook to see its lessons' average scores.</p></div> )}
              </div>
            </CardContent>
          </Card>
          
          {/* ✅ GRÁFICO 3 ADICIONADO: Média por Caderno (sem filtro) */}
          <Card className="lg:col-span-2 bg-background/50 border-border text-card-foreground animate-fade-in-up" style={{ animationDelay: '600ms' }}>
            <CardHeader>
              <CardTitle>Overall Average by Notebook</CardTitle>
              <CardDescription className="text-muted-foreground">A general comparison of your performance in each subject.</CardDescription>
            </CardHeader>
            <CardContent>
            <div className="w-full h-80">
                {averageByNotebookData.length > 0 ? (
                    <ResponsiveContainer width="100%" height="100%">
                        <BarChart data={averageByNotebookData} margin={{ top: 5, right: 20, left: -10, bottom: 5 }}>
                            <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--muted))" />
                            <XAxis dataKey="name" stroke="hsl(var(--muted-foreground))" tick={{ fontSize: 12 }} />
                            <YAxis domain={[0, 100]} stroke="hsl(var(--muted-foreground))" />
                            <Tooltip cursor={{ fill: 'hsla(var(--primary)/0.1)' }} contentStyle={{ backgroundColor: 'hsl(var(--background))', borderColor: 'hsl(var(--border))' }} />
                            <Legend />
                            <Bar dataKey="averageScore" name="Average Score" fill="#c084fc" radius={[4, 4, 0, 0]} />
                        </BarChart>
                    </ResponsiveContainer>
                ) : ( <div className="h-full flex items-center justify-center text-muted-foreground"><p>No quiz data available to show averages.</p></div> )}
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
};

export default ProgressPage;