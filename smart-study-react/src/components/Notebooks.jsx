import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function Notebooks() {
  const [notebooks, setNotebooks] = useState([]);
  const [notebookTitle, setNotebookTitle] = useState("");
  const [aulaTitle, setAulaTitle] = useState("");
  const [currentNotebookIndex, setCurrentNotebookIndex] = useState(null);
  const navigate = useNavigate();

  const usuarioId = localStorage.getItem("usuarioId");

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
      const expandedData = data.map(nb => ({ ...nb, expanded: false }));
      setNotebooks(expandedData);
    } catch (err) {
      console.error("Error loading notebooks:", err);
    }
  };

  const showNotebookModal = () => {
    const modal = new window.bootstrap.Modal(document.getElementById("notebookModal"));
    modal.show();
  };

  const showAulaModal = (index) => {
    setCurrentNotebookIndex(index);
    const modal = new window.bootstrap.Modal(document.getElementById("aulaModal"));
    modal.show();
  };

  const createNotebook = async () => {
    if (!notebookTitle.trim()) {
      alert("Notebook title is required!");
      return;
    }

    try {
      const res = await fetch("http://localhost:3000/notebooks", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ titulo: notebookTitle, usuarioId })
      });
      const newNotebook = await res.json();
      setNotebooks([...notebooks, { ...newNotebook, expanded: false }]);
      setNotebookTitle("");
      window.bootstrap.Modal.getInstance(document.getElementById("notebookModal")).hide();
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
      const updatedNotebook = await res.json();
      updatedNotebook.expanded = true;
      const updatedList = [...notebooks];
      updatedList[currentNotebookIndex] = updatedNotebook;
      setNotebooks(updatedList);
      setAulaTitle("");
      window.bootstrap.Modal.getInstance(document.getElementById("aulaModal")).hide();
    } catch (err) {
      console.error("Error creating aula:", err);
    }
  };

  const toggleAulas = (index) => {
    const updated = [...notebooks];
    updated[index].expanded = !updated[index].expanded;
    setNotebooks(updated);
  };

  const editNotebook = async (index) => {
    const newTitle = prompt("Enter new notebook title:", notebooks[index].titulo);
    if (!newTitle) return;

    try {
      const res = await fetch(`http://localhost:3000/notebooks/${notebooks[index]._id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ titulo: newTitle })
      });
      const updated = await res.json();
      const updatedList = [...notebooks];
      updatedList[index] = { ...updated, expanded: true };
      setNotebooks(updatedList);
    } catch (err) {
      console.error("Error editing notebook:", err);
    }
  };

  const deleteNotebook = async (index) => {
    const confirmDelete = window.confirm("Are you sure you want to delete this notebook and all its aulas?");
    if (!confirmDelete) return;

    await fetch(`http://localhost:3000/notebooks/${notebooks[index]._id}`, { method: "DELETE" });
    const updated = notebooks.filter((_, i) => i !== index);
    setNotebooks(updated);
  };

  const editAula = async (notebookIndex, aulaIndex) => {
    const currentTitle = notebooks[notebookIndex].aulas[aulaIndex];
    const newTitle = prompt("Enter new class title:", currentTitle);
    if (!newTitle) return;

    const res = await fetch(
      `http://localhost:3000/notebooks/${notebooks[notebookIndex]._id}/aulas/${aulaIndex}`,
      {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ titulo: newTitle })
      }
    );
    const updated = await res.json();
    updated.expanded = true;
    const updatedList = [...notebooks];
    updatedList[notebookIndex] = updated;
    setNotebooks(updatedList);
  };

  const deleteAula = async (notebookIndex, aulaIndex) => {
    const confirmDelete = window.confirm("Are you sure you want to delete this class?");
    if (!confirmDelete) return;

    const res = await fetch(
      `http://localhost:3000/notebooks/${notebooks[notebookIndex]._id}/aulas/${aulaIndex}`,
      { method: "DELETE" }
    );
    const updated = await res.json();
    updated.expanded = true;
    const updatedList = [...notebooks];
    updatedList[notebookIndex] = updated;
    setNotebooks(updatedList);
  };

  const goToSubjectPage = (aulaTitle) => {
    navigate(`/subjects?aula=${encodeURIComponent(aulaTitle)}`);
  };

  return (
    <div className="container mt-5 text-white">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h1 className="fw-bold">My Notebooks</h1>
        <button className="btn btn-light text-dark fw-semibold" onClick={showNotebookModal}>
          <i className="bi bi-journal-plus me-1"></i> New Notebook
        </button>
      </div>

      {notebooks.map((notebook, index) => (
        <div className="notebook-card" key={index} style={{ backgroundColor: '#5e2c82' }}>
          <div className="notebook-header">
            <strong onClick={() => toggleAulas(index)}>{notebook.titulo}</strong>
            <div>
              <button className="btn btn-sm btn-warning me-2" onClick={() => editNotebook(index)}>
                <i className="bi bi-pencil"></i>
              </button>
              <button className="btn btn-sm btn-danger" onClick={() => deleteNotebook(index)}>
                <i className="bi bi-trash"></i>
              </button>
            </div>
          </div>

          {notebook.expanded && (
            <div className="mt-3">
              <button className="btn btn-sm btn-light text-dark mb-2" onClick={() => showAulaModal(index)}>
                <i className="bi bi-plus-circle me-1"></i> Nova Aula
              </button>
              <ul className="aula-list ps-3">
                {notebook.aulas.map((aula, aulaIndex) => (
                  <li key={aulaIndex}>
                    <button className="btn btn-sm btn-outline-light" onClick={() => goToSubjectPage(aula)}>
                      {aula}
                    </button>
                    <button className="btn btn-sm btn-outline-warning ms-2" onClick={() => editAula(index, aulaIndex)}>
                      <i className="bi bi-pencil"></i>
                    </button>
                    <button className="btn btn-sm btn-outline-danger ms-1" onClick={() => deleteAula(index, aulaIndex)}>
                      <i className="bi bi-trash"></i>
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      ))}

      {/* Notebook Modal */}
      <div className="modal fade" id="notebookModal" tabIndex="-1" aria-hidden="true">
        <div className="modal-dialog">
          <div className="modal-content text-dark">
            <div className="modal-header">
              <h5 className="modal-title">Create New Notebook</h5>
              <button type="button" className="btn-close" data-bs-dismiss="modal"></button>
            </div>
            <div className="modal-body">
              <input
                type="text"
                className="form-control"
                placeholder="Notebook title"
                value={notebookTitle}
                onChange={(e) => setNotebookTitle(e.target.value)}
              />
            </div>
            <div className="modal-footer">
              <button className="btn btn-secondary" data-bs-dismiss="modal">
                Cancel
              </button>
              <button className="btn btn-primary" onClick={createNotebook}>
                Create
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Aula Modal */}
      <div className="modal fade" id="aulaModal" tabIndex="-1" aria-hidden="true">
        <div className="modal-dialog">
          <div className="modal-content text-dark">
            <div className="modal-header">
              <h5 className="modal-title">Create New Aula</h5>
              <button type="button" className="btn-close" data-bs-dismiss="modal"></button>
            </div>
            <div className="modal-body">
              <input
                type="text"
                className="form-control"
                placeholder="Aula title"
                value={aulaTitle}
                onChange={(e) => setAulaTitle(e.target.value)}
              />
            </div>
            <div className="modal-footer">
              <button className="btn btn-secondary" data-bs-dismiss="modal">
                Cancel
              </button>
              <button className="btn btn-primary" onClick={createAula}>
                Add
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Notebooks;
