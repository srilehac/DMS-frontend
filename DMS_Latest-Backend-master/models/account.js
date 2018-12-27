'use strict';

const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const userSchema = mongoose.Schema({ 
    nem_id : Object,
    privateKey : String,
    walletName : String,
    password : String,
    usertype: String,
    Address:String,
    userId:String,
    phonetosend:String,
    created_at: String    
});


mongoose.Promise = global.Promise;
// console.log("=========>",mongoose.Promise)
mongoose.connect('mongodb://risabhsharma71:Rpqb123@ds111420.mlab.com:11420/care4u', { useMongoClient: true }).then(
    ()=>{
      console.log("connected to mongoDB")},
   (err)=>{
       console.log("err",err);
   })

module.exports = mongoose.model('user', userSchema);