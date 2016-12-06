(function(){
    angular.module('PhotoShare').controller("PhotoController",function($routeParams, photoShareAPI, $window, $scope){
        var vm = this;
        vm.loggedIn = $window.sessionStorage.name || false;
        vm.username = $window.sessionStorage.username;
        vm.role = $window.sessionStorage.role;
        vm.owner = false;
        vm.photo = {
            id: $routeParams.id
        };
        vm.user = {};

        photoShareAPI.getPhotoById(vm.photo.id)
            .then(function(data){
                $scope.$broadcast('photoLoaded', {photoId: vm.photo.id});

                vm.photo.address = data.Address;
                vm.photo.name = data.Name;
                vm.photo.price = data.Price;
                vm.photo.exif = data.Exif;
                vm.user.userId = data.UserId;
                vm.user.username = data.UserName;

                vm.canUpdatePhoto(vm.user.username);


                vm.getProfileInfoById(vm.user.userId);
            }, function(error){
                console.error(error);
                if(error.status === 404){
                    toastr.error('That photo could not be found', 'Not Found');
                }
            });

        vm.getProfileInfoById = function(userId){
            photoShareAPI.getProfileInfoById(userId)
                .then(function(data){
                    vm.user.firstName = data.FirstName || vm.user.username;
                    vm.user.lastName = data.LastName;
                    vm.user.profileDescription = data.ProfileDescription;
                    vm.user.profilePhoto = data.ProfilePhoto;
                }, function(error){
                    console.error(error.data);
                    toastr.error('Something went wrong', 'Please try again');
                });
        };

        vm.canUpdatePhoto = function(username){
            if(username === vm.username || vm.role === 'administrator'){
                vm.owner = true;
            }
        };

        vm.updatePhoto = function(){
            if(vm.newName !== undefined && vm.newName.length > 0 && vm.newName.length <= 20  && vm.newPrice >= 0){
                console.log('Name is good');
                toastr.info('Updating Photo');
                photoShareAPI.updatePhoto(vm.photo.id, vm.newName, vm.newPrice, vm.photo.exif).then(function(res){
                    console.log(res);
                    toastr.success("Photo Updated");
                },function(error){
                    toastr.error('Something went wrong');
                    console.error(error);
                });
            } else{
                toastr.error('The values you entered are not valid, please try again');
                console.warn('Something went wrong');
            }
        };

    });
})();