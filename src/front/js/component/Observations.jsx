import React from 'react'

function Observations({ handleFieldChange, formData }) {
  return (
    <>
      <div className="input-group">
        <span className="input-group-text">Observaciones</span>
        <textarea
          className="form-control"
          aria-label="With textarea"
          id="observations"
          name='observations'
          value={formData.observations}
          onChange={handleFieldChange}
        >
        </textarea>
      </div>

      <div className="input-group">
        <span className="input-group-text">Prevision de 5 anos</span>
        <textarea
          className="form-control"
          aria-label="With textarea"
          id="five_years_prevition"
          name='five_years_prevition'
          value={formData.five_years_prevition}
          onChange={handleFieldChange}
        ></textarea>
      </div>
    </>
  )
}

export default Observations