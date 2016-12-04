(function(){
    angular.module('PhotoShare').controller('ProfileController',function(photoShareAPI){
        var vm = this;

        photoShareAPI.getMostRecentPhotos().then(function(data){
            vm.photos = data;
        });


    });
})();