(function(){
    angular.module('PhotoShare').controller('EditProfileController',function(photoShareAPI){
        var vm = this;

        vm.user = {};
        vm.changingPassword = false;
        vm.changingEmail = false;
        vm.changingName = false;
        vm.changingDescription = false;
        vm.newEmail = "";


        photoShareAPI.getMyProfileInfo().then(function(data){
            vm.user.firstName = data.FirstName || vm.user.username;
            vm.user.lastName = data.LastName;
            vm.user.profileDescription = data.ProfileDescription;
            vm.user.profilePhoto = data.ProfilePhoto;
            vm.newEmail = data.Email;
            $('.backgroundPhoto').css('background-image', 'url(' + data.BackgroundPhoto + ')');

            vm.newFirstName = vm.user.firstName;
            vm.newLastName = vm.user.lastName;
        }, function(error){
            toastr.error('Something went wrong');
            console.error(error);
        });

        vm.changePassword = function(){
            if(vm.newPassword === vm.newPasswordConfirm && vm.newPassword.length >= 8){
                photoShareAPI.changePassword(vm.oldPassword, vm.newPassword, vm.newPasswordConfirm)
                    .then(function(response){
                        console.log(response);
                        toastr.success('Password changed')
                        vm.changingPassword = false;
                        vm.oldPassword = "";
                        vm.newPassword = "";
                        vm.newPasswordConfirm = "";
                    }, function(error){
                        console.error(error);
                        toastr.error('Current password was incorrect')
                    });
            } else{
                toastr.error('Passwords must match and be a minimum of 8 characters long');
            }
        };

        vm.changeEmail = function(){
            if(vm.newEmail.length > 0){
                photoShareAPI.changeEmail(vm.newEmail).then(function(response){
                    toastr.success('Email changed');
                    console.log(response);
                }, function(error){
                    console.error(error);
                });
            } else{
                toastr.error('You can\'t not enter an email address... Cmon man')
            }
        };

        vm.changeName = function(){
            if(vm.newFirstName.length > 0 && vm.newLastName.length > 0){
                photoShareAPI.changeName(vm.newFirstName, vm.newLastName).then(function(response){
                    toastr.success('Name changed');
                    console.log(response);
                }, function(error){
                    console.error(error);
                });
            } else{
                toastr.error('You are a person, you need a name.');
            }
        };
        vm.changeDescription = function(){
            if(vm.newDescription.length > 0 && vm.newDescription.length < 100){
                photoShareAPI.changeDescription(vm.newDescription).then(function(response){
                    toastr.success('Description changed');
                    console.log(response);
                }, function(error){
                    console.error(error);
                });
            } else{
                toastr.error('Description can\'t be empty or over 100 characters');
            }
        };





        //File upload logic
        vm.profileUploader = photoShareAPI.createFileUploader('user/profilephoto');
        vm.backgroundUploader = photoShareAPI.createFileUploader('user/backgroundphoto');
        vm.profileUploader.autoUpload = true;
        vm.backgroundUploader.autoUpload = true;
        vm.dragndropPP = false;
        vm.dragndropBG = false;

        vm.profile = function(){
            vm.dragndropPP = true;
        };
        vm.background = function(){
            vm.dragndropBG = true;

        };

        vm.profileUploader.onWhenAddingFileFailed = function(){
            toastr.error('You can\'t add that file type');
            console.log('Add failed');
        };
        vm.profileUploader.onBeforeUploadItem = function(){
            toastr.info('Uploading background photo');
        };
        vm.profileUploader.onSuccessItem = function (file, response, status) {
            toastr.success('Upload Complete');
            vm.dragndropPP = false;
            console.log('success', status, response);
        };
        vm.profileUploader.onErrorItem = function (file, response, status) {
            toastr.error('Please try again', 'Upload Failed');
            console.log('success', status, response);
        };



        vm.backgroundUploader.onWhenAddingFileFailed = function(){
            toastr.error('You can\'t add that file type');
            console.log('Add failed');
        };
        vm.backgroundUploader.onBeforeUploadItem = function(){
            toastr.info('Uploading background photo');
        };
        vm.backgroundUploader.onSuccessItem = function (file, response, status) {
            toastr.success('Upload Complete');
            vm.dragndropBG = false;
            console.log('success', status, response);
        };
        vm.backgroundUploader.onErrorItem = function (file, response, status) {
            toastr.error('Please try again', 'Upload Failed');
            console.log('success', status, response);
        };
    });
})();