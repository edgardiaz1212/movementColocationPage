import React from 'react'

function RackPowerRequirements({ handleFieldChange, data }) {
  return (
    <>
    <h2 className="mt-4">Requerimiento de energia para el rack</h2>
          <div className="mb-3 col-4">
            <label htmlFor="internal_pdu" className="form-label">
              Unidades de Distribución de Energía (PDU) Internas:
            </label>
            <input
              type="text"
              className="form-control"
              id="internal_pdu"
              name="internal_pdu"
              placeholder="Introduzca la cantidad de PDUs internas"
              onChange={handleFieldChange}
            />
          </div>
          <div className="mb-3 col-4">
            <label htmlFor="input_connector" className="form-label">
              Tipo de conector del PDU:
            </label>
            <input
              type="text"
              className="form-control"
              id="input_connector"
              name="input_connector"
              placeholder="Introduzca tipo de conector"
              onChange={handleFieldChange}
            />
          </div>
          <div className="mb-3 col-4">
            <label htmlFor="fases" className="form-label">
              Numero de Fases
            </label>
            <input
              type="text"
              className="form-control"
              name="fases"
              id="fases"
              placeholder="Introduzca la cantidad de Fases para la PDU"
              onChange={handleFieldChange}
            />
          </div>
          <div className="mb-3 col-4">
            <label htmlFor="output_connector" className="form-label">
              Numero de Tomas
            </label>
            <input
              type="text"
              className="form-control"
              id="output_connector"
              name="output_connector"
              placeholder="Introduzca la cantidad de Tomas de la PDU"
              onChange={handleFieldChange}
            />
          </div>
          <div className="col-3 "></div>
          <p>Tiene conexión al neutro?</p>
          <div className="form-check">
            <input
              className="form-check-input"
              type="radio"
              name="neutro"
              id="yesNeutro"
              value={true}
              checked={data.neutro === true}
              onChange={handleFieldChange}
            />
            <label className="form-check-label" htmlFor="yesNeutro">
              Si
            </label>
          </div>
          <div className="form-check">
            <input
              className="form-check-input"
              type="radio"
              name="neutro"
              id="noNeutro"
              value={false}
              checked={data.neutro === false}
              onChange={handleFieldChange}
            />
            <label className="form-check-label" htmlFor="noNeutro">
              No
            </label>
          </div>
    </>
  )
}

export default RackPowerRequirements