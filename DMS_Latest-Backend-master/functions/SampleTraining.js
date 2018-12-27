'use strict'

const Model = require('../models/SampleModel');

exports.PostData = (userName,password) =>

	new Promise((resolve, reject) => {
        console.log("check userName,password property",userName,password)  // accepting data 

        
        
        const newData = new Model({
            "username":userName,
            "password":password
		});
	

		newData.save()
			.then((data) => resolve({
                status: 200,
                data:data
			}))
			.catch(err => {
				return "500"
			})


	});