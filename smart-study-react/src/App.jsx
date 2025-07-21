import { BrowserRouter as Router, Routes, Route, useLocation, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import Navbar from "./components/Layout/Navbar";

// Páginas
import Home from "./pages/Home";
import Notebooks from "./pages/Notebooks";
import Subjects from "./pages/Subjects";
import Summary from "./pages/Summary";
import Quizz from "./pages/Quizz";
import Progress from "./pages/Progress";
import AboutUs from "./pages/AboutUs";
import MyAccount from "./pages/MyAccount";
import Login from "./pages/Login";
import Register from "./pages/Register";

function Layout({ children }) {
  const location = useLocation();
  const navigate = useNavigate();

  // Ocultar navbar nas rotas de conteúdo
  const hideNavbarRoutes = ["/subjects", "/summary", "/quizz", "/progress"];
  const showNavbar = !hideNavbarRoutes.includes(location.pathname.toLowerCase());

  useEffect(() => {
    window.scrollTo(0, 0); // Sempre rola para o topo ao trocar de rota
  }, [location]);

  return (
    <>
      {showNavbar && <Navbar onNavigate={navigate} />}
      {children}
    </>
  );
}

function App() {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/home" element={<Home />} />
          <Route path="/notebooks" element={<Notebooks />} />
          <Route path="/subjects" element={<Subjects />} />
          <Route path="/summary" element={<Summary />} />
          <Route path="/quizz" element={<Quizz />} />
          <Route path="/progress" element={<Progress />} />
          <Route path="/aboutus" element={<AboutUs />} />
          <Route path="/myaccount" element={<MyAccount />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="*" element={<Home />} />
        </Routes>
      </Layout>
    </Router>
  );
}

export default App;
