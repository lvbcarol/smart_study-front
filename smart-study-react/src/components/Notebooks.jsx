// src/components/Notebooks.jsx
import React, { useEffect, useState } from "react";
import API from "../api";
import { useNavigate } from "react-router-dom";

function Notebooks() {
  const navigate = useNavigate();
  const [notebooks, setNotebooks] = useState([]);
  const [titulo, setTitulo] = useState("");

  const user = JSON.parse(localStorage.getItem("user"));
  const token = localStorage.getItem("token");

  useEffect(() => {
    if (!token || !user) {
      navigate("/");
      return;
    }

    API.get("/notebooks", {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((res) => setNotebooks(res.data))
      .catch((err) => {
        console.error("Erro ao buscar cadernos:", err);
        alert("Erro ao buscar cadernos.");
      });
  }, [token, user, navigate]);

  const criarNotebook = async (e) => {
    e.preventDefault();
    if (!titulo.trim()) return;

    try {
      const res = await API.post(
        "/notebooks",
        { titulo },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      setNotebooks([...notebooks, res.data]);
      setTitulo("");
    } catch (err) {
      console.error("Erro ao criar notebook:", err);
      alert("Erro ao criar caderno.");
    }
  };

  return (
    <div className="container mt-4">
      <h2 className="mb-4">Meus Cadernos</h2>

      <form onSubmit={criarNotebook} className="d-flex mb-4">
        <input
          type="text"
          className="form-control me-2"
          placeholder="Nome do novo caderno"
          value={titulo}
          onChange={(e) => setTitulo(e.target.value)}
        />
        <button type="submit" className="btn btn-primary">Criar</button>
      </form>

      <div className="row">
        {notebooks.map((notebook) => (
          <div key={notebook._id} className="col-md-4 mb-3">
            <div className="card">
              <div className="card-body">
                <h5 className="card-title">{notebook.titulo}</h5>
                <button
                  className="btn btn-outline-primary"
                  onClick={() => navigate(`/notebooks/${notebook._id}`)}
                >
                  Ver Aulas
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Notebooks;
