import React, { useState, useContext } from "react";
import Details from "../component/Details.jsx";
import Observations from "../component/Observations.jsx";
import { Link } from "react-router-dom";
import { Context } from "../store/appContext";

function Rack() {
  // const [hasCabinet, setHasCabinet] = useState(true); 
  // const [hasExtractors, setHasExtractors] = useState(false);
  // const [hasLateralDoors, setHasLateralDoors] = useState(false);
  // const [hasAccesories, setHasAccesories] = useState(false);
  const { actions } = useContext(Context)

  // const handleHasCabinetChange = (event) => {
  //   setHasCabinet(event.target.id === "siGabinete");
  // };

  // const handleHasExtractorsChange = (event) => {
  //   setHasExtractors(event.target.id === "yesExtractor");
  // };

  // const handleHasLateralDoorsChange = (event) => {
  //   setHasLateralDoors(event.target.id === "yesLateralDoors");
  // };

  // const handleHasAccesoriesChange = (event) => {
  //   setHasAccesories(event.target.id === "yesAccessories");
  // };
  const [formData, setFormData] = useState({
    hasCabinet: true,
    leased:true,
    hasExtractors: false,
    hasLateralDoors: false,
    hasAccesories: false,
    totalGabinetes: "",
    tipoSeguridad: "",
    // ...otros campos del formulario
  });

  const handleFieldChange = (event) => {
    const { id, value, type, checked } = event.target;

    setFormData((prevFormData) => ({
      ...prevFormData,
      [id]: type === "checkbox" ? checked : value,
    }));
  };

const handleAddRack = () => {
  const formData = new FormData(document.getElementById("rackForm"));
  formData.append("client", actions.store.clientName);
  formData.append("contract", actions.store.selectedContract);
  formData.append("service", actions.store.selectedService);
  actions.addNewRack(formData);
};

  return (
    <>
    <form id="rackForm">
      <Details />
      <div className=" container ">
        <div className="p-3 mb-2 bg-info">
          <h2>Caracteristicas del Gabinete</h2>
        </div>

        <div className="row">
          <div className="col-4 m-auto ">
            <p>Posee Gabinete ?</p>
            <div className="form-check">
              <input
                className="form-check-input"
                type="radio"
                name="hasCabinet"
                id="siGabinete"
                value="siGabinete"
                onChange={handleFieldChange}
              />
              <label className="form-check-label" htmlFor="siGabinete">
                Si
              </label>
            </div>
            <div className="form-check">
              <input
                className="div-check-input"
                type="radio"
                name="hasCabinet"
                id="noGabinete"
                value="noGabinete"
                checked={!formData.hasCabinet}
                onChange={handleFieldChange}
              />
              <label className="form-check-label" htmlFor="noGabinete">
                No
              </label>
            </div>
          </div>
          {formData.hasCabinet && (
            <>
              <div className="col-4 m-auto">
                <p>Propio o arrendado ?</p>
                <div className="form-check">
                  <input
                    className="form-check-input"
                    type="radio"
                    name="leased"
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
                    name="leased"
                    id="leased"
                    checked
                  />
                  <label className="form-check-label" htmlFor="leased">
                    Arrendado
                  </label>
                </div>
              </div>
              <div className="m-auto col-4">
                <label htmlFor="totalGabinetes" className="form-label">
                  Numero Total de Gabinetes
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="totalGabinetes"
                  name="total_cabinets"
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
                  name="security"
                  id="tipoSeguridad"
                  placeholder="tipo de seguridad y cantidad"
                />
              </div>
              <div className="col-4">
                <p>Posee Extractores ?</p>
                <div className="form-check">
                  <input
                    className="form-check-input"
                    type="radio"
                    name="has_extractors"
                    id="yesExtractor"
                    onChange={handleFieldChange}
                  />
                  <label className="form-check-label" htmlFor="yesExtractor">
                    Si
                  </label>
                </div>
                <div className="form-check">
                  <input
                    className="form-check-input"
                    type="radio"
                    name="has_extractors"
                    id="noExtractor"
                    checked={!formData.hasExtractors}
                    onChange={handleFieldChange}
                  />
                  <label className="form-check-label" htmlFor="noExtractor">
                    No
                  </label>
                </div>
              </div>
              {formData.hasExtractors && (
                <div className="m-auto col-4">
                  <label htmlFor="extractores" className="form-label">
                    Si la respuesta es SI, Dónde:
                  </label>
                  <input
                    type="text"
                    className="div-control"
                    name="extractors_ubication"
                    id="extractores"
                    placeholder="Introduzca la ubicacion de los extractores"
                  />
                </div>
              )}
              <div className="col-4 m-auto">
                <p>Es Modular ?</p>
                <div className="form-check">
                  <input
                    className="form-check-input"
                    type="radio"
                    name="modular"
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
                    name="modular"
                    id="noModular"
                    checked
                  />
                  <label className="form-check-label" htmlFor="noModular">
                    No
                  </label>
                </div>
              </div>
              <div className="col-4 m-auto">
                <p>Posee Puertas de servicio lateral: ?</p>
                <div className="form-check">
                  <input
                    className="form-check-input"
                    type="radio"
                    name="lateral_doors"
                    id="yesLateralDoors"
                    onChange={handleFieldChange}
                  />
                  <label className="form-check-label" htmlFor="yesLateralDoors">
                    Si
                  </label>
                </div>
                <div className="div-check">
                  <input
                    className="form-check-input"
                    type="radio"
                    name="lateral_doors"
                    id="noLateralDoors"
                    checked={!formData.hasLateralDoors}
                    onChange={handleFieldChange}
                  />
                  <label className="form-check-label" htmlFor="noLateralDoors">
                    No
                  </label>
                </div>
              </div>
              {formData.hasLateralDoors && (
                <div className="m-auto col-4">
                  <label htmlFor="lateralDoors" className="form-label">
                    Si la respuesta es SI, Dónde:
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    name='lateral_ubication'
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
                  name="rack_unit"
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
                  name="rack_position"
                  placeholder="Introduzca la posicion del rack respecto a los demas"
                />
              </div>
              <div className="m-auto col-4">
                <p>¿Tiene Accesorios Adicionales?</p>
                <div className="form-check">
                  <input
                    className="form-check-input"
                    type="radio"
                    name="has_accessory"
                    id="yesAccessories"
                    onChange={handleFieldChange}
                  />
                  <label className="form-check-label" htmlFor="yesAccessories">
                    Sí
                  </label>
                </div>
                <div className="form-check">
                  <input
                    className="div-check-input"
                    type="radio"
                    name="has_accessory"
                    id="noAccessories"
                    checked={!formData.hasAccesories}
                    onChange={handleFieldChange}
                  />
                  <label className="form-check-label" htmlFor="noAccessories">
                    No
                  </label>
                </div>
              </div>

              {formData.hasAccesories && (
                <div className="m-auto col-4">
                  <label htmlFor="accessoryDescription" className="form-label">
                    Describa los accesorios adicionales:
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    name="accessory_description"
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
                      name="rack_width"
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
                      name="rack_length"
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
                      name="rack_height"
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
            name="internal_pdu"
            placeholder="Introduzca la cantidad de PDUs internas"
          />
        </div>
        <div className="mb-3 col-4">
          <label htmlFor="input_connector" className="form-label">
            Unidades de Distribución de Energía (PDU) Internas:
          </label>
          <input
            type="text"
            className="form-control"
            id="input_connector"
            name="input_connector"
            placeholder="Introduzca tipo de conector"
          />
        </div>

        <div className="mb-3 col-4">
          <label htmlFor="phasesPdu" className="form-label">
            Numero de Fases
          </label>
          <input
            type="text"
            className="form-control"
            name="fases"
            id="phasesPdu"
            placeholder="Introduzca la cantidad de Fases para la PDU"
          />
        </div>

        <div className="mb-3 col-4">
          <label htmlFor="output_connector" className="form-label">
            Numero de Tomas
          </label>
          <input
            type="text"
            className="form-control"
            id="output_connector"
            name="output_connector"
            placeholder="Introduzca la cantidad de Tomas de la PDU"
          />
        </div>
        <div className="col-3 "></div>
        <p>Tiene conexión al neutro?</p>
        <div className="form-check">
          <input
            className="form-check-input"
            type="radio"
            name="neutro"
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
            name="neutro"
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
      <button
      onClick={handleAddRack}
      type="button">Agregar</button>
      </Link>
      </form>
    </>
  );
}

export default Rack;
