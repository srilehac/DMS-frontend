const admitModel = require('../models/admitCard');
const crypto = require("crypto");
var nem = require("nem-sdk").default;
var AddressOfProvider;
var privatekey;


exports.HallTicketUpdate = (walletName, status, id, message) => {

	return new Promise(async(resolve, reject) => {
			console.log(walletName, status, id, message)
			var report = await admitModel.find({
				_id: id
			});

			var result123;
			console.log("iiiiiiiiiiiiiiiiiiiii", report);
			console.log("please check report output===", report);
			var str = JSON.stringify(report);
			console.log("str=======>", str)
			var TypeOform = report[0]._doc.TypeOform;
			var userId = report[0]._doc.userId;
			var candiName = report[0]._doc.candiName;
			var schoolName = report[0]._doc.schoolName;
			var AdharNo = report[0]._doc.AdharNo;
			var dob = report[0]._doc.dob;
			console.log("this is result", TypeOform);
			const rapidID = crypto.createHash('sha256').update(str).digest('base64');
			console.log("repidID...........", rapidID)

			var transferObj = {
				"id": id,
				"TypeOform": TypeOform,
				"userId": userId,
				"candiName": candiName,
				"schoolName": schoolName,
				"AdharNo": AdharNo,
				"dob": dob,
				"rapidID": rapidID,
				"Initiater": "Divisional Board",
				"created_At": new Date(),
				"message": message,
				"status": status
			}
			var str = JSON.stringify(transferObj)

			if (status == "Rejected") {

				if (walletName == "divisional@rapid.com") {
					AddressOfProvider = "MCU6JLAO656XPBQPZR3F7UQ6UJSY3JUE7RHPGO47",
						privatekey = "dc1505c6b93d3cea132270294abbb9b1465ef2209853c385b31c65da3ac3bb75"
				}
				if (walletName == "Institution@info.com") {

					AddressOfProvider = "MAT4QUUKC2SJMOZ35UQKL4YS6RAOCRWW7VFDY4MP",
						privatekey = "cf6b84e3b061721d5a6882ae46c2bca4f0d7e96256bb00cb0a47c47fca82112f"
				};

				var endpoint = nem.model.objects.create("endpoint")("http://b1.nem.foundation", "7895");

				// Create a common object holding key
				var common = nem.model.objects.create("common")("123", "dc1505c6b93d3cea132270294abbb9b1465ef2209853c385b31c65da3ac3bb75");

				// Create an un-prepared transfer transaction objecpatientst
				var transferTransaction = nem.model.objects.create("transferTransaction")("MAT4QUUKC2SJMOZ35UQKL4YS6RAOCRWW7VFDY4MP", 0, str); //divisional board will send status to Institution

				// Prepare the transfer transaction object
				var transactionEntity = nem.model.transactions.prepare("transferTransaction")(common, transferTransaction, nem.model.network.data.mijin.id);

				//Serialize transfer transaction and announce
				var hee = await (nem.model.transactions.send(common, transactionEntity, endpoint))
				console.log("heeeeeeeeeeeeeeeeee================>", hee.transactionHash.data)
				
				result123 = await (admitModel.findOneAndUpdate({
					_id: id
				}, {
					$set: {
						"status": status,
						"message": message,
						"txHash": hee.transactionHash.data,
						"created_At": new Date()
					},
					$push: {
						"previousHashes": hee.transactionHash.data
					}
				}, {
					new: true
				}))

				console.log("hhhhhhhhhhhhhhhhhhhhhhhhhhhh================>", result123)
			}

			return resolve({
				"status": 200,
				"messsage": "object updated",
				"result": result123
			})

		})
		.catch(err => {
			console.log(err)
		})
}