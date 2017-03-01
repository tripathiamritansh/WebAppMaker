(function(){
    angular
        .module("WebAppMaker")
        .factory("PageService", pageService);

    function pageService($http) {

        var api={
            "updatePage": updatePage,
            "deletePage": deletePage,
            "createPage":createPage,
            "findPageById": findPageById,
            "findAllPagesForWebsite": findAllPagesForWebsite
        }
        return api;

        function createPage(wid,page){
            return $http.post("/api/website/"+wid+"/page", page);
        }

        function updatePage(pageId,page){
           return $http.put("/api/page/"+pageId, page);
        }

        function findPageById(pageId) {
            return $http.get("/api/page/"+pageId);
        }

        function deletePage(pageId){
           return $http.delete("/api/page/"+pageId);
        }

        function findAllPagesForWebsite(websiteId) {
            return $http.get("/api/website/"+websiteId+"/page");
        }
    }
})();