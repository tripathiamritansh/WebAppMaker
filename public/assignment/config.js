(function () {
    angular
        .module("WebAppMaker")
        .config(Configuration);
    
    function Configuration($routeProvider, $httpProvider) {

        $httpProvider.defaults.headers.post['Content-Type'] = 'application/json;charset=utf-8';
        $httpProvider.defaults.headers.put['Content-Type'] = 'application/json;charset=utf-8';

        $routeProvider
            .when("/login",{
                templateUrl:"views/User/template/login.view.client.html",
                controller:"LoginController",
                controllerAs:"model",
               //resolve:{loggedin:checkLoggedin}
            })
            .when("/register",{
                templateUrl:"views/User/template/register.view.client.html",
                controller:"registerController",
                controllerAs:"model",
                //resolve:{loggedin:checkLoggedin}
            })
            .when("/user",{
                templateUrl:"views/User/template/profile.view.client.html",
                controller:"profileController",
                controllerAs:"model",
                resolve:{loggedin:checkLoggedin}
            })
            .when("/user/:uid/websites",{
                templateUrl:"views/Website/template/website-list.view.client.html",
                controller:"websiteListController",
                controllerAs:"model",
                resolve:{loggedin:checkLoggedin}

            })
            .when("/user/:uid/websites/new",{
                templateUrl:"views/Website/template/website-new.view.client.html",
                controller:"websiteNewController",
                controllerAs:"model",
                resolve:{loggedin:checkLoggedin}

            })
            .when("/user/:uid/websites/:wid",{
                templateUrl:"views/Website/template/website-edit.view.client.html",
                controller:"websiteEditController",
                controllerAs:"model",
                resolve:{loggedin:checkLoggedin}
            })
            .when("/user/:uid/websites/:wid/page",{
                templateUrl:"views/Page/template/page-list.view.client.html",
                controller:"pageListController",
                controllerAs:"model",
                resolve:{loggedin:checkLoggedin}

            })
            .when("/user/:uid/websites/:wid/page/new",{
                templateUrl:"views/Page/template/page-new.view.client.html",
                controller:"PageNewController",
                controllerAs:"model",
                resolve:{loggedin:checkLoggedin}

            })
            .when("/user/:uid/websites/:wid/page/:pid",{
            templateUrl:"views/Page/template/page-edit.view.client.html",
            controller:"pageEditController",
            controllerAs:"model",
                resolve:{loggedin:checkLoggedin}
            })
            .when("/user/:uid/websites/:wid/page/:pid/widget",{
                templateUrl:"views/Widget/template/widget-list.view.client.html",
                controller:"WidgetListController",
                controllerAs:"model",
                resolve:{loggedin:checkLoggedin}
            })
            .when("/user/:uid/websites/:wid/page/:pid/widget/new",{
                templateUrl:"views/Widget/template/widget-chooser.view.client.html",
                controller:"WidgetNewController",
                controllerAs:"model",
                resolve:{loggedin:checkLoggedin}
            })
            .when("/user/:uid/websites/:wid/page/:pid/widget/:wgid",{
                templateUrl:"views/Widget/template/widget-edit.view.client.html",
                controller:"WidgetEditController",
                controllerAs:"model",
                resolve:{loggedin:checkLoggedin}
            })
            .when("/user/:uid/websites/:wid/page/:pid/widget/:wgid/flickr",{
                templateUrl:"views/Widget/template/editor/widget-flickr-search.view.client.html",
                controller:"FlickrImageSearchController",
                controllerAs:"model",
                resolve:{loggedin:checkLoggedin}
            })
            .otherwise({
                redirectTo:'/login'
            });
        function checkLoggedin($q,$timeout,$http,$location,$rootScope) {
            var deferred = $q.defer();
            $http.get('/api/loggedin')
                .success(function(user) {

                    if (user !== '0') {

                        deferred.resolve(user);
                    } else {
                        deferred.reject();
                        $location.url('/login');
                    }
                });
            return deferred.promise;
        }
    }
})();