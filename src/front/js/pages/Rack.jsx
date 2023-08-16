import React, { useState, useContext } from "react";
import Details from "../component/Details.jsx";
import Observations from "../component/Observations.jsx";
import { Link } from "react-router-dom";
import { Context } from "../store/appContext";

function Rack() {

  const { actions } = useContext(Context)

  const [formData, setFormData] = useState({
    hasCabinet: true,
    leased: true,
    hasExtractors: false,
    has_accessory: false,
    total_cabinets: "",
    security: "",
    has_extractors:true,
    extractors_ubication:"",
    modular:"",
    lateral_doors:true,
    lateral_ubication:"",
    rack_unit:"",
    rack_position:"",
    accessory_description:"",
    rack_width:"",
    rack_length:"",
    rack_height:"",
    internal_pdu:"",
    input_connector:"",
    fases:"",
    output_connector:"",
    neutro:true
  });

  const handleFieldChange = (event) => {
    const { name, value, type, checked } = event.target;

    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleAddRack = async (selectedContract, selectedService, clientName) => {
    try {
      const formData = new FormData(document.getElementById("rackForm"));
      formData.append("client", clientName);
      formData.append("contract", selectedContract);
      formData.append("service", selectedService);
      formData.append("model", formData.model)
      formData.append("brand", formData.brand)
      formData.append("serial", formData.serial)
      formData.append("number_part", formData.number_part),
        formData.append("five_years_prevition", formData.five_years_prevition),
        formData.append("observations", formData.observations),
        formData.append("activity", formData.activity),
        formData.append("has_cabinet", formData.hascabinet),
        formData.append('leased', formData.leased),
        formData.append('total_cabinets', formData.total_cabinets),
        formData.append('open_closed', formData.open_closed),
        formData.append('security', formData.security),
        formData.append('type_security', formData.type_security),
        formData.append('has_extractors', formData.has_extractors),
        formData.append('extractors_ubication', formData.extractors_ubication),
        formData.append('modular', formData.modular),
        formData.append('lateral_doors', formData.lateral_doors),
        formData.append('lateral_ubication', formData.lateral_ubication),
        formData.append('rack_unit', formData.rack_unit),
        formData.append('rack_position', formData.rack_position),
        formData.append('has_accessory', formData.has_accessory),
        formData.append('accessory_description', formData.accessory_description),
        formData.append('rack_width', formData.rack_width),
        formData.append('rack_length', formData.rack_length),
        formData.append('rack_height', formData.rack_height),
        formData.append('internal_pdu', formData.internal_pdu),
        formData.append('input_connector', formData.input_connector),
        formData.append('fases', formData.fases),
        formData.append('output_connector', formData.output_connector),
        formData.append('neutro', formData.neutro)

      const response = await actions.addRack(formData)
    } catch (error) {
      console.log("newrack: ", error)

    }
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
            <div className="col-4 m-auto border border-danger ">
              <p>Posee Gabinete ?</p>
              <div className="form-check ">
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
                      onChange={handleFieldChange}
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
                      onChange={handleFieldChange}
                    />
                    <label className="form-check-label" htmlFor="leased">
                      Arrendado
                    </label>
                  </div>
                </div>
                <div className="m-auto col-4">
                  <label htmlFor="total_cabinets" className="form-label">
                    Numero Total de Gabinetes
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="total_cabinets"
                    name="total_cabinets"
                    placeholder="Total de gabinetes que se requiere instalar"
                    onChange={handleFieldChange}
                  />
                </div>
                <div className="m-auto col-4">
                  <label htmlFor="security" className="form-label">
                    Qué tipo de seguridad y Cuántos:
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    name="security"
                    id="security"
                    placeholder="tipo de seguridad y cantidad"
                    onChange={handleFieldChange}
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
                    <label htmlFor="extractors_ubication" className="form-label">
                      Si la respuesta es SI, Dónde:
                    </label>
                    <input
                      type="text"
                      className="div-control"
                      name="extractors_ubication"
                      id="extractors_ubication"
                      placeholder="Introduzca la ubicacion de los extractores"
                      onChange={handleFieldChange}
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
                      onChange={handleFieldChange}
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
                      onChange={handleFieldChange}
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
                      checked={!formData.lateral_doors}
                      onChange={handleFieldChange}
                    />
                    <label className="form-check-label" htmlFor="noLateralDoors">
                      No
                    </label>
                  </div>
                </div>
                {formData.lateral_doors && (
                  <div className="m-auto col-4">
                    <label htmlFor="lateral_ubication" className="form-label">
                      Si la respuesta es SI, Dónde:
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      name='lateral_ubication'
                      id="lateral_ubication"
                      placeholder="Introduzca la ubicacion de las Puertas de Servicio"
                      onChange={handleFieldChange}
                    />
                  </div>
                )}
                <div className="m-auto col-4">
                  <label htmlFor="rack_unit" className="form-label">
                    Total de unidades de Rack
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    name="rack_unit"
                    id="rack_unit"
                    placeholder="Introduzca la cantidad total de Unidades de Rack"
                    onChange={handleFieldChange}
                  />
                </div>
                <div className="m-auto col-4">
                  <label htmlFor="rack_position" className="form-label">
                    De ser varios Racks, que posición ocupa u ocupará en la fila
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="rack_position"
                    name="rack_position"
                    placeholder="Introduzca la posicion del rack respecto a los demas"
                    onChange={handleFieldChange}
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
                      checked={!formData.has_accessory}
                      onChange={handleFieldChange}
                    />
                    <label className="form-check-label" htmlFor="noAccessories">
                      No
                    </label>
                  </div>
                </div>

                {formData.has_accessory && (
                  <div className="m-auto col-4">
                    <label htmlFor="accessory_description" className="form-label">
                      Describa los accesorios adicionales:
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      name="accessory_description"
                      id="accessory_description"
                      placeholder="Descripción de los accesorios adicionales"
                      onChange={handleFieldChange}
                    />
                  </div>
                )}
                <div className="row">
                  <h4 className="col-3">Dimensiones del Rack</h4>
                  <div className="col-6">
                    <div className="m-auto">
                      <label htmlFor="rack_width" className="form-label">
                        Ancho (en cm):
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        name="rack_width"
                        id="rack_width"
                        placeholder="Introduzca el ancho del rack"
                        onChange={handleFieldChange}
                      />
                    </div>

                    <div className="m-auto">
                      <label htmlFor="rack_length" className="form-label">
                        Largo (en cm):
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        name="rack_length"
                        id="rack_length"
                        placeholder="Introduzca el largo del rack"
                        onChange={handleFieldChange}
                      />
                    </div>

                    <div className="m-auto">
                      <label htmlFor="rack_height" className="form-label">
                        Alto (en cm):
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        name="rack_height"
                        id="rack_height"
                        placeholder="Introduzca el alto del rack"
                        onChange={handleFieldChange}
                      />
                    </div>
                  </div>
                </div>
              </>
            )}
          </div>
          <h2 className="mt-4">Requerimiento de energia para el rack</h2>
          <div className="mb-3 col-4">
            <label htmlFor="internal_pdu" className="form-label">
              Unidades de Distribución de Energía (PDU) Internas:
            </label>
            <input
              type="text"
              className="form-control"
              id="internal_pdu"
              name="internal_pdu"
              placeholder="Introduzca la cantidad de PDUs internas"
              onChange={handleFieldChange}
            />
          </div>
          <div className="mb-3 col-4">
            <label htmlFor="input_connector" className="form-label">
              Tipo de conector del PDU:
            </label>
            <input
              type="text"
              className="form-control"
              id="input_connector"
              name="input_connector"
              placeholder="Introduzca tipo de conector"
              onChange={handleFieldChange}
            />
          </div>

          <div className="mb-3 col-4">
            <label htmlFor="fases" className="form-label">
              Numero de Fases
            </label>
            <input
              type="text"
              className="form-control"
              name="fases"
              id="fases"
              placeholder="Introduzca la cantidad de Fases para la PDU"
              onChange={handleFieldChange}
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
              onChange={handleFieldChange}
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
              onChange={handleFieldChange}
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
              onChange={handleFieldChange}
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
