(function(){
    angular.module('PhotoShare').controller("ShellController",function($window ,$scope){
        var vm = this;
        $scope.$on('handleLogin', function(event, args){
            vm.user = "dion";
            console.log(event);
            console.log(args);
        });
    });
})();