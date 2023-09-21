import React, { useContext, useState, useEffect } from 'react'
import { useNavigate, useParams, Link } from 'react-router-dom'
import { Context } from '../store/appContext'
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import BasicRack from '../component/BasicRack.jsx';

function EditRack() {
  const navigate = useNavigate
  const { actions, store } = useContext(Context)
  const { currentUser } = store
  const [data, setData] = useState({})
  const { id } = useParams()
  
  useEffect(() => {
    // Realiza una solicitud para obtener los datos del equipo con el ID "theid"
    if (id) {
      actions.getRackById(id)
        .then((rackByIdData) => {
          console.log("equi rac", rackByIdData)
          // Establece el estado inicial con los datos del equipo
          setData({
            model: rackByIdData.description.model,
            brand: rackByIdData.description.brand,
            serial: rackByIdData.description.serial,
            number_part: rackByIdData.description.number_part,
            componentType: rackByIdData.description.componentType,
            five_years_prevition: rackByIdData.description.five_years_prevition,
            observations: rackByIdData.description.observations,
            has_cabinet: rackByIdData.has_cabinet,
            leased: rackByIdData.leased,
            total_cabinets: rackByIdData.total_cabinets,
            open_closed: rackByIdData.open_closed,
            security: rackByIdData.security,
            type_security: rackByIdData.type_security,
            has_extractors: rackByIdData.has_extractors,
            extractors_ubication: rackByIdData.extractors_ubication,
            modular: rackByIdData.modular,
            lateral_doors: rackByIdData.lateral_doors,
            lateral_ubication: rackByIdData.lateral_ubication,
            rack_unit: rackByIdData.rack_unit,
            rack_position: rackByIdData.rack_position,
            rack_ubication: rackByIdData.rack_ubication,
            has_accessory: rackByIdData.has_accessory,
            accessory_description: rackByIdData.accessory_description,
            rack_width: rackByIdData.rack_width,
            rack_length: rackByIdData.rack_length,
            rack_height: rackByIdData.rack_height,
            internal_pdu: rackByIdData.internal_pdu,
            input_connector: rackByIdData.input_connector,
            fases: rackByIdData.fases,
            output_connector: rackByIdData.output_connector,
            neutro: rackByIdData.neutro,
            user:rackByIdData.user

          });
        })
        .catch((error) => {
          toast.error(`Error al cargar los datos del equipo: ${error.message}`);
        });
    }
  }, [id, actions]);

  const handleEdit = async () => {
    if (!id) {
      toast.error("ID del Rack no válido");
      return;
    }

    const response = await actions.editRack(data, id)

    if (response === 200 || 201) {
      console.log("rack anadido")
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
        <BasicRack handleFieldChange={handleFieldChange} data={data} currentUser={{ currentUser }} />
        <Link to="/consult"
          className="btn btn-success"
          onClick={handleEdit}>
          Terminar Ediciones
        </Link>
      </div>
    </>
  )


}
export default EditRack