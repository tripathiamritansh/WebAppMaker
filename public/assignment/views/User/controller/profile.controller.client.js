(function () {
    angular
        .module("WebAppMaker")
        .controller("profileController", profileController);
    
    function profileController($location,$routeParams,UserService) {
        var vm=this;
        var userId = $routeParams.uid;
        function init(){
           UserService
               .findUserById(userId)
               .success(renderUser);
        }
        init();

        function renderUser(user) {
            vm.user=user;
        }

        vm.deleteUser=deleteUser;

        vm.update=function (newUser){

            UserService
                .updateUser(userId, newUser)
                .success(function(response){
                    vm.message="User successfully updated";
                })
                .error(function () {
                    vm.error="Unable to update User";
                });
        };

        function deleteUser() {
            var ans=confirm("Are you sure?");
            if(ans){
                UserService
                    .deleteUser(userId)
                    .success(function () {
                        $location.url("/login");
                    })
                    .error(function () {
                        vm.error="Unable to remove the user";
                    })
            }

        }
    }
})();