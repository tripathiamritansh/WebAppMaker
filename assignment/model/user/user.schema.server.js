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
    dateCreated: {type: Date,default: Date.now()},
    facebook: {
        id:    String,
        token: String
    }
},{collection:'user'});
module.exports = userSchema;

userSchema.post('remove',function(doc) {
    var websiteModel=require('../website/website.model.server');
    var pageModel=require('../page/page.model.server');
    var widgetModel=require('../widget/widget.model.server');

    pageModel.find({_website: {$in: doc.websites}}, '_id', function (err, pages) {
        if(err == null) {
            widgetModel.remove({_page: {$in: pages}}).exec();
            pageModel.remove({_id: {$in: pages}}).exec();
        }
    });
    websiteModel.remove({_id: {$in: doc.websites}}).exec();
    // userModel
    //     .findUserById(doc._user)
    //     .then(
    //         function (user) {
    //             var index = user.websites.indexOf(doc._id);
    //             user.websites.splice(index, 1);
    //             user.save();
    //         }
    //     );
    // widgetModel.remove({_page: {$in: doc.pages}}).exec();
    // pageModel.remove({_id: {$in: doc.pages}}).exec();

});