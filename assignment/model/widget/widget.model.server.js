/**
 * Created by Amritansh on 3/21/2017.
 */
var mongoose = require('mongoose');
var q=require('q');
var widgetSchema=require('./widget.schema.server');
var widgetModel=mongoose.model('widgetModel',widgetSchema);
var pageModel=require('../../model/page/page.model.server');

widgetModel.createWidget=createWidget;
widgetModel.findAllWidgetsForPage=findAllWidgetsForPage;
widgetModel.findWidgetById = findWidgetById;
widgetModel.updateWidget=updateWidget;
widgetModel.deleteWidget=deleteWidget;

module.exports=widgetModel;

function deleteWidget(widgetId){
    var deferred =q.defer();
    widgetModel
        .findByIdAndRemove({_id:widgetId}, function (err,widget) {
            if(err){
                deferred.reject(err);
            }else{
                widget.remove();
                deferred.resolve(widget);
            }
        });
    return deferred.promise;
}

function updateWidget(widgetId,widget) {
    var deferred=q.defer();
    widgetModel
        .update({_id:widgetId},{$set:widget},function(err,widget){
            if(err){
                deferred.reject(err);
            }else{
                deferred.resolve(widget);
            }
        });
    return deferred.promise;
}
function findWidgetById(widgetId){
    var deferred=q.defer();
    widgetModel
        .findById({_id:widgetId}, function (err,widget) {
            if(err){
                deferred.reject(err);
            }else{
                deferred.resolve(widget);
            }
        });
    return deferred.promise;
}

function findAllWidgetsForPage(pageId){
    var deferred = q.defer();
    widgetModel
        .find({_page:pageId},function (err,widgets) {
            if(err){
                deferred.reject(err);
            }else{
                deferred.resolve(widgets);
            }
        });
    return deferred.promise;
}

function createWidget(pageId, widget) {
    var deferred = q.defer();
    widget._page=pageId;
    console.log(widget);
    widgetModel
        .create(widget,function (err,widget) {
            console.log(err);

            if(err){
                deferred.reject(err);
            }else{
                pageModel
                    .findPageById(pageId)
                    .then(function (page) {
                        page.widgets.push(widget);
                        page.save();
                    });
                deferred.resolve(widget);
            }
        });
    return deferred.promise;
}

