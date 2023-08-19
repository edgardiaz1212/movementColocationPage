import React, { useState, useContext } from "react";
import Details from "../component/Details.jsx";
import Observations from "../component/Observations.jsx";
import { Link } from "react-router-dom";
import { Context } from "../store/appContext";

function Equipment() {
  const { actions, store } = useContext(Context)

  const [formData, setFormData] = useState("")
  const handleFieldChange = (event) => {
    const { name, value, type, checked } = event.target;

    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleAddEquipment = async () => {
    try {
      const formData = new FormData();

      formData.append("clientName", store.clientName);
      formData.append("contract", store.selectedContract);
      formData.append("service", store.selectedService);
      formData.append("model", formData.model)
      formData.append("brand", formData.brand)
      formData.append("serial", formData.serial)
      formData.append("number_part", formData.number_part)
      formData.append("componentType", formData.componentType)
      formData.append("five_years_prevition", formData.five_years_prevition)
      formData.append("observations", formData.observations)
      formData.append("activity", formData.activity)
      formData.append("equipment_width", formData.equipment_width)
      formData.append('equipment_height', formData.equipment_height)
      formData.append('equipment_length', formData.equipment_length)
      formData.append('packaging_width', formData.packaging_width)
      formData.append('packaging_length', formData.packaging_length)
      formData.append('packaging_height', formData.packaging_height)
      formData.append('weight', formData.weight)
      formData.append('anchor', formData.anchor)
      formData.append('service_area', formData.service_area)
      formData.append('service_frontal', formData.service_frontal)
      formData.append('service_back', formData.service_back)
      formData.append('service_lateral', formData.service_lateral)
      formData.append('access_width', formData.access_width)
      formData.append('access_inclination', formData.access_inclination)
      formData.append('access_length', formData.access_length)
      formData.append('rack_number', formData.rack_number)
      formData.append('rack_unit_position', formData.rack_unit_position)
      formData.append('total_rack_units', formData.total_rack_units)
      formData.append('ac_dc', formData.ac_dc)
      formData.append('input_current', formData.input_current)
      formData.append('power', formData.power)
      formData.append('power_supply', formData.power_supply)
      formData.append('operation_temp', formData.operation_temp)
      formData.append('thermal_disipation', formData.thermal_disipation)
      formData.append('power_config', formData.power_config)


      const response = await actions.addEquipment(formData)
    } catch (error) {
      console.log("newEquipment ", error)

    }
  };

  
  return (
    <>
aca {store.clientName}
      <Details handleFieldChange={handleFieldChange} formData={formData} />
      <div className="container">
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
                value={formData.equipment_width}
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
                value={formData.equipment_length}
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
                value={formData.equipment_height}
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
                value={formData.packaging_width}
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
                value={formData.packaging_length}
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
                value={formData.packaging_height}
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
            value={formData.weight}
            placeholder="Introduzca el peso maximo que puede tener"
            onChange={handleFieldChange}
          />
        </div>
        <div className="m-auto col-4">
          <label htmlFor="anchor" className="form-label">
            Tipo de anclaje al rack
          </label>
          <input
            type="text"
            className="form-control"
            id="anchor"
            name="anchor"
            value={formData.anchor}
            placeholder="Introduzca el peso maximo que puede tener"
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
              checked={formData.service_area === "Si"}
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
              checked={formData.service_area === "No"}
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
                checked={formData.service_frontal}
                onChange={handleFieldChange}
                disabled={formData.service_area === "No"}
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
                value={formData.service_back}
                onChange={handleFieldChange}
                disabled={formData.service_area === "No"}
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
                value={formData.service_lateral}
                onChange={handleFieldChange}
                disabled={formData.service_area === "No"}
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
                value={formData.access_length}
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
                value={formData.access_width}
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
                value={formData.access_inclination}
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
            value={formData.rack_number}
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
            value={formData.rack_unit_position}
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
            value={formData.total_rack_units}
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
          value={formData.ac_dc}
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
          value={formData.input_current}
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
          value={formData.power}
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
          value={formData.power_supply}
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
          value={formData.operation_temp}
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
          value={formData.thermal_disipation}
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
          value={formData.power_config}
        >
          <option >Seleccione la Correcta</option>
          <option value="1">1</option>
          <option value="2">n+1</option>
          <option value="3">2n+1</option>
          <option value="4">Descrita en observaciones</option>
        </select>
      </div>
      <Observations handleFieldChange={handleFieldChange} formData={formData} />
      <Link to="/">
        <button className="btn btn-primary"
          onClick={handleAddEquipment}
        >Agregar</button>
      </Link>
      </div>
    </>
  );
}

export default Equipment;
