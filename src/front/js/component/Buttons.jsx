import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { Context } from "../store/appContext";
import PDfBase from "../../pdf/FOR BA7D ED5.pdf"




function Buttons({ editLink, id, type }) {

    const handleFillPDF = async () => {
        // Captura los valores de los campos de texto que deseas incluir en el PDF llenado.
        const data = {
          NOMBRE_DE_LA_UNIDAD_SOLICITANTE: "Valor del campo 1",
          PERSONA_RESPONSABLE_UNIDAD_SOLICITANTE: "Valor del campo 2",
          // Agrega más campos aquí...
        };
    
        // Carga el PDF base.
        const pdfBuffer = await fetch(PDfBase).then((response) => response.arrayBuffer());
        const pdfDoc = await PDFDocument.load(pdfBuffer);
    
        // Llena los campos del PDF base con los valores capturados.
        const form = pdfDoc.getForm();
        for (const key in data) {
          if (data.hasOwnProperty(key)) {
            const value = data[key];
            const textField = form.getTextField(key);
            textField.setText(value);
          }
        }
    
        // Descarga el PDF resultante.
        const filledPdfBytes = await pdfDoc.save();
        const blob = new Blob([filledPdfBytes], { type: "application/pdf" });
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = url;
        a.download = "filled-pdf.pdf";
        a.click();
        window.URL.revokeObjectURL(url);
      };




    const { actions, store } = useContext(Context)
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
                <Link to={`/view-pdf/${type === 'rack' ? 'rack' : 'equipment'}/${id}`} className="btn btn-primary btn-sm ">Ver Planilla</Link>
             
<button
onClick={handleFillPDF}>prueba</button>
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