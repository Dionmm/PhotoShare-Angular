(function(){
    var app = angular.module('PhotoShare', ["ngRoute"]);

    app.config(function($routeProvider){
        $routeProvider
            .when("/", {
                templateUrl: "home/home.html",
                controller: "HomeController as vm"
            })
            .when("/login", {
                templateUrl: "login/login.html",
                controller: "LoginController as vm"
            })
            .when("/register" ,{
                templateUrl: "login/login.html",
                controller: "LoginController as vm"
            })
            .otherwise({redirectTo: "/"});
    });


    app.run(['$route', function ($route) {
        // Include $route to kick start the router.
    }]);

})();