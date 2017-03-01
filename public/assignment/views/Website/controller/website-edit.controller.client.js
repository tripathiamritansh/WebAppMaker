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
        WebsiteService
            .findAllWebsitesForUser(vm.userId)
            .success(renderWebsites);
        WebsiteService
            .findWebsiteById(vm.websiteId)
            .success(renderWebsite);
     }
     init();
     function renderWebsites(websites) {
         vm.websites=websites;
     }
     function renderWebsite(website) {

         vm.website=website;
     }
     function updateWebsite(website) {
         WebsiteService
             .updateWebsite(vm.websiteId,website)
             .success(function(){
                 $location.url("/user/"+vm.userId+"/websites");
             })
             .error(function () {
                 vm.error="Unable to update Website";
             });

     }

     function deleteWebsite() {
         WebsiteService
             .deleteWebsite(vm.websiteId)
             .success(function(){
                 $location.url("/user/"+vm.userId+"/websites")
             })
             .error(function (response) {
                 console.log(response)
                 vm.error="Unable to delete";
             });

     }
    }
})();