import React, { useEffect, useState } from "react";
import {PDFdocument, rgb} from 'pdf-lib'

function PDFView() {
  const [filledPdf, setFilledPdf] = useState(null);

  async function fillPDFWithData(formData, isRack){
    //Carga de PDF desde el sistema
    const pdfBuffer= "../../pdf/Formato Adecuación de Espacio FOR-BA7D.pdf"
    //Carga de PDF a PDF-lib
    const pdfDoc =await PDFdocument.load(pdfBuffer)
    //Obtener los campos del formulario del PDF
    const form = pdfDoc.getForm()
    const fields=pdfDoc.getItems()
  console.log (fields)
  
  if (isRack) {
    // Llena campos específicos para rack
    fields.get("rackField1").setText(formData.rackField1);
    fields.get("rackField2").setText(formData.rackField2);
  } else {
    // Llena campos específicos para equipment
    fields.get("equipmentField1").setText(formData.equipmentField1);
    fields.get("equipmentField2").setText(formData.equipmentField2);
  }

  // Genera un nuevo PDF con los datos llenados
  const filledPdfBytes = await pdfDoc.save();

  return filledPdfBytes;
  }



  useEffect(() => {
    // Supongamos que tienes formData y isRack según lo que seleccionó el usuario.
    const formData = /* Obtén los datos de rack o equipment */;
    const isRack = /* Determina si es rack o equipment */;

    // Llena el PDF con los datos y actualiza el estado con el PDF llenado.
    fillPDFWithData(formData, isRack)
      .then((pdfBytes) => setFilledPdf(pdfBytes))
      .catch((error) => console.error("Error al llenar el PDF:", error));
  }, []);

  if (!filledPdf) {
    return <div>Cargando...</div>;
  }

  return (
    <PDFViewer width="1000" height="600">
      <Document file={{ data: filledPdf }}>
        <Page pageNumber={1} />
      </Document>
    </PDFViewer>
  );
}

export default PDFView;