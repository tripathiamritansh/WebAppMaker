(function () {
    angular
        .module("WebAppMaker")
        .controller("websiteNewController", websiteNewController);
    
    function websiteNewController($routeParams,$location, WebsiteService){
     var vm=this;
     vm.userId=$routeParams.uid;

     vm.createWebsite =createWebsite;
     function init() {
         vm.websites=WebsiteService.findAllWebsitesForUser(vm.userId);
     }
     init();
     function createWebsite(website) {
            WebsiteService.createWebsite(vm.userId,website)
            //vm.websites=WebsiteService.findAllWebsitesForUser(vm.userId);
            $location.url("/user/"+vm.userId+"/websites");
     }
    }
})();