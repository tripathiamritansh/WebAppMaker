(function(){
    angular
        .module("WebAppMaker")
        .factory("PageService", pageService);

    function pageService() {
        var pages=
            [
                { "_id": "321", "name": "Post 1", "websiteId": "456", "description": "Lorem" },
                { "_id": "432", "name": "Post 2", "websiteId": "456", "description": "Lorem" },
                { "_id": "543", "name": "Post 3", "websiteId": "456", "description": "Lorem" }
            ];
        var api={
            "updatePage": updatePage,
            "deletePage": deletePage,
            "createPage":createPage,
            "findPageById": findPageById,
            "findAllPagesForWebsite": findAllPagesForWebsite
        }
        return api;

        function createPage(wid,page){
            page.websiteId=wid;
            page._id=(new Date()).getTime().toString();
            pages.push(page);
        }

        function updatePage(pageId,page){
            for(var p in pages){
                if(pages[p]._id==pageId){
                    pages[p].name=page.name;
                    pages[p].description=page.description;
                }
            }
        }

        function findPageById(pageId) {
            for(var p in pages){
                if(pages[p]._id==pageId){
                    return angular.copy(pages[p]);
                }
            }
            return null;
        }
        function deletePage(pageId){
            for(var p in pages){
                if(pages[p]._id===pageId){
                    pages.splice(p,1);
                }
            }
        }
        function findAllPagesForWebsite(websiteId) {
            pageList=[];
            for(var p in pages){
                if(pages[p].websiteId===websiteId){
                    pageList.push(pages[p]);
                }
            }
            return pageList;
        }
    }
})();