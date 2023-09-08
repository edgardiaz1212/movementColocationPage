import React from 'react'
import Details from "./Details.jsx";
import Observations from "./Observations.jsx";
import CabinetFeatures from './CabinetFeatures.jsx';
import RackPowerRequirements from './RackPowerRequirements.jsx';

function BasicRack({handleFieldChange,  data, currentUser}) {
  const isRemovalOrDivestiture = currentUser.service === 'Retiro' || currentUser.service === 'Desincorporacion';
  return (
    <>
    <Details handleFieldChange={handleFieldChange} data={data} />
        <div className=" container ">
          
          <CabinetFeatures handleFieldChange= {handleFieldChange} data={data} currentUser={currentUser}/>
          {!isRemovalOrDivestiture &&(
          <RackPowerRequirements handleFieldChange= {handleFieldChange} data={data} />
)}
          <Observations handleFieldChange={handleFieldChange} data={data} />
        </div>
    </>
  )
}

export default BasicRack