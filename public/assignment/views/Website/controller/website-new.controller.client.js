(function () {
    angular
        .module("WebAppMaker")
        .controller("websiteNewController", websiteNewController);
    
    function websiteNewController($routeParams,$location, WebsiteService){
     var vm=this;
     vm.userId=$routeParams.uid;

     vm.createWebsite =createWebsite;
     function init() {
         WebsiteService
             .findAllWebsitesForUser(vm.userId)
             .success(renderWebsites);
     }
     init();
     function renderWebsites(websites) {
         vm.websites=websites;
     }
     function createWebsite(website) {
         if(website===undefined || website.description==undefined ||website.name==undefined){
             vm.nameError="Please Enter Website details";
         }else {
            WebsiteService
                .createWebsite(vm.userId,website)
                .success(function () {
                    $location.url("/user/"+vm.userId+"/websites");
                })
                .error(function () {
                    vm.nameError="Could Not create new Website";
                });
         }
     }
    }
})();