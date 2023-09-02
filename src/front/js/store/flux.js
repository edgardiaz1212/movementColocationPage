const getState = ({ getStore, getActions, setStore }) => {
	return {
		store: {
			currentUser: JSON.parse(localStorage.getItem("currentUser")) || [],
			userData: JSON.parse(localStorage.getItem("userData")) || [],

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
						headers: {
							"Content-Type": "application/json",
						},
						body: rack,
					});

					//const data = await response.json()

					// don't forget to return something, that is how the async resolves
					if (response.ok) {
						const data = await response.json(); // Parse the response body
						return response.status; // Return the parsed data
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
						body: equipment,
					});

					if (response.ok) {
						// return data;
						return response; // Return the parsed data
					} else {
						console.log("Error adding equipment:", response.statusText);
					}
				} catch (error) {
					console.log("Error adding new rquipment", error)
				}
			},

			addDescription: async (description) =>{}

		}
	};
};

export default getState;
