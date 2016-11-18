(function(){
    angular.module('PhotoShare').controller("LoginController",function(photoShareAPI, $window, $location, $scope){
        var vm = this;

        vm.loginUsername = "";
        vm.loginPassword = "";

        vm.registerUsername = "";
        vm.registerEmail = "";
        vm.registerPassword = "";
        vm.registerConfirmPassword = "";

        vm.loginUser = function(){
            if(vm.loginUsername !== "" || vm.loginPassword !== ""){
                photoShareAPI.loginUser(vm.loginUsername, vm.loginPassword)
                    .then(function(data){
                        //Save the Bearer token to session storage
                        $window.sessionStorage.access_token = data.access_token;

                        //Event to initiate the change of nav in the top right
                        $scope.$emit('handleLogin', {username: data.userName, name: data.firstName});

                        //Redirect to home
                        $location.path('/');
                    },
                    function(error){
                        delete $window.sessionStorage.access_token;
                        console.warn(error.data.error_description);
                    });
            } else{
                console.error('Username or password not supplied');
            }
        };

        vm.registerUser = function(){
            if(vm.registerUsername === ""){
                console.error("Username is null");
            } else if(vm.registerPassword === ""){
                console.error("Password is null");
            } else if(vm.registerPassword !== vm.registerConfirmPassword){
                console.error("Passwords do not match");
            } else{
                photoShareAPI.registerUser(vm.registerUsername, vm.registerEmail, vm.registerPassword, vm.registerConfirmPassword)
                    .then(function(response){
                            if(response.status === 200){
                                console.info('success');
                            }
                        },
                        function(error){
                            console.warn(error.data.error_description);
                        });
            }
        }

    });
})();