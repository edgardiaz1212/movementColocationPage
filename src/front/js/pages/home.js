import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { Context } from '../store/appContext'

export const Home = () => {

	const { store, actions } = useContext(Context);
	const [selectedContract, setSelectedContract] = useState(store.contractservice);
    const [selectedService, setSelectedService] = useState(store.servicetype);
    const [clientName, setClientName] = useState(store.finalclient);

	const handleContractChange = (event) => {
		setSelectedContract(event.target.value); // Actualiza el estado con el tipo de servicio seleccionado
	};

	const handleServiceChange = (event) => {
		setSelectedService(event.target.value);
	};
	const handleAddRequest = () => {
		// Dispara la acción para guardar los datos en el store
		actions.saveFormData(selectedContract, selectedService, clientName);
	};
	const handleClientNameChange = (event) => {
		setClientName(event.target.value);
	  };
	return (
		<div className="container text-center mt-5">
			<h1>Solicitud</h1>

			<div className="container">
				Tipo de Contrato
				<select
					className="form-select"
					aria-label="Default select example"
					onChange={handleContractChange}
				>
					<option value="">Seleccionar Contrato</option>
					<option value="colRack">Colocacion en Rack</option>
					<option value="colCatalogado">Colocacion Catalogado</option>
				</select>
			</div>

			{selectedContract && (
				<div>
					<div>Tipo de actividad</div>
					<select
						className="form-select"
						aria-label="Default select example"
						onChange={handleServiceChange}
					>
						<option value="">Seleccionar servicio</option>
						<option value="instalacion">Instalacion</option>
						<option value="retiro">Retiro</option>
						<option value="desincorporacion">Desincorporacion</option>
						<option value="mudanza">Mudanza</option>
					</select>
					<div className="m-auto col-4">
						<label htmlFor="finalClient" className="form-label">
							Nombre del Cliente Final
						</label>
						<input
							type="text"
							className="form-control"
							id="finalClient"
							placeholder="Ingrese el nombre del cliente final"
							value={clientName}
							onChange={handleClientNameChange}
						/>
					</div>
					{selectedService && (
						<div>
							{selectedContract === "colRack" && (
								<Link to="/rack">
									<button onClick={handleAddRequest}>Agregar Rack</button>
								</Link>
							)}
							{selectedContract === "colCatalogado" && (
								<>
									<Link to="/rack">
										<button onClick={handleAddRequest}>Agregar Rack</button>
									</Link>
									<Link to="/equipment">
										<button onClick={handleAddRequest}>Agregar Equipo</button>
									</Link>
								</>
							)}
						</div>
					)}
				</div>
			)}

			<p className="alert alert-info">Tu solicitud</p>

			<p>
				This boilerplate comes with lots of documentation:{" "}
				<a href="https://start.4geeksacademy.com/starters/react-flask">
					Read documentation
				</a>
			</p>
		</div>
	);
};