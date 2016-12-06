(function(){
    angular.module('PhotoShare').controller('UploadController',function($scope, photoShareAPI){
        var vm = this;

        var progress = 0;
        vm.photo = {
            price: 0,
            exif: []
        };
        vm.uploader = photoShareAPI.createFileUploader('photo');
        vm.metaDataItems = [0]; //Number of metadata input boxes to be displayed based on index
        if(vm.uploader.isHTML5){
            $('.button.upload').css('color','#7986cb');
        }
        //Uploader functions
        vm.uploader.onProgressItem = function(){
            progress = vm.uploader.queue[0].progress;
            $('.button.upload').attr('data-upload','Uploading');
            $('.buttonProgress').css('width', progress+'%');
            if(progress === 100){
                $('.button.upload').attr('data-upload','Processing');

            }

        };
        vm.uploader.onWhenAddingFileFailed = function(item, filter, options){
            if(filter.name === 'imageFilter'){
                toastr.error('You cannot upload that type of file');
            } else if(filter.name === 'queueLimit'){
                toastr.error('You can only upload one item at a time');
            }
            console.log(filter);
        };
        vm.uploader.onErrorItem = function(fileItem, response, status){
            console.error('Error', response, status);
            toastr.error(response, 'Error');
            vm.resetProgressBar();
        };

        //Controller functions
        vm.uploadPhoto = function(){
            if((vm.photo.name === undefined || vm.photo.name.length <= 20) && vm.photo.price >= 0){
                console.info('Name is good');
                photoShareAPI.uploadPhoto(vm.uploader, function(id){
                    photoShareAPI.updatePhoto(id, vm.photo.name, vm.photo.price, vm.photo.exif)
                        .then(function(response){
                            console.info(response);
                            toastr.success('That\'s a pretty picture', 'Upload Complete');
                            vm.resetProgressBar();
                        }, function(error){
                            console.error(error);
                            toastr.error(error);
                            vm.resetProgressBar();
                        });
                });
            } else{
                console.warn('Something went wrong');
                toastr.warning('Title must be under 20 characters long');
                vm.resetProgressBar();
            }
        };

        vm.updatePhoto = function(){
            //Undefined is allowed becuase blank names are allowed on initial upload
            if((vm.photo.name === undefined || vm.photo.name.length <= 20)  && vm.photo.price >= 0){
                console.log('Name is good');

                photoShareAPI.updatePhoto(vm.photo.id, vm.photo.name, vm.photo.price, vm.photo.exif).then(function(res){
                    console.log(res);
                });
            } else{
                console.warn('Something went wrong');
            }
        };

        vm.addMetaData = function(){
            var arrayLength = vm.metaDataItems.length;
            var itemAtIndex = vm.metaDataItems[arrayLength - 1] || 0;
            vm.metaDataItems.push(itemAtIndex + 1);
        };
        vm.removeMetaData = function(index){
            vm.metaDataItems.splice(index, 1);
            vm.photo.exif.splice(index, 1)
        };

        vm.resetProgressBar = function(){
            progress = 0;
            $('.buttonProgress').css('width', progress+'%');
            $('.button.upload').attr('data-upload','Upload');
        }

    });
})();