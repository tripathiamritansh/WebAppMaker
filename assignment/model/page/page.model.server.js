/**
 * Created by Amritansh on 3/21/2017.
 */
var mongoose = require('mongoose');
var q=require('q');
var pageSchema=require('./page.schema.server');
var pageModel = mongoose.model('pageModel', pageSchema);
var websiteModel=require('../website/website.model.server');

pageModel.createPage=createPage;
pageModel.findAllPagesForWebsite=findAllPagesForWebsite;
pageModel.findPageById = findPageById;
pageModel.updatePage=updatePage;
pageModel.deletePage=deletePage;

module.exports=pageModel;

function deletePage(pageId) {
    var deferred=q.defer();

    pageModel
        .findByIdAndRemove({_id:pageId}, function (err,page) {
            if(err){
                deferred.reject(err);
            }
            else {
                page.remove();
                deferred.resolve(page);
            }
        });
    return deferred.promise;
}

function updatePage(pageId, page){
    var deferred=q.defer();
    pageModel
        .update({_id:pageId},{$set:page}, function(err,page){
            if(err){
                deferred.reject(err);
            }else{
                deferred.resolve(page);
            }
        });
    return deferred.promise;
}

function findPageById(pageId) {
    var deferred = q.defer();
    pageModel
        .findById({_id:pageId}, function (err,page) {
            if(err){
                deferred.reject(err);
            }else{
                deferred.resolve(page);
            }
        });
    return deferred.promise;
}

function findAllPagesForWebsite(websiteId) {
    var deferred=q.defer();
    pageModel
        .find({_website:websiteId},function (err,pages) {
            if(err){
                deferred.reject(err);
            }else {
                deferred.resolve(pages);
            }
        });
    return deferred.promise;
}

function createPage(websiteId,page) {

    var deferred = q.defer();
    page._website=websiteId;
    pageModel
        .create(page, function (err,page) {
            if(err){
                deferred.reject(err);
            }else{
                websiteModel
                    .findWebsiteById(websiteId)
                    .then(
                        function (website) {

                            website.pages.push(page._id);
                            website.save();
                        }
                    );
                deferred.resolve(page);
            }
        });
    return deferred.promise;
}



//TODO: ADD DELETE FUNCTIONS IN PAGES,USER, WEBSITE, WIDGET AND FINISH FROM PAGE.MODEL.SERVER.JS