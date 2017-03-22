/**
 * Created by Amritansh on 3/20/2017.
 */
var mongoose = require('mongoose');

var websiteSchema = mongoose.Schema({
    _user: {type:mongoose.Schema.Types.ObjectId, ref: 'userModel'},
    name: String,
    description: String,
    pages: [{type: mongoose.Schema.Types.ObjectId, ref: 'pageModel'}],
    dateCreated: {type: Date,default: Date.now()}
},{collection:'website'});


websiteSchema.post('remove',function(doc) {
    var userModel=require('../user/user.model.server');
    var pageModel=require('../page/page.model.server');
    var widgetModel=require('../widget/widget.model.server');
    userModel
        .findUserById(doc._user)
        .then(
            function (user) {
                var index = user.websites.indexOf(doc._id);
                user.websites.splice(index, 1);
                user.save();
            }
        );
    widgetModel.remove({_page: {$in: doc.pages}}).exec();
    pageModel.remove({_id: {$in: doc.pages}}).exec();

});

module.exports = websiteSchema;