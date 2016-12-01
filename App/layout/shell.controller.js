(function(){
    angular.module('PhotoShare').controller("ShellController",function($window ,$scope){
        var vm = this;

        vm.authorised = false;
        if($window.sessionStorage.access_token){
            vm.name = $window.sessionStorage.name;
            vm.role = $window.sessionStorage.role;
            if(vm.role === 'photographer' || vm.role === 'administrator'){
                vm.authorised = true;
            }
        }

        $scope.$on('handleLogin', function(event, args){
            vm.name = args.name || args.username;
            vm.role = $window.sessionStorage.role;
            if(vm.role === 'photographer' || vm.role === 'administrator'){
                vm.authorised = true;
            }
        });

        vm.logout = function(){
            delete $window.sessionStorage.access_token;
            delete $window.sessionStorage.name;
            delete $window.sessionStorage.role;
            $window.location.reload();
        }
    });
})();