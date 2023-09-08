import React, { useContext, useState, useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { Context } from '../store/appContext'
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import BasicEquip from '../component/BasicEquip.jsx';


function EditEquipment() {
  const navigate = useNavigate()
  const { actions, store } = useContext(Context)
  
  const [data, setData] = useState({})
  const { id } = useParams()
 

  console.log("esparam:", id)
  useEffect(() => {
    // Realiza una solicitud para obtener los datos del equipo con el ID "theid"
    actions.getEquipmentById(id)
      .then((equipmentByIdData) => {
        // Establece el estado inicial con los datos del equipo
        setData(equipmentByIdData);
        const initialState = {
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
         
        }

console.log("initial",initialState)
        console.log("por use effect",equipmentByIdData)
      })
      .catch((error) => {
        toast.error(`Error al cargar los datos del equipo: ${error.message}`);
      });
  }, [id, actions]);
  
  console.log("equipo ", data);

  const handleEdit = async () => {
    // await actions.editEquipment(data)
    // .then(() => {
    //     console.log("equipo editado", data);
    //     // navigate('/consult');
    // })
    // .catch((error) => {
    //     toast.error(`Error al editar el equipo: ${error.message}`);
    //     console.log(error, "el error")
    // });
    const formData = new FormData()
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

    const response = await actions.editEquipment(formData)

    if (response === 200 || 201) {
      console.log("Equipo anadido")
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
    <BasicEquip handleFieldChange={handleFieldChange} data={data}/>

      <button
        onClick={handleEdit}>
        Terminar Edicion</button>

    </div>

  </>
)
}

export default EditEquipment