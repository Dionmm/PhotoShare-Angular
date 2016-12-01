(function(){
    var app = angular.module('PhotoShare', ["ngRoute", "angularFileUpload"]);

    app.config(function($routeProvider){
        $routeProvider
            .when("/", {
                templateUrl: "App/home/home.html",
                controller: "HomeController as vm"
            })
            .when("/login", {
                templateUrl: "App/login/login.html",
                controller: "LoginController as vm"
            })
            .when("/register" ,{
                templateUrl: "App/login/login.html",
                controller: "LoginController as vm"
            })
            .when("/photo/:id",{
                templateUrl: "App/photo/photo.html",
                controller: "PhotoController as vm"
            })
            .when("/upload", {
                templateUrl: "App/upload/upload.html",
                controller: "UploadController as vm"
            })
            .otherwise({redirectTo: "/"});
    });


    app.run(['$route', function ($route) {
        // Include $route to kick start the router.
    }]);

})();