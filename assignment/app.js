//module is node.js function, thisfunction can not be accessed from outside
module.exports=function (app) {
    require('./services/user.service.server')(app);
    require('./services/website.service.server')(app);
    require('./services/page.service.server')(app);
    require('./services/widget.service.server')(app);

    //TODO: create services for other entities, website widgets pages
};