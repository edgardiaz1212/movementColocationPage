
import PDfBase from "../../pdf/FOR BA7D ED5.pdf"
const { PDFDocument } = PDFLib

async function fillForm()  {
        
    
    const pdfBuffer = await fetch(PDfBase).then((response) => response.arrayBuffer());
   
    const pdfDoc = await PDFDocument.load(pdfBuffer);
    const form = pdfDoc.getForm();
    
          const coordination = form.getTextField('NOMBRE DE LA UNIDAD SOLICITANTE');
          const username = form.getTextField('PERSONA RESPONSABLE UNIDAD SOLICITANTE');
          const date = form.getTextField('FECHA DE SOLICITUD');
          const client = form.getTextField('NOMBRE DEL CLIENTE FINAL');
          const prevision = form.getTextField('PREVISIÓN DE 5 ANOS DE EQUIPO A INSTALAR');
          const obs = form.getTextField('OBSERVACIONES');
          const service = form.getDropdown('Servicio');
          const servOptions = service.getOptions()
          service.select(servOptions[0])
          const brand = form.getTextField('MARCA');
          const model = form.getTextField('MODELO');
          const serial = form.getTextField('SERIAL');
          const np = form.getTextField('N/P');
          const component = form.getTextField('TIPO DE COMPONENTE');
  
          const cab = form.getRadioGroup('GABINETE');
          const cabOptions = cab.getOptions();
          cab.select(cabOptions[0])
          const leased=form.getRadioGroup('propio o arrendado')
          const leasedOptions= leased.getOptions()
          leased.select(leasedOptions[0])
          const totalCabs=form.getTextField()
          const openClose=form.getRadioGroup('abierto o cerrado')
          const openCloseOptions= openClose.getOptions()
          openClose.select(openCloseOptions[0])
          const security=form.getRadioGroup('seguridad')
          const securityOptions= security.getOptions()
          security.select(securityOptions[0])
          const secType = form.getTextField('Qué tipo de seguridad  y Cuántos')
          const extractor= form.getRadioGroup('EXTRACTORES') 
          const extractorOptions= extractor.getOptions()
          extractor.select(extractorOptions[0])
          const ubExtractors= form.getTextField('Ubicacion de extractores')
          const modular = form.getRadioGroup('MODULAR')
          const modularOptions= modular.getOptions()
          modular.select(modularOptions[0])
          const doors = form.getRadioGroup('PUERTAS')
          const doorsOptions= doors.getOptions()
          doors.select(doorsOptions[0])
          const doorPosition= form.getTextField('Si es afirmativo indique dónde')
          const totalRU= form.getTextField('Total de unidades de Rack que posee')
          const rackPosition =form.getTextField('De ser varios Racks que posición ocupa u ocupará en la fila')
          const accesory= form.getRadioGroup('ACCESORIOS')
          const accesoryOptions= accesory.getOptions()
          accesory.select(accesoryOptions[0])
          const accesoryDescription= form.getTextField('De ser afirmativo indique')
          const rackHeigth=form.getTextField('Alto rack')
          const rackWidth=form.getTextField('Ancho rack')
          const rackDeep =form.getTextField('Profundo rack')
          const pdus = form.getTextField('Cantidad de pdu internos');
          const connectorPdu = form.getTextField('Tipo de Toma a la Entrada')
          const phase = form.getTextField('N de circuitos o fases que posee')
          const outputPdu = form.getTextField('Nro De Receptáculos')
          const neutro = form.getRadioGroup('neutro')
          const neutroOptions= neutro.getOptions()
          neutro.select(neutroOptions[0])

          
          
          pdus.setText('data.internal_pdu');

          const filledPdfBytes = await pdfDoc.save();
          download(pdfBytes, "pdf-lib_form_creation_example.pdf", "application/pdf");
        }
//         .catch((error) => {
//           console.error(`Error al cargar los datos del equipo: ${error.message}`);
//         });
//     } else if (type === 'equipment') {
//       actions.getEquipmentById(id)
//         .then(async (equipmentByIdData) => {
//           // Establece el estado inicial con los datos del equipo
//           setData({
//             model: equipmentByIdData.description.model,
//             brand: equipmentByIdData.description.brand,
//             serial: equipmentByIdData.description.serial,
//             number_part: equipmentByIdData.description.number_part,
//             componentType: equipmentByIdData.description.componentType,
//             five_years_prevition: equipmentByIdData.description.five_years_prevition,
//             observations: equipmentByIdData.description.observations,
//             equipment_width: equipmentByIdData.equipment_width,
//             equipment_length: equipmentByIdData.equipment_height,
//             equipment_height: equipmentByIdData.equipment_height,
//             packaging_width: equipmentByIdData.packaging_width,
//             packaging_length: equipmentByIdData.packaging_length,
//             packaging_height: equipmentByIdData.packaging_height,
//             weight: equipmentByIdData.weight,
//             anchor_type: equipmentByIdData.anchor_type,
//             service_area: equipmentByIdData.service_area,
//             service_frontal: equipmentByIdData.service_frontal,
//             service_back: equipmentByIdData.service_back,
//             service_lateral: equipmentByIdData.service_lateral,
//             access_width: equipmentByIdData.access_width,
//             access_inclination: equipmentByIdData.access_inclination,
//             access_length: equipmentByIdData.access_length,
//             rack_number: equipmentByIdData.rack_number,
//             rack_unit_position: equipmentByIdData.rack_unit_position,
//             total_rack_units: equipmentByIdData.total_rack_units,
//             ac_dc: equipmentByIdData.ac_dc,
//             input_current: equipmentByIdData.input_current,
//             power: equipmentByIdData.power,
//             power_supply: equipmentByIdData.power_supply,
//             operation_temp: equipmentByIdData.operation_temp,
//             thermal_disipation: equipmentByIdData.thermal_disipation,
//             power_config: equipmentByIdData.power_config,
//             user: equipmentByIdData.user

//           });
//           const coordination = form.getTextField('NOMBRE DE LA UNIDAD SOLICITANTE');
//           const username = form.getTextField('PERSONA RESPONSABLE UNIDAD SOLICITANTE');
//           const date = form.getTextField('FECHA DE SOLICITUD');
//           const client = form.getTextField('NOMBRE DEL CLIENTE FINAL');
//           const prevision = form.getTextField('PREVISIÓN DE 5 ANOS DE EQUIPO A INSTALAR');
//           const obs = form.getTextField('OBSERVACIONES');
//           const service = form.getDropdown('Servicio');
//           const servOptions = service.getOptions()
//           service.select(servOptions[0])
//           const brand = form.getTextField('MARCA');
//           const model = form.getTextField('MODELO');
//           const serial = form.getTextField('SERIAL');
//           const np = form.getTextField('N/P');
//           const component = form.getTextField('TIPO DE COMPONENTE');
  
//           const equipHeight = form.getTextField('Alto equipo');
//           const equipWidth = form.getTextField('Ancho Equipo');

//           const filledPdfBytes = await pdfDoc.save();
//           setFilledPdf(filledPdfBytes);
//         })
//         .catch((error) => {
//           console.error(`Error al cargar los datos del equipo: ${error.message}`);
//         });
//     }
//   }