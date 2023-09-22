import React from 'react'

function CabinetFeatures({ handleFieldChange, data, currentUser }) {
    const isInstallationService = currentUser.service === 'Instalacion';

    return (<>
        <div className="mb-3 ">
            <h2>Caracteristicas del Gabinete</h2>
        </div>
        <div className="row gy-5 justify-content-center">
            <div className="col-lg-3 col-sm-12 ">
                <p>Posee Gabinete ?</p>
                <div className="form-check">
                    <input
                        className="form-check-input"
                        type="radio"
                        name="has_cabinet"
                        id="siGabinete"
                        value={true}
                        checked={data.has_cabinet === true}
                        onChange={handleFieldChange}
                    />
                    <label className="form-check-label" htmlFor="siGabinete">
                        Si
                    </label>
                </div>
                <div className="form-check">
                    <input
                        className="form-check-input"
                        type="radio"
                        name="has_cabinet"
                        id="noGabinete"
                        value={false}
                        checked={data.has_cabinet === false}
                        onChange={handleFieldChange}
                    />
                    <label className="form-check-label" htmlFor="noGabinete">
                        No
                    </label>
                </div>
            </div>
            {data.has_cabinet === true && (
                <>

                    <div className="col-lg-2 col-sm-12 ">
                        <p>Propio o arrendado ?</p>
                        <div className="form-check">
                            <input
                                className="form-check-input"
                                type="radio"
                                name="leased"
                                id="noLeased"
                                value={false}
                                checked={data.leased === false}
                                onChange={handleFieldChange}
                            />
                            <label className="form-check-label" htmlFor="noLeased">
                                Propio
                            </label>
                        </div>
                        <div className="form-check">
                            <input
                                className="form-check-input"
                                type="radio"
                                name="leased"
                                id="leased"
                                value={true}
                                checked={data.leased === true}
                                onChange={handleFieldChange}
                            />
                            <label className="form-check-label" htmlFor="leased">
                                Arrendado
                            </label>
                        </div>
                    </div>
                    <div className=" col-lg-3 col-sm-12">
                        <label htmlFor="total_cabinets" className="form-label">
                            Numero Total de Gabinetes
                        </label>
                        <input
                            type="text"
                            className="form-control"
                            id="total_cabinets"
                            name="total_cabinets"
                            value={data.total_cabinets}
                            placeholder="Total gabinetes que requieren instalarse"
                            onChange={handleFieldChange}
                        />
                    </div>
                    <div className="col-lg-2 col-sm-12 ">
                        <p>Rack abrierto o Cerrado ?</p>
                        <div className="form-check">
                            <input
                                className="form-check-input"
                                type="radio"
                                name="open_closed"
                                id="open"
                                value={true}
                                checked={data.open_closed === true}
                                onChange={handleFieldChange}
                            />
                            <label className="form-check-label" htmlFor="open">
                                Abierto
                            </label>
                        </div>
                        <div className="form-check">
                            <input
                                className="form-check-input"
                                type="radio"
                                name="open_closed"
                                id="close"
                                value={false}
                                checked={data.open_closed === false}
                                onChange={handleFieldChange}
                            />
                            <label className="form-check-label" htmlFor="close">
                                Cerrado
                            </label>
                        </div>
                    </div>
                    
                    <div className="col-lg-3 col-sm-12">
                        <p>Posee seguridad ?</p>
                        <div className="form-check">
                            <input
                                className="form-check-input"
                                type="radio"
                                name="security"
                                id="secured"
                                value={true}
                                checked={data.security === true}
                                onChange={handleFieldChange}
                            />
                            <label className="form-check-label" htmlFor="secured">
                                Si
                            </label>
                        </div>
                        <div className="form-check">
                            <input
                                className="form-check-input"
                                type="radio"
                                name="security"
                                id="nosecured"
                                value={false}
                                checked={data.security === false}
                                onChange={handleFieldChange}
                            />
                            <label className="form-check-label" htmlFor="nosecured">
                                No
                            </label>
                        </div>
                    </div>
                    <div className="col-lg-3 col-sm-12">
                        <label htmlFor="type_security" className="form-label">
                            Qué tipo de seguridad y Cuántos:
                        </label>
                        <input
                            type="text"
                            className="form-control"
                            name="type_security"
                            id="type_security"
                            value={data.type_security}
                            placeholder="Tipo de seguridad y cantidad"
                            onChange={handleFieldChange}
                            disabled={data.security === false}
                        />
                    </div>
                    <div className="col-lg-2 col-sm-12">
                        <p>Posee Extractores ?</p>
                        <div className="form-check">
                            <input
                                className="form-check-input"
                                type="radio"
                                name="has_extractors"
                                id="yesExtractor"
                                value={true}
                                checked={data.has_extractors === true}
                                onChange={handleFieldChange}
                            />
                            <label className="form-check-label" htmlFor="yesExtractor">
                                Si
                            </label>
                        </div>
                        <div className="form-check">
                            <input
                                className="form-check-input"
                                type="radio"
                                name="has_extractors"
                                id="noExtractor"
                                value={false}
                                checked={data.has_extractors === false}
                                onChange={handleFieldChange}
                            />
                            <label className="form-check-label" htmlFor="noExtractor">
                                No
                            </label>
                        </div>
                    </div>

                    <div className="col-lg-3 col-sm-12">
                        <label htmlFor="extractors_ubication" className="form-label">
                            Ubicacion Extractores
                        </label>
                        <input
                            type="text"
                            className="form-control"
                            name="extractors_ubication"
                            id="extractors_ubication"
                            value={data.extractors_ubication}
                            placeholder="Ubicacion de los extractores"
                            onChange={handleFieldChange}
                            disabled={data.has_extractors === false}
                        />
                    </div>

                    <div className="col-lg-2 col-sm-12">
                        <p>Es Modular ?</p>
                        <div className="form-check">
                            <input
                                className="form-check-input"
                                type="radio"
                                name="modular"
                                id="yesModular"
                                value={true}
                                checked={data.modular === true}
                                onChange={handleFieldChange}
                            />
                            <label className="form-check-label" htmlFor="yesModular">
                                Si
                            </label>
                        </div>
                        <div className="form-check">
                            <input
                                className="form-check-input"
                                type="radio"
                                name="modular"
                                id="noModular"
                                value={false}
                                checked={data.modular === false}
                                onChange={handleFieldChange}
                            />
                            <label className="form-check-label" htmlFor="noModular">
                                No
                            </label>
                        </div>
                    </div>
                    <div className="col-lg-3 col-sm-12">
                        <p>Posee Puertas de servicio lateral: ?</p>
                        <div className="form-check">
                            <input
                                className="form-check-input"
                                type="radio"
                                name="lateral_doors"
                                value={true}
                                id="yesLateralDoors"
                                checked={data.lateral_doors === true}
                                onChange={handleFieldChange}
                            />
                            <label className="form-check-label" htmlFor="yesLateralDoors">
                                Si
                            </label>
                        </div>
                        <div className="form-check">
                            <input
                                className="form-check-input"
                                type="radio"
                                name="lateral_doors"
                                value={false}
                                id="noLateralDoors"
                                checked={data.lateral_doors === false}
                                onChange={handleFieldChange}
                            />
                            <label className="form-check-label" htmlFor="noLateralDoors">
                                No
                            </label>
                        </div>
                    </div>

                    <div className="col-lg-3 col-sm-12">
                        <label htmlFor="lateral_ubication" className="form-label">
                            Ubicacion puertas de servicio
                        </label>
                        <input
                            type="text"
                            className="form-control"
                            name='lateral_ubication'
                            id="lateral_ubication"
                            value={data.lateral_ubication}
                            placeholder="Ubicacion de las Puertas de Servicio"
                            onChange={handleFieldChange}
                            disabled={data.lateral_doors === false}
                        />
                    </div>

                    <div className=" col-lg-3 col-sm-12">
                        <label htmlFor="rack_unit" className="form-label">
                            Total de Unidades de Rack
                        </label>
                        <input
                            type="text"
                            className="form-control"
                            name="rack_unit"
                            id="rack_unit"
                            value={data.rack_unit}
                            placeholder="Unidades de Rack del gabinete"
                            onChange={handleFieldChange}
                        />
                    </div>
                    <div className="col-lg-3 col-sm-12">
                        <label htmlFor="rack_position" className="form-label">
                            Posicion del rack en la fila
                        </label>
                        <input
                            type="text"
                            className="form-control"
                            id="rack_position"
                            name="rack_position"
                            value={data.rack_position}
                            placeholder="Posicion del rack(ejem: 1,2,..."
                            onChange={handleFieldChange}
                        />
                    </div>
                    {!isInstallationService && (
                        <div className=" col-lg-2 col-sm-12">
                            <label htmlFor="rack_position" className="form-label">
                                Ubicacion en losa en el DC
                            </label>
                            <input
                                type="text"
                                className="form-control"
                                id="rack_ubication"
                                name="rack_ubication"
                                value={data.rack_ubication}
                                placeholder="Nomenclatura DC"
                                onChange={handleFieldChange}
                            />
                        </div>
                    )}
                    <div className="col-lg-3 col-sm-12">
                        <p>¿Tiene Accesorios Adicionales?</p>
                        <div className="form-check">
                            <input
                                className="form-check-input"
                                type="radio"
                                name="has_accessory"
                                value={true}
                                id="yesAccessories"
                                onChange={handleFieldChange}
                                checked={data.has_accessory === true}
                            />
                            <label className="form-check-label" htmlFor="yesAccessories">
                                Sí
                            </label>
                        </div>
                        <div className="form-check">
                            <input
                                className="form-check-input"
                                type="radio"
                                name="has_accessory"
                                id="noAccessories"
                                value={false}
                                checked={data.has_accessory === false}
                                onChange={handleFieldChange}
                            />
                            <label className="form-check-label" htmlFor="noAccessories">
                                No
                            </label>
                        </div>
                    </div>
                    <div className="col-lg-4 col-sm-12">
                        <label htmlFor="accessory_description" className="form-label">
                            Accesorios adicionales:
                        </label>
                        <input
                            type="text"
                            className="form-control"
                            name="accessory_description"
                            id="accessory_description"
                            value={data.accessory_description}
                            placeholder="Descripción de los accesorios adicionales"
                            onChange={handleFieldChange}
                            disabled={data.has_accessory === false}
                        />
                    </div>

                    <div className="mt-5 mb-3">
                        <h4 className="">Dimensiones del Rack</h4>
                        <div className="row justify-content-center">
                            <div className="col-lg-3 col-sm-12">
                                <label htmlFor="rack_width" className="form-label">
                                    Ancho (en cm):
                                </label>
                                <input
                                    type="text"
                                    className="form-control"
                                    name="rack_width"
                                    id="rack_width"
                                    value={data.rack_width}
                                    placeholder="Introduzca el ancho del rack"
                                    onChange={handleFieldChange}
                                />
                            </div>

                            <div className="col-lg-3 col-sm-12">
                                <label htmlFor="rack_length" className="form-label">
                                    Largo (en cm):
                                </label>
                                <input
                                    type="text"
                                    className="form-control"
                                    name="rack_length"
                                    id="rack_length"
                                    value={data.rack_length}
                                    placeholder="Introduzca el largo del rack"
                                    onChange={handleFieldChange}
                                />
                            </div>

                            <div className="col-lg-3 col-sm-12">
                                <label htmlFor="rack_height" className="form-label">
                                    Alto (en cm):
                                </label>
                                <input
                                    type="text"
                                    className="form-control"
                                    name="rack_height"
                                    id="rack_height"
                                    value={data.rack_height}
                                    placeholder="Introduzca el alto del rack"
                                    onChange={handleFieldChange}
                                />
                            </div>
                        </div>
                    </div>
                    
                </>
            )}
        </div>
    </>
    )
}

export default CabinetFeatures