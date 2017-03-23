/**
 * Created by Amritansh on 3/21/2017.
 */

var mongoose = require('mongoose');
var widgetSchema= mongoose.Schema({
    _page:{type:mongoose.Schema.Types.ObjectId, ref:'pageModel'},
    widgetType:{type:String,
          enum:['HEADER', 'IMAGE', 'YOUTUBE', 'HTML', 'INPUT', 'TEXT']},
    name:String,
    text:String,
    placeholder:String,
    description:String,
    url:String,
    width:String,
    height:String,
    rows:Number,
    size:Number,
    class:String,
    icon:String,
    deletable:Boolean,
    formatted:Boolean,
    dateCreated:{type:Date, default: Date.now()}
},{collection:'widget'});

module.exports=widgetSchema;

widgetSchema.post('remove',function (doc) {
   var pageModel=require('../page/page.model.server');
   pageModel
       .findPageById(doc._page)
       .then(
           function (page) {
               var index=page.widgets.indexOf(doc._id);
               page.widgets.splice(index,1);
               page.save();
           }
       );
});