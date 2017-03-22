/**
 * Created by Amritansh on 3/21/2017.
 */
var  mongoose=require('mongoose');
var websiteModel=require('../website/website.model.server');
var widgetModel=require('../widget/widget.model.server');

var pageSchema=mongoose.Schema({
    _website:{type:mongoose.Schema.Types.ObjectId, ref:'websiteModel'},
    name:String,
    title:String,
    description:String,
    widgets:[{type:mongoose.Schema.Types.ObjectId, ref:'widgetModel'}],
    dateCreated:{type: Date,default: Date.now()}
},{collection:'page'});


module.exports=pageSchema;

pageSchema.post('remove',function(doc){
    websiteModel
        .findWebsiteById(doc._website)
        .then(
            function(website){
                var index = website.pages.indexOf(doc._id);
                website.pages.splice(index,1);
                website.save();
            }
        );
    widgetModel.remove({_id: {$in: doc.widgets}}).exec();
});