(function(){

    var photoShareAPI = function($http, $httpParamSerializer, $window, FileUploader){

        var tokenUrl = "https://www.photoshare.party/token";
        var apiUrl = "https://www.photoshare.party/api/";
        var authToken = 'Bearer ' + $window.sessionStorage.access_token;
        var pageSize = 20;

        //Photo API

        var getAllPhotos = function(){
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
        var getMostRecentPhotos = function(){
            return $http.get(apiUrl + "photo/mostrecent?pagesize=" + pageSize) //PageSize declared at top
                .then(function(response){
                    return response.data;
                });
        };

        var getPhotoById = function(photoId){
            var req = {
                method: 'GET',
                url: apiUrl + 'photo/' + photoId
            };

            return $http(req).then(function(response){
                return response.data;
            });
        };

        var createFileUploader = function(){
            var headers = {
                Authorization: authToken
            };
            var url = apiUrl + 'photo';

            return new FileUploader({url: url, headers: headers})
        };

        var uploadPhoto = function(uploader){
            var headers = {
                Authorization: authToken
            };
            uploader.url = apiUrl + 'photo';
            uploader.headers = headers;
            uploader.uploadAll();
            uploader.onSuccessItem = function(fileItem, response, status){
                console.info('Success', response, status);
                return updatePhoto(response.Id);
            };
            uploader.onErrorItem = function(fileItem, response, status){
                console.error('Error', response, status);
            };
        };


        var updatePhoto = function(id){
            var udata = {
                Id: 33
            };
          var req = {
              method: 'PUT',
              url: apiUrl + 'photo/' + id,
              headers: {
                  'Content-Type': 'application/x-www-form-urlencoded',
                  Authorization: authToken
              },
              data: $httpParamSerializer(udata)
          };

          return $http(req).then(function(response){
              return response.data;
          });
        };

        var addPurchaseToDB = function(token, id){
            var req = {
                method: 'POST',
                url: apiUrl + 'purchase/' + id,
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                    Authorization: authToken
                },
                data: $httpParamSerializer({token: token})

            };
            return $http(req).then(function(response){
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
            getMostRecentPhotos: getMostRecentPhotos,
            getPhotoById: getPhotoById,
            createFileUploader: createFileUploader,
            uploadPhoto: uploadPhoto,
            updatePhoto: updatePhoto,
            addPurchaseToDB: addPurchaseToDB,
            loginUser: loginUser,
            registerUser: registerUser,
            getProfileInfo: getProfileInfo
        };


    };

    var app = angular.module('PhotoShare');
    app.factory("photoShareAPI", photoShareAPI);


})();