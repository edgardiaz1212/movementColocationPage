import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { Document, Page, PDFViewer } from "react-pdf";

function PDFView() {
  const location = useLocation();
  const [data, setData] = useState(null);

  useEffect(() => {
    // Realiza una solicitud al backend para obtener datos según la URL.
    // Utiliza location.search para obtener parámetros de la URL.
    // Ejemplo: /pdfview?type=equipment&id=1
    const params = new URLSearchParams(location.search);
    const type = params.get("type");
    const id = params.get("id");

    // Realiza una solicitud al backend para obtener datos según el tipo y el ID.
    // Puedes usar fetch o axios aquí.

    // Supongamos que obtienes los datos en formato JSON.
    // Asumiendo que los datos se almacenan en 'data' después de la solicitud.
    // Ejemplo de estructura de datos:
    // const data = { title: "Documento de ejemplo", content: "Contenido del documento..." };

    // Actualiza el estado con los datos obtenidos.
    setData(data);
  }, [location.search]);

  if (!data) {
    return <div>Cargando...</div>;
  }

  return (
    <PDFViewer width="1000" height="600">
      <Document>
        <Page size="LETTER">
          {/* Construye aquí el contenido del PDF utilizando los datos */}
          <div>
            <h1>{data.title}</h1>
            <p>{data.content}</p>
          </div>
        </Page>
      </Document>
    </PDFViewer>
  );
}

export default PDFView;
