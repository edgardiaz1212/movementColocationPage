import React, {useContext, useEffect} from "react";
import { Link } from "react-router-dom";
import { Context } from "../store/appContext";
//un useeffect para que se traiga aca los equipos guardados en la base de datos

function Consult ()  {
    const {actions} =useContext(Context)
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