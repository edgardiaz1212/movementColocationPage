import React, { useEffect, useState, useContext } from "react";
import {PDFDocument, rgb} from 'pdf-lib'
import { PDFViewer,Document, Page } from "@react-pdf/renderer";
import { Context } from "../store/appContext"
import { useParams } from "react-router-dom";

function PDFView({ type }) {
  const { actions, store } = useContext(Context)
  const [filledPdf, setFilledPdf] = useState(null);
  const [data, setData] = useState({})
  const { id } = useParams()
  console.log(data)
  
  
  async function fillPDFWithData(data, rack){
    //Carga de PDF desde el sistema
    const pdfResponse=  await fetch("../../pdf/Formato Adecuación de Espacio FOR-BA7D.pdf")
    //Carga de PDF a PDF-lib
    const pdfBuffer = await pdfResponse.arrayBuffer();

    const pdfDoc =await PDFDocument.load(pdfBuffer)
    //Obtener los campos del formulario del PDF
    const form = pdfDoc.getForm()
    const fields=pdfDoc.getItems()
  
  
  if (rack) {
    // Llena campos específicos para rack
    fields.get("NOMBRE DE LA UNIDAD SOLICITANTE").setText(data.coordination);
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
    // Realiza una solicitud para obtener los datos del equipo con el ID "theid"
    if (id) {
      actions.getRackById(id)
        .then((rackByIdData) => {
          // Establece el estado inicial con los datos del equipo
          setData({
            model: rackByIdData.description.model,
            brand: rackByIdData.description.brand,
            serial: rackByIdData.description.serial,
            number_part: rackByIdData.description.number_part,
            componentType: rackByIdData.description.componentType,
            five_years_prevition: rackByIdData.description.five_years_prevition,
            observations: rackByIdData.description.observations,
            has_cabinet: rackByIdData.has_cabinet,
            leased: rackByIdData.leased,
            equipment_height: rackByIdData.equipment_height,
            total_cabinets: rackByIdData.total_cabinets,
            open_closed: rackByIdData.open_closed,
            security: rackByIdData.security,
            type_security: rackByIdData.type_security,
            has_extractors: rackByIdData.has_extractors,
            extractors_ubication: rackByIdData.extractors_ubication,
            modular: rackByIdData.modular,
            lateral_doors: rackByIdData.lateral_doors,
            lateral_ubication: rackByIdData.lateral_ubication,
            rack_unit: rackByIdData.rack_unit,
            rack_position: rackByIdData.rack_position,
            rack_ubication: rackByIdData.rack_ubication,
            has_accessory: rackByIdData.has_accessory,
            accessory_description: rackByIdData.accessory_description,
            rack_width: rackByIdData.rack_width,
            rack_length: rackByIdData.rack_length,
            rack_height: rackByIdData.rack_height,
            internal_pdu: rackByIdData.internal_pdu,
            input_connector: rackByIdData.input_connector,
            fases: rackByIdData.fases,
            output_connector: rackByIdData.output_connector,
            neutro: rackByIdData.neutro,
            user:rackByIdData.user

          });
        })
        .catch((error) => {
          toast.error(`Error al cargar los datos del equipo: ${error.message}`);
        });
    }
  }, [id, actions]);

  useEffect(() => {
    // Determina si es un rack o equipment y llena el PDF con los datos adecuados.
    if (type === 'rack') {
      fillPDFWithData(data)
      console.log (data)
        .then((pdfBytes) => setFilledPdf(pdfBytes))
        .catch((error) => console.error("Error al llenar el PDF:", error));
    } else if (type === 'equipment') {
      fillPDFWithData(data)
      console.log (data)
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