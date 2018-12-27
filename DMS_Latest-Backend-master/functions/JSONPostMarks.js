'use strict'

const StoreData = require('../models/StoreData');
var nem = require("nem-sdk").default;

exports.PostDataChain = (Marks,Seat_Number, status, candiName, motherName,  fatherName,schoolCode, schoolName, userId, TypeOform) =>

	new Promise(async (resolve, reject) => {
		var sum = 0;
		console.log("Exception===>",parseInt(Marks[0].Hindi))
		console.log(typeof parseInt(Marks[0].Hindi));
		
		var TotalMarks=parseInt(Marks[0].Hindi)+parseInt(Marks[1].Marathi)+parseInt(Marks[2].English)+parseInt(Marks[3].SocialSience)+parseInt(Marks[4].Science);
		console.log("TotalMarks==========>",parseInt(TotalMarks));

		const MarksheetData = new StoreData({
		 marks:Marks,
         TypeOform:TypeOform,
         candiName: candiName,
         motherName: motherName,
         fatherName: fatherName,
         schoolCode: schoolCode,
         schoolName: schoolName,
         userId:userId,
         status:status,
         Seat_Number:Seat_Number,
         TotalMarks:TotalMarks,
		 created_At: new Date()
		});

		console.log("MarksheetData details", MarksheetData);
		var NemMarksheetData={
			marks:Marks,
			TypeOform:TypeOform,
			candiName: candiName,
			motherName: motherName,
			fatherName: fatherName,
			schoolCode: schoolCode,
			schoolName: schoolName,
			userId:userId,
			status:status,
			Seat_Number:Seat_Number,
			TotalMarks:TotalMarks,
			created_At: new Date()
		}
		const str=JSON.stringify(NemMarksheetData);
		var endpoint = nem.model.objects.create("endpoint")("http://b1.nem.foundation", "7895");
		// Create a common object holding key
		var common = nem.model.objects.create("common")("123", "7199d76108d800644beafc6b66e22e274764290c78e0636a9007a8fa46c7c667");

		// Create an un-prepared transfer transaction objecpatientst

		var transferTransaction = nem.model.objects.create("transferTransaction")("MBVV4NMYAPQO7BUADV7CK2EBZ6S45YQXTWYO4EDV", 0, str);
		// Prepare the transfer transaction object
		var transactionEntity = nem.model.transactions.prepare("transferTransaction")(common, transferTransaction, nem.model.network.data.mijin.id);
		//Serialize transfer transaction and announce
		var Transaction = await nem.model.transactions.send(common, transactionEntity, endpoint)
		console.log("heeeeeeeeeeeeeeeeee================>", Transaction.transactionHash.data)
			
		var storage=await MarksheetData.save();
		console.log("storage========>",storage);
		StoreData.findOneAndUpdate({"userId":userId},{
				$set: {
					"TotalMarks":TotalMarks,
					"txHashes":Transaction.transactionHash.data,
					"created_At":new Date()
				}
			},{
				new: true
			}).then(data=>{
				return resolve({
				status: 200,
                message: "Stored data in db as well as nem",
                data:data
			})
		})
			.catch(err => {
				console.log(err)
				return "500"
			})


	});