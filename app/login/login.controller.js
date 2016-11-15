(function(){
    angular.module('PhotoShare').controller("LoginController",function(photoShareAPI){
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
                        vm.data = data;
                    },
                    function(error){
                        console.info(error.data.error_description);
                    });
            } else{
                console.error('Username or password not supplied');
            }
        }

        vm.registerUser = function(){
            if(vm.registerUsername === ""){
                console.error("Username is null");
            } else if(vm.registerPassword === ""){
                console.error("Password is null");
            } else if(vm.registerPassword !== vm.registerConfirmPassword){
                console.error("Passwords do not match");
            } else{
                //attempt to register user
            }
        }

    });
})();