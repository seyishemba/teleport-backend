The endpoint of AWS Gateway API is https://rr1miu5snd.execute-api.eu-north-1.amazonaws.com/default/api-lambda-docusign.
The request to this endpoint will trigger the lambda function which will be integrated with Docusign API.
In all cases of request to the endpoint, the headers are same.

1. Get the list of templates

-Make a GET request with headers as below to this endpoint to get the list 

headers: {
	x-api-key: 4i3WIR9kCD1gRz1uvHvBb3hBTGtQyDyP6lZIz587
}

2. Copy the pre-existing template to make a new template

-Make a POST request to this endpoint

headers: {
	x-api-key: 4i3WIR9kCD1gRz1uvHvBb3hBTGtQyDyP6lZIz587
}

body: {
	"action":"copy",
    	"newName":"template8", //name of the new template
    	"templateId": "aa2b55d6-baa1-4fad-baeb-2d0f78ac4399" // ID of the template to be copied
}


3. Delete a template

-Make a POST request to the endpoint

headers: {
	x-api-key: 4i3WIR9kCD1gRz1uvHvBb3hBTGtQyDyP6lZIz587
}

body: {
	"action":"delete",
      	"templateId": "12554519-2239-4c04-9a07-5b6268567c88" // ID of the template to be removed
}


4. Create and Send the envelop to the client

-Make a POST request to the endpoint

headers: {
	x-api-key: 4i3WIR9kCD1gRz1uvHvBb3hBTGtQyDyP6lZIz587
}

body: {
	"action":"contract",
    	"signer1_Email":"kenn@kennpalm.com", // email address of the first signer
    	"signer1_Name":"Kenn Palm",		// name of the first signer
    	"signer2_Email":"procosep@gmail.com", // email address of the second signer
    	"signer2_Name":"Marcos Oliveria",	// name of the second signer
    	"ccEmail":"procosep@gmail.com",		// email address of the receiver who receivers the copy of signed contract
    	"ccName":"Good Dev",			// name of the receiver
    	"title": "NiteTrain Coach Driver Compensation Guidelines", // title or subtitle of the contract which is optional according to the structure of the contract
    	"templateId": "a363bc15-c35e-461f-a430-e3e9bc2315d3"       // ID of the template to be used to create an envelop

}

- In case of sending an envelope, the payload above should be changed according to structure of a template to be used.
The sender has to get the list of templates before choosing a specific template to be used, and make a change to this payload before sending a contract. 
For example, given that the selected template has one signing field and has no the title field to be replaced, the payload might look like below.

body: {
	"action":"contract",
    	"signer1_Email":"kenn@kennpalm.com", // email address of the first signer
    	"signer1_Name":"Kenn Palm",		// name of the first signer
    	"ccEmail":"procosep@gmail.com",		// email address of the receiver who receivers the copy of signed contract
    	"ccName":"Good Dev",			// name of the receiver
    	"templateId": "a363bc15-c35e-461f-a430-e3e9bc2315d3"       // ID of the template to be used to create an envelope

}