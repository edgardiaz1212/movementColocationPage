import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { Context } from '../store/appContext'
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const initialState = {
	username: "",
	email: "",
	coordination: "",
	clientName: "",
	contract: "",
	service: "",

}
export const Home = () => {

	const { store, actions } = useContext(Context);
	const [showSection, setShowSection] = useState(false)
	const [newUser, setNewUser] = useState(initialState)
	const [emptyFields, setEmptyFields] = useState({
		clientName: false,
		email: false,
		coordination: false,
		username: false
	})
	const handleChange = ({ target }) => {
		setNewUser({ ...newUser, [target.name]: target.value })
	};

	const handleSections = () => {
		const requiredFields = ["username", "coordination", "email", "clientName"];
		const newEmptyFields = {};
		let fieldsAreEmpty = false;

		requiredFields.forEach((field) => {
			if (!newUser[field]) {
				newEmptyFields[field] = true;
				fieldsAreEmpty = true;
			} else {
				newEmptyFields[field] = false;
			}
		});

		if (fieldsAreEmpty) {
			console.log("faltan datos");
			toast.error("Llene todos los campos");
		} else {
			setShowSection(true);
		}
		setEmptyFields(newEmptyFields);
	};


	const handleAddAll = async () => {
		if (!newUser.contract || !newUser.service) {
			console.log("faltan datos")
			toast.error("Llene todos los campos")
			return
		}
		try {
			const formData = new FormData()
			formData.append("email", newUser.email)
			formData.append("coordination", newUser.coordination)
			formData.append("username", newUser.username)
			formData.append("clientName", newUser.clientName)
			formData.append("contract", newUser.contract)
			formData.append("service", newUser.service)

			const response = await actions.addUser(formData)
			//await actions.getUserData()
			if (response == 200 || 201) {
				console.log("Data registrada");
			} else {
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

				{!showSection ? (
					<>
						<h1>Bienvenido al Sistema de Gestion de </h1>
						<h1>Solicitudes de Colocacion DCCE</h1>
						<h2>Aca podras registrar de manera sencilla las solicitudes de los clientes del DCCE </h2>

						<h2>Te invitamos a aclarar dudas  </h2>

						<div className="accordion accordion-flush" id="accordionFlushExample">
							<div className="accordion-item">
								<h2 className="accordion-header">
									<button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#flush-collapseOne" aria-expanded="false" aria-controls="flush-collapseOne">
									¿Por qué es crucial completar todos los campos del formato de Solicitud de Adecuación de Espacio?
									</button>
								</h2>
								<div id="flush-collapseOne" className="accordion-collapse collapse" data-bs-parent="#accordionFlushExample">
									<div className="accordion-body"> 
									Es fundamental completar todos los campos del formato para garantizar que se cuente con la información necesaria 
									para evaluar y aprobar la conexión de los equipos solicitados. 
									Además, el llenado completo del formulario facilita el estudio de rentabilidad de cada caso</div>
								</div>
							</div>
							<div className="accordion-item">
								<h2 className="accordion-header">
									<button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#flush-collapseTwo" aria-expanded="false" aria-controls="flush-collapseTwo">
									¿Por qué se recomienda adjuntar la hoja técnica o Datasheet de cada equipo en la solicitud?
									</button>
								</h2>
								<div id="flush-collapseTwo" className="accordion-collapse collapse" data-bs-parent="#accordionFlushExample">
									<div className="accordion-body">
									Adjuntar la hoja técnica de cada equipo es fundamental para proporcionar detalles técnicos precisos sobre los equipos a instalar o trasladar. 
									Esto facilita la evaluación de los requerimientos de energía, espacio y otros aspectos necesarios para la adecuación del espacio.
										</div>
								</div>
							</div>
							<div className="accordion-item">
								<h2 className="accordion-header">
									<button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#flush-collapseThree" aria-expanded="false" aria-controls="flush-collapseThree">
									¿Qué precauciones se deben tomar al instalar equipos con una sola fuente de energía según las notas del formato? 
									</button>
								</h2>
								<div id="flush-collapseThree" className="accordion-collapse collapse" data-bs-parent="#accordionFlushExample">
									<div className="accordion-body">
									Se recomienda tomar previsiones adicionales al instalar equipos con una sola fuente de energía, 
									ya que carecen de redundancia y representan un riesgo para el solicitante. 
									Es importante considerar medidas de seguridad y continuidad en caso de fallos en la fuente de energía principal.
									  </div>
								</div>
							</div>
						</div>

						<div className={`m-auto col-lg-3 col-sm-12 ${emptyFields.username ? 'is-invalid' : ''}`}>
							<label htmlFor="username" className="form-label">
								Solicitante Cantv
							</label>
							<input
								type="text"
								className={`form-control ${emptyFields.username ? 'is-invalid' : ''}`}
								id="username"
								name="username"
								placeholder="Ingrese su Nombre y Apellido"
								value={newUser.username}
								onChange={handleChange}
							/>
						</div>
						<div className={`m-auto col-lg-3 col-sm-12 ${emptyFields.coordination ? 'is-invalid' : ''}`}>
							<label htmlFor="coordination" className="form-label">
								Coordinacion o Unidad a la que pertenece
							</label>
							<input
								type="text"
								className={`form-control ${emptyFields.coordination ? 'is-invalid' : ''}`}
								id="coordination"
								name="coordination"
								placeholder="Ingrese la unidad en la que labora"
								value={newUser.coordination}
								onChange={handleChange}
							/>
						</div>
						<div className={`m-auto col-lg-3 col-sm-12 ${emptyFields.email ? 'is-invalid' : ''}`}>
							<label htmlFor="coordination" className="form-label">
								email
							</label>
							<input
								type="text"
								className={`form-control ${emptyFields.email ? 'is-invalid' : ''}`}
								id="email"
								name="email"
								placeholder="Ingrese su email"
								value={newUser.email}
								onChange={handleChange}
							/>
						</div>
						<div className={`m-auto col-lg-3 col-sm-12 ${emptyFields.clientName ? 'is-invalid' : ''}`}>
							<label htmlFor="clientName" className="form-label">
								Nombre del Cliente Final
							</label>
							<input
								type="text"
								className={`form-control ${emptyFields.clientName ? 'is-invalid' : ''}`}
								id="clientName"
								name="clientName"
								placeholder="Ingrese el nombre del cliente final"
								value={newUser.clientName}
								onChange={handleChange}
							/>
						</div>

						<button className="button-next mx-auto mt-4"
							onClick={handleSections}>
							Próximo paso
							<svg viewBox="0 0 16 16" className="bi bi-arrow-right" fill="currentColor" height="20" width="20" xmlns="http://www.w3.org/2000/svg">
								<path d="M1 8a.5.5 0 0 1 .5-.5h11.793l-3.147-3.146a.5.5 0 0 1 .708-.708l4 4a.5.5 0 0 1 0 .708l-4 4a.5.5 0 0 1-.708-.708L13.293 8.5H1.5A.5.5 0 0 1 1 8z" fill-rule="evenodd"></path>
							</svg>
						</button>


					</>
				) : (
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
								<option value="Colocacion no Catalogado">Colocacion no Catalogado</option>
								<option value="Colocacion Catalogado">Colocacion Catalogado</option>
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
								<option value="Instalacion">Instalacion</option>
								<option value="Retiro">Retiro</option>
								<option value="Desincorporacion">Desincorporacion</option>
								<option value="Mudanza">Mudanza</option>
							</select>

							{newUser.service && (
								<div className="p-3">
									{newUser.contract === "Colocacion Catalogado" && (<>
										<Link to="/equipment">
											<button className="button_add" onClick={handleAddAll}>
												<span>
													<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24"><path fill="none" d="M0 0h24v24H0z"></path><path fill="currentColor" d="M11 11V5h2v6h6v2h-6v6h-2v-6H5v-2z"></path></svg>
													Agregar Equipo
												</span>
											</button></Link>
									</>
									)}
									{newUser.contract === "Colocacion no Catalogado" && (
										<>

											<Link to="/rack">
												<button className="button_add me-3" onClick={handleAddAll}>
													<span>
														<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24"><path fill="none" d="M0 0h24v24H0z"></path><path fill="currentColor" d="M11 11V5h2v6h6v2h-6v6h-2v-6H5v-2z"></path></svg>
														Agregar Rack
													</span>
												</button>
											</Link>
											{/* <Link to="/equipment"
												className="btn btn-primary"
												onClick={handleAddAll}
											>
												Agregar Equipo</Link> */}
											<Link to="/equipment">
												<button className="button_add" onClick={handleAddAll}>
													<span>
														<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24"><path fill="none" d="M0 0h24v24H0z"></path><path fill="currentColor" d="M11 11V5h2v6h6v2h-6v6h-2v-6H5v-2z"></path></svg>
														Agregar Equipo
													</span>
												</button></Link>

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