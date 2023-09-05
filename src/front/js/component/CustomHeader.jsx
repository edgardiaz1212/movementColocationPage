import React from "react";
function CustomHeader() {
    return (
      <div>
        <h1>Formato Solicitud de Adecuación de Espacio</h1>
        <p>Gerencia General Sistemas | Gerencia Data Center Clientes Externos</p>
      </div>
    );
  }
  
  // Luego, en el componente PDFview, reemplaza customText en <Page> con <CustomHeader>:
export default CustomHeader