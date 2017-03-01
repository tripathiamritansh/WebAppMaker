//module is node.js function, thisfunction can not be accessed from outside
module.exports=function (app) {
    app.get("/api/user/:userId/website", findAllWebsitesForUser);
    app.get("/api/website/:websiteId", findWebsiteById);
    app.put("/api/website/:websiteId", updateWebsite);
    app.delete("/api/website/:websiteId", deleteWebsite);
    app.post("/api/user/:userId/website", createWebsite);

    var websites=[
        { "_id": "123", "name": "Facebook",    "developerId": "456", "description": "Lorem", created: new Date()},
        { "_id": "234", "name": "Tweeter",     "developerId": "456", "description": "Lorem", created: new Date()},
        { "_id": "456", "name": "Gizmodo",     "developerId": "456", "description": "Lorem", created: new Date()},
        { "_id": "567", "name": "Tic Tac Toe", "developerId": "123", "description": "Lorem", created: new Date()},
        { "_id": "678", "name": "Checkers",    "developerId": "123", "description": "Lorem", created: new Date()},
        { "_id": "789", "name": "Chess",       "developerId": "234", "description": "Lorem", created: new Date()}
    ];

    function createWebsite(req,res) {
        var newWebsite =req.body;
        newWebsite._id=(new Date()).getTime().toString();
        websites.push(newWebsite);
        res.send(200);
    }
    function deleteWebsite(req, res) {
        var wid=req.params.websiteId;
        for(w in websites){
            if(websites[w]._id==wid){
                websites.splice(w,1);
                res.sendStatus(200);
                return;
            }
        }
        res.sendStatus(404);
    }
    function updateWebsite(req, res) {
        var wid=req.params.websiteId;
        var websiteContent=req.body;
        for(var w in websites) {
            if(websites[w]._id === wid) {
                websites[w].name=websiteContent.name;
                websites[w].description=websiteContent.description;
                res.sendStatus(200);
                return;
            }
        }
        res.sendStatus(404).send("Website not found for website ID: "+wid);
    }

    function findWebsiteById(req,res) {
        var wid=req.params.websiteId;
        for(var w in websites) {
            if(websites[w]._id === wid) {
                return res.send(websites[w]);
            }
        }
        res.sendStatus(404).send("Website not found for website Id: "+wid);
    }
    function findAllWebsitesForUser(req,res) {
        var userId = req.params.userId;

        var sites = [];
        for(var w in websites) {
            if(userId === websites[w].developerId) {
                sites.push(websites[w]);
            }
        }
        res.json(sites);
    }
};