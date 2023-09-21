const getState = ({ getStore, getActions, setStore }) => {
	return {
		store: {
			currentUser: JSON.parse(localStorage.getItem("currentUser")) || [],
			userData: JSON.parse(localStorage.getItem("userData")) || [],
			racksData: [],
			equipmentsData: [],
			equipmentByIdData: [],
			rackByIdData:[]

		},
		actions: {


			getUserData: async () => {
				const store = getStore();
				const currentUser = store.currentUser;

				try {

					const response = await fetch(`${process.env.BACKEND_URL}/user/${currentUser.user_id}`, {
						method: "GET",
						headers: {
							"Content-Type": "application/json",
						},
					});

					if (response.ok) {
						const responseData = await response.json();

						setStore({ userData: responseData });
						localStorage.setItem("userData", JSON.stringify(responseData));
					} else {
						console.log("Error fetching user data:", response.status);
					}
				} catch (error) {
					console.log("Error fetching user data:", error);
				}
			},

			addUser: async (user) => {
				const store = getStore();
				try {
					const response = await fetch(`${process.env.BACKEND_URL}/addUser`, {
						method: "POST",
						body: user,
					});

					if (response.ok) {
						const responseData = await response.json();
						setStore({ currentUser: responseData });
						localStorage.setItem("currentUser", JSON.stringify(responseData))
						;
						return response
					} else {
						// Manejo de errores en caso de respuesta no exitosa
						console.log("Error adding client:", response.statusText);
					}
				} catch (error) {
					// Manejo de errores en caso de fallo en la llamada
					console.log("Error adding client:", error.message);
				}
			},

			addRack: async (rack) => {
				const store = getStore()
				try {
					// fetching data from the backend
					const response = await fetch(`${process.env.BACKEND_URL}/rack`, {
						method: "POST",
						body: rack,
					});
					if (response.ok) {
						return response
					} else {
						console.log("Error adding rack:", response.statusText);
					}
				} catch (error) {
					console.log("Error loading message from backend", error)
				}
			},

			addEquipment: async (equipment) => {
				const store = getStore()
				try {
					// fetching data from the backend
					const response = await fetch(`${process.env.BACKEND_URL}/equipment`, {
						method: "POST",
						body: equipment,
					});

					if (response.ok) {
						// return data;
						return response; // Return the parsed data
					} else {
						console.log("Error adding equipment:", response.statusText);
					}
				} catch (error) {
					console.log("Error adding new equipment", error)
				}
			},

			getRackByUser: async () => {
				const store = getStore();
				const userId = store.currentUser.user_id
				try {
					const response = await fetch(`${process.env.BACKEND_URL}/rack/${userId}`, {
						method: "GET",
						headers: {
							"Content-Type": "aplication/json",
						}
					});
					if (response.ok) {
						const responseData = await response.json();
						// console.log("User data:", responseData);
						setStore({ racksData: responseData });
						return responseData;
					} else {
						console.log("Error fetching rack data:", response.status);
					}
				} catch (error) {
					console.log("Error fetching Rack data:", error);
				}
			},
			getEquipmentByUser: async () => {
				const store = getStore();
				const userId = store.currentUser.user_id; // Obtén el user_id del usuario actual

				try {
					const response = await fetch(`${process.env.BACKEND_URL}/equipment/${userId}`, {
						method: "GET",
						headers: {
							"Content-Type": "application/json",
						},
					});
					if (response.ok) {
						const responseData = await response.json();
						// Almacena los datos de los racks en el estado de la tienda
						setStore({ equipmentsData: responseData });
						return responseData; // Opcional: puedes devolver los datos para su posterior uso en el componente.
					} else {
						console.log("Error fetching equipment data:", response.status);
					}
				} catch (error) {
					console.log("Error fetching equipment data:", error);
				}
			},
			editEquipment: async (equipment, id) => {
				const store = getStore();
				try {
					const response = await fetch(`${process.env.BACKEND_URL}/equipment/${id}`, {
						method: 'PUT',
						headers: {
							'Content-Type': 'application/json', // Especifica el tipo de contenido JSON
						},
						body: JSON.stringify(equipment), // Convierte equipment a JSON
					});

					if (response.ok) {
						return response;
					} else {
						console.log("Error updating equipment", response.status);
						return response.status;
					}
				} catch (error) {
					console.log("Error updating equipment:", error);
				}
			},

			getEquipmentById: async (id) => {
				const store = getStore()
				try {
					const response = await fetch(`${process.env.BACKEND_URL}/get_equipment/${id}`, {
						method: "GET",
						headers: {
							"Content-Type": "application/json",
						},
					});


					if (response.ok) {
						const equipmentByIdData = await response.json();
						// Verificar si se obtuvieron datos válidos

						if (equipmentByIdData) {
							return equipmentByIdData; // Devuelve los datos del equipo encontrado
						} else {
							throw new Error("No se encontraron datos para el equipo con el ID proporcionado");
						}
					} else if (response.status === 404) {
						throw new Error("Equipo no encontrado"); // Manejo específico para el caso de equipo no encontrado
					} else {
						throw new Error(`Error al obtener el equipo: ${response.status}`);
					}
				} catch (error) {

					console.log("Error fetching equipment data:", error);
					throw error; // Propaga el error para que el componente pueda manejarlo
				}
			},

			editRack: async (rack, id) => {
				const store = getStore();
				try {
					const response = await fetch(`${process.env.BACKEND_URL}/rack/${id}`, {
						method: 'PUT',
						headers: {
							'Content-Type': 'application/json', // Especifica el tipo de contenido JSON
						},
						body: JSON.stringify(rack), // Convierte rack a JSON
					});

					if (response.ok) {
						return response;
					} else {
						console.log("Error updating rack", response.status);
						return response.status;
					}
				} catch (error) {
					console.log("Error updating rack:", error);
				}
			},

			getRackById: async (id) => {
				const store = getStore()
				try {
					const response = await fetch(`${process.env.BACKEND_URL}/get_rack/${id}`, {
						method: "GET",
						headers: {
							"Content-Type": "application/json",
						},
					});


					if (response.ok) {
						const rackByIdData = await response.json();
						// Verificar si se obtuvieron datos válidos

						if (rackByIdData) {
							return rackByIdData; // Devuelve los datos del rack encontrado
						} else {
							throw new Error("No se encontraron datos para el rack con el ID proporcionado");
						}
					} else if (response.status === 404) {
						throw new Error("rack no encontrado"); // Manejo específico para el caso de rack no encontrado
					} else {
						throw new Error(`Error al obtener el rack: ${response.status}`);
					}
				} catch (error) {

					console.log("Error fetching rack data:", error);
					throw error; // Propaga el error para que el componente pueda manejarlo
				}
			},

			deleteEquipment: async (id)=>{
				const store=getStore()
				try {
					let response = await fetch(`${process.env.BACKEND_URL}/equipment/${id}`,{
						method:'DELETE',
						headers:{'Content-Type': 'application/json'}
					})
					if (response.ok){
						getActions().getEquipmentByUser()
						return response
					}else{
						console.log("erorr deleting equipment", response.status)
					}
					
				} catch (error) {
					console.log("error Borrando equipo:", error)
					return null
				}
			},
			deleteRack: async (id)=>{
				const store=getStore()
				try {
					let response = await fetch(`${process.env.BACKEND_URL}/rack/${id}`,{
						method:'DELETE',
						headers:{'Content-Type': 'application/json'}
					})
					if (response.ok){
						getActions().getRackByUser()
						return response
					}else{
						console.log("erorr deleting rack", response.status)
					}
					
				} catch (error) {
					console.log("error Borrando rack:", error)
					return null
				}
			},
			deleteAll: async ()=>{
				const store =getStore()
				try {
					let response= await fetch(`${process.env.BACKEND_URL}/delete_all`)
				} catch (error) {
					console.log("error borrando todo")
					
				}

			}

		}
	};
};

export default getState;
