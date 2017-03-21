/**
 * Created by Amritansh on 3/20/2017.
 */
var mongoose =require('mongoose');
var q = require('q');
var websiteSchema=require('./website.schema.server');
var websiteModel = mongoose. model('websiteModel', websiteSchema);

websiteModel.createWebsiteForUser = createWebsiteForUser;

function createWebsiteForUser(userId, website) {

}