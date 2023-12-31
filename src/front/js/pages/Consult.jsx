import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Context } from "../store/appContext";
import Buttons from "../component/Buttons.jsx";
import ExitModal from "../component/ExitModal.jsx";

function Consult() {
    const { actions, store } = useContext(Context);
    useEffect(() => {
        actions.getRackByUser();
        actions.getEquipmentByUser();
        actions.getUserData();
    }, []);

    const isNotCatalog = store.userData.contract === "Colocacion no Catalogado";
    const hasRackData = store.racksData.length > 0;
    const hasEquipmentData = store.equipmentsData.length > 0;

    const getEquipmentsForRack = (rackNumber) => {
        return store.equipmentsData.filter((equipment) => equipment.rack_number === rackNumber);
    };

    // Filtra los equipos que no están asignados a ningún rack
    const equipmentsWithoutRack = store.equipmentsData.filter(
        (equipment) => !equipment.rack_number || !store.racksData.some((rack) => rack.rack_position === equipment.rack_number)
    );


    return (
        <div className="container">
            <h4 className="mb-5 mt-5">Planillas de Solicitud para {store.userData.clientName} en el Contexto del Servicio {store.userData.service} y el Contrato {store.userData.contract}</h4>
            <div className="container mb-3 bg-body text-body">
                <div className="row border border-dark">
                    {isNotCatalog && hasRackData && (
                        <div className="col-12 ">
                            {store.racksData.some((rack) => getEquipmentsForRack(rack.rack_position).length === 0) ? (
                                <div className="alert alert-warning" role="alert">
                                    ¡Advertencia! Hay racks sin equipos asociados.
                                </div>
                            ) : null}
                            {store.racksData.map((rack) => (
                                <div key={rack.id}>
                                    <div className="border-top border-bottom  ">
                                        <h3 >RACK {rack.description.model} posición {rack.rack_ubication}  {rack.rack_position} </h3>
                                        <Buttons editLink={`/edit-rack/${rack.id}`} id={rack.id} type='rack' />
                                    </div>
                                    <table className="table table-striped ">
                                        <thead >
                                            <tr>
                                                <th >Equipos en Rack {rack.rack_ubication} Posición {rack.rack_position}</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {getEquipmentsForRack(rack.rack_position).map((equipment) => (
                                                <>
                                                    <tr key={equipment.id}>
                                                        <td>El componente {equipment.description.componentType} modelo {equipment.description.model}
                                                        <Buttons editLink={`/edit-equipment/${equipment.id}`} id={equipment.id} type="equipment" />
                                                        </td>
                                                    </tr>
                                                </>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                            ))}
                        </div>
                    )}
                    {isNotCatalog && hasEquipmentData && (
                        <div className="col-12 p-2 border-top">
                            {equipmentsWithoutRack.length > 0 && (
                                <>
                                    <div className="alert alert-warning" role="alert">
                                        Estos equipos no están asociados a ningún rack o no hay un rack con su posición correspondiente
                                        {/* {equipmentsWithoutRack
                                        .map((equipment) => equipment.rack_number)
                                        .join(", ")} */}
                                    </div>
                                    <table className="table table-warning table-striped">
                                        <thead >
                                            <tr>
                                                <th>Equipo(s)</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {equipmentsWithoutRack.map((equipment) => (
                                                <tr key={equipment.id}>
                                                    <td>Componente tipo {equipment.description.componentType}, modelo {equipment.description.model} para asociar con rack {equipment.rack_number}
                                                    <Buttons editLink={`/edit-equipment/${equipment.id}`} id={equipment.id} type="equipment" />
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table></>)}
                        </div>
                    )}
                </div>
                {!isNotCatalog && (
                    <div className="col-12">
                        <table className="table table-striped">
                            <thead>
                                <tr>
                                    <th>Equipamiento registrado</th>
                                </tr>
                            </thead>
                            <tbody>
                                {store.equipmentsData.map((equipment) => (
                                    <>
                                        <tr key={equipment.id}>
                                            <td>Componente {equipment.description.componentType}, marca {equipment.description.brand}, modelo {equipment.description.model}
                                            <Buttons editLink={`/edit-equipment/${equipment.id}`} id={equipment.id} type="equipment" />
                                            </td>
                                        </tr>
                                    </>))}
                            </tbody>
                        </table>
                    </div>
                )}
            </div>
            <p>Seleccionar otra actividad</p>
            {isNotCatalog && (
                <Link to="/rack" className="btn btn-primary m-1">
                    Agregar nuevo Rack
                </Link>
            )}
            <Link to="/equipment" className="btn btn-primary">
                Agregar nuevo Equipo
            </Link>
            <button type="button " className="btn btn-secondary m-1" data-bs-toggle="modal" data-bs-target="#exampleModal">
                Finalizar
            </button>
            <ExitModal />
        </div>
    );
}

export default Consult;
