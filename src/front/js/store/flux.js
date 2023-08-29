const getState = ({ getStore, getActions, setStore }) => {
	return {
		store: {
			selectedContract: localStorage.getItem("selectedContract") || [],
			selectedService: localStorage.getItem("selectedService") || [],
			clientName: localStorage.getItem("clientName") || [],
			clientName: localStorage.getItem("username") || [],
			clientName: localStorage.getItem("coordination") || [],
			userData: JSON.parse(localStorage.getItem("userData")) || [],
			
			name: "",

		},
		actions: {
			
			
			getUserData: async () => {
				const store = getStore();
				try {
					const response = await fetch(`${process.env.BACKEND_URL}/user`, {
						method: "GET",
						headers: {
							"Content-Type": "aplication/json",
							
						}
					});
					if (response.ok) {
						const responseData = await response.json();
						console.log("User data:", responseData);
						setStore({ userData: responseData });
						localStorage.setItem("userData", JSON.stringify(responseData));
					} else {
						console.log("Error fetching user data:", response.status);
					}
				} catch (error) {
					console.log("Error fetching user data:", error);
				}
			},

			SelectedComponents: (selectedContract, selectedService) => {
				const store = getStore();
				setStore({
					selectedContract,
					selectedService,
					// Other store properties...
				})
				localStorage.setItem("selectedContract", selectedContract)
				localStorage.setItem("selectedService", selectedService)

			},
			SelectedUsers: ( clientName, username, coordination) => {
				const store = getStore();
				setStore({
					clientName,
					username, 
					coordination
					// Other store properties...
				})
				localStorage.setItem("clientName", clientName)
				localStorage.setItem("username", username)
				localStorage.setItem("coordination", coordination)
			},
			


			addUser: async (user) => {
				const store = getStore();
				try {
					const response = await fetch(`${process.env.BACKEND_URL}/addUser`, {
						method: 'POST',
						headers: {
							'Content-Type': 'application/json',
						},
						body: JSON.stringify({ clientName }), // Envía el nombre del cliente al backend
					});
			
					if (response.ok) {
						// Puedes manejar la respuesta exitosa como desees
						console.log("Client added successfully");
						const data = await response.json();
						// Por ejemplo, podrías actualizar el estado con el nuevo cliente
						setStore({
							clients: [...store.clients, data.clientName]
						});
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
						headers: {
							"Content-Type": "application/json",
						},
						body: JSON.stringify(rack),
					});

					//const data = await response.json()

					// don't forget to return something, that is how the async resolves
					if (response.ok) {
						const data = await response.json(); // Parse the response body
						return data; // Return the parsed data
					} else {
						const errorData = await response.json(); // Parse the error response
						throw new Error(errorData.message); // Throw the error message from the backend
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
						headers: {
							"Content-Type": "application/json",
						},
						body: JSON.stringify(equipment),
					});

					if (response.ok) {
						const data = await response.json(); // Parse the response body
						return data; // Return the parsed data
					} else {
						const errorData = await response.json(); // Parse the error response
						throw new Error(errorData.message); // Throw the error message from the backend
					}

				} catch (error) {
					console.log("Error loading message from backend", error)
				}
			},

		}
	};
};

export default getState;
