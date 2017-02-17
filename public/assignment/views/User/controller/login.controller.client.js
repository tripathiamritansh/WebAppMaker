(function () {
    angular
        .module("WebAppMaker")
        .controller("LoginController", loginController);

    function loginController($location, UserService) {
        var vm =this;
        vm.login=login;
        function init() {
        }
        init();

        function login(user) {
            var promise=UserService.findUserByCredentials(user.username, user.password);
            promise.success(function (response) {
                var loginUser=response;
                if(loginUser!=null){
                    $location.url("/user/"+user._id);
                }
                else{
                    vm.error="User not found";
                }
            });


        }

    }
})();