import React, { useEffect, useState, useContext } from "react";
import {PDFDocument, rgb} from 'pdf-lib'
import { PDFViewer,Document, Page } from "@react-pdf/renderer";
import { Context } from "../store/appContext"

function PDFView({ type, data }) {
  const { actions, store } = useContext(Context)
  const [filledPdf, setFilledPdf] = useState(null);

  async function fillPDFWithData(formData, isRack){
    //Carga de PDF desde el sistema
    const pdfResponse=  await fetch("../../pdf/Formato Adecuación de Espacio FOR-BA7D.pdf")
    //Carga de PDF a PDF-lib
    const pdfBuffer = await pdfResponse.arrayBuffer();

    const pdfDoc =await PDFDocument.load(pdfBuffer)
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
    // Determina si es un rack o equipment y llena el PDF con los datos adecuados.
    if (type === 'rack') {
      fillPDFWithDataForRack(data)
        .then((pdfBytes) => setFilledPdf(pdfBytes))
        .catch((error) => console.error("Error al llenar el PDF:", error));
    } else if (type === 'equipment') {
      fillPDFWithDataForEquipment(data)
        .then((pdfBytes) => setFilledPdf(pdfBytes))
        .catch((error) => console.error("Error al llenar el PDF:", error));
    }
  }, [type, data]);

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