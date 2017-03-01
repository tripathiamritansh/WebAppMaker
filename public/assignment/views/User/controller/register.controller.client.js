(function () {
    angular
        .module("WebAppMaker")
        .controller("registerController", registerController);

    function registerController($location, $routeParams,UserService){
        var vm=this;
        vm.registerUser=registerUser;

        function registerUser(user){
            UserService
                .findUserByUsername(user.username)
                .success(function (user) {
                    vm.error="Username taken"
                })
                .error(function () {
                    UserService
                        .createUser(user)
                        .success(function (newUser) {

                            $location.url("/user/"+newUser._id);
                        })
                        .error(function () {
                            vm.error="Oops! Sorry could not register";
                        })
                });

        }
    }
})();