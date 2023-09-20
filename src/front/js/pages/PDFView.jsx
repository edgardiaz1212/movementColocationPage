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
              console.error(`Error al cargar los datos del rack: ${error.message}`);
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

        const serviceFrontal = form.getCheckBox('frontal')
        const serviceBack = form.getCheckBox('posterior')
        const serviceSide = form.getCheckBox('lateral')

        const anchorType = form.getTextField('Tipo_Anclaje')
        const accessLength = form.getTextField('Altura_Puerta')
        const accessWidth = form.getTextField('Ancho_Puerta')
        const accessInclination = form.getTextField('Inclinacion_Puerta')
        const ubicationRack = form.getTextField('Ubicacion_fila_Numero_Rack')
        const positionU = form.getTextField('Posicion_U')
        const totalRUEq = form.getTextField('Total_Unidades')
        const acdc = form.getTextField('ACDC')
        const volt = form.getTextField('Voltios')
        const watss = form.getTextField('Potencia')
        const psu = form.getTextField('Fuentes_Alimentacion')
        const temp = form.getTextField('Temperatura')
        const btu = form.getTextField('BTUHr')
        const psuConfig = form.getDropdown('Fuentes')
        const psuConfigOptions = psuConfig.getOptions()

        //en general
        if (data.user) {
          username.setText(data.user.username);
          coordination.setText(data.user.coordination);
          date.setText(data.user.created_at);
          client.setText(data.user.clientName);
        } else {
          // Si data.user no está definido, puedes establecer valores predeterminados o mostrar un mensaje de error, según corresponda.
          username.setText('N/A');
          coordination.setText('N/A');
          date.setText('N/A');
          client.setText('N/A');
        }

        if (data.user.service && servOptions.includes(data.user.service)) {
          service.select(data.user.service);
        } else {
          // Si `data.service` no está definido o no es un valor válido, seleccionar el primer valor de `servOptions`
          service.select(servOptions[0]);
        }
        brand.setText(data.brand)
        model.setText(data.model)
        serial.setText(data.serial)
        np.setText(data ? data.number_part : 'N/A')
        component.setText(data.componentType)
        prevision.setText(data ? data.five_years_prevition : 'N/A')
        obs.setText(data ? data.observations : 'N/A')

        //de rack
        if (typeof data.has_cabinet === 'boolean') {
          if (data.has_cabinet) {
            cab.select(cabOptions[0]); // "Sí"
          } else {
            cab.select(cabOptions[1]); // "No"
          }
        } else {
          // No hagas nada, no selecciones ninguna opción si no hay datos disponibles.
        }

        if (typeof data.leased === 'boolean') {
          if (data.has_cabinet) {
            leased.select(leasedOptions[0]); // "Sí"
          } else {
            leased.select(leasedOptions[1]); // "No"
          }
        } else {
          
        }
        totalCabs.setText(data ? data.total_cabinets : 'N/A')
        if (typeof data.open_closed === 'boolean') {
          if (data.open_closed) {
            openClose.select(openCloseOptions[0]); // "Sí"
          } else {
            openClose.select(openCloseOptions[1]); // "No"
          }
        } else {
          
        }
        if (typeof data.security === 'boolean') {
          if (data.security) {
            security.select(securityOptions[0])
          } else {
            security.select(securityOptions[1])
          }
        } else {
          
        }
        secType.setText(data ? data.type_security : 'N/A')
        if (typeof data.has_extractors === 'boolean') {
          if (data.has_extractors) {
            extractor.select(extractorOptions[0])
          } else {
            extractor.select(extractorOptions[1])
          }
        } else {
          
        }
        ubExtractors.setText(data ? data.extractors_ubication : 'N/A')
        if (typeof data.modular === 'boolean') {
          if (data.modular) {
            modular.select(modularOptions[0])
          } else {
            modular.select(modularOptions[1])
          }
        } else {
          
        }
        if (typeof data.lateral_doors === 'boolean') {
          if (data.lateral_doors) {
            doors.select(doorsOptions[0])
          } else {
            doors.select(doorsOptions[1])
          }
        } else {
          
        }
        doorPosition.setText(data ? data.lateral_ubication : 'N/A')
        totalRU.setText(data ? data.rack_unit : 'N/A')
        if (data.rackPosition && data.rack_ubication) {
          rackPosition.setText(`${data.rackPosition} ${data.rack_ubication}`);
        } else if (data.rackPosition) {
          rackPosition.setText(data.rackPosition);
        } else if (data.rack_ubication) {
          rackPosition.setText(data.rack_ubication);
        } else {
          rackPosition.setText('N/A');
        }
        if (typeof data.has_accessory === 'boolean') {
          if (data.has_accessory) {
            accesory.select(accesoryOptions[0])
          } else {
            accesory.select(accesoryOptions[1])
          }
        } else {
          ;
        }
        accesoryDescription.setText(data ? data.accessory_description : 'N/A')
        rackHeigth.setText(data ? data.rack_height : 'N/A')
        rackWidth.setText(data ? data.rack_width : 'N/A')
        rackDeep.setText(data ? data.rack_length : 'N/A')
        pdus.setText(data ? data.internal_pdu : 'N/A');
        connectorPdu.setText(data ? data.input_connector : 'N/A')
        phase.setText(data ? data.fases : 'N/A')
        outputPdu.setText(data ? data.output_connector : 'N/A')
        if (typeof data.neutro === 'boolean') {
          if (data.neutro) {
            neutro.select(neutroOptions[0])
          } else {
            neutro.select(neutroOptions[1])
          }
        } else {
          ;
        }
        //de equipment
        equipHeight.setText(data ? data.equipment_height : 'N/A');
        equipWidth.setText(data ? data.equipment_width : 'N/A');
        equipDeep.setText(data ? data.equipment_length : 'N/A')
        packHeight.setText(data ? data.packaging_height : 'N/A')
        packWidth.setText(data ? data.packaging_width : 'N/A')
        packDeep.setText(data ? data.packaging_length : 'N/A')
        weight.setText(data ? data.weight : 'N/A')
        anchorType.setText(data ? data.anchor_type : 'N/A')
        if (typeof data.service_area === 'boolean') {
          if (data.service_area) {
            serviceArea.select(areaOptions[0])
          } else {
            serviceArea.select(areaOptions[1])
          }
        } else {
          
        }

        serviceFrontal.check(data.service_frontal);
        serviceBack.check(data.service_back)
        serviceSide.check(data.service_lateral)

        accessLength.setText(data ? data.access_length : 'N/A')
        accessWidth.setText(data ? data.access_width : 'N/A')
        accessInclination.setText(data ? data.access_inclination : 'N/A')

        if (data.rack_number && data.equip_rack_ubication) {
          ubicationRack.setText(`${data.rack_number} ${data.equip_rack_ubication}`);
        } else if (data.rack_number) {
          ubicationRack.setText(data.rack_number);
        } else if (data.equip_rack_ubication) {
          ubicationRack.setText(data.equip_rack_ubication);
        } else {
          ubicationRack.setText('N/A');
        }
        positionU.setText(data ? data.rack_unit_position : 'N/A')
        totalRUEq.setText(data ? data.total_rack_units : 'N/A')
        acdc.setText(data ? data.ac_dc : 'N/A')
        volt.setText(data ? data.input_current : 'N/A')
        watss.setText(data ? data.power : 'N/A')
        psu.setText(data ? data.power_supply : 'N/A')
        temp.setText(data ? data.operation_temp : 'N/A')
        btu.setText(data ? data.thermal_disipation : 'N/A')

        if (data.power_config && psuConfigOptions.includes(data.power_config)) {
          psuConfig.select(data.power_config);
        } else {
          psuConfig.select(psuConfigOptions[0]);
        }

        const filledPdfBytes = await pdfDoc.save();
        setFilledPdf(filledPdfBytes);
      })();
    }
  }, [id, actions, type, data])

  if (!filledPdf) {
    return <div>Cargando...</div>;
  }



  return (
    <PDFViewer width="1000" height="400">
      <Document file={{ data: filledPdf }}>
        <Page pageNumber={4} />
      </Document>
    </PDFViewer>
  );
}

export default PDFView;