const getState = ({ getStore, getActions, setStore }) => {
	return {
		store: {
			clientName: JSON.parse(localStorage.getItem("clientName")) || "",
            selectedContract: JSON.parse(localStorage.getItem("selectedContract")) || "",
            selectedService: JSON.parse(localStorage.getItem("selectedService")) || ""

		},
		actions: {
			
			saveFormData: (clientName, selectedContract, selectedService) => {
				const store = getStore();
				setStore({
				  ...store,
				  finalclient: clientName,
				  contractservice: selectedContract,
				  servicetype: selectedService
				});
				localStorage.setItem("clientName", JSON.stringify(clientName));
                localStorage.setItem("selectedContract", JSON.stringify(selectedContract));
                localStorage.setItem("selectedService", JSON.stringify(selectedService));
			  },
			
			addNewRack: async()=>{
				try {
					const formData =new FormData()
					formData.append("model",data_form.get("model"))
					formData.append("brand",data_form.get("brand")),
					formData.append("serial",data_form.get("serial")),
					formData.append("number_part",data_form.get("number_part")),
					formData.append("service",data_form.get("service")),
					formData.append("five_years_prevition",data_form.get("five_years_prevition")),
					formData.append("contract",data_form.get("contract")),
					formData.append("observations",data_form.get("observations")),
					formData.append("activity",data_form.get("activity")),
					formData.append("has_cabinet",data_form.get("has_cabinet")),
					formData.append('leased',data_form.get ('leased')),
					formData.append('total_cabinets',data_form.get ('total_cabinets')),
					formData.append('open_closed',data_form.get ('open_closed')),
					formData.append('security',data_form.get('security')) ,
					formData.append('type_security',data_form.get('type_security')) ,
					formData.append('has_extractors',data_form.get ('has_extractors')),
					formData.append('extractors_ubication',data_form.get('extractors_ubication')),
					formData.append('modular',data_form.get ('modular')),
					formData.append('lateral_doors',data_form.get('lateral_doors')) ,
					formData.append('lateral_ubication',data_form.get('lateral_ubication')) ,
					formData.append('rack_unit',data_form.get('rack_unit')) ,
					formData.append('rack_position',data_form.get('rack_position')) ,
					formData.append('has_accessory',data_form.get('has_accessory')) ,
					formData.append('accessory_description',data_form.get('accessory_description')) ,
					formData.append('rack_width',data_form.get('rack_width')) ,
					formData.append('rack_length',data_form.get('rack_length')) ,
					formData.append('rack_height',data_form.get('rack_height')) ,
					formData.append('internal_pdu',data_form.get('internal_pdu')) ,
					formData.append('input_connector',data_form.get('input_connector')) ,
					formData.append('fases',data_form.get('fases')) ,
					formData.append('output_connector',data_form.get('output_connector')),
					formData.append('neutro',data_form.get('neutro')),
					formData.append('client',data_form.get('client'))
					
					const response = await actions.addRack(formData)
					 
				} catch (error) {
					console.log("newrack: ",error)
					
				}
			},

			addRack: async (rack) => {
				const store = getStore()
				try{
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
				}catch(error){
					console.log("Error loading message from backend", error)
				}
			},
			
		}
	};
};

export default getState;
