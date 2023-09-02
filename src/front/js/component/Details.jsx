import React, { useContexformDatat, useState } from "react";
import { Context } from '../store/appContext'
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function Details() {
  const [descriptionFormData, setDescriptionFormData] = useState({
    brand: "",
    model: "",
    serial_number: "",
    number_part: "",
    componentType: "",
    five_years_prevition: "",
    observations: "",
  });
  
  const handleChange = ({ target }) => {
		setDescriptionFormData({ ...newUser, [target.name]: target.value })
	  };
	
    const handleAddDescription = async()=>{
      try {
        if(!descriptionFormData.componentType || !descriptionFormData.serial || !descriptionFormData.model || !descriptionFormData.brand){}
        console.log("faltan detalles Descripcion")
        toast.error("Llene todos los campos")
        return
      } catch (error) {
        console.log("error al enviar descripcion", error)
      }
    }
  return (
    <>
    <ToastContainer theme="dark" position="top-center" pauseOnFocusLoss={false} autoClose={3000} hideProgressBar />

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
              value={ descriptionFormData.brand}
              onChange={handleChange}
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
              value={ descriptionFormData.model}
              placeholder="Introduzca el modelo"
              onChange={handleChange}
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
              value={ descriptionFormData.serial}
              placeholder="Introduzca el serial"
              onChange={handleChange}
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
              value={ descriptionFormData.number_part}
              placeholder="Introduzca el número de parte"
              onChange={handleChange}
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
              value={ descriptionFormData.componentType}
              placeholder="Introduzca el tipo de componente"
              onChange={handleChange}
            />
          </div>
          <button className="btn btn-primary m-4" 
				onClick
				>Anadir</button>
        </div>
      </div>
    </>
  );
}

export default Details;
