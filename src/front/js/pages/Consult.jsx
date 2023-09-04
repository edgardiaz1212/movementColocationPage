import React, { useContext, useEffect } from "react";
import { Link } from "react-router-dom";
import { Context } from "../store/appContext";
//un useeffect para que se traiga aca los equipos guardados en la base de datos

function Consult() {
    const { actions, store } = useContext(Context);
    useEffect(() => {
        // Llamar a las funciones para obtener los datos de los racks y equipos aquí
        actions.getRackByUser();
        actions.getEquipmentByUser();
        actions.getUserData();
    }, []);

    const isNotCatalog = store.userData.contract === "Colocacion no Catalogado";
    const hasRackData = store.racksData.length > 0;
    const hasEquipmentData = store.equipmentsData.length > 0;

    // Función para obtener los equipos asociados a un rack específico
    const getEquipmentsForRack = (rackNumber) => {
        return store.equipmentsData.filter((equipment) => equipment.rack_number === rackNumber);
    };
    console.log(store.equipmentsData)
    return (
        <>
            <div className="container">
                <h4>Planillas de Solicitud para {store.userData.clientName} en el Contexto del Servicio {store.userData.service} y el Contrato {store.userData.contract}</h4>
                <div className="container ">
                    <div className="row border border-black">

                        {isNotCatalog && (
                            <>
                                {hasRackData ? (
                                    <>
                                        <div className="col-12 border border-danger">
                                            {/* aca un condicion que si es contrato calogado solo muestre el map de los equiops.
                                    otra condicion que si es no catalogado y solo se agrego equipo mostrar un bloque de rack pero con mensaje debe anadir el rack numero x */}
                                            {store.racksData.map((rack) => (
                                                <div key={rack.id}>
                                                    <h2>RACK número {rack.rack_position}</h2>
                                                    <table className="table">
                                                        <thead>
                                                            <tr>
                                                                <th>Rack Position</th>
                                                                {/* Agrega otras columnas de racks aquí */}
                                                            </tr>
                                                            <Link to="/rack" className="btn btn-primary m-1">Editar</Link>
                                                                    <Link to="" className="btn btn-primary m-1">Ver Planilla</Link>
                                                        </thead>
                                                        <tbody>
                                                            {getEquipmentsForRack(rack.rack_position).map((equipment) => (

                                                                <>
                                                                <tr key={equipment.id}>

                                                                    <td>{equipment.rack_number}, {equipment.id}</td>
                                                                    {/* Agrega otras celdas de datos del equipo aquí */}

                                                                </tr>
                                                                    <Link to="/equipment" className="btn btn-primary m-1">Editar</Link>
                                                                    <Link to="" className="btn btn-primary m-1">Ver Planilla</Link>
                                                                </>
                                                            ))}
                                                        </tbody>
                                                    </table>
                                                </div>
                                            ))}
                                        </div>
                                    </>
                                ) : (
                                    <>
                                        <h2>Agrega el rack correspondiente al equipo</h2>
                                        {store.equipmentsData.map((equipment) => (
                                            <>
                                                <tr key={equipment.id}>
                                                    <td>{equipment.rack_number}</td>
                                                </tr>

                                            </>
                                        ))}
                                    </>
                                )}
                            </>)}

                    </div>
                </div>
                <p>Seleccionar otra actividad</p>
                {isNotCatalog && (
                    <Link to="/rack" className="btn btn-primary m-1">Agregar nuevo Rack</Link>
                )}
                <Link to="/equipment" className="btn btn-primary">Agregar nuevo Equipo</Link>
                <button>Finalizar</button>
            </div>
        </>
    );
}

export default Consult;