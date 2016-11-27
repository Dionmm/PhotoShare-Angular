(function(){
    angular.module('PhotoShare').controller("HomeController",function($location, $anchorScroll, photoShareAPI){
        var vm = this;

        photoShareAPI.getAllPhotos().then(function(data){
            vm.photos = data;
        });

        vm.searchAllPhotos = function(){
            if(vm.photoQuery){
                photoShareAPI.searchAllPhotos(vm.photoQuery).then(function(data){
                    vm.photos = data;
                });
            }
        };


        vm.explore = function(){
            $location.hash('imageContainer');
            $anchorScroll();
        }


    });
})();