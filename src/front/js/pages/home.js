import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { Context } from '../store/appContext'
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const initialState={
	username: "",
	email: "",
	coordination: "",
	clientName: "",
	contract: "",
	service: "",

}
export const Home = () => {

	const { store, actions } = useContext(Context);
	const [showSection, setShowSection] =useState(false)
	const [newUser, setNewUser]= useState(initialState)
	
	const handleChange = ({ target }) => {
		setNewUser({ ...newUser, [target.name]: target.value })
	  };
	
	const handleSections =() =>{
		if (!newUser.clientName || !newUser.email || !newUser.coordination || !newUser.username){
			console.log("faltan datos")
			toast.error("Llene todos los campos")
			return}
		setShowSection(true)
	}

	const handleAddAll = async () => {
		if (!newUser.contract || !newUser.service){
			console.log("faltan datos")
			toast.error("Llene todos los campos")
			return
		}
		try {
			const formData =new FormData()
			formData.append("email",newUser.email)
			formData.append("coordination", newUser.coordination)
			formData.append("username", newUser.username)
			formData.append("clientName",newUser.clientName)
			formData.append("contract", newUser.contract)
			formData.append("service",newUser.service)

			const response = await actions.addUser(formData)
			//await actions.getUserData()
			if (response == 200 || 201){
				console.log("Data registrada");
			}else{
				toast.error("Error registrando")
			}
		} catch (error) {
			console.log("Error en la solicitud de registro:", error)
		}

		
	};

	return (
		<>
		<ToastContainer theme="dark" position="top-center" pauseOnFocusLoss={false} autoClose={3000} hideProgressBar />
		<div className="container text-center mt-5">

			{!showSection ?(
			<>
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
						value={newUser.username}
						onChange={handleChange}
					/>
				</div>
				<div className="m-auto col-4">
					<label htmlFor="coordination" className="form-label">
						Coordinacion o Unidad a la que pertenece
					</label>
					<input
						type="text"
						className="form-control"
						id="coordination"
						name="coordination"
						placeholder="Ingrese la unidad enla que labora"
						value={newUser.coordination}
						onChange={handleChange}
					/>
				</div>
				<div className="m-auto col-4">
					<label htmlFor="coordination" className="form-label">
						email
					</label>
					<input
						type="text"
						className="form-control"
						id="email"
						name="email"
						placeholder="Ingrese su email"
						value={newUser.email}
						onChange={handleChange}
					/>
				</div>
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
						value={newUser.clientName}
						onChange={handleChange}
					/>
				</div>
				<button className="btn btn-primary m-4" 
				onClick={handleSections}
				>Anadir</button>
			</>
			):(
			<>
				<h1>Detalles de la solicitud</h1>
				<div className="container">
					Tipo de Contrato
					<select
						className="form-select"
						aria-label="Default select example"
						id="contract"
						name="contract"
						onChange={handleChange}
						value={newUser.contract}
					>
						<option value="">Seleccionar Contrato</option>
						<option value="Rack">Colocacion en Rack</option>
						<option value="catalogado">Colocacion Catalogado</option>
					</select>
				</div>

				
					<div>
						<div>Tipo de actividad</div>
						<select
							className="form-select"
							aria-label="Default select example"
							onChange={handleChange}
							id="service"
							name="service"
							value={newUser.service}
						>
							<option value="">Seleccionar servicio</option>
							<option value="instalacion">Instalacion</option>
							<option value="retiro">Retiro</option>
							<option value="desincorporacion">Desincorporacion</option>
							<option value="mudanza">Mudanza</option>
						</select>

						{newUser.service && (
							<div className="p-3">
								{newUser.contract === "Rack" && (
									<Link to="/equipment"
									className="btn btn-primary"
									onClick={handleAddAll}
								>
									Agregar Equipo</Link>
								)}
								{newUser.contract === "catalogado" && (
									<>
										
											<Link to="/rack"
												className="btn btn-primary m-1"
												onClick={handleAddAll}
											>
												Agregar Rack</Link>
										
										<Link to="/equipment"
												className="btn btn-primary"
												onClick={handleAddAll}
											>
												Agregar Equipo</Link>
										
									</>
								)}
							</div>
						 )} 
					</div>
				  
			</>
			)}
		</div>
		</>
	);
}