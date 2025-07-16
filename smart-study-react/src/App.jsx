import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";

// Páginas
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

// Layout (com Navbar incluído)
import Layout from "./layout";

function App() {
  return (
    <Router>
      <Routes>

        {/* Redirecionamento da raiz para a página de registro */}
        <Route path="/" element={<Navigate to="/register" replace />} />

        {/* Páginas públicas (sem Navbar) */}
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />

        {/* Páginas privadas (com Layout e Navbar) */}
        <Route path="/" element={<Layout />}>
          <Route path="/home" element={<Home />} />
          <Route path="/notebooks" element={<Notebooks />} />
          <Route path="/subjects" element={<Subjects />} />
          <Route path="/quizz" element={<Quizz />} />
          <Route path="/summary" element={<Summary />} />
          <Route path="/progress" element={<Progress />} />
          <Route path="/myaccount" element={<MyAccount />} />
          <Route path="/aboutus" element={<AboutUs />} />
        </Route>

        {/* Página de erro 404 */}
        <Route
          path="*"
          element={
            <Layout>
              <h1 style={{ padding: "2rem", color: "white" }}>Página não encontrada</h1>
            </Layout>
          }
        />

      </Routes>
    </Router>
  );
}

export default App;
