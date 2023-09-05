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

export default EditRack