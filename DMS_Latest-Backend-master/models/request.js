'use strict';

const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const RequestSchema = mongoose.Schema({
    RecieverAccount:Object,
    SenderName:String,
    DocumentType:String,
    SenderAddress:Object,
    status:String,
    shared:String,
    TransactionHash:String,
    created_at: String,
    RecipientuserId:String ,
    TXdate:String
});


mongoose.Promise = global.Promise;

mongoose.connect('mongodb://risabhsharma71:Rpqb123@ds111420.mlab.com:11420/care4u', { useMongoClient: true }).then(
    ()=>{
      console.log("connected to mongoDB")},
   (err)=>{
       console.log("err",err);
   })
module.exports = mongoose.model('RequestModel', RequestSchema);