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
                page.websiteId=vm.websiteId;
                PageService
                    .createPage(vm.websiteId, page)
                    .success(function () {
                        $location.url("/user/" + vm.userId + "/websites/" + vm.websiteId + "/page");
                    })
                    .error(function () {
                        vm.error="Could not create new page";
                    });

            }
        }
    }
})();