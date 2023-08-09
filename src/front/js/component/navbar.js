import React from "react";
import { Link } from "react-router-dom";

export const Navbar = () => {
	return (
		<nav className="navbar navbar-light bg-light">
			<div className="container">
				<Link to="/">
					<span className="navbar-brand mb-0 h1">Solicitud Colocacion</span>
				</Link>
				<div className="ml-auto">
					<span>Bienvenido</span>
					<Link to="/demo">
						<button className="btn btn-primary">Nueva solicitud</button>
					</Link>
				</div>
			</div>
		</nav>
	);
};
