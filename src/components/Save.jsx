import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";


function Save() {
  const [usuarios, setUsuarios] = useState([]);
  const [busqueda, setBusqueda] = useState("");
  const [seguidores, setSeguidores] = useState({});

  useEffect(() => {
    fetch("https://randomuser.me/api/?results=20")
      .then((res) => res.json())
      .then((data) => {
        setUsuarios(data.results);
      })
      .catch((err) => console.error("Error al cargar API:", err));
  }, []);

  const toggleSeguir = (index) => {
    setSeguidores((prev) => ({
      ...prev,
      [index]: !prev[index],
    }));
  };

  const usuariosFiltrados =
    busqueda.length >= 3
      ? usuarios.filter((u) =>
          `${u.name.first} ${u.name.last}`
            .toLowerCase()
            .startsWith(busqueda.toLowerCase())
        )
      : usuarios;

  return (
    <div className="save-container">
      <div className="save-header">
        <Link to="/" className="save-backLink">
          ←
        </Link>
        <h2>Buscar y Seguir</h2>
      </div>

      <input
        type="text"
        placeholder="Buscar usuario..."
        value={busqueda}
        onChange={(e) => setBusqueda(e.target.value)}
        className="save-input"
      />

      <div className="save-lista">
        {usuariosFiltrados.map((u, index) => (
          <div key={index} className="save-usuario">
            <img
              src={u.picture.thumbnail}
              alt={`${u.name.first} ${u.name.last}`}
              className="save-avatar"
            />
            <span className="save-nombre">
              {u.name.first} {u.name.last}
            </span>
            <button
              onClick={() => toggleSeguir(index)}
              className={`save-boton ${
                seguidores[index] ? "seguido" : "seguir"
              }`}
            >
              {seguidores[index] ? "Seguido" : "Seguir"}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Save;
