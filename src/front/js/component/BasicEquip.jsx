import React from "react";
import Details from "./Details.jsx";
import Observations from "./Observations.jsx";
import EquipmentFeatures from "./EquipmentFeatures.jsx";
import EquipmentPowerRequeriment from "./EquipmentPowerRequeriment.jsx"


function BasicEquip({handleFieldChange,  data, currentUser}) {
  const isRemovalOrDivestiture = currentUser.service === 'Retiro' || currentUser.service === 'Desincorporacion';
  return (
    <>
     <Details handleFieldChange={handleFieldChange} data={data} />
        <EquipmentFeatures handleFieldChange={handleFieldChange} data={data} currentUser={currentUser}/>
        {!isRemovalOrDivestiture && (
        <EquipmentPowerRequeriment handleFieldChange={handleFieldChange} data={data}/>
        )}
        <Observations  handleFieldChange={handleFieldChange} data={data} />
    </>
  )
}

export default BasicEquip
