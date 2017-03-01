(function () {
    angular
        .module("WebAppMaker")
        .controller("websiteListController", websiteListController);
    
    function websiteListController($routeParams,WebsiteService){
        var vm=this;
        vm.userId=$routeParams.uid;
        function init() {
            var promise=WebsiteService.findAllWebsitesForUser(vm.userId);
            promise.success(renderWebsites);
        }
        init();
        function renderWebsites(websites) {

            vm.websites=websites;
        }

    }
})();