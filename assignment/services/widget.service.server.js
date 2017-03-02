//module is node.js function, thisfunction can not be accessed from outside
module.exports=function (app) {
    app.get('/api/page/:pageId/widget', findAllWidgetsForPage);
    app.get('/api/widget/:widgetId', findWidgetById);
    app.post("/api/page/:pageId/widget", createWidget);
    app.put("/api/widget/:widgetId", updateWidget);
    app.delete("/api/widget/:widgetId", deleteWidget);
    app.put("/api/page/:pageId/widget",updateWidgetOrder);

    var multer = require('multer'); // npm install multer --save
    var storage = multer.diskStorage({
        destination: function (req, file, cb) {
            cb(null, __dirname+"/../../public/uploads")
        },
        filename: function (req, file, cb) {
            var extArray = file.mimetype.split("/");
            var extension = extArray[extArray.length - 1];
            cb(null, 'widget_image_' + Date.now()+ '.' +extension)
        }
    });
    var upload = multer({storage: storage});
    app.post ("/api/upload", upload.single('myFile'), uploadImage);

    function uploadImage(req, res) {
        console.log(req.myFile);
        console.log(req.body);
        var pageId        = null;
        var widgetId      = req.body.widgetId;
        var width         = req.body.width;
        var userId        = req.body.userId;
        var websiteId     = req.body.websiteId;
        var myFile        = req.file;
        var destination = myFile.destination; // folder where file is saved to

        for (var i in widgets) {
            if (widgets[i]._id === widgetId) {
                widgets[i].width = width;
                widgets[i].url = req.protocol + '://' +req.get('host')+"/uploads/"+myFile.filename;
                pageId = widgets[i].pageId;
            }
        }

        res.redirect("/assignment/#/user/" + userId + "/websites/" + websiteId + "/page/" + pageId + "/widget/" + widgetId);
    }



    var widgets = [
        { "_id": "123", "widgetType": "HEADER", "pageId": "321", "size": 2, "text": "GIZMODO"},
        { "_id": "123", "widgetType": "HEADER", "pageId": "123", "size": 2, "text": "Yahoo!"},
        { "_id": "234", "widgetType": "HEADER", "pageId": "456", "size": 4, "text": "Page456"},
        { "_id": "234", "widgetType": "HEADER", "pageId": "321", "size": 4, "text": "Lorem ipsum"},
        { "_id": "345", "widgetType": "IMAGE", "pageId": "321", "width": "100%",
            "url": "https://i.kinja-img.com/gawker-media/image/upload/s--UE7cu6DV--/c_scale,fl_progressive,q_80,w_800/xoo0evqxzxrrmrn4ayoq.jpg"},
        { "_id": "456", "widgetType": "HTML", "pageId": "321", "text": '<p>Anker’s kevlar-reinforced PowerLine cables are <a href="http://gear.lifehacker.com/your-favorite-lightning-cables-anker-powerline-and-pow-1782036601" target="_blank" rel="noopener">far and away our readers’ top choice for charging their gadgets</a>, and you can save on several models today, including some from the nylon-wrapped PowerLine+ collection. I use these cables every single day, and I’ve never had one fray or stop working. Just be sure to note the promo codes below.<br></p>'},
        { "_id": "567", "widgetType": "HEADER", "pageId": "321", "size": 4, "text": "Lorem ipsum"},
        { "_id": "678", "widgetType": "YOUTUBE", "pageId": "321", "width": "100%",
            "url": "https://youtu.be/AM2Ivdi9c4E" },
        { "_id": "789", "widgetType": "HTML", "pageId": "321", "text": "<p>Lorem ipsum</p>"}
    ];
    

    function deleteWidget(req, res) {
        var wgid=req.params.widgetId;
        for(var w in widgets){
            if(widgets[w]._id===wgid){
                widgets.splice(w,1);
                res.send(200);
                return;
            }
        }
        res.send(404);
    }

    function createWidget(req,res){
        var newWidget =req.body;

        newWidget._id =(new Date()).getTime().toString();
        widgets.push(newWidget);
        res.send(newWidget);
    }

    function updateWidget(req, res) {
        var wgid=req.params.widgetId;
        var widget=req.body;
        var type=widget.widgetType;
        for(var w in widgets){
            if(widgets[w]._id===wgid){
                switch (type){
                    case "HEADER":
                        widgets[w].text=widget.text;
                        widgets[w].size=widget.size;
                        res.send(200);
                        return;
                        break;
                    case "HTML":
                        widgets[w].text=widget.text;
                        res.send(200);
                        return;
                        break;
                    case "YOUTUBE":
                        widgets[w].url=widget.url;
                        widgets[w].width=widget.width;
                        res.send(200);
                        return;
                        break;
                    case "IMAGE":
                        widgets[w].url=widget.url;
                        widgets[w].width=widget.width;
                        res.send(200);
                        return;
                        break;
                }
            }
        }
        res.send(404);
    }
    function findAllWidgetsForPage(req,res) {
        var pid = req.params.pageId;
        var widgetSet = [];
        for(var w in widgets) {
            if(pid === widgets[w].pageId) {
                widgetSet.push(widgets[w]);
            }
        }
        res.json(widgetSet);
    }

    function findWidgetById(req,res) {
        var widgetId=req.params.widgetId;
        for(var w in widgets) {
            if(widgets[w]._id === widgetId) {

                return res.send(widgets[w]);
            }
        }

        res.sendStatus(404).send("Widget not found for website Id: "+widgetId);
    }

    function updateWidgetOrder(req,res) {
        console.log("hey");
        var pageId = req.params.pageId;
        var startIndex = parseInt(req.query.initial);
        var endIndex = parseInt(req.query.final);

        var index=[]
        for(var w in widgets){
            if(widgets[w].pageId==pageId){
                index.push(w);
            }
        }

        for(var i=startIndex;i<endIndex;i++){
            var temp=widgets[index[i]];
            widgets[index[i]]=widgets[index[i+1]];
            widgets[index[i+1]]=temp;
        }

        for(var i=startIndex;i>endIndex;i--){
            var temp=widgets[index[i]];
            widgets[index[i]]=widgets[index[i-1]];
            widgets[index[i-1]]=temp;
        }

        res.sendStatus(200);


    }
};