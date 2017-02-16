(function () {
    angular
        .module("WebAppMaker")
        .controller("pageListController", pageListController);

    function pageListController($routeParams,PageService){
        var vm=this;
        vm.userId=$routeParams.uid;
        vm.websiteId=$routeParams.wid;
        vm.pages=PageService.findAllPagesForWebsite(vm.websiteId);
    }
})();

