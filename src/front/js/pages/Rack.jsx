import React, { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Context } from "../store/appContext";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import BasicRack from "../component/BasicRack.jsx";
function Rack() {

  const { actions, store } = useContext(Context)
  const currentUserId = store.currentUser.user_id
  const { currentUser } = store
  const navigate = useNavigate()
  const initialState = {
    brand: "",
    model: "",
    serial: "",
    number_part: "",
    componentType: "",
    observations: "",
    five_years_prevition: "",
    has_cabinet: true,
    leased: false,
    total_cabinets: "",
    open_closed: true,
    security: true,
    type_security: "",
    has_extractors: true,
    extractors_ubication: "",
    modular: true,
    lateral_doors: true,
    lateral_ubication: "",
    rack_unit: "",
    rack_position: "",
    rack_ubication: "",
    has_accessory: true,
    accessory_description: "",
    rack_width: "",
    rack_length: "",
    rack_height: "",
    internal_pdu: "",
    input_connector: "",
    fases: "",
    output_connector: "",
    neutro: true,
    user_id: currentUserId
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
    if (!data.brand || !data.model || !data.serial || !data.componentType) {
      console.log("faltan datos importantes")
      toast.error("Llene los campos necesarios")
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
      formData.append('rack_ubication', data.rack_ubication)
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
      formData.append('user_id', currentUserId)

      const response = await actions.addRack(formData)
      if (response.status === 201 || response.status === 200) {
        toast.success("Successfully Registered")
        console.log("Registro exitoso")
        console.log(data)
        setTimeout(() => {
          navigate("/consult")
        }, 2000)

      } else {
        toast.error("Error Registrando Rack")
        console.log("Error en el registro de Rack ", response.status)
      }
    } catch (error) {
      console.log("newRack: ", error)
    }

  };

  return (
    <>
      <ToastContainer theme="dark" position="top-center" pauseOnFocusLoss={false} autoClose={3000} hideProgressBar />
      <div id="rackForm" className="container">
        <BasicRack handleFieldChange={handleFieldChange} data={data} currentUser={currentUser} />

        <button className="btn btn-primary m-2 agregar"
          onClick={handleAddRack}
          type="button">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" aria-hidden="true">
            <path stroke-linecap="round" stroke-linejoin="round" d="M13.5 3H12H8C6.34315 3 5 4.34315 5 6V18C5 19.6569 6.34315 21 8 21H11M13.5 3L19 8.625M13.5 3V7.625C13.5 8.17728 13.9477 8.625 14.5 8.625H19M19 8.625V11.8125" stroke="#fffffff" stroke-width="2"></path>
            <path d="M17 15V18M17 21V18M17 18H14M17 18H20" stroke="#fffffff" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path>
          </svg>
          Agregar
        </button>
      </div>
    </>
  );
}

export default Rack;
