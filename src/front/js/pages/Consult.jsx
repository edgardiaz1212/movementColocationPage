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
        actions.getUserData()
    }, []);

console.log(store.userData)
    return (
        <>
        <div className="container">
            <h4>Planillas de Solicitud para {store.userData.clientName} en el Contexto del Servicio {store.userData.service} y el Contrato {store.userData.contract}</h4>
            <div className="container ">
                <div className="row border border-black">
                    <div className="primer col-9 border border-danger">
                       <h2> RACK numero  </h2>
                        {store.racksData.map((rack) => (
                            <div key={rack.id}>
                               {rack.id},
                                {rack.rack_width},,
                                {rack.internal_pdu}--
                                {rack.user.username}+
                                {rack.user.id}

                            </div>
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
                    </div>
                    <div className="segundo col-4 border border-black">
                        Equipo posicion 1 
                        {store.equipmentsData.map((equipment) => (
                        <tr key={equipment.id}>
                            <tr>{equipment.rack_unit_position}</tr>
                            <tr>{equipment.user.clientName}</tr>
                            <tr>{equipment.description.componentType}</tr>

                        </tr>
                    ))}<br />
                        <Link to="/equipment"
                            className="btn btn-primary m-1"
                            onClick
                        >Editar
                        </Link> <Link to=""
                            className="btn btn-primary m-1"
                            onClick
                        > Planilla</Link>
                        </div>
                   
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
            </div>
        </>)
}
export default Consult