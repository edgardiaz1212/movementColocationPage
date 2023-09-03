import React, { useState, useContext } from "react";
import Details from "../component/Details.jsx";
import Observations from "../component/Observations.jsx";
import { Link, useNavigate } from "react-router-dom";
import { Context } from "../store/appContext";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function Rack() {

  const { actions, store } = useContext(Context)
  const currentUser = store.currentUser.user_id
  const navigate= useNavigate

  const initialState = {
    brand: "",
    model: "",
    serial: "",
    number_part: "",
    componentType: "",
    observations: "",
    five_years_prevition: "",
    has_cabinet: true,
    leased: true,
    total_cabinets: "",
    open_closed: true,
    security: true,
    type_security:"",
    has_extractors: true,
    extractors_ubication: "",
    modular: true,
    lateral_doors: true,
    lateral_ubication: "",
    rack_unit: "",
    rack_position: "",
    has_accessory:true,
    accessory_description: "",
    rack_width: "",
    rack_length: "",
    rack_height: "",
    internal_pdu: "",
    input_connector: "",
    fases: "",
    output_connector: "",
    neutro: true,
    user_id: currentUser
  }

  const [data, setData] = useState(initialState);

  const handleFieldChange = (event) => {
    const { name, type, checked, value } = event.target;
  
    // Manejar los campos de entrada de texto como cadenas
    if (type !== "checkbox" && type !== "radio") {
      setData((prevFormData) => ({
        ...prevFormData,
        [name]: value,
      }));
    } else {
      // Manejar los campos de tipo checkbox y radio como booleanos
      const newValue = type === "checkbox" ? checked : value === "true" ? true : false;
  
      setData((prevFormData) => ({
        ...prevFormData,
        [name]: newValue,
      }));
    }
  };

  const handleAddRack = async () => {
    if (!data.brand) {
      console.log("faltan datos importantes")
      toast.error("Llene todos los campos")
      return
    }
    try {
      const formData = new FormData();

      formData.append("model", data.model)
      formData.append("brand", data.brand)
      formData.append("serial", data.serial)
      formData.append("number_part", data.number_part)
      formData.append("componentType", data.componentType)
      formData.append("five_years_prevition", data.five_years_prevition)
      formData.append("observations", data.observations)
      formData.append("has_cabinet", data.has_cabinet)
      formData.append('leased', data.leased)
      formData.append('total_cabinets', data.total_cabinets)
      formData.append('open_closed', data.open_closed)
      formData.append('security', data.security)
      formData.append('type_security', data.type_security)
      formData.append('has_extractors', data.has_extractors)
      formData.append('extractors_ubication', data.extractors_ubication)
      formData.append('modular', data.modular)
      formData.append('lateral_doors', data.lateral_doors)
      formData.append('lateral_ubication', data.lateral_ubication)
      formData.append('rack_unit', data.rack_unit)
      formData.append('rack_position', data.rack_position)
      formData.append('has_accessory', data.has_accessory)
      formData.append('accessory_description', data.accessory_description)
      formData.append('rack_width', data.rack_width)
      formData.append('rack_length', data.rack_length)
      formData.append('rack_height', data.rack_height)
      formData.append('internal_pdu', data.internal_pdu)
      formData.append('input_connector', data.input_connector)
      formData.append('fases', data.fases)
      formData.append('output_connector', data.output_connector)
      formData.append('neutro', data.neutro)
      formData.append('user_id', currentUser)  

      const response = await actions.addRack(formData)
      if (response === 201 || 200) {
        console.log("Registro exitoso")
      } else {
        toast.error("Error Registrando Rack")
        console.log("Error en el registro de Rack")
      }
    } catch (error) {
      console.log("newRack: ", error)
    }
  };

  return (
    <>
    <ToastContainer theme="dark" position="top-center" pauseOnFocusLoss={false} autoClose={3000} hideProgressBar />
      <div id="rackForm" className="container">
        <Details handleFieldChange={handleFieldChange} data={data} />
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
                  value={true}
                  checked={data.has_cabinet === true}
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
                  value={false}
                  checked={data.has_cabinet === false}
                  onChange={handleFieldChange}
                />
                <label className="form-check-label" htmlFor="noGabinete">
                  No
                </label>
              </div>
            </div>
            {data.has_cabinet === true && (
              <>
                <div className="col-4 m-auto">
                  <p>Propio o arrendado ?</p>
                  <div className="form-check">
                    <input
                      className="form-check-input"
                      type="radio"
                      name="leased"
                      id="noLeased"
                      value={false}
                      checked={data.leased === false}
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
                      value={true}
                      checked={data.leased === true}
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
                <div className="col-4 m-auto">
                  <p>Rack abrierto o Cerrado ?</p>
                  <div className="form-check">
                    <input
                      className="form-check-input"
                      type="radio"
                      name="open_closed"
                      id="open"
                      value={true}
                      checked={data.open_closed === true}
                      onChange={handleFieldChange}
                    />
                    <label className="form-check-label" htmlFor="open">
                      Abierto
                    </label>
                  </div>
                  <div className="form-check">
                    <input
                      className="form-check-input"
                      type="radio"
                      name="open_closed"
                      id="close"
                      value={false}
                      checked={data.open_closed === false}
                      onChange={handleFieldChange}
                    />
                    <label className="form-check-label" htmlFor="close">
                      Cerrado
                    </label>
                  </div>
                </div>
                <div className="col-4 m-auto">
                  <p>Posee seguridad ?</p>
                  <div className="form-check">
                    <input
                      className="form-check-input"
                      type="radio"
                      name="security"
                      id="secured"
                      value={true}
                      checked={data.security === true}
                      onChange={handleFieldChange}
                    />
                    <label className="form-check-label" htmlFor="secured">
                      Si
                    </label>
                  </div>
                  <div className="form-check">
                    <input
                      className="form-check-input"
                      type="radio"
                      name="security"
                      id="nosecured"
                      value={false}
                      checked={data.security === false}
                      onChange={handleFieldChange}
                    />
                    <label className="form-check-label" htmlFor="nosecured">
                      No
                    </label>
                  </div>
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
                    disabled={data.security === false}
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
                      value={true}
                      checked={data.has_extractors === true}
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
                      value={false}
                      checked={data.has_extractors === false}
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
                    disabled={data.has_extractors === false}
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
                      value={true}
                      checked={data.modular === true}
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
                      value={false}
                      checked={data.modular === false}
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
                      value={true}
                      id="yesLateralDoors"
                      checked={data.lateral_doors === true}
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
                      value={false}
                      id="noLateralDoors"
                      checked={data.lateral_doors === false}
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
                    disabled={data.lateral_doors === false}
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
                      value={true}
                      id="yesAccessories"
                      onChange={handleFieldChange}
                      checked={data.has_accessory === true}
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
                      value={false}
                      checked={data.has_accessory === false}
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
                    disabled={data.has_accessory === false}
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
              value={true}
              checked={data.neutro === true}
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
              value={false}
              checked={data.neutro === false}
              onChange={handleFieldChange}
            />
            <label className="form-check-label" htmlFor="noNeutro">
              No
            </label>
          </div>

          <Observations handleFieldChange={handleFieldChange} data={data} />
        </div>
        
          <button className="btn btn-primary m-2"
            onClick={handleAddRack}
            type="button">Agregar
            </button>
        
      </div>
    </>
  );
}

export default Rack;
