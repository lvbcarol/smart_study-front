import { Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

function Home() {
  return (
    <div className="container py-5">
      <h1 className="text-center mb-4">Bem-vindo ao Smart Study</h1>
      <div className="d-flex flex-column align-items-center gap-3">
        <Link to="/notebooks" className="btn btn-primary w-50">📔 Meus Cadernos</Link>
        <Link to="/subjects" className="btn btn-secondary w-50">📚 Matérias</Link>
        <Link to="/quizz" className="btn btn-warning w-50">❓ Quiz</Link>
        <Link to="/progress" className="btn btn-info w-50">📈 Progresso</Link>
        <Link to="/summary" className="btn btn-dark w-50">🧠 Resumo</Link>
      </div>
    </div>
  );
}

export default Home;