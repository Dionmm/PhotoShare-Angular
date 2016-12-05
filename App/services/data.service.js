(function(){
'use strict'
    var photoShareAPI = function($http, $httpParamSerializer, $window, FileUploader, $rootScope){

        var tokenUrl = "https://www.photoshare.party/token";
        var apiUrl = "https://www.photoshare.party/api/";
        var authToken = 'Bearer ' + $window.sessionStorage.access_token;
        var pageSize = 20;

        //Get the new Authentication Token
        $rootScope.$on('newToken', function(){
            authToken = 'Bearer ' + $window.sessionStorage.access_token;
        });

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

        var createFileUploader = function(urlEnd){
            var headers = {
                Authorization: authToken
            };
            var url = apiUrl + urlEnd;

            return new FileUploader({url: url, headers: headers, removeAfterUpload: true, queueLimit: 1})
        };

        var uploadPhoto = function(uploader, callback){
            uploader.uploadAll();
            uploader.onSuccessItem = function(fileItem, response, status){
                console.info('Success', response, status);
                return callback(response.Id);
            };
            uploader.onErrorItem = function(fileItem, response, status){
                console.error('Error', response, status);
            };
        };


        var updatePhoto = function(id, name, price, exifData){
            var data = {
                Id: id,
                Name: name,
                Price: price
            };
            var count = 0;
            for(var x of exifData){
                var exifName = "Exif[" + count + "].Name";
                var exifValue = "Exif[" + count + "].Value";
                data[exifName] = x.Name;
                data[exifValue] = x.Value;
                count++;
            }
            var req = {
              method: 'PUT',
              url: apiUrl + 'photo/' + id,
              headers: {
                  'Content-Type': 'application/x-www-form-urlencoded',
                  Authorization: authToken
              },
              data: $httpParamSerializer(data)
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
            return $http(req).then(function (response) {
                return response.data;
            });
        };

        var registerUser = function(username, email, password, confirmpassword, awaitingAdminConfirmation){
            var req = {
                method: 'POST',
                url: apiUrl + 'user/register',
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded'
                },
                data: $httpParamSerializer({ username: username, email: email, password: password, confirmpassword: confirmpassword, awaitingAdminConfirmation: awaitingAdminConfirmation })
            };
            return $http(req);
        };

        var getProfileInfoById = function(userId){
            var req ={
                method: 'GET',
                url: apiUrl + 'user/' + userId
            };

            return $http(req).then(function(response){
                return response.data;
            });
        };

        var getProfileInfoByUsername = function(username){
            var req ={
                method: 'GET',
                url: apiUrl + 'user/name/' + username
            };

            return $http(req).then(function(response){
                return response.data;
            });
        };

        var getMyProfileInfo = function(){
            var req ={
                method: 'GET',
                url: apiUrl + 'user/',
                headers:{
                    'Content-Type': 'application/x-www-form-urlencoded',
                    Authorization: authToken
                }
            };

            return $http(req).then(function(response){
                return response.data;
            });
        };

        var changePassword = function(oldPassword, newPassword, confirmPassword){
            var req ={
                method: 'POST',
                url: apiUrl + 'user/changepassword',
                headers:{
                    'Content-Type': 'application/x-www-form-urlencoded',
                    Authorization: authToken
                },
                data: $httpParamSerializer({
                    OldPassword: oldPassword,
                    NewPassword: newPassword,
                    ConfirmPassword: confirmPassword
                })
            };

            return $http(req).then(function(response){
                return response;
            });
        };

        var changeEmail = function(newEmail){
            var req ={
                method: 'POST',
                url: apiUrl + 'user/changeemail',
                headers:{
                    'Content-Type': 'application/x-www-form-urlencoded',
                    Authorization: authToken
                },
                data: $httpParamSerializer({NewEmail: newEmail})
            };

            return $http(req).then(function(response){
                return response;
            });
        };

        var changeName = function(newFirstName, newLastName){
            var req ={
                method: 'POST',
                url: apiUrl + 'user/changename',
                headers:{
                    'Content-Type': 'application/x-www-form-urlencoded',
                    Authorization: authToken
                },
                data: $httpParamSerializer({
                    FirstName: newFirstName,
                    LastName: newLastName
                })
            };

            return $http(req).then(function(response){
                return response;
            });
        };

        var changeDescription = function(newDescription){
            var req ={
                method: 'POST',
                url: apiUrl + 'user/changeDescription',
                headers:{
                    'Content-Type': 'application/x-www-form-urlencoded',
                    Authorization: authToken
                },
                data: $httpParamSerializer({
                    Description: newDescription
                })
            };

            return $http(req).then(function(response){
                return response;
            });
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
            getProfileInfoById: getProfileInfoById,
            getProfileInfoByUsername: getProfileInfoByUsername,
            getMyProfileInfo: getMyProfileInfo,
            changePassword: changePassword,
            changeEmail: changeEmail,
            changeName: changeName,
            changeDescription: changeDescription
        };


    };

    var app = angular.module('PhotoShare');
    app.factory("photoShareAPI", photoShareAPI);


})();