(function(){
    angular.module('PhotoShare').controller("PhotoController",function($routeParams, photoShareAPI){
        var vm = this;
        vm.photo = {
            name: $routeParams.name
        };
        vm.user = {};

        photoShareAPI.getPhotoByName(vm.photo.name)
            .then(function(data){
                vm.photo.optimisedAddress = data.OptimisedAddress;
                console.log(data);
                vm.user.userId = data.UserId;
                vm.user.username = data.UserName;


                vm.getProfileInfo(vm.user.userId);
            }, function(error){
                console.error(error.data.error_description);
            });

        vm.getProfileInfo = function(userId){
            photoShareAPI.getProfileInfo(userId)
                .then(function(data){
                    vm.user.firstName = data.FirstName || vm.user.username;
                    vm.user.lastName = data.LastName;
                    vm.user.profileDescription = data.ProfileDescription;
                    vm.user.profilePhoto = data.ProfilePhoto;
                    console.log(data);
                }, function(error){
                    console.error(error.data.error_description);
                });
        }

    });
})();