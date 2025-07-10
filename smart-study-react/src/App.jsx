import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

// Importação das páginas (ajuste o caminho se sua estrutura estiver diferente)
import Login from "./components/Login";
import Register from "./components/Register";
import Home from "./components/Home";
import Notebooks from "./components/Notebooks";
import Subjects from "./components/Subjects";
import Quizz from "./components/Quizz";
import Summary from "./components/Summary";
import Progress from "./components/Progress";
import MyAccount from "./components/MyAccount";
import AboutUs from "./components/AboutUs";

import Navbar from "./components/Navbar"; // Componente da barra de navegação

import PrivateRoute from "./components/PrivateRoute";

// Exemplo:
<Route path="/home" element={<PrivateRoute><Navbar /><Home /></PrivateRoute>} />


function App() {
  return (
    <Router>
      <Routes>

        {/* Páginas sem Navbar */}
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* Páginas com Navbar */}
        <Route path="/home" element={<><Navbar /><Home /></>} />
        <Route path="/notebooks" element={<><Navbar /><Notebooks /></>} />
        <Route path="/subjects" element={<><Navbar /><Subjects /></>} />
        <Route path="/quizz" element={<><Navbar /><Quizz /></>} />
        <Route path="/summary" element={<><Navbar /><Summary /></>} />
        <Route path="/progress" element={<><Navbar /><Progress /></>} />
        <Route path="/myaccount" element={<><Navbar /><MyAccount /></>} />
        <Route path="/aboutus" element={<><Navbar /><AboutUs /></>} />

        {/* Rota fallback: página não encontrada */}
        <Route path="*" element={<><Navbar /><h1 style={{ padding: "2rem", color: "white" }}>Página não encontrada</h1></>} />

      </Routes>
    </Router>
  );
}

export default App;
