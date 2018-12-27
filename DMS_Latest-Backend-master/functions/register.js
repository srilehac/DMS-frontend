'use strict';
const user = require('../models/account');

exports.registerUser = function(nem_id,privateKey,walletName,password,usertype,Address,userId,phonetosend) {
console.log("Address===========>>",Address)
   return new Promise((resolve, reject) => {
        const newUser = new user({
           nem_id:nem_id,
           privateKey:privateKey,
           walletName:walletName,
           password:password,
           usertype:usertype,
           Address:Address,
           userId:userId,
           phonetosend:phonetosend,
           created_at: new Date(),
           });
        console.log("newUser========>>>>>",newUser)
        newUser.save()
            .then(() =>
             resolve({
                status: 201,
                usertype:usertype,
                message: "created your wallet account"
            })
        )

            .catch(err => {

                if (err.code == 11000) {

                    reject({
                        status: 409,
                        message: 'User Already Registered !'
                    });

                } else {

                    reject({
                        status: 500,
                        message: 'Please Register !'
                    });
                }
            });
    });
}