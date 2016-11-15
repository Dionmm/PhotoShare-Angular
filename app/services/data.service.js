(function(){

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

        var getPhotoByName = function(photoName){
            var req = {
                method: 'GET',
                url: apiUrl + 'photo/byname/' + photoName
            };

            return $http(req).then(function(response){
                return response.data;
            });
        }

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

        var registerUser = function(username, email, password, confirmpassword){
            var req = {
                method: 'POST',
                url: apiUrl + 'user/register',
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded'
                },
                data: $httpParamSerializer({ username: username, email: email, password: password, confirmpassword: confirmpassword })
            };
            return $http(req);
        };

        var getProfileInfo = function(userId){
            var req ={
                method: 'GET',
                url: apiUrl + 'user/' + userId
            };

            return $http(req).then(function(response){
                return response.data;
            })
        };


        return {
            getAllPhotos : getAllPhotos,
            searchAllPhotos: searchAllPhotos,
            getPhotoByName: getPhotoByName,
            loginUser: loginUser,
            registerUser: registerUser,
            getProfileInfo: getProfileInfo
        };


    };

    var app = angular.module('PhotoShare');
    app.factory("photoShareAPI", photoShareAPI);


})();