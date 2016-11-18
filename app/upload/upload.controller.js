(function(){
    angular.module('PhotoShare').controller("UploadController",function(photoShareAPI){
        var vm = this;

        vm.uploader = photoShareAPI.createFileUploader();

        vm.uploadPhoto = function(){
            photoShareAPI.uploadPhoto(vm.uploader);
        };

        vm.updatePhoto = function(){
            photoShareAPI.updatePhoto(33).then(function(res){
                console.log(res);
            })
        }
    });
})();