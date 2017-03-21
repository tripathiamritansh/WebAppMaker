(function () {
    angular
        .module("WebAppMaker")
        .factory("WebsiteService", websiteService);
    
    function websiteService($http) {


        var api={
            "updateWebsite": updateWebsite,
            "createWebsite": createWebsite,
            "deleteWebsite": deleteWebsite,
            "findWebsiteById": findWebsiteById,
            "findAllWebsitesForUser": findAllWebsitesForUser
        };
        return api;

        function updateWebsite(wid,website){
            return $http.put("/api/website/"+wid, website);
        }

        function deleteWebsite(websiteId){
            return $http.delete('/api/website/'+websiteId);
        }
        function createWebsite(userId,website) {
            return $http.post('/api/user/'+userId+'/website', website);
        }

        function findWebsiteById(websiteId){
            console.log("wsc"+websiteId);
           return $http.get("/api/website/"+websiteId);
        }

        function findAllWebsitesForUser(userId) {
            return $http.get("/api/user/"+userId+"/website");
        }
        
    }
})();