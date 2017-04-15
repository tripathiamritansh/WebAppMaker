(function () {
    angular
        .module("WebAppMaker")
        .controller("registerController", registerController);

    function registerController($location, $scope,$rootScope, $routeParams,UserService){
        var vm=this;
        vm.registerUser=registerUser;

        function registerUser(user){
            if(!$scope.registerForm.$valid){
                vm.error="Please Enter All Registration Details!"
                return;
            }
            if(user.password!=user.verypassword){
                vm.error="Passwords do not match!";
                return;
            }
            var userCopy=user;
            console.log(userCopy);
            UserService
                .findUserByUsername(userCopy.username)
                .success(function (user) {

                    if(user.length!=0)
                    vm.error="Username taken";
                    else {

                        UserService
                            .register(user)
                            .then(
                                function (response) {
                                    console.log(response.data._id);
                                    var user = response.data;

                                    $location.url("/user/" + response.data._id);
                                }, function (err) {
                                    vm.error = "Oops! Sorry could not register";
                                });
                    }
                })
                .error(function (err) {

                    UserService
                        .register(user)
                        .then(
                            function (response) {
                                console.log(response.data._id);
                                var user = response.data;
                                $rootScope.currentUser = user;
                                $location.url("/user/" + response.data._id);
                            }, function (err) {
                                vm.error = "Oops! Sorry could not register";
                            });
                });

        }
    }
})();