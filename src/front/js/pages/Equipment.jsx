import React, { useState, useContext } from "react";
import Details from "../component/Details.jsx";
import Observations from "../component/Observations.jsx";
import { Link } from "react-router-dom";
import { Context } from "../store/appContext";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function Equipment() {
  const { actions, store } = useContext(Context)
  const currentUser = store.currentUser.user_id
  //console.log("current",currentUser)

  const initialState = {
    // model: "",
    // brand: "",
    // serial: "",
    // number_part: "",
    // componentType: "",
    // five_years_prevition: "",
    // observations: "",
    equipment_width: "",
    equipment_length: "",
    equipment_height: "",
    packaging_width: "",
    packaging_length: "",
    packaging_height: "",
    weight: "",
    anchor_type: "",
    service_area: "Si",
    service_frontal: "",
    service_back: "",
    service_lateral: "",
    access_width: "",
    access_inclination: "",
    access_length: "",
    rack_number: "",
    rack_unit_position: "",
    total_rack_units: "",
    ac_dc: "",
    input_current: "",
    power: "",
    power_supply: "",
    operation_temp: "",
    thermal_disipation: "",
    power_config: "",
    user_id:currentUser
  }
  const [data, setData] = useState(initialState)

  const handleFieldChange = (event) => {
    const { name, type, value, checked } = event.target;
        setData((prevData) => ({ //Objeto de datos del formulario actual antes de que se realice el cambio
      ...prevData, // copia del estado para no modificar el estado existente
      [name]: type === "checkbox" ? checked : value, // Si el campo es una casilla de verificación, se usa el valor de checked para determinar si está marcado o no.
    }));
  };

  const handleAddEquipment = async () => {
    if ( !data.equipment_width || !data.brand) {
      console.log("faltan datos importantes")
      toast.error("Llene todos los campos")
      return
    }
    console.log(data)
    try {
      const formData = new FormData();

      // formData.append("model", data.model)
      // formData.append("brand", data.brand)
      // formData.append("serial", data.serial)
      // formData.append("number_part", data.number_part)
      // formData.append("componentType", data.componentType)
      // formData.append("five_years_prevition", data.five_years_prevition)
      // formData.append("observations", data.observations)
      formData.append("equipment_width", data.equipment_width)
      formData.append('equipment_height', data.equipment_height)
      formData.append('equipment_length', data.equipment_length)
      formData.append('packaging_width', data.packaging_width)
      formData.append('packaging_length', data.packaging_length)
      formData.append('packaging_height', data.packaging_height)
      formData.append('weight', data.weight)
      formData.append('anchor_type', data.anchor_type)
      formData.append('service_area', data.service_area)
      formData.append('service_frontal', data.service_frontal)
      formData.append('service_back', data.service_back)
      formData.append('service_lateral', data.service_lateral)
      formData.append('access_width', data.access_width)
      formData.append('access_inclination', data.access_inclination)
      formData.append('access_length', data.access_length)
      formData.append('rack_number', data.rack_number)
      formData.append('rack_unit_position', data.rack_unit_position)
      formData.append('total_rack_units', data.total_rack_units)
      formData.append('ac_dc', data.ac_dc)
      formData.append('input_current', data.input_current)
      formData.append('power', data.power)
      formData.append('power_supply', data.power_supply)
      formData.append('operation_temp', data.operation_temp)
      formData.append('thermal_disipation', data.thermal_disipation)
      formData.append('power_config', data.power_config)
      formData.append('user_id', currentUser)

      const response = await actions.addEquipment(formData)

      if (response === 200 || 201) {
        toast.success("Datos Guardados con Exito")
        setTimeout(() => {
          console.log("siguiente paso");
        }, 3000);

        // const equipmentId = response.data.equipment_id
        // await actions.addEquipmentToUser(store.currentUser.id, equipmentId)
      } else {
        toast.error("Error registrando")
      }
    } catch (error) {
      console.log("newEquipment ", error)

    }
  };

  return (
    <>
      <ToastContainer theme="dark" position="top-center" pauseOnFocusLoss={false} autoClose={3000} hideProgressBar />


      <div className="container">
        <Details 
        // handleFieldChange={handleFieldChange} data={data} 
        />
        <div className="p-3 mb-2 bg-info">
          <h2>ESPECIFICACIONES FÍSICAS DEL EQUIPO</h2>
        </div>
        <div className="container row">
          <h4 className="col-3">Dimensiones del Equipo</h4>
          <div className="col-6">
            <div className="m-auto">
              <label htmlFor="equipment_width" className="form-label">
                Ancho (en cm):
              </label>
              <input
                type="text"
                className="form-control"
                id="equipment_width"
                name="equipment_width"
                value={data.equipment_width}
                placeholder="Introduzca el ancho del equipo"
                onChange={handleFieldChange}
              />
            </div>

            <div className="m-auto">
              <label htmlFor="equipment_length" className="form-label">
                Largo (en cm):
              </label>
              <input
                type="text"
                className="form-control"
                id="equipment_length"
                name="equipment_length"
                value={data.equipment_length}
                placeholder="Introduzca el largo del equipo"
                onChange={handleFieldChange}
              />
            </div>

            <div className="m-auto">
              <label htmlFor="equipment_height" className="form-label">
                Alto (en cm):
              </label>
              <input
                type="text"
                className="form-control"
                id="equipment_height"
                name="equipment_height"
                value={ data.equipment_height}
                placeholder="Introduzca el alto del equipo"
                onChange={handleFieldChange}
              />
            </div>
          </div>
        </div>

        <div className="container row mt-5">
          <h4 className="col-3">Dimensiones de la caja del equipo</h4>
          <div className="col-6">
            <div className="m-auto">
              <label htmlFor="packaging_width" className="form-label">
                Ancho (en cm):
              </label>
              <input
                type="text"
                className="form-control"
                id="packaging_width"
                name="packaging_width"
                value={ data.packaging_width}
                placeholder="Introduzca el ancho del embalaje"
                onChange={handleFieldChange}
              />
            </div>

            <div className="m-auto">
              <label htmlFor="packaging_length" className="form-label">
                Largo (en cm):
              </label>
              <input
                type="text"
                className="form-control"
                id="packaging_length"
                name="packaging_length"
                value={ data.packaging_length}
                placeholder="Introduzca el largo del embalaje"
                onChange={handleFieldChange}
              />
            </div>

            <div className="m-auto">
              <label htmlFor="packaging_height" className="form-label">
                Alto (en cm):
              </label>
              <input
                type="text"
                className="form-control"
                id="packaging_height"
                name="packaging_height"
                value={ data.packaging_height}
                placeholder="Introduzca el alto del embalaje"
                onChange={handleFieldChange}
              />
            </div>
          </div>
        </div>
        <div className="m-auto col-4">
          <label htmlFor="weight" className="form-label">
            Peso Maximo del equipo
          </label>
          <input
            type="text"
            className="form-control"
            id="weight"
            name="weight"
            value={ data.weight}
            placeholder="Introduzca el peso maximo que puede tener"
            onChange={handleFieldChange}
          />
        </div>
        <div className="m-auto col-4">
          <label htmlFor="anchor_type" className="form-label">
            Tipo de anclaje al rack
          </label>
          <input
            type="text"
            className="form-control"
            id="anchor_type"
            name="anchor_type"
            value={ data.anchor_type}
            placeholder="Introduzca elemntos fijantes"
            onChange={handleFieldChange}
          />
        </div>
        <form className="m-auto col-4">
          <p>Requiere área de servicio</p>
          <div className="form-check">
            <input
              className="form-check-input"
              type="radio"
              id="serviceAreaYes"
              name="service_area"
              value="Si"
              checked={ data.service_area === "Si"}
              onChange={handleFieldChange}
            />
            <label className="form-check-label" htmlFor="serviceAreaYes">
              Sí
            </label>
          </div>
          <div className="form-check">
            <input
              className="form-check-input"
              type="radio"
              name="service_area"
              id="serviceAreaNo"
              value="No"
              checked={ data.service_area === "No"}
              onChange={handleFieldChange}
            />
            <label className="form-check-label" htmlFor="serviceAreaNo">
              No
            </label>
          </div>

          <div className="container">
            Ubicacion area de servivio
            <div className="form-check">
              <input
                className="form-check-input"
                type="checkbox"
                name="service_frontal"
                id="service_frontal"
                checked={ data.service_frontal}
                onChange={handleFieldChange}
                disabled={ data.service_area === "No"}
              />
              <label className="form-check-label" htmlFor="service_frontal">
                Frontal
              </label>
            </div>
            <div className="form-check">
              <input
                className="form-check-input"
                type="checkbox"
                name="service_back"
                id="service_back"
                value={ data.service_back}
                onChange={handleFieldChange}
                disabled={ data.service_area === "No"}
              />
              <label className="form-check-label" htmlFor="service_back">
                Posterior
              </label>
            </div>
            <div className="form-check">
              <input
                className="form-check-input"
                type="checkbox"
                name="service_lateral"
                id="service_lateral"
                value={ data.service_lateral}
                onChange={handleFieldChange}
                disabled={ data.service_area === "No"}
              />
              <label className="form-check-label" htmlFor="service_lateral">
                Lateral
              </label>
            </div>
          </div>
        </form>

        <div className="container row">
          <h4 className="col-3">Dimensiones Requeridas ruta de acceso</h4>
          <div className="col-6">
            <div className="m-auto">
              <label htmlFor="access_length" className="form-label">
                Altura minima puerta (en cm):
              </label>
              <input
                type="text"
                className="form-control"
                id="access_length"
                name="access_length"
                value={ data.access_length}
                placeholder="Introduzca altura minima para el acceso"
                onChange={handleFieldChange}
              />
            </div>

            <div className="m-auto">
              <label htmlFor="access_width" className="form-label">
                Ancho (en cm):
              </label>
              <input
                type="text"
                className="form-control"
                id="access_width"
                name="access_width"
                value={ data.access_width}
                placeholder="Introduzca el ancho para el acceso"
                onChange={handleFieldChange}
              />
            </div>

            <div className="m-auto">
              <label htmlFor="access_inclination" className="form-label">
                Inclinacion :
              </label>
              <input
                type="text"
                className="form-control"
                id="access_inclination"
                name="access_inclination"
                value={ data.access_inclination}
                placeholder="Introduzca la inclinacion permitida"
                onChange={handleFieldChange}
              />
            </div>
          </div>
        </div>

        <div className="m-auto col-4">
          <label htmlFor="rack_number" className="form-label">
            Ubicacion, Rack donde estara ubicado
          </label>
          <input
            type="text"
            className="form-control"
            id="rack_number"
            name="rack_number"
            value={ data.rack_number}
            placeholder="Introduzca en que rack se colocara"
            onChange={handleFieldChange}
          />
        </div>

        <div className="m-auto col-4">
          <label htmlFor="rack_unit_position" className="form-label">
            Las unidades de rack que ocupara
          </label>
          <input
            type="text"
            className="form-control"
            id="rack_unit_position"
            name="rack_unit_position"
            value={ data.rack_unit_position}
            placeholder="Introduzca las unidade de rack"
            onChange={handleFieldChange}
          />
        </div>

        <div className="m-auto col-4">
          <label htmlFor="total_rack_units" className="form-label">
            Total de unidades de Rack
          </label>
          <input
            type="text"
            className="form-control"
            id="total_rack_units"
            name="total_rack_units"
            value={ data.total_rack_units}
            placeholder="Introduzca unidades de rack del equipo"
            onChange={handleFieldChange}
          />
        </div>


        <h2 className="mt-4">Requerimiento de energia para el Equipo</h2>
        <div className="mb-3 col-4">
          <label htmlFor="ac_dc" className="form-label">
            Tipo de Alimentación (AC/DC)
          </label>
          <input
            type="text"
            className="form-control"
            id="ac_dc"
            name="ac_dc"
            value={ data.ac_dc}
            placeholder="Introduzca el valor"
            onChange={handleFieldChange}
          />
        </div>

        <div className="mb-3 col-4">
          <label htmlFor="input_current" className="form-label">
            Tensión de Alimentación (Voltios)
          </label>
          <input
            type="text"
            className="form-control"
            id="input_current"
            name="input_current"
            value={ data.input_current}
            placeholder="Introduzca el valor"
            onChange={handleFieldChange}
          />
        </div>

        <div className="mb-3 col-4">
          <label htmlFor="power" className="form-label">
            Potencia consumida por fuente de poder (w):
          </label>
          <input
            type="text"
            className="form-control"
            id="power"
            name="power"
            value={ data.power}
            placeholder="Introduzca el valor en watts"
            onChange={handleFieldChange}
          />
        </div>

        <div className="mb-3 col-4">
          <label htmlFor="power_supply" className="form-label">
            Cantidad de Fuentes de Alimentación por equipo
          </label>
          <input
            type="text"
            className="form-control"
            id="power_supply"
            name="power_supply"
            value={ data.power_supply}
            placeholder="Introduzca la cantidad de alimentacion"
            onChange={handleFieldChange}
          />
        </div>

        <div className="mb-3 col-4">
          <label htmlFor="operation_temp" className="form-label">
            Rango de Temperatura de Operación del Equipo (°C)
          </label>
          <input
            type="text"
            className="form-control"
            id="operation_temp"
            name="operation_temp"
            value={ data.operation_temp}
            placeholder="Introduzca el rango de Temp"
            onChange={handleFieldChange}
          />
        </div>

        <div className="mb-3 col-4">
          <label htmlFor="thermal_disipation" className="form-label">
            Disipación Térmica (BTU-Hr)
          </label>
          <input
            type="text"
            className="form-control"
            id="thermal_disipation"
            name="thermal_disipation"
            value={ data.thermal_disipation}
            placeholder="Introduzca el valor en BTU-hr"
            onChange={handleFieldChange}
          />
        </div>
        <div>
          Configuración de Fuentes de Alimentación (1, n+1, 2n+1)
          <select
            className="form-select"
            aria-label="Default select example"
            name="power_config"
            onChange={handleFieldChange}
            value={ data.power_config}
          >
            <option >Seleccione la Correcta</option>
            <option value="1">1</option>
            <option value="2">n+1</option>
            <option value="3">2n+1</option>
            <option value="4">Descrita en observaciones</option>
          </select>
        </div>
        {/* <Observations  
         handleFieldChange={handleFieldChange} data={data} 
         /> */}
        <Link to="/consult">
          <button className="btn btn-primary"
            onClick={handleAddEquipment}
          >Agregar</button>
        </Link>
      </div>

    </>
  );
}

export default Equipment;
