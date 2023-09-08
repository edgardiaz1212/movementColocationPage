import React from 'react'
import Details from "./Details.jsx";
import Observations from "./Observations.jsx";
import CabinetFeatures from './CabinetFeatures.jsx';
import PowerRequirements from './PowerRequirements.jsx';

function BasicRack({handleFieldChange,  data}) {
  return (
    <>
    <Details handleFieldChange={handleFieldChange} data={data} />
        <div className=" container ">
          
          <CabinetFeatures handleFieldChange= {handleFieldChange} data={data} />
          <PowerRequirements handleFieldChange= {handleFieldChange} data={data} />

          <Observations handleFieldChange={handleFieldChange} data={data} />
        </div>
    </>
  )
}

export default BasicRack