(function(){
    var app = angular.module('PhotoShare', ["ngRoute"]);

    app.config(function($routeProvider){
        $routeProvider
            .when("/", {
                templateUrl: "home/home.html",
                controller: "HomeController as vm"
            });
    });


    app.run(['$route', function ($route) {
        // Include $route to kick start the router.
    }]);

})();