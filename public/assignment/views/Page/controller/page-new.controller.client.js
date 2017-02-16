(function () {
    angular
        .module("WebAppMaker")
        .controller("PageNewController", pageNewController);

    function pageNewController($routeParams, $location, PageService) {
        var vm = this;
        vm.userId = $routeParams.uid;
        vm.websiteId = $routeParams.wid;
        vm.createPage = createPage;

        function init() {
            vm.pages = PageService.findAllPagesForWebsite(vm.websiteId);
        }
        init();

        function createPage(page) {
            if(page==undefined){
                vm.error="Please Enter Page Details";
            }else {
                PageService.createPage(vm.websiteId, page);
                $location.url("/user/" + vm.userId + "/websites/" + vm.websiteId + "/page");
            }
        }
    }
})();