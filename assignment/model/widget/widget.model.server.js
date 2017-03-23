/**
 * Created by Amritansh on 3/21/2017.
 */
var mongoose = require('mongoose');
var q=require('q');
var widgetSchema=require('./widget.schema.server');
var pageModel=require('../page/page.model.server');
var widgetModel=mongoose.model('widgetModel',widgetSchema);

widgetModel.createWidget=createWidget;
widgetModel.findAllWidgetsForPage=findAllWidgetsForPage;
widgetModel.findWidgetById = findWidgetById;
widgetModel.updateWidget=updateWidget;
widgetModel.deleteWidget=deleteWidget;
widgetModel.sortWidget = sortWidget;

module.exports=widgetModel;

function sortWidget(index1,index2,pageId) {
    var pageModel=require('../page/page.model.server');
    var deferred = q.defer();
    pageModel
        .findPageById(pageId)
        .then(function (page) {
            for(var i=index1; i<index2;i++){
                var temp = page.widgets[i];
                page.widgets[i]=page.widgets[i+1];
                page.widgets[i+1]=temp;
            }

            for(var i=index1;i>index2;i--){
                var temp = page.widgets[i];
                page.widgets[i] = page.widgets[i-1];
                page.widget[i-1]=temp;
            }

            pageModel
                .update({_id:pageId},{$set: {widgets:page.widgets}},function (err, updatedPage) {
                    pageModel
                        .findPageById(pageId)
                        .then(function (page) {
                            console.log(page);
                        });
                    deferred.resolve()
                });
        });
    return deferred.promise
}
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
    console.log("model "+widget);
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
    var pageModel=require('../page/page.model.server');
    var deferred = q.defer();
    pageModel
        .findById(pageId,function (err,page) {
            widgetModel
                .find({_id:{$in:page.widgets}},function (err,widgets) {
                    if(err){
                        deferred.reject(err);
                    }else{
                        widgets.sort(function (a,b) {
                            return page.widgets.indexOf(a._id) - page.widgets.indexOf(b._id);
                        });
                        deferred.resolve(widgets);
                    }
                });
        });

    return deferred.promise;
}

function createWidget(pageId, widget) {
    var pageModel=require('../page/page.model.server');
    var deferred = q.defer();
    widget._page=pageId;
    console.log("ADfsdfs");
    console.log(widget);
    widgetModel
        .create(widget,function (err,widget) {
            console.log(err);
            if(err){
                deferred.reject(err);
            }else{
                console.log(pageModel);
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

