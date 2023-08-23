import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { Context } from '../store/appContext'

export const Home = () => {

	const { store, actions } = useContext(Context);
	const [selectedContract, setSelectedContract] = useState("");
	const [selectedService, setSelectedService] = useState("");
	const [clientName, setClientName] = useState("");
	const [clientAdded, setClientAdded] = useState(false); // Estado para controlar si el cliente ha sido añadido
	const [username, setUsername] = useState(""); 
    const [coordination, setCoordination] = useState(""); 

	const handleContractChange = (event) => {
		setSelectedContract(event.target.value); // Actualiza el estado con el tipo de servicio seleccionado
	};

	const handleServiceChange = (event) => {
		setSelectedService(event.target.value);
	};

	const handleClientNameChange = (event) => {
		setClientName(event.target.value);
	};

	const handleUsernameChange = (event) => { 
        setUsername(event.target.value);
    };

    const handleCoordinationChange = (event) => { 
        setCoordination(event.target.value)}

	const handleAddClient = async () => {
		try {
			// Realiza una llamada a la acción para agregar el cliente
			await actions.addClient(clientName);
	
			// Marca el cliente como agregado
			setClientAdded(true);
	
			// También podrías mostrar un mensaje de éxito o hacer otras acciones necesarias
			// por ejemplo, mostrar una notificación o redirigir al usuario a la siguiente página.
		} catch (error) {
			// Manejo de errores en caso de que la llamada falle
			console.error("Error al agregar el cliente:", error);
			// Aquí podrías mostrar un mensaje de error o tomar otras medidas apropiadas
		}
	};
	const handleAddAll = () => {
		actions.SelectedComponents(selectedContract, selectedService, clientName, username, coordination);
	};

	return (
		<div className="container text-center mt-5">
			
			<h1>Bienvenido al Sistema de Gestion de Solicitudes de Colocacion DCCE</h1>
			<div className="m-auto col-4">
						<label htmlFor="username" className="form-label">
							Solicitante Cantv
						</label>
						<input
							type="text"
							className="form-control"
							id="username"
							name="username"
							placeholder="Ingrese su Nombre y Apellido"
							value={username}
							onChange={handleUsernameChange}
						/>
					</div>
					<div className="m-auto col-4">
						<label htmlFor="coordination" className="form-label">
							Unidad Cantv
						</label>
						<input
							type="text"
							className="form-control"
							id="coordination"
							name="coordination"
							placeholder="Ingrese la unidad enla que labora"
							value={coordination}
							onChange={handleCoordinationChange}
						/>
					</div>
			
			
			{!clientAdded && (<>
			<h3>Verificar Cliente</h3>
			<div className="m-auto col-4">
						<label htmlFor="clientName" className="form-label">
							Nombre del Cliente Final
						</label>
						<input
							type="text"
							className="form-control"
							id="clientName"
							name="clientName"
							placeholder="Ingrese el nombre del cliente final"
							value={clientName}
							onChange={handleClientNameChange}
						/>
					</div>
					<button className="btn btn-primary m-4" onClick={handleAddClient}>Anadir</button>
			</>)}
			{clientAdded && (<>
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
					
					{selectedService && (
						<div>
							{selectedContract === "colRack" && (
								<Link to="/equipment">
									<button
										className="btn btn-primary"
										onClick={handleAddAll}
									>
										Agregar Equipo
									</button>
								</Link>
							)}
							{selectedContract === "colCatalogado" && (
								<>
									<Link to="/rack">
										<button
											className="btn btn-primary"
											onClick={handleAddAll}
										>
											Agregar Rack</button>
									</Link>
									<Link to="/equipment">
										<button
											className="btn btn-primary"
											onClick={handleAddAll}
										>
											Agregar Equipo</button>
									</Link>
									
								</>
							)}
						</div>
					)}
				</div>
			)}
			</>)}

			<p className="alert alert-info">Tu solicitud</p>

			
		</div>
	);
							}