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
            PageService
                .findAllPagesForWebsite(vm.websiteId)
                .success(renderPageList);
            PageService
                .findPageById(vm.pageId)
                .success(renderPage);
        }
        init();

        function renderPageList(pages) {
            vm.pages=pages;
        }

        function renderPage(page) {
            vm.page=page;
        }

        function updatePage(page) {
            PageService
                .updatePage(vm.pageId,page)
                .success(function () {
                    $location.url("/user/"+vm.userId+"/websites/"+vm.websiteId+"/page");
                })
                .error(function () {
                    vm.error="Could Not Update the page";
                });
        }

        function deletePage() {
            PageService
                .deletePage(vm.pageId)
                .success(function () {
                    $location.url("/user/"+vm.userId+"/websites/"+vm.websiteId+"/page");
                })
                .error(function () {
                    vm.error="Could not delete the page";
                });
        }
    }
})();