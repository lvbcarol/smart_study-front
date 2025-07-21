import React from "react";
import IconButton from "../UI/IconButton";

const NotebookCard = ({
  index,
  notebook,
  notebooks,
  setNotebooks,
  onShowAulaModal,
  onGoToSubject
}) => {
  const toggleAulas = () => {
    const updated = [...notebooks];
    updated[index].expanded = !updated[index].expanded;
    setNotebooks(updated);
  };

  const editNotebook = async () => {
    const newTitle = prompt("Enter new notebook title:", notebook.titulo);
    if (!newTitle) return;
    const res = await fetch(`http://localhost:3000/notebooks/${notebook._id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ titulo: newTitle })
    });
    const updated = await res.json();
    updated.expanded = true;
    const updatedList = [...notebooks];
    updatedList[index] = updated;
    setNotebooks(updatedList);
  };

  const deleteNotebook = async () => {
    const confirmDelete = window.confirm("Delete this notebook?");
    if (!confirmDelete) return;
    await fetch(`http://localhost:3000/notebooks/${notebook._id}`, { method: "DELETE" });
    const updated = notebooks.filter((_, i) => i !== index);
    setNotebooks(updated);
  };

  const editAula = async (aulaIndex) => {
    const newTitle = prompt("New class title:", notebook.aulas[aulaIndex]);
    if (!newTitle) return;
    const res = await fetch(
      `http://localhost:3000/notebooks/${notebook._id}/aulas/${aulaIndex}`,
      {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ titulo: newTitle })
      }
    );
    const updated = await res.json();
    updated.expanded = true;
    const updatedList = [...notebooks];
    updatedList[index] = updated;
    setNotebooks(updatedList);
  };

  const deleteAula = async (aulaIndex) => {
    const confirmDelete = window.confirm("Delete this class?");
    if (!confirmDelete) return;
    const res = await fetch(
      `http://localhost:3000/notebooks/${notebook._id}/aulas/${aulaIndex}`,
      { method: "DELETE" }
    );
    const updated = await res.json();
    updated.expanded = true;
    const updatedList = [...notebooks];
    updatedList[index] = updated;
    setNotebooks(updatedList);
  };

  return (
    <div className="bg-[#5e2c82] rounded-lg p-5 mb-6 shadow-lg">
      <div className="flex justify-between items-center">
        <h2
          className="text-xl font-semibold cursor-pointer"
          onClick={toggleAulas}
        >
          {notebook.titulo}
        </h2>
        <div className="flex gap-2">
          <IconButton color="yellow" onClick={editNotebook} icon="✏️" />
          <IconButton color="red" onClick={deleteNotebook} icon="🗑️" />
        </div>
      </div>

      {notebook.expanded && (
        <div className="mt-4">
          <button
            onClick={onShowAulaModal}
            className="bg-white text-[#5e2c82] px-3 py-1 rounded font-semibold mb-3"
          >
            + Add Class
          </button>
          <ul className="space-y-2">
            {notebook.aulas.map((aula, aulaIndex) => (
              <li key={aulaIndex} className="flex items-center gap-2">
                <button
                  onClick={() => onGoToSubject(aula)}
                  className="text-left text-white hover:underline"
                >
                  {aula}
                </button>
                <IconButton icon="✏️" onClick={() => editAula(aulaIndex)} />
                <IconButton icon="🗑️" onClick={() => deleteAula(aulaIndex)} />
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default NotebookCard;
