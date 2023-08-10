import React, { useContext } from "react";
import { Context } from "../store/appContext";
import rigoImageUrl from "../../img/rigo-baby.jpg";
import { Link } from "react-router-dom";
import "../../styles/home.css";

export const Home = () => {
	const { store, actions } = useContext(Context);

	return (
		<div className="text-center mt-5">
			<h1>Solicitud</h1>
			<div>
        Tipo de servicio
        <select class="form-select" aria-label="Default select example">
          <option selected>Open this select menu</option>
          <option value="1">Colocacion en Rack</option>
          <option value="2">Colocacion Catalogado</option>
          
          
        </select>
      </div>
			
			<Link to='/rack'>
				<button>Agregar Rack</button>
			</Link>
			<Link to='/equipment'>
				<button>Agregar Equipo</button>
			</Link>
			
			
			<p className="alert alert-info">
				Tu solicitud
			</p>
			
			<p>
				This boilerplate comes with lots of documentation:{" "}
				<a href="https://start.4geeksacademy.com/starters/react-flask">
					Read documentation
				</a>
			</p>
		</div>
	);
};
