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
    fields.get("NOMBRE DE LA UNIDAD SOLICITANTE").setText(formData.coordination);
    fields.get("PERSONA RESPONSABLE UNIDAD SOLICITANTE").setText(formData.username);
    fields.get("FECHA DE SOLICITUD").setText(formData.created_at)
    fields.get("NOMBRE DEL CLIENTE FINAL").setText(formData.clientName)
    fields.get("PREVISIÓN DE 5 ANOS DE EQUIPO A INSTALAR").setText(formData.five_years_prevition)
    fields.get("OBSERVACIONES").setText(formData.observations)
    fields.get("Servicio").setText(formData.service)
    fields.get("MARCA").setText(formData.brand)
    fields.get("MODELO").setText(formData.model)
    fields.get("SERIAL").setText(formData.serial)
    fields.get("N/P").setText(formData.number_part)
    fields.get("TIPO DE COMPONENTE").setText(formData.componentType)
    fields.get("GABINETE").setText(formData.has_cabinet)
    fields.get("propio o arrendado").setText(formData.leased)
    fields.get("Número Total de Gabinetes").setText(formData.total_cabinets);
    fields.get("Número Total de Gabinetes").setText(formData.open_closed);
    fields.get("seguridad").setText(formData.security);
    fields.get("Qué tipo de seguridad  y Cuántos").setText(formData.type_security);
    fields.get("EXTRACTORES").setText(formData.has_extractors);
    fields.get("Ubicacion de extractores").setText(formData.extractors_ubication);
    fields.get("MODULAR").setText(formData.modular);
    fields.get("PUERTAS").setText(formData.lateral_doors);
    fields.get("Si es afirmativo indique dónde").setText(formData.lateral_ubication);
    fields.get("Total de unidades de Rack que posee").setText(formData.rack_unit);
    fields.get("De ser varios Racks que posición ocupa u ocupará en la fila").setText(formData.rack_position);
    fields.get("ACCESORIOS").setText(formData.has_accessory);
    fields.get("De ser afirmativo indique").setText(formData.accessory_description);
    fields.get("Alto rack").setText(formData.rack_height);
    fields.get("Ancho rack").setText(formData.rack_width);
    fields.get("Profundo rack").setText(formData.rack_length);
    fields.get("Cantidad de pdu internos").setText(formData.internal_pdu)
    fields.get("Tipo de Toma a la Entrada").setText(formData.input_connector)
    fields.get("N de circuitos o fases que posee").setText(formData.fases)
    fields.get("Nro De Receptáculos").setText(formData.output_connector)
    fields.get("neutro").setText(formData.neutro)
    
  } else {
    // Llena campos específicos para equipment
    fields.get("NOMBRE DE LA UNIDAD SOLICITANTE").setText(formData.rackField1);
    fields.get("PERSONA RESPONSABLE UNIDAD SOLICITANTE").setText(formData.rackField2);
    fields.get("FECHA DE SOLICITUD").setText(formData.currentDate)
    fields.get("NOMBRE DEL CLIENTE FINAL").setText(formData.currentDate)
    fields.get("PREVISIÓN DE 5 ANOS DE EQUIPO A INSTALAR").setText(formData.currentDate)
    fields.get("OBSERVACIONES").setText(formData.currentDate)
    fields.get("Servicio").setText(formData.currentDate)
    fields.get("MARCA").setText(formData.currentDate)
    fields.get("MODELO").setText(formData.currentDate)
    fields.get("SERIAL").setText(formData.currentDate)
    fields.get("N/P").setText(formData.currentDate)
    fields.get("TIPO DE COMPONENTE").setText(formData.currentDate)
    fields.get("Alto equipo").setText(formData.equipmentField1);
    fields.get("Ancho Equipo").setText(formData.equipmentField2);
    fields.get("Profundidad equipo").setText(formData.equipmentField1);
    fields.get("Alto embalaje").setText(formData.equipmentField2)
    fields.get("Ancho embalaje").setText(formData.equipmentField1);
    fields.get("Profundidad embalaje").setText(formData.equipmentField2)
    fields.get("Peso máximo").setText(formData.equipmentField1);
    fields.get("servicio").setText(formData.equipmentField2)
    fields.get("frontal").setText(formData.equipmentField1);
    fields.get("posterior").setText(formData.equipmentField2)
    fields.get("lateral").setText(formData.equipmentField1);
    fields.get("Tipo de anclaje").setText(formData.equipmentField2)
    fields.get("Altura puerta").setText(formData.equipmentField1);
    fields.get("Ancho puerta").setText(formData.equipmentField2)
    fields.get("Inclinacion puerta").setText(formData.equipmentField1);
    fields.get("Ubicación en la fila o Numero de Rack").setText(formData.equipmentField2)
    fields.get("Indicar la posición U que ocupará").setText(formData.equipmentField2)
    fields.get("Total Unidades de rack").setText(formData.equipmentField2)
    fields.get("Tipo de Alimentación ACDC").setText(formData.currentDate)
    fields.get("Tensión de Alimentación Voltios").setText(formData.currentDate)
    fields.get("Potencia consumida por fuente de poder w").setText(formData.currentDate)
    fields.get("Cantidad de Fuentes de Alimentación por equipo").setText(formData.currentDate)
    fields.get("Rango de Temperatura de Operación del Equipo C").setText(formData.currentDate)
    fields.get("Disipación Térmica BTUHr").setText(formData.currentDate)
    fields.get("Disipación Térmica BTUHr").setText(formData.currentDate)
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