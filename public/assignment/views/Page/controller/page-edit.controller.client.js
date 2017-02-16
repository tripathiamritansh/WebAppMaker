(function () {
    angular
        .module("WebAppMaker")
        .controller("pageEditController", pageEditController);
    function pageEditController($location, $routeParams, PageService) {
        var vm=this;
        vm.userId=$routeParams.uid;
        vm.websiteId=$routeParams.wid;
        vm.pageId=$routeParams.pid;
        vm.updatePage=updatePage;
        vm.deletePage=deletePage;
        function init(){
            vm.pages=PageService.findAllPagesForWebsite(vm.websiteId);
            vm.page=PageService.findPageById(vm.pageId);
        }
        init();

        function updatePage(page) {
            PageService.updatePage(vm.pageId,page);
            $location.url("/user/"+vm.userId+"/websites/"+vm.websiteId+"/page")
        }


        function deletePage() {
            PageService.deletePage(vm.pageId);
            $location.url("/user/"+vm.userId+"/websites/"+vm.websiteId+"/page")
        }
    }
})();