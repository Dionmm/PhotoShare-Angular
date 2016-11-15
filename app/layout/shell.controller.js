(function(){
    angular.module('PhotoShare').controller("ShellController",function(photoShareAPI){
        var vm = this;
        photoShareAPI.getAllPhotos().then(function(data){
            vm.message = data;
        });
    });
})();