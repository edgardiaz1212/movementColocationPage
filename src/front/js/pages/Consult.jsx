import React, { useContext, useEffect } from "react";
import { Link } from "react-router-dom";
import { Context } from "../store/appContext";
//un useeffect para que se traiga aca los equipos guardados en la base de datos

function Consult() {
    const { actions, store } = useContext(Context)
    useEffect(() => {
        // Llamar a las funciones para obtener los datos de los racks y equipos aquí
        actions.getRackByUser();
        actions.getEquipmentByUser();
    }, []);
console.log(store.equipmentsData)
    return (
        <>
            <div>Para el CLIENTE que requiere el SERVICIO respecto al CONTRATO las siguiente planillas de solicitud</div>
            <div className="container ">
                <div className="row border border-black">
                    <h3 className="col-9 border border-black">
                        RACK numero  {store.racksData.map((rack) => (
                            <tr key={rack.id}>
                                <td>{rack.id}</td>

                            </tr>
                        ))}
                        <br />
                        <Link to="/rack"
                            className="btn btn-primary m-1"
                            onClick
                        >Editar
                        </Link> <Link to=""
                            className="btn btn-primary m-1"
                            onClick
                        > Planilla</Link>
                    </h3>
                    <div className="col-4 border border-black">
                        Equipo posicion 1 {store.equipmentsData.map((equipment) => (
                        <tr key={equipment.id}>
                            <td>{equipment.rack_unit_position}</td>
                            <td>{equipment.user.clientName}</td>

                        </tr>
                    ))}<br />
                        <Link to="/equipment"
                            className="btn btn-primary m-1"
                            onClick
                        >Editar
                        </Link> <Link to=""
                            className="btn btn-primary m-1"
                            onClick
                        > Planilla</Link></div>
                    {/* Aqui va un map */}
                </div>
            </div>


            <p>Seleccionar otra actividad</p>
            <Link to="/rack"
                className="btn btn-primary m-1"
                onClick
            >
                Agregar nuevo Rack</Link>
            <Link to="/equipment"
                className="btn btn-primary"
                onClick
            >
                Agregar nuevo Equipo</Link>
            <button>finalizar</button>
        </>)
}
export default Consult