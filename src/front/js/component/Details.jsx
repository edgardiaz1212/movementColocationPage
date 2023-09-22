import React from "react";

function Details({handleFieldChange,  data, currentUser}) {
  return (
    <>
      <div className="p-3 titles">
        <h2>DATOS GENERALES</h2>
      </div>

      
        <h4 className="text-center">Descripción del equipo para {currentUser.service}</h4>
       <div className="row gy-4 m-3 justify-content-center"> 
       <div className="col-lg-6 col-sm-8">
          <div className="m-auto">
            <label htmlFor="brand" className="form-label">
              Marca*
            </label>
            <input
              type="text"
              className="form-control"
              id="brand"
              name="brand"
              placeholder="Introduzca la marca"
              value={ data.brand}
              onChange={handleFieldChange}
            />
          </div>

          <div className="m-auto">
            <label htmlFor="model" className="form-label">
              Modelo*:
            </label>
            <input
              type="text"
              className="form-control"
              id="model"
              name="model"
              value={ data.model}
              placeholder="Introduzca el modelo"
              onChange={handleFieldChange}
            />
          </div>

          <div className="m-auto">
            <label htmlFor="serial" className="form-label">
              Serial*:
            </label>
            <input
              type="text"
              className="form-control"
              id="serial"
              name="serial"
              value={ data.serial}
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
              value={ data.number_part}
              placeholder="Introduzca el número de parte"
              onChange={handleFieldChange}
            />
          </div>
          <div className="m-auto">
            <label htmlFor="componentType" className="form-label">
              Tipo de componente*:
            </label>
            <input
              type="text"
              className="form-control"
              id="componentType"
              name="componentType"
              value={ data.componentType}
              placeholder="Introduzca el tipo de componente"
              onChange={handleFieldChange}
            />
          </div>
          
        </div>
      </div>
    </>
  );
}

export default Details;
