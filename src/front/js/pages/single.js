import React, { useState, useEffect, useContext } from "react";
import PropTypes from "prop-types";
import { Link, useParams } from "react-router-dom";
import { Context } from "../store/appContext";
import rigoImageUrl from "../../img/rigo-baby.jpg";

export const Single = props => {
	

	return (
		
			<h1 className="display-4">This will show the demo element: {store.demo[params.theid].title}</h1>
			
	);
};


