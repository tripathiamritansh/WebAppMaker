(function () {
    angular
        .module("WebAppMaker")
        .controller("websiteEditController", websiteEditController);
    
    function websiteEditController($location, $routeParams,WebsiteService){
     var vm=this;
     vm.userId=$routeParams.uid;
     vm.websites=WebsiteService.findAllWebsitesForUser(vm.userId);
     vm.websiteId =$routeParams.wid;
     vm.deleteWebsite=deleteWebsite;
     vm.updateWebsite=updateWebsite;
     function init() {
        vm.websites=WebsiteService.findAllWebsitesForUser(vm.userId);
        vm.website=WebsiteService.findWebsiteById(vm.websiteId);
     }
     init();
     
     function updateWebsite(website) {
         WebsiteService.updateWebsite(vm.websiteId,website);
         $location.url("/user/"+vm.userId+"/websites");
     }

     function deleteWebsite() {
         WebsiteService.deleteWebsite(vm.websiteId);
         $location.url("/user/"+vm.userId+"/websites");
     }
    }
})();