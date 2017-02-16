(function () {
    angular
        .module("WebAppMaker")
        .factory("WebsiteService", websiteService);
    
    function websiteService() {
        var websites=[
            { "_id": "123", "name": "Facebook",    "developerId": "456", "description": "Lorem", created: new Date()},
            { "_id": "234", "name": "Tweeter",     "developerId": "456", "description": "Lorem", created: new Date()},
            { "_id": "456", "name": "Gizmodo",     "developerId": "456", "description": "Lorem", created: new Date()},
            { "_id": "567", "name": "Tic Tac Toe", "developerId": "123", "description": "Lorem", created: new Date()},
            { "_id": "678", "name": "Checkers",    "developerId": "123", "description": "Lorem", created: new Date()},
            { "_id": "789", "name": "Chess",       "developerId": "234", "description": "Lorem", created: new Date()}
        ];

        var api={
            "updateWebsite": updateWebsite,
            "createWebsite": createWebsite,
            "deleteWebsite": deleteWebsite,
            "findWebsiteById": findWebsiteById,
            "findAllWebsitesForUser": findAllWebsitesForUser
        };
        return api;

        function updateWebsite(wid,website){
            for(var w in websites){
                if(websites[w]._id==wid){
                    websites[w].name=website.name;
                    websites[w].description=website.description;
                }
            }
        }

        function deleteWebsite(websiteId){
            for(var w in websites){
                if(websites[w]._id===websiteId){
                    websites.splice(w,1);
                }
            }
        }
        function createWebsite(userId,website) {
            website.developerId=userId;
            website._id =(new Date()).getTime().toString();
            website.created=new Date();
            websites.push(website);

        }

        function findWebsiteById(websiteId){
            for(var w in websites){
                if(websites[w]._id==websiteId){
                    return angular.copy(websites[w]);
                }
            }
            return null;
        }

        function findAllWebsitesForUser(userId) {
            sites=[];
         for(var w in websites){
             if(websites[w].developerId===userId){
                 sites.push(websites[w]);
             }
         }
         return sites;
        }
        
    }
})();