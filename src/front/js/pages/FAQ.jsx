import React from 'react'

function FAQ() {
    return (
        <>
<div className="accordion" id="accordionFAQ">
                <div className="accordion-item">
                    <h2 className="accordion-header">
                        <button className="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#collapseOne" aria-expanded="true" aria-controls="collapseOne">
                            Diferencia entre Desincorporacion y Retiro
                        </button>
                    </h2>
                    <div id="collapseOne" className="accordion-collapse collapse show" data-bs-parent="#accordionFAQ">
                        <div className="accordion-body">
                            <p>La desincorporacion implica resguardo en depositos del Data Center, solo para elementos en hosting</p>
                            <p>El retiro, el equipamiento sale de las instalaciones del Data Center</p>
                        </div>
                    </div>
                </div>
                <div className="accordion-item">
                    <h2 className="accordion-header">
                        <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseTwo" aria-expanded="false" aria-controls="collapseTwo">
                            Que es la mudanza?
                        </button>
                    </h2>
                    <div id="collapseTwo" className="accordion-collapse collapse" data-bs-parent="#accordionFAQ">
                        <div className="accordion-body">
                            <p>Esta actividad es cuando ya se tiene equipamiento instalado en el Data Center y requiere moverse dentro del Data Center a otra ubicacion</p>
                        </div>
                    </div>
                </div>
                <div className="accordion-item">
                    <h2 className="accordion-header">
                        <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseThree" aria-expanded="false" aria-controls="collapseThree">
                            Quien debe llenar la planilla?
                        </button>
                    </h2>
                    <div id="collapseThree" className="accordion-collapse collapse" data-bs-parent="#accordionFAQ">
                        <div className="accordion-body">
                            <p>EL solicitante debe ser de CANTV, ya que es el cliente directo</p>
                    </div>
                </div>
            </div>

            <div className="accordion-item">
                    <h2 className="accordion-header">
                        <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseThree" aria-expanded="false" aria-controls="collapseFour">
                            Mas dudas acerca del llenado?
                        </button>
                    </h2>
                    <div id="collapseThree" className="accordion-collapse collapse" data-bs-parent="#accordionFAQ">
                        <div className="accordion-body">
                            <p>Escribir a los correos infraestructura@dch.cantv.com.ve y coinfra_cdh@cantv.com.ve</p>
                    </div>
                </div>
            </div>

            </div>

            
        </>
    )
}

export default FAQ