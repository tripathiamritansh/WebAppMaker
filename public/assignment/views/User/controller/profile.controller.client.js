(function () {
    angular
        .module("WebAppMaker")
        .controller("profileController", profileController);
    
    function profileController($location,$routeParams,UserService) {
        var vm=this;
        var userId = $routeParams.uid;
        var user = UserService.findUserById(userId);
        vm.deleteUser=deleteUser;
        vm.update=function (newUser){
            var user =UserService.updateUser(userId, newUser);
            if(user==null){
                vm.error="Unable to update User";
            }else{
                vm.message="User successfully updated";
            }
        };
        vm.user=user;

        function deleteUser() {
            UserService.deleteUser(userId);

            $location.url("/login");
        }
    }
})();