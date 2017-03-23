/**
 * Created by Amritansh on 3/20/2017.
 */
var mongoose =require('mongoose');
var q = require('q');
var websiteSchema=require('./website.schema.server');
var websiteModel = mongoose.model('websiteModel', websiteSchema);
var userModel=require('../user/user.model.server');

websiteModel.createWebsiteForUser = createWebsiteForUser;
websiteModel.findAllWebsitesForUser= findAllWebsitesForUser;
websiteModel.findWebsiteById=findWebsiteById;
websiteModel.updateWebsite=updateWebsite;
websiteModel.deleteWebsite = deleteWebsite;

module.exports=websiteModel;

function deleteWebsite(websiteId) {
    var deferred=q.defer();
    websiteModel
        .findByIdAndRemove({_id:websiteId}, function (err,website) {
            if(err){
                deferred.reject(err);
            }
            else {
                website.remove();
                deferred.resolve(website);
            }
        });
    return deferred.promise;
}
function updateWebsite(websiteId, website){
    var deferred =q.defer();
    websiteModel
        .update({_id:websiteId},{$set:website}, function (err,website) {
            if(err){
                deferred.reject(err);
            }else {
                deferred.resolve(website);
            }
        });
    return deferred.promise;
}

function createWebsiteForUser(userId, website) {
    var deferred = q.defer();
    website._user=userId;
    websiteModel
        .create(website, function (err, website) {
            if(err){
                deferred.reject(err);
            }else {
                userModel
                    .findUserById(userId)
                    .then(function(user){

                        console.log(user.websites);
                        user.websites.push(website);
                        user.save();
                    });
                deferred.resolve(website);
            }
        });
    return deferred.promise;
}

function findAllWebsitesForUser(userId) {
    var deferred=q.defer();
    websiteModel
        .find({_user:userId}, function (err,websites) {
            if(err){
                deferred.reject(err);
            }else {
                deferred.resolve(websites);
            }
        });
    return deferred.promise;
}

function findWebsiteById(websiteId) {
    var deferred=q.defer();
    console.log("wm "+websiteId);
    websiteModel
        .findById({_id:websiteId}, function (err,websites) {
            console.log(websites);
            console.log(err);
            if(err){
                deferred.reject(err);
            }else {
                deferred.resolve(websites);
            }
        });
    return deferred.promise;
}