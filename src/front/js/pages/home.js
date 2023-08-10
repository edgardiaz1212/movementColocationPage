import React, { useState, useContext } from "react";
import { Context } from "../store/appContext";
import { Link } from "react-router-dom";
import "../../styles/home.css";

export const Home = () => {
  const { store, actions } = useContext(Context);

  const [selectedService, setSelectedService] = useState(""); // Estado para el tipo de servicio seleccionado

  const handleServiceChange = (event) => {
    setSelectedService(event.target.value); // Actualiza el estado con el tipo de servicio seleccionado
  };

  return (
    <div className="text-center mt-5">
      <h1>Solicitud</h1>
      <div className="container">
        Tipo de servicio
        <select
          className="form-select"
          aria-label="Default select example"
          onChange={handleServiceChange}
        >
          <option value="">Seleccionar servicio</option>
          <option value="rack">Colocacion en Rack</option>
          <option value="equipment">Colocacion Catalogado</option>
        </select>
      </div>

      {selectedService === "rack" && (
        <Link to="/rack">
          <button>Agregar Rack</button>
        </Link>
      )}

      {selectedService === "equipment" && (
        <>
          <Link to="/rack">
            <button>Agregar Rack</button>
          </Link>
          <Link to="/equipment">
            <button>Agregar Equipo</button>
          </Link>
        </>
      )}

      {selectedService && (
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
