(function () {
    angular
        .module("WebAppMaker")
        .controller("LoginController", loginController);

    function loginController($location, UserService,$rootScope) {
        var vm =this;
        vm.login=login;
        function init() {
        }
        init();

        function login(user) {
            if(user==undefined || user.password==undefined || user.username==undefined){
                vm.error="Please enter login details!";
                return;
            }
            UserService
                .login(user)
                .then(
                    function (response) {
                        var user=response.data;
                        $location.url("/user");
                    }, function (err) {
                        vm.error="User not found";
                    }
                );

            // var promise=UserService.findUserByCredentials(user.username, user.password);
            // promise
            //     .success(function (response) {
            //     var loginUser=response;
            //
            //     if(loginUser.length!=0){
            //         $location.url("/user/"+loginUser._id);
            //     }
            //     else{
            //         vm.error="User not found";
            //     }
            //     })
            //     .error(function (err) {
            //         vm.error = "User not found";
            //     });
        }

    }
})();