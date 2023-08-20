import React, { useContext} from "react";
import { Link } from "react-router-dom";
import { Context } from "../store/appContext";

export const Navbar = () => {
  const { store, actions } = useContext(Context)
	return (
		<>
		<nav className="navbar navbar-expand-lg bg-body-tertiary">
  <div className="container-fluid">
    <Link to="/newtask" className="navbar-brand" >Solicitud Colocacion DCCE</Link>
    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
      <span className="navbar-toggler-icon"></span>
    </button>
    <div className="collapse navbar-collapse" id="navbarNav">
      <ul className="navbar-nav">
        {store.token &&(<>
        <li className="nav-item">
          <Link className="nav-link active" aria-current="page" to="/newtask">Nueva Solicitud</Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link" to="/consult">Consulta</Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link" to="#">FAQ</Link>
        </li>
       </>)}
      </ul>
    </div>
  </div>
</nav>
		</>
				
	);
};
