import React from "react";

function Details() {
  return (
    <>
      <div className="p-3 mb-2 bg-info">
        <h2>Datos Generales</h2>
      </div>

      <div className="container row mt-5">
        <h4 className="col-3">Descripcion del equipo</h4>
        <div className="col-6">
          <div className="m-auto">
            <label htmlFor="brand" className="form-label">
              Marca:
            </label>
            <input
              type="text"
              className="form-control"
              id="brand"
              placeholder="Introduzca el ancho del embalaje"
            />
          </div>

          <div className="m-auto">
            <label htmlFor="model" className="form-label">
              Modelo:
            </label>
            <input
              type="text"
              className="form-control"
              id="model"
              placeholder="Introduzca el largo del embalaje"
            />
          </div>

          <div className="m-auto">
            <label htmlFor="serial" className="form-label">
              Serial:
            </label>
            <input
              type="text"
              className="form-control"
              id="serial"
              placeholder="Introduzca el alto del embalaje"
            />
          </div>
          <div className="m-auto">
            <label htmlFor="numberpart" className="form-label">
              Numero de Parte:
            </label>
            <input
              type="text"
              className="form-control"
              id="numberpart"
              placeholder="Introduzca el alto del embalaje"
            />
          </div>
          <div className="m-auto">
            <label htmlFor="componentType" className="form-label">
              Tipod de componente:
            </label>
            <input
              type="text"
              className="form-control"
              id="componentType"
              placeholder="Introduzca el alto del embalaje"
            />
          </div>
        </div>
      </div>
    </>
  );
}

export default Details;
