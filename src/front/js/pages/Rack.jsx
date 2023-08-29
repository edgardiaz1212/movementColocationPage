import React, { useState, useContext } from "react";
import Details from "../component/Details.jsx";
import Observations from "../component/Observations.jsx";
import { Link } from "react-router-dom";
import { Context } from "../store/appContext";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
function Rack() {

  const { actions } = useContext(Context)
  initialState={
    brand:"",
    model:"",
    serial:"",
    number_part:"",
    componentType:"",
    observations:"",
    five_years_prevition:"",
    has_cabinet: "true",
    leased: "true",
    has_extractors: "true",
    has_accessory: "true",
    total_cabinets: "",
    security: "",
    has_extractors: "true",
    extractors_ubication: "",
    modular: "true",
    lateral_doors: "true",
    lateral_ubication: "",
    rack_unit: "",
    rack_position: "",
    accessory_description: "",
    rack_width: "",
    rack_length: "",
    rack_height: "",
    internal_pdu: "",
    input_connector: "",
    fases: "",
    output_connector: "",
    neutro: "true"
  }

  const [rackData, setRackData] = useState(initialState);

  const handleFieldChange = (event) => {
    const { name, value, type, checked } = event.target;

    setRackData((prevRackData) => ({
      ...prevRackData,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleAddRack = async (selectedContract, selectedService, clientName, username, coordination) => {
    try {
      const formData = new FormData();
      
      formData.append("username", username);
      formData.append("coordination", coordination);
      formData.append("clientName", clientName);
      formData.append("contract", selectedContract);
      formData.append("service", selectedService);
      formData.append("model", rackData.model)
      formData.append("brand", rackData.brand)
      formData.append("serial", rackData.serial)
      formData.append("number_part", rackData.number_part),
      formData.append("componentType",rackData.componentType)
      formData.append("five_years_prevition", rackData.five_years_prevition),
      formData.append("observations", rackData.observations),
      formData.append("has_cabinet", rackData.hascabinet),
      formData.append('leased', rackData.leased),
      formData.append('total_cabinets', rackData.total_cabinets),
      formData.append('open_closed', rackData.open_closed),
      formData.append('security', rackData.security),
      formData.append('type_security', rackData.type_security),
      formData.append('has_extractors', rackData.has_extractors),
      formData.append('extractors_ubication', rackData.extractors_ubication),
      formData.append('modular', rackData.modular),
      formData.append('lateral_doors', rackData.lateral_doors),
      formData.append('lateral_ubication', rackData.lateral_ubication),
      formData.append('rack_unit', rackData.rack_unit),
      formData.append('rack_position', rackData.rack_position),
      formData.append('has_accessory', rackData.has_accessory),
      formData.append('accessory_description', rackData.accessory_description),
      formData.append('rack_width', rackData.rack_width),
      formData.append('rack_length', rackData.rack_length),
      formData.append('rack_height', rackData.rack_height),
      formData.append('internal_pdu', rackData.internal_pdu),
      formData.append('input_connector', rackData.input_connector),
      formData.append('fases', rackData.fases),
      formData.append('output_connector', rackData.output_connector),
      formData.append('neutro', rackData.neutro)
  
      const response = await actions.addRack(formData)
      if (response === 201 || 200) {
        toast.success("Successfully Registered")
        console.log("Registro exitoso")
        //retrasa el cambio a home por 2 segundos
        setTimeout(() => {
          navigate("/consult")
        }, 2000)

      } else {
        toast.error("Error User")

        console.log("Error en el registro de usuario")
      }

    } catch (error) {
      console.log("newrack: ", error)
    }
  };

  return (
    <>
      <form id="rackForm">
        <Details handleFieldChange={handleFieldChange} formData={formData}/>
        <div className=" container ">
          <div className="p-3 mb-2 bg-info">
            <h2>Caracteristicas del Gabinete</h2>
          </div>

          <div className="row">
            <div className="col-4 ">
              <p>Posee Gabinete ?</p>
              <div className="form-check">
                <input
                  className="form-check-input"
                  type="radio"
                  name="has_cabinet"
                  id="siGabinete"
                  value="true"
                  checked={formData.has_cabinet==="true"}
                  onChange={handleFieldChange}
                />
                <label className="form-check-label" htmlFor="siGabinete">
                  Si
                </label>
              </div>
              <div className="form-check">
                <input
                  className="form-check-input"
                  type="radio"
                  name="has_cabinet"
                  id="noGabinete"
                  value="false"
                  checked={formData.has_cabinet==="false"}
                  onChange={handleFieldChange}
                />
                <label className="form-check-label" htmlFor="noGabinete">
                  No
                </label>
              </div>
            </div>
            {formData.has_cabinet === "true" && (
              <>
                <div className="col-4 m-auto">
                  <p>Propio o arrendado ?</p>
                  <div className="form-check">
                    <input
                      className="form-check-input"
                      type="radio"
                      name="leased"
                      id="noLeased"
                      value="false"
                      checked={formData.leased==="false"}
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
                      value="true"
                      checked={formData.leased==="true"}
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
                      value="true"
                      checked={formData.has_extractors==="true"}
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
                      value="false"
                      checked={formData.has_extractors==="false"}
                      onChange={handleFieldChange}
                    />
                    <label className="form-check-label" htmlFor="noExtractor">
                      No
                    </label>
                  </div>
                </div>
                
                  <div className="m-auto col-4">
                    <label htmlFor="extractors_ubication" className="form-label">
                      Si la respuesta es SI, Dónde:
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      name="extractors_ubication"
                      id="extractors_ubication"
                      placeholder="Introduzca la ubicacion de los extractores"
                      onChange={handleFieldChange}
                      disabled={formData.has_extractors==="false"}
                    />
                  </div>
                
                <div className="col-4 m-auto">
                  <p>Es Modular ?</p>
                  <div className="form-check">
                    <input
                      className="form-check-input"
                      type="radio"
                      name="modular"
                      id="yesModular"
                      value="true"
                      checked={formData.modular==="true"}
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
                      value="false"
                      checked={formData.modular==="false"}
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
                      value="true"
                      id="yesLateralDoors"
                      checked={formData.lateral_doors==="true"}
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
                      value="false"
                      id="noLateralDoors"
                      checked={formData.lateral_doors==="false"}
                      onChange={handleFieldChange}
                    />
                    <label className="form-check-label" htmlFor="noLateralDoors">
                      No
                    </label>
                  </div>
                </div>
                
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
                      disabled={formData.lateral_doors==="false"}
                    />
                  </div>
                
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
                      value="true"
                      id="yesAccessories"
                      onChange={handleFieldChange}
                      checked={formData.has_accessory === "true"}
                    />
                    <label className="form-check-label" htmlFor="yesAccessories">
                      Sí
                    </label>
                  </div>
                  <div className="form-check">
                    <input
                      className="form-check-input"
                      type="radio"
                      name="has_accessory"
                      id="noAccessories"
                      value="false"
                      checked={formData.has_accessory === "false"}
                      onChange={handleFieldChange}
                    />
                    <label className="form-check-label" htmlFor="noAccessories">
                      No
                    </label>
                  </div>
                </div>


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
                    disabled={formData.has_accessory === "false"}
                  />
                </div>

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
              value="true"
              checked={formData.neutro==="true"}
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
              value="false"
              checked={formData.neutro==="false"}
              onChange={handleFieldChange}
            />
            <label className="form-check-label" htmlFor="noNeutro">
              No
            </label>
          </div>

          <Observations handleFieldChange={handleFieldChange} formData={formData}/>
        </div>
        <Link to="/consult">
          <button
            onClick={handleAddRack}
            type="button">Agregar</button>
        </Link>
      </form>
    </>
  );
}

export default Rack;
