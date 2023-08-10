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
