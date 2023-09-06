import React from 'react'
import { useNavigate } from 'react-router-dom'
function EditRack() {
    const navigate=useNavigate
    const handleEdit=()=>{
      navigate('/consult')
    }
    return (
    <div>EditRack</div>
  )
}
<button>Terminar Edicion</button>
export default EditRack