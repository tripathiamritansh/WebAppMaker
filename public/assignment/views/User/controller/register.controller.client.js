(function () {
    angular
        .module("WebAppMaker")
        .controller("registerController", registerController);

    function registerController($location, $routeParams,UserService){
        var vm=this;
        vm.registerUser=registerUser;

        function registerUser(user){
            var userCopy=user;
            UserService
                .findUserByUsername(userCopy.username)
                .success(function (user) {
                    if(user.length!=0)
                    vm.error="Username taken";
                    else{
                        console.log(userCopy);
                        UserService
                            .createUser(userCopy)
                            .success(function (newUser) {
                                console.log(newUser);
                                $location.url("/user/"+newUser._id);
                            })
                            .error(function () {
                                vm.error="Oops! Sorry could not register";
                            });
                    }
                });
                // .error(function () {
                //     UserService
                //         .createUser(user)
                //         .success(function (newUser) {
                //             $location.url("/user/"+newUser._id);
                //         })
                //         .error(function () {
                //             vm.error="Oops! Sorry could not register";
                //         })
                // });

        }
    }
})();