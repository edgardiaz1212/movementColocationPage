import React from "react";
import { Link } from "react-router-dom";
//un useeffect para que se traiga aca los equipos guardados en la base de datos

function Consult ()  {
    return (
        <>
            <div>Para el cliente se tienen las siguiente planillas de solicitud</div>
    //traerse un listado respecto a esta solicitud y cliente

            <p>Seleccionar otra actividad</p>
            <button>Agregar nuevo rack</button>
            <button>Agregar nuevo Equipo</button>
            <button>finalizar</button>
        </>)
}
export default Consult