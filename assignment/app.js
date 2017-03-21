//module is node.js function, thisfunction can not be accessed from outside
module.exports=function (app) {
    var userModel = require('./model/user/user.model.server');
    var websiteModel = require('./model/website/website.model.server')
    var pageModel = require('./model/page/page.model.server');
    require('./services/user.service.server')(app, userModel);
    require('./services/website.service.server')(app, websiteModel,userModel);
    require('./services/page.service.server')(app,pageModel);
    require('./services/widget.service.server')(app);

    //TODO: create services for other entities, website widgets pages
};