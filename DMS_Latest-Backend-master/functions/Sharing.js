'use strict';
const nem = require("nem-sdk").default;
const uploads = require("../models/uploaded")
const users = require("../models/account")
const Requests = require('../models/request')
var Transfer;

exports.Sharing = (userId,filehash, status,CompanyName) => {
	console.log("filehash==============>>>>>",userId,filehash, status)
	return new Promise(async(resolve, reject) => {
        var key=await users.find({
            "userId":userId
        })
        var SenderPrivateKey=key[0].privateKey;//receiver will send Document
        console.log("Object for private key",key[0].privateKey)//private key of receiver
        //Get address of sender
        var Account=await Requests.find({
            "RecipientuserId":userId
        })
        var AccountAddress=Account[0].SenderAddress;//Sender Address
        var SenderName=Account[0].SenderName;
        var DocType=Account[0].DocumentType;
        console.log("Employer for Address",AccountAddress)
        var d = new Date();
        Transfer = {
            "ContentHash": filehash,
            "userId": userId,
            "SenderName":SenderName,
            "DocumentType":DocType,
            "CompanyName":CompanyName,
            "status": status,
            created_at: d.toString()
        }
        var SendObject=JSON.stringify(Transfer)
        console.log("SendObject=====>>",SendObject)
        //created NIS endpoint
        var endpoint = nem.model.objects.create("endpoint")("http://b1.nem.foundation", "7895");
		// Create a common object holding key
		var common = nem.model.objects.create("common")("123", SenderPrivateKey);
        
        var transferTransaction = nem.model.objects.create("transferTransaction")(AccountAddress, 0, SendObject);
		// Prepare the transfer transaction object
		var transactionEntity = nem.model.transactions.prepare("transferTransaction")(common, transferTransaction, nem.model.network.data.mijin.id);

		//Serialize transfer transaction and announce
		var ee = await nem.model.transactions.send(common, transactionEntity, endpoint)
		console.log(ee.transactionHash.data)
		let results = await Requests.findOneAndUpdate({
			"RecipientuserId": userId
		}, {
			$set: {
                "status": status,
                "created_At":new Date()
			},
			$push: {
                "shared": filehash,
                "TransactionHash":ee.transactionHash.data,
                "TXdate":d.toString()
			}
		}, {
			new: true
		}).then(output => {
			return resolve({
                "status":200,
                "message": "sent sucessfully",
                "TransactionHash":output.TransactionHash,
                "TotalOutput":output.TXdate,
                "SenderName":output.SenderName,
                "DocType":output.DocumentType
				
			})

		})
	})
}