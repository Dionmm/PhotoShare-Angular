(function(){
'use strict';

    var photoShareAPI = function($http, $httpParamSerializer){

        var tokenUrl = "http://www.photoshare.party/token";
        var apiUrl = "http://www.photoshare.party/api/";

        //Photo API

        var getAllPhotos = function(){
            //Commented out http request and using temp local data for development
            return $http.get(apiUrl + "photo")
                .then(function(response){
                    return response.data;
                });
        };

        var searchAllPhotos = function(query){
            return $http.get(apiUrl + "photo/search?q=" + query)
                .then(function(response){
                    return response.data;
                });
        };


        //User API
        var loginUser = function(username, password){
            var req = {
                method: 'POST',
                url: tokenUrl,
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded'
                },
                data: $httpParamSerializer({grant_type: 'password', username: username, password: password })

            };
            return $http(req).then(function(response){
                return response.data;
            });
        };

        var registerUser = function(){

        };


        return {
            getAllPhotos : getAllPhotos,
            searchAllPhotos: searchAllPhotos,
            loginUser: loginUser,
            registerUser: registerUser
        };


    };

    var app = angular.module('PhotoShare');
    app.factory("photoShareAPI", photoShareAPI);


})();