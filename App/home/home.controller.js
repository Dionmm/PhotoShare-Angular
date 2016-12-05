(function(){
    angular.module('PhotoShare').controller("HomeController",function(photoShareAPI){
        var vm = this;

        photoShareAPI.getMostRecentPhotos().then(function(data){
            if(data){
                vm.photos = data;
            }else{
                toastr.error('Something went wrong, please try again');
            }
        });

        vm.searchAllPhotos = function(){
            if(vm.photoQuery){
                photoShareAPI.searchAllPhotos(vm.photoQuery).then(function(data){
                    if(data.length < 1){
                        toastr.error('Please try another search term', 'No Photos Found');
                        console.log('no photos');
                    } else{
                        vm.photos = data;
                        $('body').animate({scrollTop:$('#imageContainer').offset().top - 50}, '500');
                    }
                });
            }
        };

        vm.explore = function(){
            //scroll to the top of imageContainer and remove 50px (for header)
            $('body').animate({scrollTop:$('#imageContainer').offset().top - 50}, '500');
        }

    });
})();