const getState = ({ getStore, getActions, setStore }) => {
	return {
		store: {
			token: localStorage.getItem("token") || null,
			
		},
		actions: {
			

			addRack: async (rack) => {
				const store = getStore()
				try{
					// fetching data from the backend
					const response = await fetch(`${process.env.BACKEND_URL}/rack`),{
						method: "POST",
						headers:{
							// Authorization:`Bearer ${store.token}`
						}, 
						body:rack
					}
					const data = await response.json()
					
					// don't forget to return something, that is how the async resolves
					return data;
				}catch(error){
					console.log("Error loading message from backend", error)
				}
			},
			
		}
	};
};

export default getState;
