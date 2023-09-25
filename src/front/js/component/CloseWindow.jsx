import React, { useContext } from 'react'
import { Context } from '../store/appContext'
import { useNavigate } from 'react-router-dom'


function CloseWindow() {
    const { actions } = useContext(Context)
    const navigate = useNavigate()
    return (
        <>
            <div className="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h1 className="modal-title fs-5" id="exampleModalLabel">Modal title</h1>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            <p>Recuerde descargar planillas, ya que se eliminara todo</p>
                            <p>Enviar todas las planillas con sus Datasheets a requerimientosdcce@dch.cantv.com.ve.</p>
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Cerrar</button>
                            <button
                                type="button"
                                className="btn btn-primary"
                                onClick={() => {
                                    actions.deleteAll()
                                    navigate = '/'
                                }}
                            >
                                Acepto y salir
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default CloseWindow