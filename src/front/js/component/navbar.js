import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { Context } from "../store/appContext";

export const Navbar = () => {
  const { store, actions } = useContext(Context)
  return (
    <>
      <header id="header" className="header">
        <nav className="main-nav navbar-expand-md" role="navigation"    >
          <div className="container-fluid position-relative">

            <Link to="/" className="logo navbar-brand text-white" >
              <span class="logo-icon-wrapper">
                <img class="logo-icon" src="../../../../cantv.ico" alt="icon" />
              </span>
              <span class="text highlight">Planilla FOR-BA7D</span>
            </Link>

            <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
              <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarNav">
              <ul className="navbar-nav">


              </ul>
            </div>
          </div>
        </nav>
      </header>
    </>

  );
};
