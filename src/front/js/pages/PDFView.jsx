import React, { useEffect, useState, useContext } from "react";
import { PDFDocument, rgb } from 'pdf-lib'
import { PDFViewer, Document, Page } from "@react-pdf/renderer";
import { Context } from "../store/appContext"
import { useParams } from "react-router-dom";
import PDfBase from "../../pdf/FOR BA7D ED5.pdf"

function PDFView() {
  const { actions, store } = useContext(Context)
  const [filledPdf, setFilledPdf] = useState(null);
  const [data, setData] = useState({})
  const { id, type } = useParams()


  console.log(data)

  useEffect(() => {
    // Realiza una solicitud para obtener los datos del equipo con el ID "theid"
    if (id) {

      (async () => {
        const pdfBuffer = await fetch(PDfBase).then((response) => response.arrayBuffer());
        const currentUrl = window.location.href
        const pdfDoc = await PDFDocument.load(pdfBuffer, {
          updateFieldFlags: false, // Set this option to false
          docBaseUrl: currentUrl // Set your base URL here
        });
        const form = pdfDoc.getForm();
        console.log(currentUrl)
        // Obtener y llenar campos comunes a ambos tipos de equipo

        // Dependiendo del tipo, llenar campos específicos
        if (type === 'rack') {
          actions.getRackById(id)
            .then(async (rackByIdData) => {
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
                user: rackByIdData.user

              });

            })
            .catch((error) => {
              console.error(`Error al cargar los datos del equipo: ${error.message}`);
            });
        } else if (type === 'equipment') {
          actions.getEquipmentById(id)
            .then(async (equipmentByIdData) => {
              // Establece el estado inicial con los datos del equipo
              setData({
                model: equipmentByIdData.description.model,
                brand: equipmentByIdData.description.brand,
                serial: equipmentByIdData.description.serial,
                number_part: equipmentByIdData.description.number_part,
                componentType: equipmentByIdData.description.componentType,
                five_years_prevition: equipmentByIdData.description.five_years_prevition,
                observations: equipmentByIdData.description.observations,
                equipment_width: equipmentByIdData.equipment_width,
                equipment_length: equipmentByIdData.equipment_height,
                equipment_height: equipmentByIdData.equipment_height,
                packaging_width: equipmentByIdData.packaging_width,
                packaging_length: equipmentByIdData.packaging_length,
                packaging_height: equipmentByIdData.packaging_height,
                weight: equipmentByIdData.weight,
                anchor_type: equipmentByIdData.anchor_type,
                service_area: equipmentByIdData.service_area,
                service_frontal: equipmentByIdData.service_frontal,
                service_back: equipmentByIdData.service_back,
                service_lateral: equipmentByIdData.service_lateral,
                access_width: equipmentByIdData.access_width,
                access_inclination: equipmentByIdData.access_inclination,
                access_length: equipmentByIdData.access_length,
                rack_number: equipmentByIdData.rack_number,
                rack_unit_position: equipmentByIdData.rack_unit_position,
                total_rack_units: equipmentByIdData.total_rack_units,
                ac_dc: equipmentByIdData.ac_dc,
                input_current: equipmentByIdData.input_current,
                power: equipmentByIdData.power,
                power_supply: equipmentByIdData.power_supply,
                operation_temp: equipmentByIdData.operation_temp,
                thermal_disipation: equipmentByIdData.thermal_disipation,
                power_config: equipmentByIdData.power_config,
                user: equipmentByIdData.user
              });
            })
            .catch((error) => {
              console.error(`Error al cargar los datos del equipo: ${error.message}`);
            });
        }
        const coordination = form.getTextField('UNIDAD_SOLICITANTE');
        const username = form.getTextField('PERSONA_SOLICITANTE');
        const date = form.getTextField('FECHA_SOLICITUD');
        const client = form.getTextField('CLIENTE_FINAL');
        const prevision = form.getTextField('PREVISION');
        const obs = form.getTextField('OBSERVACIONES');
        const service = form.getDropdown('Servicio');
        const servOptions = service.getOptions()

        const brand = form.getTextField('MARCA');
        const model = form.getTextField('MODELO');
        const serial = form.getTextField('SERIAL');
        const np = form.getTextField('N/P');
        const component = form.getTextField('TIPO_COMPONENTE');

        const cab = form.getRadioGroup('GABINETE');
        const cabOptions = cab.getOptions();
        const leased = form.getRadioGroup('PROPIO_ARRENDADO')
        const leasedOptions = leased.getOptions()
        const totalCabs = form.getTextField('Total_Gabinetes')
        const openClose = form.getRadioGroup('ABIERTO_CERRADO')
        const openCloseOptions = openClose.getOptions()
        const security = form.getRadioGroup('SEGURIDAD')
        const securityOptions = security.getOptions()
        const secType = form.getTextField('Tipo_Seguridad')
        const extractor = form.getRadioGroup('EXTRACTORES')
        const extractorOptions = extractor.getOptions()
        const ubExtractors = form.getTextField('Ubicacion_Extractores')
        const modular = form.getRadioGroup('MODULAR')
        const modularOptions = modular.getOptions()

        const doors = form.getRadioGroup('PUERTAS')
        const doorsOptions = doors.getOptions()

        const doorPosition = form.getTextField('Ubicacion_Puertas')
        const totalRU = form.getTextField('Total_RU')
        const rackPosition = form.getTextField('Posicion_Rack')
        const accesory = form.getRadioGroup('ACCESORIOS')
        const accesoryOptions = accesory.getOptions()

        const accesoryDescription = form.getTextField('Tipo_Accesorio')
        const rackHeigth = form.getTextField('Alto_Rack')
        const rackWidth = form.getTextField('Ancho_Rack')
        const rackDeep = form.getTextField('Profundo_Rack')
        const pdus = form.getTextField('PDU_Internos');
        const connectorPdu = form.getTextField('Toma_Entrada')
        const phase = form.getTextField('Fases')
        const outputPdu = form.getTextField('Receptaculos')
        const neutro = form.getRadioGroup('NEUTRO')
        const neutroOptions = neutro.getOptions()
        const equipHeight = form.getTextField('Alto_Equipo');
        const equipWidth = form.getTextField('Ancho_Equipo');
        const equipDeep = form.getTextField('Profundidad_Equipo')
        const packHeight = form.getTextField('Alto_Embalaje')
        const packWidth = form.getTextField('Ancho_Embalaje')
        const packDeep = form.getTextField('Profundidad embalaje')
        const weight = form.getTextField('Peso_Maximo')
        const serviceArea = form.getRadioGroup('SERVICIO')
        const areaOptions = serviceArea.getOptions()
        serviceArea.select(areaOptions[0])

        const serviceFrontal = form.getTextField('frontal')
        const serviceBack = form.getTextField('posterior')
        const serviceSide = form.getTextField('lateral')

        const anchorType = form.getTextField('Tipo_Anclaje')
        const accessLength = form.getTextField('Altura_Puerta')
        const accessWidth = form.getTextField('Ancho_Puerta')
        const accessInclination = form.getTextField('Inclinacion_Puerta')
        const ubicationRack = form.getTextField('Ubicacion_fila_Numero_Rack')
        const positionU = form.getTextField('Posicion_U')
        const totalRUEq = form.gettextField('Total_Unidades')
        const acdc = form.getTextField('ACDC')
        const volt = form.getTextField('Voltios')
        const watss = form.getTextField('Potencia')
        const psu = form.getTextField('Fuentes_Alimentacion')
        const temp = form.getTextField('Temperatura')
        const btu = form.getTextField('BTUHr')
        const psuConfig = form.getDropdown('Fuentes')
        const psuConfigOptions = psuConfig.getOptions()
        psuConfig.select(psuConfigOptions[0])

        coordination.setText(data.user.coordination)
        username.setText(data.user.username)
        date.setText(data.user.created_at)
        client.setText(data.user.clientName)

        prevision.setText(data.five_years_prevition)
        obs.setText(data.observations)
        if (data.user.service && servOptions.includes(data.user.service)) {
          service.select(data.user.service);
        } else {
          // Si `data.service` no está definido o no es un valor válido, seleccionar el primer valor de `servOptions`
          service.select(servOptions[0]);
        }
        brand.setText(data.brand)
        model.setText(data.model)
        serial.setText(data.serial)
        np.setText(data.number_part)
        component.setText(data.componentType)

        cab.select(cabOptions[0])
        leased.select(leasedOptions[0])

        totalCabs.setText(data.total_cabinets)

        openClose.select(openCloseOptions[0])
        security.select(securityOptions[0])

        secType.setText(data.type_security)
        extractor.select(extractorOptions[0])
        modular.select(modularOptions[0])
        doors.select(doorsOptions[0])

        doorPosition.setText(data.lateral_ubication)
        totalRU.setText(data.rack_unit)
        rackPosition.setText('text type')
        accesoryDescription.setText('text type')
        accesory.select(accesoryOptions[0])
        rackHeigth.setText('text type')
        rackWidth.setText('text type')
        rackDeep.setText('text type')
        connectorPdu.setText('text type')
        phase.setText('text type')
        outputPdu.setText('text type')
        pdus.setText('data.internal_pdu');
        neutro.select(neutroOptions[0])


        const filledPdfBytes = await pdfDoc.save();
        setFilledPdf(filledPdfBytes);


      })();
    }
  }, [id, actions, type])

  if (!filledPdf) {
    return <div>Cargando...</div>;
  }



  return (
    <PDFViewer width="1000" height="600">
      <Document file={{ data: filledPdf }}>
        <Page pageNumber={4} />
      </Document>
    </PDFViewer>
  );
}

export default PDFView;