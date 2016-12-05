(function(){
    angular.module('PhotoShare').controller('ProfileController',function(photoShareAPI, $routeParams, $location){
        var vm = this;
        vm.user = {
            username: $routeParams.username
        };
        console.log(vm.user.username);
        photoShareAPI.getMostRecentPhotos().then(function(data){
            vm.photos = data;
        });

        photoShareAPI.getProfileInfoByUsername(vm.user.username).then(function(data){
            vm.user.firstName = data.FirstName || vm.user.username;
            vm.user.lastName = data.LastName;
            vm.user.profileDescription = data.ProfileDescription;
            vm.user.profilePhoto = data.ProfilePhoto;
            $('.backgroundPhoto').css('background-image', 'url(' + data.BackgroundPhoto + ')');
            console.log(data);
        }, function(error){
            if(error.status === 404){
                toastr.error('User ' + vm.user.username + ' does not exist');
                $location.path('/');
            } else{
                toastr.error('Something went wrong');
                console.error(error);
            }
        });



        //Load users most recent photos
    });
})();