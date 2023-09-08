import React from "react";
import Details from "./Details.jsx";
import Observations from "./Observations.jsx";


function BasicEquip({handleFieldChange,  data}) {
  return (
    <>
     <Details handleFieldChange={handleFieldChange} data={data} />
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
                value={data.equipment_height}
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
                value={data.packaging_width}
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
                value={data.packaging_length}
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
                value={data.packaging_height}
                placeholder="Introduzca el alto del embalaje"
                onChange={handleFieldChange}
              />
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
              value={data.weight}
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
              value={data.anchor_type}
              placeholder="Introduzca elemntos fijantes"
              onChange={handleFieldChange}
            />
          </div>
          <div className="m-auto col-4">
            <p>Requiere área de servicio</p>
            <div className="form-check">
              <input
                className="form-check-input"
                type="radio"
                id="serviceAreaYes"
                name="service_area"
                value={true}
                checked={data.service_area === true}
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
                value={false}
                checked={data.service_area === false}
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
                  value={data.service_frontal}
                  //checked
                  onChange={handleFieldChange}
                  disabled={data.service_area === false}
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
                  value={data.service_back}
                  //checked
                  onChange={handleFieldChange}
                  disabled={data.service_area === false}
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
                  value={data.service_lateral}
                  //checked
                  onChange={handleFieldChange}
                  disabled={data.service_area === false}
                />
                <label className="form-check-label" htmlFor="service_lateral">
                  Lateral
                </label>
              </div>
            </div>

          </div>
        </div>
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
                value={data.access_length}
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
                value={data.access_width}
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
                value={data.access_inclination}
                placeholder="Introduzca la inclinacion permitida"
                onChange={handleFieldChange}
              />
            </div>
          </div>
        </div>

        <div className="m-auto col-4">
          <label htmlFor="rack_number" className="form-label">
            Numero de Rack donde estara ubicado
          </label>
          <input
            type="text"
            className="form-control"
            id="rack_number"
            name="rack_number"
            value={data.rack_number}
            placeholder="Introduzca en que rack se colocara"
            onChange={handleFieldChange}
          />
        </div>
        <div className="m-auto col-4">
          <label htmlFor="equip_rack_ubication" className="form-label">
            Numero de Rack donde estara ubicado
          </label>
          <input
            type="text"
            className="form-control"
            id="equip_rack_ubication"
            name="equip_rack_ubication"
            value={data.equip_rack_ubication}
            placeholder="Introduzca ubicacion DC del rack donde se colocara"
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
            value={data.rack_unit_position}
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
            value={data.total_rack_units}
            placeholder="Introduzca unidades de rack del equipo"
            onChange={handleFieldChange}
          />
        </div>

        <div className="container row mt-5">
        <div className="p-3 mb-2 bg-info">
          <h2 className="mt-4">Requerimiento de energia para el Equipo</h2>
          </div>
          <div className="mb-3 col-4">
            <label htmlFor="ac_dc" className="form-label">
              Tipo de Alimentación (AC/DC)
            </label>
            <input
              type="text"
              className="form-control"
              id="ac_dc"
              name="ac_dc"
              value={data.ac_dc}
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
              value={data.input_current}
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
              value={data.power}
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
              value={data.power_supply}
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
              value={data.operation_temp}
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
              value={data.thermal_disipation}
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
              id={data.power_config}
              onChange={handleFieldChange}
              value={data.power_config}
            >
              <option >Seleccione la Correcta</option>
              <option value="1">1</option>
              <option value="2">n+1</option>
              <option value="3">2n+1</option>
              <option value="4">Descrita en observaciones</option>
            </select>
          </div>
        </div>
        <Observations  handleFieldChange={handleFieldChange} data={data} />
    </>
  )
}

export default BasicEquip
