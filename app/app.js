(function(){
    var app = angular.module('PhotoShare', ["ngRoute", "angularFileUpload"]);

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
            .when("/photo/:name",{
                templateUrl: "photo/photo.html",
                controller: "PhotoController as vm"
            })
            .when("/upload", {
                templateUrl: "upload/upload.html",
                controller: "UploadController as vm"
            })
            .otherwise({redirectTo: "/"});
    });


    app.run(['$route', function ($route) {
        // Include $route to kick start the router.
    }]);

})();