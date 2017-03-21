//module is node.js function, thisfunction can not be accessed from outside
module.exports=function (app, pageModel) {
    app.get("/api/website/:websiteId/page", findAllPagesForWebsite);
    app.get("/api/page/:pageId",findPageById);
    app.put("/api/page/:pageId", updatePage);
    app.delete("/api/page/:pageId", deletePage);
    app.post("/api/website/:websiteId/page", createPage);

    // var pages=
    //     [
    //         { "_id": "321", "name": "Post 1", "websiteId": "456", "description": "Lorem" },
    //         { "_id": "432", "name": "Post 2", "websiteId": "456", "description": "Lorem" },
    //         { "_id": "543", "name": "Post 3", "websiteId": "456", "description": "Lorem" }
    //     ];

    function createPage(req,res) {
        var newPage =req.body;
        var websiteId=req.params.websiteId;
        pageModel
            .createPage(websiteId,newPage)
            .then(function (page) {
                    res.json(page);
                 },function (err) {
                    res.send(404).send(err);
                    }
                );
        // pages.push(newPage);
        // console.log(pages);
        // res.sendStatus(200);
    }

    function deletePage(req,res) {
        var pid=req.params.pageId;
        pageModel
            .deletePage(pid)
            .then(function (page) {
                res.sendStatus(200);
                },function (err) {
                res.sendStatus(404);
            });
        // for(p in pages){
        //     if(pages[p]._id==pid){
        //         pages.splice(p,1);
        //         res.sendStatus(200);
        //         return;
        //     }
        // }
        // res.sendStatus(404);
    }

    function updatePage(req, res) {
        var pid=req.params.pageId;
        var pageContent=req.body;
        pageModel
            .updatePage(pid, pageContent)
            .then(function(page){
                res.sendStatus(200);
            }, function(err){
                res.sendStatus(404);
            });
        // for(var p in pages) {
        //     if(pages[p]._id === pid) {
        //         pages[p].name=pageContent.name;
        //         pages[p].description=pageContent.description;
        //         res.sendStatus(200);
        //         return;
        //     }
        // }
        // res.sendStatus(404).send("page not found for website ID: "+pid);
    }

    function findPageById(req, res) {
        var pid=req.params.pageId;
        pageModel
            .findPageById(pid)
            .then(function (page) {
                res.send(page);
            }, function (err) {
                res.sendStatus(404).send(err);
            });
        // for(var p in pages) {
        //     if(pages[p]._id === pid) {
        //         return res.send(pages[p]);
        //     }
        // }
        // res.sendStatus(404).send("page not found for website Id: "+pid);
    }

    function findAllPagesForWebsite(req, res) {
        var wid = req.params.websiteId;
        pageModel
            .findAllPagesForWebsite(wid)
            .then(
                function (pages) {
                    res.send(pages);
                },
                function (err) {
                    res.send(err);
                }
            );
        // var pageSet = [];
        // for(var p in pages) {
        //     if(wid === pages[p].websiteId) {
        //         pageSet.push(pages[p]);
        //     }
        // }
        // res.json(pageSet);
    }
};