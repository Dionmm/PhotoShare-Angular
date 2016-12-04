(function(){
    angular.module('PhotoShare').controller("ShellController",function($window ,$scope){
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

        $scope.$on('handleLogin', function(event, args){
            vm.name = args.name || args.username;
            vm.role = $window.sessionStorage.role;
            vm.authorityCheck();
        });


        vm.logout = function(){
            delete $window.sessionStorage.access_token;
            delete $window.sessionStorage.name;
            delete $window.sessionStorage.role;
            $window.location.reload();
        };

        //Toastr settings
        toastr.options.closeButton = true;
        toastr.options.timeOut = 40000;


    });
})();