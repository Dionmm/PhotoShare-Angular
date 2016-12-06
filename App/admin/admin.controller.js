(function(){
    angular.module('PhotoShare').controller('AdminController', function(photoShareAPI){
        var vm = this;
        vm.showingUsers = true;

        vm.showUsers = function(){
            photoShareAPI.getAllUsers().then(function(response){
                vm.users = response;
            }, function(error){
                console.error(error);
                toastr.error('Something went wrong, please try again');
            });
            vm.showingUsers = true;
        };
        vm.showPhotos = function(){
            photoShareAPI.getAllPhotos().then(function(response){
                vm.photos = response;

            }, function(error){
                console.error(error);
                toastr.error('Something went wrong');
            });
            vm.showingUsers = false;
        };
        vm.showAnalytics = function(){
            toastr.error('Yea, implementing this was wishful thinking', '501 Not Implemented');
        };

        vm.roleChanged = function(username, role){
            photoShareAPI.changeRole(username, role).then(function(response){
                toastr.success('Role for ' + username + ' has been changed');
                console.log(response);
            }, function(error){
                toastr.error('Something went wrong');
                console.error(error);
            });
        };

        vm.showUsers();


    });
})();