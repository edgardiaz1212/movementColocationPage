import React, { useContext, useState, useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { Context } from '../store/appContext'
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import BasicEquip from '../component/BasicEquip.jsx';


function EditEquipment() {
  const navigate = useNavigate()
  const { actions, store } = useContext(Context)
  const { currentUser } = store
  const [data, setData] = useState({})
  const { id } = useParams()

  
  useEffect(() => {
    // Realiza una solicitud para obtener los datos del equipo con el ID "theid"
    if (id){
      actions.getEquipmentById(id)
      .then((equipmentByIdData) => {
        // Establece el estado inicial con los datos del equipo
        setData({
          model: equipmentByIdData.description.model,
          brand: equipmentByIdData.description.brand,
          serial: equipmentByIdData.description.serial,
          number_part: equipmentByIdData.description.number_part,
          componentType: equipmentByIdData.description.componentType,
          five_years_prevition: equipmentByIdData.description.five_years_prevition,
          observations: equipmentByIdData.description.observations,
          equipment_width: equipmentByIdData.equipment_width,
          equipment_length: equipmentByIdData.equipment_height,
          equipment_height: equipmentByIdData.equipment_height,
          packaging_width: equipmentByIdData.packaging_width,
          packaging_length: equipmentByIdData.packaging_length,
          packaging_height: equipmentByIdData.packaging_height,
          weight: equipmentByIdData.weight,
          anchor_type: equipmentByIdData.anchor_type,
          service_area: equipmentByIdData.service_area,
          service_frontal: equipmentByIdData.service_frontal,
          service_back: equipmentByIdData.service_back,
          service_lateral: equipmentByIdData.service_lateral,
          access_width: equipmentByIdData.access_width,
          access_inclination: equipmentByIdData.access_inclination,
          access_length: equipmentByIdData.access_length,
          rack_number: equipmentByIdData.rack_number,
          rack_unit_position: equipmentByIdData.rack_unit_position,
          total_rack_units: equipmentByIdData.total_rack_units,
          ac_dc: equipmentByIdData.ac_dc,
          input_current: equipmentByIdData.input_current,
          power: equipmentByIdData.power,
          power_supply: equipmentByIdData.power_supply,
          operation_temp: equipmentByIdData.operation_temp,
          thermal_disipation: equipmentByIdData.thermal_disipation,
          power_config: equipmentByIdData.power_config,
          user:equipmentByIdData.user

        });
      })
      .catch((error) => {
        toast.error(`Error al cargar los datos del equipo: ${error.message}`);
      });
    }
  }, [id, actions]);

   const handleEdit = async () => {
    if (!id) {
      toast.error("ID del equipo no válido");
      return;
    }
  
    const response = await actions.editEquipment(data, id)
    
    if (response === 200 || 201) {
      console.log("Equipo anadido")
      navigate('/consult')

    } else {
      toast.error("Error registrando")
    }
  }
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

  return (
    <>
      <ToastContainer theme="dark" position="top-center" pauseOnFocusLoss={false} autoClose={3000} hideProgressBar />
      <div className="container">
        <BasicEquip handleFieldChange={handleFieldChange} data={data} currentUser={{ currentUser }} />

        <button className="btn btn-secondary"
          onClick={handleEdit}>
          Terminar Edicion</button>

      </div>

    </>
  )
}

export default EditEquipment