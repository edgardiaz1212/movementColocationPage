import React from "react";

function EquipmentPoweRequeriment({ handleFieldChange, data, currentUser }) {
    return (
        <>
            <div className="container row mt-2">
                <div className="p-3 mb-2 titles">
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
        </>
    )
}
export default EquipmentPoweRequeriment