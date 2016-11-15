(function(){

    var photoShareAPI = function($http){

        var getAllPhotos = function(){
            //Commented out http request and using temp local data for development
            // return $http.get("http://www.photoshare.party/api/photo")
            //     .then(function(response){
            //         return response.data;
            //     });
        };






        return {
            getAllPhotos : getAllPhotos
        }


    };

    var app = angular.module('PhotoShare');
    app.factory("photoShareAPI", photoShareAPI);


})();