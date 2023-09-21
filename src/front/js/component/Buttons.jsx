import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { Context } from "../store/appContext";
import PDfBase from "../../pdf/FOR BA7D ED5.pdf"
import { PDFDocument, rgb } from 'pdf-lib'

function Buttons({ editLink, id, type }) {
    const { actions, store } = useContext(Context)

    const handleFillPDF = async () => {
        const data =
            type === "rack"
            // Cargar segun la seleccion
                ? await actions.getRackById(id)
                : await actions.getEquipmentById(id);
        console.log("ladata", data)
        if (!data) {
            console.error("No se encontraron datos para llenar el PDF.");
            return;
        }
        // Carga el PDF base.
        const pdfBuffer = await fetch(PDfBase).then((response) => response.arrayBuffer());
        const pdfDoc = await PDFDocument.load(pdfBuffer);

        // Llena los campos del PDF base con los valores capturados.
        const form = pdfDoc.getForm();
        // for (const key in data) {
        //   if (data.hasOwnProperty(key)) {
        //     const value = data[key];
        //     const textField = form.getTextField(key);
        //     textField.setText(value);
        //     console.log("en for",data)
        //   }
        // }
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
        brand.setText(data.description.brand)
        model.setText(data.description.model)
        serial.setText(data.description.serial)
        np.setText(data ? data.description.number_part || 'N/A' : 'N/A')
        component.setText(data.description.componentType)
        prevision.setText(data ? data.description.five_years_prevition || 'N/A' : 'N/A')
        obs.setText(data ? data.description.observations || 'N/A' : 'N/A')

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
        totalCabs.setText(data ? data.total_cabinets || 'N/A' : 'N/A')
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
        secType.setText(data ? data.type_security || 'N/A' : 'N/A')
        if (typeof data.has_extractors === 'boolean') {
            if (data.has_extractors) {
                extractor.select(extractorOptions[0])
            } else {
                extractor.select(extractorOptions[1])
            }
        } else {

        }
        ubExtractors.setText(data ? data.extractors_ubication || 'N/A' : 'N/A')
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
        doorPosition.setText(data ? data.lateral_ubication || 'N/A' : 'N/A')
        totalRU.setText(data ? data.rack_unit || 'N/A' : 'N/A')
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
        accesoryDescription.setText(data ? data.accessory_description || 'N/A' : 'N/A')
        rackHeigth.setText(data ? data.rack_height || 'N/A' : 'N/A')
        rackWidth.setText(data ? data.rack_width || 'N/A' : 'N/A')
        rackDeep.setText(data ? data.rack_length || 'N/A' : 'N/A')
        pdus.setText(data ? data.internal_pdu || 'N/A' : 'N/A');
        connectorPdu.setText(data ? data.input_connector || 'N/A' : 'N/A')
        phase.setText(data ? data.fases || 'N/A' : 'N/A')
        outputPdu.setText(data ? data.output_connector || 'N/A' : 'N/A')
        if (typeof data.neutro === 'boolean') {
            if (data.neutro) {
                neutro.select(neutroOptions[0])
            } else {
                neutro.select(neutroOptions[1])
            }
        } else {
        }
        //de equipment
        equipHeight.setText(data ? data.equipment_height || 'N/A' : 'N/A');
        equipWidth.setText(data ? data.equipment_width || 'N/A' : 'N/A');
        equipDeep.setText(data ? data.equipment_length || 'N/A' : 'N/A')
        packHeight.setText(data ? data.packaging_height || 'N/A' : 'N/A')
        packWidth.setText(data ? data.packaging_width || 'N/A' : 'N/A')
        packDeep.setText(data ? data.packaging_length || 'N/A' : 'N/A')
        weight.setText(data ? data.weight || 'N/A' : 'N/A')
        anchorType.setText(data ? data.anchor_type || 'N/A' : 'N/A')
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
        accessLength.setText(data ? data.access_length || 'N/A' : 'N/A')
        accessWidth.setText(data ? data.access_width || 'N/A' : 'N/A')
        accessInclination.setText(data ? data.access_inclination || 'N/A' : 'N/A')

        if (data.rack_number && data.equip_rack_ubication) {
            ubicationRack.setText(`${data.rack_number} ${data.equip_rack_ubication}`);
        } else if (data.rack_number) {
            ubicationRack.setText(data.rack_number);
        } else if (data.equip_rack_ubication) {
            ubicationRack.setText(data.equip_rack_ubication);
        } else {
            ubicationRack.setText('N/A');
        }
        positionU.setText(data ? data.rack_unit_position || 'N/A' : 'N/A')
        totalRUEq.setText(data ? data.total_rack_units || 'N/A' : 'N/A')
        acdc.setText(data ? data.ac_dc || 'N/A' : 'N/A')
        volt.setText(data ? data.input_current || 'N/A' : 'N/A')
        watss.setText(data ? data.power || 'N/A' : 'N/A')
        psu.setText(data ? data.power_supply || 'N/A' : 'N/A')
        temp.setText(data ? data.operation_temp || 'N/A' : 'N/A')
        btu.setText(data ? data.thermal_disipation || 'N/A' : 'N/A')

        if (data.power_config && psuConfigOptions.includes(data.power_config)) {
            psuConfig.select(data.power_config);
        } else {
            psuConfig.select(psuConfigOptions[0]);
        }
        // Descarga el PDF resultante.
        const filledPdfBytes = await pdfDoc.save();
        const blob = new Blob([filledPdfBytes], { type: "application/pdf" });
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = url;
        a.download = `FOR-DA7D-${data.description.model}.pdf`;
        a.click();
        window.URL.revokeObjectURL(url);
    };

    const handleDelete = async () => {
        const confirmDelete = window.confirm(`Estas seguro de eliminar este ${type} ?`)
        if (confirmDelete) {
            try {
                let response
                if (type === "rack") {
                    response = await actions.deleteRack(id)
                } else if (type === 'equipment') {
                    response = await actions.deleteEquipment(id)
                } else {
                    console.log(`Error al eliminar el ${type}:`, response ? response.status : 'No se recibió respuesta')
                }
            } catch (error) {
                console.error('error al eliminar :', error)
            }
        }
    }


    return (
        <>
            <div className="d-grid gap-2 d-md-flex justify-content-md-end">
                <Link to={editLink} className="btn btn-primary btn-sm " >
                    Editar
                </Link>
                {/* <Link to={`/view-pdf/${type === 'rack' ? 'rack' : 'equipment'}/${id}`} className="btn btn-primary btn-sm ">Ver Planilla</Link> */}

                <button className="btn btn-primary btn-sm "
                    onClick={handleFillPDF}>Planilla</button>
                <button className="button_delete" type="button"
                    onClick={handleDelete}

                >
                    <span className="button__text">Eliminar</span>
                    <span className="button__icon">
                        <svg className="svg" height="512" viewBox="0 0 512 512" width="512" xmlns="http://www.w3.org/2000/svg">
                            <title></title>
                            <path
                                d="M112,112l20,320c.95,18.49,14.4,32,32,32H348c17.67,0,30.87-13.51,32-32l20-320"
                                style={{ fill: "none", stroke: "#fff", strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: "32px" }}
                            ></path>
                            <line
                                style={{ stroke: "#fff", strokeLinecap: "round", strokeMiterlimit: "10", strokeWidth: "32px" }}
                                x1="80" x2="432" y1="112" y2="112"
                            ></line>
                            <path
                                d="M192,112V72h0a23.93,23.93,0,0,1,24-24h80a23.93,23.93,0,0,1,24,24h0v40"
                                style={{ fill: "none", stroke: "#fff", strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: "32px" }}
                            ></path>
                            <line
                                style={{ fill: "none", stroke: "#fff", strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: "32px" }}
                                x1="256" x2="256" y1="176" y2="400"
                            ></line>
                            <line
                                style={{ fill: "none", stroke: "#fff", strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: "32px" }}
                                x1="184" x2="192" y1="176" y2="400"
                            ></line>
                            <line
                                style={{ fill: "none", stroke: "#fff", strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: "32px" }}
                                x1="328" x2="320" y1="176" y2="400"
                            ></line>
                        </svg>
                    </span>
                </button>
            </div>
        </>
    )
}


export default Buttons