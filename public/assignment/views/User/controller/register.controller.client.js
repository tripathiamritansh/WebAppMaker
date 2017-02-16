(function () {
    angular
        .module("WebAppMaker")
        .controller("registerController", registerController);

    function registerController($location, $routeParams,UserService){
        var vm=this;
        vm.createUser=createUser;

        function createUser(user){
            if(user===undefined || user.username===undefined || user.lastName===undefined || user.firstName===undefined|| user.password===undefined){
                vm.error="Please Enter All Details";
            }else if(user.password!=user.verypassword){
                vm.error="password does not match";
            }else {
                delete user.verypassword;

            var newUser=UserService.createUser(user);
            $location.url("/user/"+newUser._id);}
        }
    }
})();