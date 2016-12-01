(function(){
    angular.module('PhotoShare').controller("PhotoController",function($routeParams, photoShareAPI){
        var vm = this;
        vm.photo = {
            id: $routeParams.id
        };
        vm.user = {};

        photoShareAPI.getPhotoById(vm.photo.id)
            .then(function(data){
                vm.photo.address = data.Address;
                console.log(data);
                vm.user.userId = data.UserId;
                vm.user.username = data.UserName;


                vm.getProfileInfo(vm.user.userId);
            }, function(error){
                console.error(error.data);
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