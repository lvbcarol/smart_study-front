// src/components/Navbar.jsx
import { Link } from 'react-router-dom';

function Navbar() {
  return (
    <nav style={{ background: "#4a148c", padding: "1rem" }}>
      <Link to="/home" style={{ color: "white", marginRight: "1rem" }}>Home</Link>
      <Link to="/notebooks" style={{ color: "white", marginRight: "1rem" }}>Notebooks</Link>
      <Link to="/subjects" style={{ color: "white", marginRight: "1rem" }}>Subjects</Link>
      <Link to="/quizz" style={{ color: "white", marginRight: "1rem" }}>Quizz</Link>
      <Link to="/summary" style={{ color: "white", marginRight: "1rem" }}>Summary</Link>
      <Link to="/progress" style={{ color: "white", marginRight: "1rem" }}>Progress</Link>
    </nav>
  );
}

export default Navbar;
