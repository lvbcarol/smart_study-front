import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Layout/Navbar";
import NotebookCard from "../components/Notebook/NotebookCard";
import NotebookModal from "../components/Notebook/NotebookModal";
import AulaModal from "../components/Notebook/AulaModal";

function Notebooks() {
  const navigate = useNavigate();
  const usuarioId = localStorage.getItem("usuarioId");

  const [notebooks, setNotebooks] = useState([]);
  const [notebookTitle, setNotebookTitle] = useState("");
  const [aulaTitle, setAulaTitle] = useState("");
  const [currentNotebookIndex, setCurrentNotebookIndex] = useState(null);
  const [showNotebookModal, setShowNotebookModal] = useState(false);
  const [showAulaModal, setShowAulaModal] = useState(false);

  useEffect(() => {
    if (!usuarioId) {
      alert("You must be logged in to view this page.");
      navigate("/login");
    } else {
      loadNotebooks();
    }
  }, []);

  const loadNotebooks = async () => {
    try {
      const res = await fetch(`http://localhost:3000/notebooks/${usuarioId}`);
      const data = await res.json();
      setNotebooks(data.map(nb => ({ ...nb, expanded: false })));
    } catch (err) {
      console.error("Error loading notebooks:", err);
    }
  };

  const createNotebook = async () => {
    if (!notebookTitle.trim()) return;
    try {
      const res = await fetch("http://localhost:3000/notebooks", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ titulo: notebookTitle, usuarioId })
      });
      const newNotebook = await res.json();
      setNotebooks([...notebooks, { ...newNotebook, expanded: false }]);
      setNotebookTitle("");
      setShowNotebookModal(false);
    } catch (err) {
      console.error("Error creating notebook:", err);
    }
  };

  const createAula = async () => {
    if (!aulaTitle.trim() || currentNotebookIndex === null) return;
    const notebook = notebooks[currentNotebookIndex];
    try {
      const res = await fetch(`http://localhost:3000/notebooks/${notebook._id}/aulas`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ titulo: aulaTitle })
      });
      const updated = await res.json();
      updated.expanded = true;
      const updatedList = [...notebooks];
      updatedList[currentNotebookIndex] = updated;
      setNotebooks(updatedList);
      setAulaTitle("");
      setShowAulaModal(false);
    } catch (err) {
      console.error("Error creating aula:", err);
    }
  };

  const goToSubjectPage = (title) => navigate(`/subjects?aula=${encodeURIComponent(title)}`);

  return (
    <div className="min-h-screen bg-[#2a003f] text-white">
      <Navbar />
      <div className="container mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold">My Notebooks</h1>
          <button
            onClick={() => setShowNotebookModal(true)}
            className="bg-white text-[#2a003f] px-4 py-2 font-semibold rounded hover:scale-105 transition"
          >
            + New Notebook
          </button>
        </div>

        {notebooks.map((notebook, index) => (
          <NotebookCard
            key={notebook._id}
            index={index}
            notebook={notebook}
            notebooks={notebooks}
            setNotebooks={setNotebooks}
            onShowAulaModal={() => {
              setCurrentNotebookIndex(index);
              setShowAulaModal(true);
            }}
            onGoToSubject={goToSubjectPage}
          />
        ))}
      </div>

      <NotebookModal
        open={showNotebookModal}
        onClose={() => setShowNotebookModal(false)}
        notebookTitle={notebookTitle}
        setNotebookTitle={setNotebookTitle}
        onSave={createNotebook}
      />

      <AulaModal
        open={showAulaModal}
        onClose={() => setShowAulaModal(false)}
        aulaTitle={aulaTitle}
        setAulaTitle={setAulaTitle}
        onSave={createAula}
      />
    </div>
  );
}

export default Notebooks;
