(function(){
    angular.module('PhotoShare').controller('EditProfileController',function(photoShareAPI){
        var vm = this;

        vm.user = {};
        vm.changingPassword = false;

        photoShareAPI.getMyProfileInfo().then(function(data){
            vm.user.firstName = data.FirstName || vm.user.username;
            vm.user.lastName = data.LastName;
            vm.user.profileDescription = data.ProfileDescription;
            vm.user.profilePhoto = data.ProfilePhoto;
            $('.backgroundPhoto').css('background-image', 'url(' + data.BackgroundPhoto + ')');
        }, function(error){
            toastr.error('Something went wrong');
            console.error(error);
        });

        vm.changePassword = function(){
            if(vm.newPassword === vm.newPasswordConfirm){
                photoShareAPI.changePassword(vm.oldPassword, vm.newPassword, vm.newPasswordConfirm)
                    .then(function(response){
                        console.log(response);
                        toastr.success('Password changed')
                    }, function(error){
                        console.error(error);
                    });
            } else{
                toastr.error('Passwords do not match');
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