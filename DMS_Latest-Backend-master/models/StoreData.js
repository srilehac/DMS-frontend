'use strict'

const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const MarksheetSchema = mongoose.Schema({
         marks:Array,
         TotalMarks:String,
         TypeOform:String,
         candiName: String,
         motherName: String,
         fatherName: String,
         schoolCode: String,
         schoolName: String,
         userId:String,
         status:String,
         Seat_Number:String,
         TotalMarks:String,
         txHashes:String,
         created_At:String
});

mongoose.Promise = global.Promise;

mongoose.connect('mongodb://risabhsharma71:Rpqb123@ds111420.mlab.com:11420/care4u', { useMongoClient: true })
.then(
    ()=>{
      console.log("connected to mongoDB")},
   (err)=>{
       console.log("err",err);
   })

module.exports = mongoose.model('MarksheetSchemas', MarksheetSchema);