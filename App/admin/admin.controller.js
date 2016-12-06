(function(){
    angular.module('PhotoShare').controller('AdminController', function(photoShareAPI){
        var vm = this;
        vm.showAction = 1;

        vm.showUsers = function(){
            photoShareAPI.getAllUsers().then(function(response){
                vm.users = response;

                console.log(response);
            }, function(error){
                console.error(error);
                toastr.error('Something went wrong, please try again');
            });
            vm.showAction = 1;
        };
        vm.showPhotos = function(){
            vm.showAction = 2;

        };
        vm.showSales = function(){
            vm.showAction = 3;

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