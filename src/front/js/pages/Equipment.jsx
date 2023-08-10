import React from "react";
import Details from "../component/Details.jsx";

function Equipment() {
  return (
    <>
      <Details />
      <div className="container">
        <div className="p-3 mb-2 bg-info">
          <h2>ESPECIFICACIONES FÍSICAS DEL EQUIPO</h2>
        </div>
        <div className="container row">
          <h4 className="col-3">Dimensiones del Equipo</h4>
          <div className="col-6">
            <div className="m-auto">
              <label htmlFor="equipWidth" className="form-label">
                Ancho (en cm):
              </label>
              <input
                type="text"
                className="form-control"
                id="equipWidth"
                placeholder="Introduzca el ancho del equipo"
              />
            </div>

            <div className="m-auto">
              <label htmlFor="equipLength" className="form-label">
                Largo (en cm):
              </label>
              <input
                type="text"
                className="form-control"
                id="equipLength"
                placeholder="Introduzca el largo del equipo"
              />
            </div>

            <div className="m-auto">
              <label htmlFor="equipHeight" className="form-label">
                Alto (en cm):
              </label>
              <input
                type="text"
                className="form-control"
                id="equipHeight"
                placeholder="Introduzca el alto del equipo"
              />
            </div>
          </div>
        </div>

        <div className="container row mt-5">
          <h4 className="col-3">Dimensiones de la caja del equipo</h4>
          <div className="col-6">
            <div className="m-auto">
              <label htmlFor="boxWidth" className="form-label">
                Ancho (en cm):
              </label>
              <input
                type="text"
                className="form-control"
                id="boxWidth"
                placeholder="Introduzca el ancho del embalaje"
              />
            </div>

            <div className="m-auto">
              <label htmlFor="boxLength" className="form-label">
                Largo (en cm):
              </label>
              <input
                type="text"
                className="form-control"
                id="boxLength"
                placeholder="Introduzca el largo del embalaje"
              />
            </div>

            <div className="m-auto">
              <label htmlFor="boxHeight" className="form-label">
                Alto (en cm):
              </label>
              <input
                type="text"
                className="form-control"
                id="boxHeight"
                placeholder="Introduzca el alto del embalaje"
              />
            </div>
          </div>
        </div>
        <div className="m-auto col-4">
          <label for="maxWeigth" className="form-label">
            Peso Maximo del equipo
          </label>
          <input
            type="text"
            className="form-control"
            id="maxWeigth"
            placeholder="Introduzca el peso maximo que puede tener"
          />
        </div>
        <div className="m-auto col-4">
          <label for="anchor" className="form-label">
            Tipo de anclaje al rack
          </label>
          <input
            type="text"
            className="form-control"
            id="anchor"
            placeholder="Introduzca el peso maximo que puede tener"
          />
        </div>
        <form className="m-auto col-4">
          <p>Requiere área de servicio</p>
          <div className="form-check">
            <input
              className="form-check-input"
              type="radio"
              name="flexRadioService"
              id="serviceAreaYes"
            />
            <label className="form-check-label" htmlFor="serviceAreaYes">
              Sí
            </label>
          </div>
          <div className="form-check">
            <input
              className="form-check-input"
              type="radio"
              name="flexRadioService"
              id="serviceAreaNo"
              checked
            />
            <label className="form-check-label" htmlFor="serviceAreaNo">
              No
            </label>
          </div>

          <div className="container">
            Ubicacion area de servivio
            <div className="form-check">
              <input
                className="form-check-input"
                type="checkbox"
                value=""
                id="flexCheckFrontal"
              />
              <label className="form-check-label" for="flexCheckFrontal">
                Frontal
              </label>
            </div>
            <div className="form-check">
              <input
                className="form-check-input"
                type="checkbox"
                value=""
                id="flexCheckPosterior"
              />
              <label className="form-check-label" for="flexCheckPosterior">
                Posterior
              </label>
            </div>
            <div className="form-check">
              <input
                className="form-check-input"
                type="checkbox"
                value=""
                id="flexCheckLateral"
              />
              <label className="form-check-label" for="flexCheckLateral">
                Lateral
              </label>
            </div>
          </div>
        </form>

        <div className="container row">
          <h4 className="col-3">Dimensiones Requeridas ruta de acceso</h4>
          <div className="col-6">
            <div className="m-auto">
              <label htmlFor="heigthAccess" className="form-label">
                Altura minima puerta (en cm):
              </label>
              <input
                type="text"
                className="form-control"
                id="heigthAccess"
                placeholder="Introduzca altura minima para el acceso"
              />
            </div>

            <div className="m-auto">
              <label htmlFor="widthAccess" className="form-label">
                Ancho (en cm):
              </label>
              <input
                type="text"
                className="form-control"
                id="widthAccess"
                placeholder="Introduzca el ancho para el acceso"
              />
            </div>

            <div className="m-auto">
              <label htmlFor="inclinationAccess" className="form-label">
                Inclinacion :
              </label>
              <input
                type="text"
                className="form-control"
                id="inclinationAccess"
                placeholder="Introduzca la inclinacion permitida"
              />
            </div>
          </div>
        </div>

        <div className="m-auto col-4">
          <label for="numRack" className="form-label">
            Ubicacion, Rack donde estara ubicado
          </label>
          <input
            type="text"
            className="form-control"
            id="numRack"
            placeholder="Introduzca en que rack se colocara"
          />
        </div>

        <div className="m-auto col-4">
          <label for="positionRack" className="form-label">
            Las unidades de rack que ocupara
          </label>
          <input
            type="text"
            className="form-control"
            id="positionRack"
            placeholder="Introduzca las unidade de rack"
          />
        </div>

        <div className="m-auto col-4">
          <label for="totalURack" className="form-label">
            Total de unidades de Rack
          </label>
          <input
            type="text"
            className="form-control"
            id="totalURack"
            placeholder="Introduzca unidades de rack del equipo"
          />
        </div>
      </div>

      <h2 className="mt-4">Requerimiento de energia para el Equipo</h2>
      <div className="mb-3 col-4">
        <label htmlFor="acdc" className="form-label">
          Tipo de Alimentación (AC/DC)
        </label>
        <input
          type="text"
          className="form-control"
          id="acdc"
          placeholder="Introduzca el valor"
        />
      </div>

      <div className="mb-3 col-4">
        <label htmlFor="current" className="form-label">
          Tensión de Alimentación (Voltios)
        </label>
        <input
          type="text"
          className="form-control"
          id="current"
          placeholder="Introduzca el valor"
        />
      </div>

      <div className="mb-3 col-4">
        <label htmlFor="watts" className="form-label">
          Potencia consumida por fuente de poder (w):
        </label>
        <input
          type="text"
          className="form-control"
          id="watts"
          placeholder="Introduzca el valor"
        />
      </div>

      <div className="mb-3 col-4">
        <label htmlFor="powersupply" className="form-label">
          Cantidad de Fuentes de Alimentación por equipo
        </label>
        <input
          type="text"
          className="form-control"
          id="powersupply"
          placeholder="Introduzca el valor"
        />
      </div>

      <div className="mb-3 col-4">
        <label htmlFor="temp" className="form-label">
          Rango de Temperatura de Operación del Equipo (°C)
        </label>
        <input
          type="text"
          className="form-control"
          id="temp"
          placeholder="Introduzca el valor"
        />
      </div>

      <div className="mb-3 col-4">
        <label htmlFor="btu" className="form-label">
          Disipación Térmica (BTU-Hr)
        </label>
        <input
          type="text"
          className="form-control"
          id="btu"
          placeholder="Introduzca el valor"
        />
      </div>
      <div>
        Configuración de Fuentes de Alimentación (1, n+1, 2n+1)
        <select class="form-select" aria-label="Default select example">
          <option selected>Open this select menu</option>
          <option value="1">1</option>
          <option value="2">n+1</option>
          <option value="3">2n+1</option>
          <option value="4">Descrita en observaciones</option>
        </select>
      </div>
    </>
  );
}

export default Equipment;
