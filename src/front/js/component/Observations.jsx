import React from 'react'

function Observations({ handleFieldChange, data }) {
  return (
    <>
      <div className="input-group mb-3">
        <span className="input-group-text">Observaciones</span>
        <textarea
          className="form-control"
          aria-label="With textarea"
          id="observations"
          name='observations'
          value={ data.observations}
          onChange={handleFieldChange}
        >
        </textarea>
      </div>

      <div className="input-group mb-5">
        <span className="input-group-text">Previsión de 5 anos</span>
        <textarea
          className="form-control"
          aria-label="With textarea"
          id="five_years_prevition"
          name='five_years_prevition'
          value={ data.five_years_prevition}
          onChange={handleFieldChange}
        ></textarea>
      </div>
    </>
  )
}

export default Observations