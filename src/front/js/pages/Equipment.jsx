import React, { useState, useContext, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Context } from "../store/appContext";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import BasicEquip from "../component/BasicEquip.jsx";

function Equipment() {
  const { actions, store } = useContext(Context)
  const currentUserId = store.currentUser.user_id
  const { currentUser } = store
  const navigate = useNavigate()
  const initialState = {
    model: "",
    brand: "",
    serial: "",
    number_part: "",
    componentType: "",
    five_years_prevition: "",
    observations: "",
    equipment_width: "",
    equipment_length: "",
    equipment_height: "",
    packaging_width: "",
    packaging_length: "",
    packaging_height: "",
    weight: "",
    anchor_type: "",
    service_area: false,
    service_frontal: false,
    service_back: false,
    service_lateral: false,
    access_width: "",
    access_inclination: "",
    access_length: "",
    rack_number: "",
    rack_unit_position: "",
    total_rack_units: "",
    ac_dc: "",
    input_current: "",
    power: "",
    power_supply: "",
    operation_temp: "",
    thermal_disipation: "",
    power_config: "",
    user_id: currentUserId
  }
  const [data, setData] = useState(initialState)
  const [isAdding, setIsAdding] = useState(false)
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

  const handleAddEquipment = async () => {
    if (!data.brand || !data.model || !data.serial || !data.componentType) {
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
      formData.append("equipment_width", data.equipment_width)
      formData.append('equipment_height', data.equipment_height)
      formData.append('equipment_length', data.equipment_length)
      formData.append('packaging_width', data.packaging_width)
      formData.append('packaging_length', data.packaging_length)
      formData.append('packaging_height', data.packaging_height)
      formData.append('weight', data.weight)
      formData.append('anchor_type', data.anchor_type)
      formData.append("service_area", data.service_area);
      formData.append("service_frontal", data.service_frontal);
      formData.append("service_back", data.service_back);
      formData.append("service_lateral", data.service_lateral);
      formData.append('access_width', data.access_width)
      formData.append('access_inclination', data.access_inclination)
      formData.append('access_length', data.access_length)
      formData.append('rack_number', data.rack_number)
      formData.append('rack_unit_position', data.rack_unit_position)
      formData.append('total_rack_units', data.total_rack_units)
      formData.append('ac_dc', data.ac_dc)
      formData.append('input_current', data.input_current)
      formData.append('power', data.power)
      formData.append('power_supply', data.power_supply)
      formData.append('operation_temp', data.operation_temp)
      formData.append('thermal_disipation', data.thermal_disipation)
      formData.append('power_config', data.power_config)
      formData.append('user_id', currentUserId)

      const response = await actions.addEquipment(formData)

      if (response.status === 201 || response.status === 200) {
        toast.success("Equipo registrado")
        console.log("Equipo anadido")
        setTimeout(() => {
          navigate("/consult")
        }, 1000)
      } else {
        toast.error("Error registrando")
      }
    } catch (error) {
      console.log("newEquipment ", error)
    }
  };

  return (
    <>
      <ToastContainer theme="dark" position="top-center" pauseOnFocusLoss={false} autoClose={3000} hideProgressBar />
      <div className="container">
        <BasicEquip handleFieldChange={handleFieldChange} data={data} currentUser={currentUser} isAdding={isAdding} />

        <button className="btn btn-primary m-2 agregar"
          onClick={() => {
            handleAddEquipment();
            setIsAdding(true); // Establecer isAdding en true al hacer clic en el botón
          }}
        >
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" aria-hidden="true">
            <path stroke-linecap="round" stroke-linejoin="round" d="M13.5 3H12H8C6.34315 3 5 4.34315 5 6V18C5 19.6569 6.34315 21 8 21H11M13.5 3L19 8.625M13.5 3V7.625C13.5 8.17728 13.9477 8.625 14.5 8.625H19M19 8.625V11.8125" stroke="#fffffff" stroke-width="2"></path>
            <path d="M17 15V18M17 21V18M17 18H14M17 18H20" stroke="#fffffff" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path>
          </svg>
          Agregar</button>

      </div>

    </>
  );
}

export default Equipment;
