const getState = ({ getStore, getActions, setStore }) => {
	return {
		store: {
			currentUser: JSON.parse(localStorage.getItem("currentUser")) || [],
			userData: JSON.parse(localStorage.getItem("userData")) || [],
			racksData: [],
			equipmentsData: []

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
						console.log("Client added successfully");
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
						// localStorage.setItem("userData", JSON.stringify(responseData));
					} else {
						console.log("Error fetching user data:", response.status);
					}
				} catch (error) {
					console.log("Error fetching user data:", error);
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
						console.log("Error fetching rack data:", response.status);
					}
				} catch (error) {
					console.log("Error fetching rack data:", error);
				}
			},
			editEquipment: async (equipment) => {
				const store = getStore()
				try {
					const response = await fetch(`${process.env.BACKEND_URL}/equipment/${equipment.id}`, {
						method: 'PUT',
						body:equipment
					}
				)
					if (response.ok){
						return response
				}else {
					console.log("Error updating social media")
					return response.status
				}
			} catch (error) {
					console.log("Error updating equipment:", error)
				}
			}






		}
	};
};

export default getState;
