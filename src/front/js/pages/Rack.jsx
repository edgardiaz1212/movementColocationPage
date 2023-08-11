import React, { useState } from "react";
import Details from "../component/Details.jsx";
import Observations from "../component/Observations.jsx";
import { Link } from "react-router-dom";

function Rack() {
  const [hasCabinet, setHasCabinet] = useState(true); 
  const [hasExtractors, setHasExtractors] = useState(false);
  const [hasLateralDoors, setHasLateralDoors] = useState(false);
  const [hasAccesories, setHasAccesories] = useState(false);

  const handleHasCabinetChange = (event) => {
    setHasCabinet(event.target.id === "siGabinete");
  };

  const handleHasExtractorsChange = (event) => {
    setHasExtractors(event.target.id === "yesExtractor");
  };

  const handleHasLateralDoorsChange = (event) => {
    setHasLateralDoors(event.target.id === "yesLateralDoors");
  };

  const handleHasAccesoriesChange = (event) => {
    setHasAccesories(event.target.id === "yesAccessories");
  };

  return (
    <>
      <Details />
      <div className=" container ">
        <div className="p-3 mb-2 bg-info">
          <h2>Caracteristicas del Gabinete</h2>
        </div>

        <div className="row">
          <form className="col-4 m-auto ">
            <p>Posee Gabinete ?</p>
            <div className="form-check">
              <input
                className="form-check-input"
                type="radio"
                name="flexRadioOwn"
                id="siGabinete"
                value="siGabinete"
                onChange={handleHasCabinetChange}
              />
              <label className="form-check-label" htmlFor="siGabinete">
                Si
              </label>
            </div>
            <div className="form-check">
              <input
                className="form-check-input"
                type="radio"
                name="flexRadioOwn"
                id="noGabinete"
                value="noGabinete"
                checked={!hasCabinet}
                onChange={handleHasCabinetChange}
              />
              <label className="form-check-label" htmlFor="noGabinete">
                No
              </label>
            </div>
          </form>
          {hasCabinet && (
            <>
              <form className="col-4 m-auto">
                <p>Propio o arrendado ?</p>
                <div className="form-check">
                  <input
                    className="form-check-input"
                    type="radio"
                    name="flexRadioLease"
                    id="noLeased"
                  />
                  <label className="form-check-label" htmlFor="noLeased">
                    Propio
                  </label>
                </div>
                <div className="form-check">
                  <input
                    className="form-check-input"
                    type="radio"
                    name="flexRadioLease"
                    id="leased"
                    checked
                  />
                  <label className="form-check-label" htmlFor="leased">
                    Arrendado
                  </label>
                </div>
              </form>
              <div className="m-auto col-4">
                <label htmlFor="totalGabinetes" className="form-label">
                  Numero Total de Gabinetes
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="totalGabinetes"
                  placeholder="Total de gabinetes que se requiere instalar"
                />
              </div>
              <div className="m-auto col-4">
                <label htmlFor="tipoSeguridad" className="form-label">
                  Qué tipo de seguridad y Cuántos:
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="tipoSeguridad"
                  placeholder="tipo de seguridad y cantidad"
                />
              </div>
              <form className="col-4">
                <p>Posee Extractores ?</p>
                <div className="form-check">
                  <input
                    className="form-check-input"
                    type="radio"
                    name="flexRadioExtractor"
                    id="yesExtractor"
                    onChange={handleHasExtractorsChange}
                  />
                  <label className="form-check-label" htmlFor="yesExtractor">
                    Si
                  </label>
                </div>
                <div className="form-check">
                  <input
                    className="form-check-input"
                    type="radio"
                    name="flexRadioExtractor"
                    id="noExtractor"
                    checked={!hasExtractors}
                    onChange={handleHasExtractorsChange}
                  />
                  <label className="form-check-label" htmlFor="noExtractor">
                    No
                  </label>
                </div>
              </form>
              {hasExtractors && (
                <div className="m-auto col-4">
                  <label htmlFor="extractores" className="form-label">
                    Si la respuesta es SI, Dónde:
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="extractores"
                    placeholder="Introduzca la ubicacion de los extractores"
                  />
                </div>
              )}
              <form className="col-4 m-auto">
                <p>Es Modular ?</p>
                <div className="form-check">
                  <input
                    className="form-check-input"
                    type="radio"
                    name="flexRadioModular"
                    id="yesModular"
                  />
                  <label className="form-check-label" htmlFor="yesModular">
                    Si
                  </label>
                </div>
                <div className="form-check">
                  <input
                    className="form-check-input"
                    type="radio"
                    name="flexRadioModular"
                    id="noModular"
                    checked
                  />
                  <label className="form-check-label" htmlFor="noModular">
                    No
                  </label>
                </div>
              </form>
              <form className="col-4 m-auto">
                <p>Posee Puertas de servicio lateral: ?</p>
                <div className="form-check">
                  <input
                    className="form-check-input"
                    type="radio"
                    name="flexRadioDoors"
                    id="yesLateralDoors"
                    onChange={handleHasLateralDoorsChange}
                  />
                  <label className="form-check-label" htmlFor="yesLateralDoors">
                    Si
                  </label>
                </div>
                <div className="form-check">
                  <input
                    className="form-check-input"
                    type="radio"
                    name="flexRadioDoors"
                    id="noLateralDoors"
                    checked={!hasLateralDoors}
                    onChange={handleHasLateralDoorsChange}
                  />
                  <label className="form-check-label" htmlFor="noLateralDoors">
                    No
                  </label>
                </div>
              </form>
              {hasLateralDoors && (
                <div className="m-auto col-4">
                  <label htmlFor="lateralDoors" className="form-label">
                    Si la respuesta es SI, Dónde:
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="lateralDoors"
                    placeholder="Introduzca la ubicacion de las Puertas de Servicio"
                  />
                </div>
              )}
              <div className="m-auto col-4">
                <label htmlFor="RURack" className="form-label">
                  Total de unidades de Rack
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="RURack"
                  placeholder="Introduzca la cantidad total de Unidades de Rack"
                />
              </div>
              <div className="m-auto col-4">
                <label htmlFor="rackPosition" className="form-label">
                  De ser varios Racks, que posición ocupa u ocupará en la fila
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="rackPosition"
                  placeholder="Introduzca la posicion del rack respecto a los demas"
                />
              </div>
              <form className="m-auto col-4">
                <p>¿Tiene Accesorios Adicionales?</p>
                <div className="form-check">
                  <input
                    className="form-check-input"
                    type="radio"
                    name="flexRadioAccessories"
                    id="yesAccessories"
                    onChange={handleHasAccesoriesChange}
                  />
                  <label className="form-check-label" htmlFor="yesAccessories">
                    Sí
                  </label>
                </div>
                <div className="form-check">
                  <input
                    className="form-check-input"
                    type="radio"
                    name="flexRadioAccessories"
                    id="noAccessories"
                    checked={!hasAccesories}
                    onChange={handleHasAccesoriesChange}
                  />
                  <label className="form-check-label" htmlFor="noAccessories">
                    No
                  </label>
                </div>
              </form>

              {hasAccesories && (
                <div className="m-auto col-4">
                  <label htmlFor="accessoryDescription" className="form-label">
                    Describa los accesorios adicionales:
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="accessoryDescription"
                    placeholder="Descripción de los accesorios adicionales"
                  />
                </div>
              )}
              <div className="row">
                <h4 className="col-3">Dimensiones del Rack</h4>
                <div className="col-6">
                  <div className="m-auto">
                    <label htmlFor="rackWidth" className="form-label">
                      Ancho (en cm):
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="rackWidth"
                      placeholder="Introduzca el ancho del rack"
                    />
                  </div>

                  <div className="m-auto">
                    <label htmlFor="rackLength" className="form-label">
                      Largo (en cm):
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="rackLength"
                      placeholder="Introduzca el largo del rack"
                    />
                  </div>

                  <div className="m-auto">
                    <label htmlFor="rackHeight" className="form-label">
                      Alto (en cm):
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="rackHeight"
                      placeholder="Introduzca el alto del rack"
                    />
                  </div>
                </div>
              </div>
            </>
          )}
        </div>
        <h2 className="mt-4">Requerimiento de energia para el rack</h2>
        <div className="mb-3 col-4">
          <label htmlFor="internalPdu" className="form-label">
            Unidades de Distribución de Energía (PDU) Internas:
          </label>
          <input
            type="text"
            className="form-control"
            id="internalPdu"
            placeholder="Introduzca la cantidad de PDUs internas"
          />
        </div>

        <div className="mb-3 col-4">
          <label htmlFor="phasesPdu" className="form-label">
            Numero de Fases
          </label>
          <input
            type="text"
            className="form-control"
            id="phasesPdu"
            placeholder="Introduzca la cantidad de Fases para la PDU"
          />
        </div>

        <div className="mb-3 col-4">
          <label htmlFor="inputPdu" className="form-label">
            Numero de Tomas
          </label>
          <input
            type="text"
            className="form-control"
            id="inputPdu"
            placeholder="Introduzca la cantidad de Tomas de la PDU"
          />
        </div>
        <form className="col-3 "></form>
        <p>Tiene conexión al neutro?</p>
        <div className="form-check">
          <input
            className="form-check-input"
            type="radio"
            name="flexRadioNeutro"
            id="yesNeutro"
          />
          <label className="form-check-label" htmlFor="yesNeutro">
            Si
          </label>
        </div>
        <div className="form-check">
          <input
            className="form-check-input"
            type="radio"
            name="flexRadioNeutro"
            id="noNeutro"
            checked
          />
          <label className="form-check-label" htmlFor="noDoors">
            No
          </label>
        </div>

        <Observations />
      </div>
      <Link to="/">
      <button>Agregar</button>
      </Link>
    </>
  );
}

export default Rack;
