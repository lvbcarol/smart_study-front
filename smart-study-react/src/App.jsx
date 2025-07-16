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
import Layout from "./layout";

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
        <Route path="/" element={<Layout></Layout>}>
        <Route path="/home" element={<Home />} />
        <Route path="/notebooks" element={<Notebooks />} />
        <Route path="/subjects" element={<Subjects />} />
        <Route path="/quizz" element={<Quizz />} />
        <Route path="/summary" element={<Summary />} />
        <Route path="/progress" element={<Progress />} />
        <Route path="/myaccount" element={<MyAccount />} />
        <Route path="/aboutus" element={<AboutUs />} />
        </Route>
        //excluir todos que estão escritos navbar e deixar igual a linha 35

        {/* Rota fallback: página não encontrada */}
        <Route path="*" element={<><Navbar /><h1 style={{ padding: "2rem", color: "white" }}>Página não encontrada</h1></>} />

      </Routes>
    </Router>
  );
}

export default App;
