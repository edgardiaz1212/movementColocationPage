import React from 'react'
import { useNavigate } from 'react-router-dom'

function EditEquipment() {
  const navigate=useNavigate
  const handleEdit=()=>{
    navigate('/consult')
  }
    return (
    <div>EditEquipment</div>
  )
}
<button>Terminar Edicion</button>
export default EditEquipment