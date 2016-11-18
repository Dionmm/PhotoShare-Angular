(function(){

    var photoShareAPI = function($http, $httpParamSerializer, FileUploader){

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
        };

        var createFileUploader = function(){
            var headers = {
                Authorization: "Bearer K0Bpdu9NaDODMzrg3rFcFw7XYRmALkKRA6uvYGBBKEOG5lHgtfgEqm8arGh6oaM9HxtSh3e4bvDPxKsaBzlkiVffvBCo7CuR7wcrR3JH1yyESuUgBBjS2aDHf3Tk60vUHK_ZTe84kcpDLQsY3jLFBokByCFAcxw4thQLgt4eiHNMBLn6-WG7VkQAfcQn1rK61GjVi4w8CseDPDog2zTMS4yU16mkiuftfFKlujoQBEdTux3KhaBJqxIJpPZx2Cg2xhcHWGOhC1p2HI_96U5vfaeYD4i_VqoXkP_uM24UH4QnwVx1DD7ZuTONyQ9WCsxMQ1m6dorn8vkR2xV3RH7NNZNw5xnaCIEazMTUDPpXS4S6tACTpGmRSIEJ_Ai781H86xYl8GwmWWQykYct0bsCYyyhUvGTGW3zULpLBQtJume5do26qeZWpQDhFj5pdAmjBbBbPjO7gwTezWWpzs7YO4Bt7IKmwYhwRVgB1RnHqO_ZSTEgnO4iNXDiP13H6PtZjedcQHyDYCmxv9u1wZN5KA"
            };
            var url = apiUrl + 'photo';

            return new FileUploader({url: url, headers: headers})
        };

        var uploadPhoto = function(uploader){
            var headers = {
                Authorization: "Bearer K0Bpdu9NaDODMzrg3rFcFw7XYRmALkKRA6uvYGBBKEOG5lHgtfgEqm8arGh6oaM9HxtSh3e4bvDPxKsaBzlkiVffvBCo7CuR7wcrR3JH1yyESuUgBBjS2aDHf3Tk60vUHK_ZTe84kcpDLQsY3jLFBokByCFAcxw4thQLgt4eiHNMBLn6-WG7VkQAfcQn1rK61GjVi4w8CseDPDog2zTMS4yU16mkiuftfFKlujoQBEdTux3KhaBJqxIJpPZx2Cg2xhcHWGOhC1p2HI_96U5vfaeYD4i_VqoXkP_uM24UH4QnwVx1DD7ZuTONyQ9WCsxMQ1m6dorn8vkR2xV3RH7NNZNw5xnaCIEazMTUDPpXS4S6tACTpGmRSIEJ_Ai781H86xYl8GwmWWQykYct0bsCYyyhUvGTGW3zULpLBQtJume5do26qeZWpQDhFj5pdAmjBbBbPjO7gwTezWWpzs7YO4Bt7IKmwYhwRVgB1RnHqO_ZSTEgnO4iNXDiP13H6PtZjedcQHyDYCmxv9u1wZN5KA"
            };
            uploader.url = apiUrl + 'photo';
            uploader.headers = headers;
            uploader.uploadAll();
            uploader.onSuccessItem = function(fileItem, response, status){
                console.info('Success', response, status);
                return updatePhoto(response.Id)
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
                  Authorization: "Bearer K0Bpdu9NaDODMzrg3rFcFw7XYRmALkKRA6uvYGBBKEOG5lHgtfgEqm8arGh6oaM9HxtSh3e4bvDPxKsaBzlkiVffvBCo7CuR7wcrR3JH1yyESuUgBBjS2aDHf3Tk60vUHK_ZTe84kcpDLQsY3jLFBokByCFAcxw4thQLgt4eiHNMBLn6-WG7VkQAfcQn1rK61GjVi4w8CseDPDog2zTMS4yU16mkiuftfFKlujoQBEdTux3KhaBJqxIJpPZx2Cg2xhcHWGOhC1p2HI_96U5vfaeYD4i_VqoXkP_uM24UH4QnwVx1DD7ZuTONyQ9WCsxMQ1m6dorn8vkR2xV3RH7NNZNw5xnaCIEazMTUDPpXS4S6tACTpGmRSIEJ_Ai781H86xYl8GwmWWQykYct0bsCYyyhUvGTGW3zULpLBQtJume5do26qeZWpQDhFj5pdAmjBbBbPjO7gwTezWWpzs7YO4Bt7IKmwYhwRVgB1RnHqO_ZSTEgnO4iNXDiP13H6PtZjedcQHyDYCmxv9u1wZN5KA"
              },
              data: $httpParamSerializer(udata)
          };

          return $http(req).then(function(response){
              return response.data;
          })
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
            getPhotoByName: getPhotoByName,
            createFileUploader: createFileUploader,
            uploadPhoto: uploadPhoto,
            updatePhoto: updatePhoto,
            loginUser: loginUser,
            registerUser: registerUser,
            getProfileInfo: getProfileInfo
        };


    };

    var app = angular.module('PhotoShare');
    app.factory("photoShareAPI", photoShareAPI);


})();