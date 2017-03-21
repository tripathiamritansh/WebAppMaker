/**
 * Created by Amritansh on 3/19/2017.
 */
var mongoose =require('mongoose');
var q = require('q');
var userSchema=require('./user.schema.server');
var userModel = mongoose. model('userModel', userSchema);
userModel.createUser=createUser;
userModel.findUserById =findUserById;
userModel.findUserByUsername = findUserByUsername;
userModel.findUserByCredentials=findUserByCredentials;
userModel.deleteUser = deleteUser;
userModel.updateUser =updateUser;

function createUser(user) {
    var deferred = q.defer();
    console.log("user1"+user);
    userModel
        .create(user, function (err,doc) {
            console.log(err);
            if(err){
                deferred.reject(err);
            }else {
                deferred.resolve(doc);
            }
        });
    return deferred.promise;
}

function findUserById(userId) {
    var deffered = q.defer();
    userModel
        .findById(userId,function (err, user) {
            if(err){
                deffered.reject(err);
            }else {
                deffered.resolve(user);
            }
        });
    return deffered.promise;
}

function findUserByUsername(username) {
    var deffered = q.defer();
    console.log(username);
    userModel
        .find({username:username}, function (err,user) {
            if(err){
                console.log(err);
                deffered.reject(err);
            }else {
                console.log(user);
                deffered.resolve(user);
            }
        });
    return deffered.promise;
}

function findUserByCredentials(username,password) {
    var deffered = q.defer();
    console.log("username "+username+" pass "+password);
    userModel
        .find({username:username, password:password}, function (err,user) {

            console.log(user);
            if (err) {
                deffered.reject(err);
            } else {
                deffered.resolve(user);
            }
        });
    return deffered.promise;
}

function updateUser(userId,user) {
    var deffered = q.defer();
    userModel
        .update({_id:userId},{$set:user},
            function (err,user) {
                if (err) {
                    deffered.reject(err);
                } else {
                    deffered.resolve(user);
                }
            });
    return deffered.promise;
}

function deleteUser(userId) {
    var deffered = q.defer();
    userModel
        .findByIdAndRemove({_id:userId}, function (err,user) {
            if(err){
                deffered.reject(err);
            }
            else {
                user.remove();
                deffered.resolve(user);
            }
        });
    return deffered.promise;
}

module.exports= userModel;


