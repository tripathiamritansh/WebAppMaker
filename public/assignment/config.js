(function () {
    angular
        .module("WebAppMaker")
        .config(Configuration);
    
    function Configuration($routeProvider) {
        $routeProvider
            .when("/login",{
                templateUrl:"User/template/login.view.client.html",
                controller:"LoginController",
                controllerAs:"model"
            })
            .when("/register",{
                templateUrl:"User/template/register.view.client.html"
            })
            .when("/user/:uid",{
                templateUrl:"User/template/profile.view.client.html",
                controller:"profileController",
                controllerAs:"model"
            })
            .when("/user/:uid/websites",{
                templateUrl:"Website/template/website-list.view.client.html",
                controller:"websiteListController",
                controllerAs:"model"
            })

            .when("/user/:uid/websites/new",{
                templateUrl:"Website/template/website-new.view.client.html",
                controller:"websiteNewController",
                controllerAs:"model"
            })
            .when("/user/:uid/websites/:wid",{
                templateUrl:"Website/template/website-edit.view.client.html",
                controller:"websiteEditController",
                controllerAs:"model"
            })
            .when("/user/:uid/websites/:wid/page",{
                templateUrl:"Page/template/page-list.view.client.html",
                controller:"pageListController",
                controllerAs:"model"
            })
            .when("/user/:uid/websites/:wid/page/new",{
                templateUrl:"Page/template/page-new.view.client.html",
                //controller:"pageEditController",
                //controllerAs:"model"
            })
            .when("/user/:uid/websites/:wid/page/:pid",{
            templateUrl:"Page/template/page-edit.view.client.html",
            controller:"pageEditController",
            controllerAs:"model"
        });

    }
})();