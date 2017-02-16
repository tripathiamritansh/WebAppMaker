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
         if(website===undefined || website.description==undefined ||website.name==undefined){
             vm.nameError="Please Enter Website details";
         }else {
            WebsiteService.createWebsite(vm.userId,website)
            $location.url("/user/"+vm.userId+"/websites");}
     }
    }
})();