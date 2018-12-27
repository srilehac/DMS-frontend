'use strict';
const admitModel = require('../models/admitCard');
const crypto= require("crypto");
var nem = require("nem-sdk").default;
exports.SetStatusByDivisionalBoard = (id, userId, TypeOform) => {

    console.log("userId=======", userId, id);
    return new Promise(async (resolve, reject) => {
        var arr2 = ['Holy cross school', 'Abhinav School', 'Saraswati school', 'St. francis school', 'St. xaviours school', 'RBK school', 'vivekanand kendra vidyalaya', 'Don bosco high school'];
        console.log(arr2)
        var i = arr2[Math.floor(Math.random() * arr2.length)];
        console.log("random=======>>", i);
        var SeatNo = Math.floor(Math.random() * 90000) + 10000;
        console.log("SeatNo========>>>", SeatNo)
        const output = await admitModel.find({
            _id: id
        });
        var str=JSON.stringify(output);
        console.log("str=======>",str)
        console.log("output====", output);
        var TypeOform = output[0]._doc.TypeOform;
        var userId = output[0]._doc.userId;
        var candiName = output[0]._doc.candiName;
        var schoolName = output[0]._doc.schoolName;
        var AdharNo = output[0]._doc.AdharNo;
        var dob = output[0]._doc.dob;
        console.log(dob)
        const rapidID = crypto.createHash('sha256').update(str).digest('base64');
        console.log("repidID...........",rapidID)

        var endpoint = nem.model.objects.create("endpoint")("http://b1.nem.foundation", "7895");
        var NemObj = {
            "id": id,
            "TypeOform": TypeOform,
            "userId": userId,
            "candiName": candiName,
            "schoolName": schoolName,
            "AdharNo": AdharNo,
            "dob": dob,
            "HallCenter": i,
            "Seat_Number": "E" + SeatNo,
            "Initiater":"Divisional Board",
            "created_At":new Date(),
            "rapidID":rapidID,
            "status": "Hall ticket auto generation sucessfully done",
            "DivisionalStatus": "Hall ticket auto generation sucessfully done",
        }
        var str = JSON.stringify(NemObj);
        console.log(str)
        // Create a common object holding key
        var common = nem.model.objects.create("common")("123", "dc1505c6b93d3cea132270294abbb9b1465ef2209853c385b31c65da3ac3bb75");
        // Create an un-prepared transfer transaction objecpatientst
        var transferTransaction = nem.model.objects.create("transferTransaction")("MAT4QUUKC2SJMOZ35UQKL4YS6RAOCRWW7VFDY4MP", 0, str); //divisional board will send status to Institution
        // Prepare the transfer transaction object
        var transactionEntity = nem.model.transactions.prepare("transferTransaction")(common, transferTransaction, nem.model.network.data.mijin.id);
        //Serialize transfer transaction and announce
        var hee = await nem.model.transactions.send(common, transactionEntity, endpoint)
        console.log("heeeeeeeeeeeeeeeeee================>", hee.transactionHash.data)
        // var result =await (admitModel.findOneAndUpdate({ _id:id }, { $set: { "status":status,"message":message,"txHash":hee.transactionHash.data},$push:{"previousHashes":hee.transactionHash.data}},{new: true}))

        var result = await admitModel.findOneAndUpdate({
            _id: id
        }, {
            $set: {
                "HallCenter": i,
                "Seat_Number": "E" + SeatNo,
                "status": "Hall ticket auto generation sucessfully done",
                "DivisionalStatus": "Hall ticket auto generation sucessfully done",
                "txHash": hee.transactionHash.data,
                "created_At":new Date()
            },
            $push: {
                "previousHashes": hee.transactionHash.data
            }

        }, {
            new: true
        })
        console.log("check your result====>>", result)
        console.log("hhhhhhhhhhhhhhhhhhhhhhhhhhhh================>", result)
        return resolve({
            result: result
        })
    });

}