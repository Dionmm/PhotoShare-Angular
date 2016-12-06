(function(){
    angular.module('PhotoShare').controller("ShellController",function($window ,$rootScope){
        var vm = this;

        vm.authorised = false;
        vm.authorityCheck = function(){
            if(vm.role === 'administrator'){
                vm.authorised = true;
                vm.admin = true;
            } else if(vm.role === 'photographer'){
                vm.authorised = true;
            }
        };

        if($window.sessionStorage.access_token){
            vm.name = $window.sessionStorage.name;
            vm.role = $window.sessionStorage.role;
            vm.authorityCheck();
        }


        //$rootScope because it needs to communicate with the data.service
        //when a user has just logged in
        $rootScope.$on('handleLogin', function(event, args){
            vm.name = args.name || args.username;
            vm.role = $window.sessionStorage.role;
            vm.authorityCheck();
            $rootScope.$broadcast('newToken');
        });


        vm.logout = function(){
            delete $window.sessionStorage.access_token;
            delete $window.sessionStorage.name;
            delete $window.sessionStorage.role;
            delete $window.sessionStorage.username;
            $window.location.reload();
        };

        //Toastr settings
        toastr.options.closeButton = true;


    });
})();