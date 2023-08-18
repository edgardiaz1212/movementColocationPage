import React from "react";

function Details({handleFieldChange, formData}) {
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
              name="brand"
              placeholder="Introduzca la marca"
              value={formData.brand}
              onChange={handleFieldChange}
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
              name="model"
              value={formData.model}
              placeholder="Introduzca el modelo"
              onChange={handleFieldChange}
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
              name="serial"
              value={formData.serial}
              placeholder="Introduzca el serial"
              onChange={handleFieldChange}
            />
          </div>
          <div className="m-auto">
            <label htmlFor="numberpart" className="form-label">
              Numero de Parte:
            </label>
            <input
              type="text"
              className="form-control"
              id="number_part"
              name="number_part"
              value={formData.number_part}
              placeholder="Introduzca el número de parte"
              onChange={handleFieldChange}
            />
          </div>
          <div className="m-auto">
            <label htmlFor="componentType" className="form-label">
              Tipo de componente:
            </label>
            <input
              type="text"
              className="form-control"
              id="componentType"
              name="componentType"
              placeholder="Introduzca el tipo de componente"
            />
          </div>
        </div>
      </div>
    </>
  );
}

export default Details;
