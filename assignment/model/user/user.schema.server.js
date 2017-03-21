/**
 * Created by Amritansh on 3/19/2017.
 */
var mongoose = require('mongoose');
var userSchema = mongoose.Schema({
    username:{type:String, required:true},
    password:String,
    firstName:String,
    lastName:String,
    email: String,
    phone:String,
    websites:[{type:mongoose.Schema.Types.ObjectId, ref:'websiteModel'}],
    dateCreated: {type: Date,default: Date.now()}
},{collection:'user'});
module.exports = userSchema;