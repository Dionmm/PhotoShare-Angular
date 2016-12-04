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
                vm.submitting = true;
                photoShareAPI.loginUser(vm.loginUsername, vm.loginPassword)
                    .then(function(data){
                        vm.submitting = false;
                        //Save the Bearer token to session storage
                        $window.sessionStorage.access_token = data.access_token;

                        $window.sessionStorage.name = data.firstName || data.userName;

                        $window.sessionStorage.role = data.role;
                        //Event to initiate the change of nav in the top right
                        $scope.$emit('handleLogin', {name: data.firstName, username: data.userName, role: data.role});

                        //Redirect to home
                        $location.path('/');
                    },
                    function(error){
                        vm.submitting = false;
                        var errorMessage = error.data.error_description;
                        toastr.error(errorMessage);
                        console.error(errorMessage);
                    });
            } else{
                console.error('Username or password not supplied');
            }
        };

        vm.registerUser = function(){
            var message;
            if(vm.registerUsername === ""){
                message = 'Username cannot be empty';
                console.error(message);
                toastr.error(message);
            } else if(vm.registerPassword === ""){
                message = 'Password cannot be empty';
                console.error(message);
                toastr.error(message);
            } else if(vm.registerPassword !== vm.registerConfirmPassword){
                message = 'Passwords do not match';
                console.error(message);
                toastr.error(message);
            } else{
                vm.submitting = true;
                photoShareAPI.registerUser(vm.registerUsername, vm.registerEmail, vm.registerPassword, vm.registerConfirmPassword, vm.awaitingAdminConfirmation)
                    .then(function(response){
                            if(response.status === 200){
                                console.info('success');
                                toastr.success('Please check your email to confirm your account', 'Success!')
                            }
                            vm.submitting = false;
                        },
                        function(error){
                            var errorMessage = error.data.Message;
                            toastr.error(errorMessage);
                            console.error(errorMessage);
                            vm.submitting = false;

                        });
            }
        }

    });
})();