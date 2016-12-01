(function(){
    angular.module('PhotoShare').controller("ShellController",function($window ,$scope){
        var vm = this;

        if($window.sessionStorage.access_token){
            vm.name = $window.sessionStorage.name;
        }

        $scope.$on('handleLogin', function(event, args){
            vm.name = args.name || args.username;
        });

        vm.logout = function(){
            delete $window.sessionStorage.access_token;
            delete $window.sessionStorage.name;
            $window.location.reload();
        }
    });
})();