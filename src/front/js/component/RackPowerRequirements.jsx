import React from 'react'

function RackPowerRequirements({ handleFieldChange, data }) {
  return (
    <>
    <h2 className="mt-4">Requerimiento de energia para el rack</h2>
    <div className="row gx-5">
          <div className="mb-3 me-2 col-lg-4 col-sm-12">
            <label htmlFor="internal_pdu" className="form-label">
              Unidades de Distribución de Energía (PDU):
            </label>
            <input
              type="text"
              className="form-control"
              id="internal_pdu"
              name="internal_pdu"
              value={data.internal_pdu}
              placeholder="Cantidad de regletas"
              onChange={handleFieldChange}
            />
          </div>
          <div className="mb-3 col-lg-3 col-sm-12">
            <label htmlFor="input_connector" className="form-label">
              Tipo de conector del PDU:
            </label>
            <input
              type="text"
              className="form-control"
              id="input_connector"
              name="input_connector"
              value={data.input_connector}
              placeholder="Modelo enchufe"
              onChange={handleFieldChange}
            />
          </div>
          <div className="mb-3 col-lg-2 col-sm-12">
            <label htmlFor="fases" className="form-label">
              Numero de Fases
            </label>
            <input
              type="text"
              className="form-control"
              name="fases"
              id="fases"
              value={data.fases}
              placeholder="Fases para la PDU"
              onChange={handleFieldChange}
            />
          </div>
          <div className="mb-3 col-lg-2 col-sm-12">
            <label htmlFor="output_connector" className="form-label">
              Numero de Tomas PDU
            </label>
            <input
              type="text"
              className="form-control"
              id="output_connector"
              name="output_connector"
              value={data.output_connector}
              placeholder="Cantidad de Tomas"
              onChange={handleFieldChange}
            />
          </div>
          <div className="col-lg-3 col-sm-12 ">
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
          </div>
          </div>
    </>
  )
}

export default RackPowerRequirements