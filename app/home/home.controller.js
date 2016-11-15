(function(){
    angular.module('PhotoShare').controller("HomeController",function(photoShareAPI){
        var vm = this;

        photoShareAPI.getAllPhotos().then(function(data){
            vm.photos = data;
        });

        vm.getAllPhotos = function(){
            photoShareAPI.getAllPhotos().then(function(data){
                vm.photos = data;
            });
        };

        vm.searchAllPhotos = function(){
            if(vm.photoQuery){
                photoShareAPI.searchAllPhotos(vm.photoQuery).then(function(data){
                    vm.photos = data;
                });
            }
        };





        vm.getAllPhotos;

    });
})();