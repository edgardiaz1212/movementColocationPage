import React, { useState, useContext } from "react";
import { Context } from "../store/appContext";
import { Link } from "react-router-dom";
import "../../styles/home.css";

export const Home = () => {
  const { store, actions } = useContext(Context);

  const [selectedContract, setSelectedContract] = useState(""); // Estado para el tipo de servicio seleccionado

  const handleContractChange = (event) => {
    setSelectedContract(event.target.value); // Actualiza el estado con el tipo de servicio seleccionado
  };

  return (
    <div className="container text-center mt-5">
      <h1>Solicitud</h1>

      <div className="container">
        Tipo de Contrato
        <select
          className="form-select"
          aria-label="Default select example"
          onChange={handleContractChange}
        >
          <option value="">Seleccionar Contrato</option>
          <option value="rack">Colocacion en Rack</option>
          <option value="equipment">Colocacion Catalogado</option>
        </select>
      </div>
      <div>Tipo de actividad
	  <select
          className="form-select"
          aria-label="Default select example"
          
        >
          <option value="">Seleccionar servicio</option>
          <option value="instalacion">Instalacion</option>
          <option value="retiro">Retiro</option>
		  <option value="desincorporacion">Desincorporacion</option>
		  <option value="mudanza">Mudanza</option>
        </select>

	  </div>


      {selectedContract === "rack" && (
        <Link to="/rack">
          <button>Agregar Rack</button>
        </Link>
      )}

      {selectedContract === "equipment" && (
        <>
          <Link to="/rack">
            <button>Agregar Rack</button>
          </Link>
          <Link to="/equipment">
            <button>Agregar Equipo</button>
          </Link>
        </>
      )}

      {selectedContract && (
        <div className="m-auto col-4">
          <label htmlFor="finalClient" className="form-label">
            Nombre del Cliente Final
          </label>
          <input
            type="text"
            className="form-control"
            id="finalClient"
            placeholder="Ingrese el nombre del cliente final"
          />
        </div>
      )}

      <p className="alert alert-info">Tu solicitud</p>

      <p>
        This boilerplate comes with lots of documentation:{" "}
        <a href="https://start.4geeksacademy.com/starters/react-flask">
          Read documentation
        </a>
      </p>
    </div>
  );
};
