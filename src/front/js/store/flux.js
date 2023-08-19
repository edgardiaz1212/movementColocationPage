const getState = ({ getStore, getActions, setStore }) => {
	return {
		store: {
			selectedContract: localStorage.getItem("selectedContract") || [],
			selectedService:localStorage.getItem("selectedService") || [],
			clientName: localStorage.getItem("clientName") || [],
			userData: JSON.parse(localStorage.getItem("userData")) || [],
			token: localStorage.getItem("token") || null,
			name: "",

		},
		actions: {
			
			login:async(body)=>{
				const store = getStore();
				try {
					let response = await fetch(`${process.env.BACKEND_URL}/user`, {
					method: 'POST',
					headers: {
						"Content-Type": "application/json",
					},
					body: JSON.stringify(body),
				})
				let data =await response.json()
				if (response.ok) {
					setStore({
						token: data.token,
						name: data.name,
						
					});
					localStorage.setItem("token", data.token)
					localStorage.setItem("alias", data.alias)
					getActions().getUserData()
				}
				} catch (error) {
					console.log("login",error)
				}
				
			},
			getUserData: async () => {
				const store = getStore();
				try {
					const response = await fetch(`${process.env.BACKEND_URL}/user/by-alias`, {
						method: "GET",
						headers: {
							"Content-Type": "aplication/json",
							"Authorization": `Bearer ${store.token}`
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
			
			SelectedComponents: (selectedContract, selectedService, clientName) => {
				const store = getStore();
				setStore({
				  selectedContract,
				  selectedService,
				  clientName,
				  // Other store properties...
				})
				localStorage.setItem("selectedContract", selectedContract)
				localStorage.setItem("selectedService", selectedService)
				localStorage.setItem("clientName", clientName)
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

					const data = await response.json()

					// don't forget to return something, that is how the async resolves
					return data;
				} catch (error) {
					console.log("Error loading message from backend", error)
				}
			},
			addEquipment: async (rack) => {
				const store = getStore()
				try {
					// fetching data from the backend
					const response = await fetch(`${process.env.BACKEND_URL}/equipment`, {
						method: "POST",
						headers: {
							"Content-Type": "application/json",
						},
						body: JSON.stringify(rack),
					});

					const data = await response.json()

					// don't forget to return something, that is how the async resolves
					return data;
				} catch (error) {
					console.log("Error loading message from backend", error)
				}
			},

		}
	};
};

export default getState;
