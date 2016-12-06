(function(){
    angular.module('PhotoShare').controller("HomeController",function(photoShareAPI){
        var vm = this;

        photoShareAPI.getMostRecentPhotos().then(function(data){
            if(data){
                vm.photos = data;
                //When the user wants to bring back the latest photos
                vm.originalPhotos = data;
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
            vm.photos = vm.originalPhotos;
        };

        vm.perRow = function(){
            return $window.innerWidth > 768 ? 5 : 3;
        };

        vm.items = [];

        for (var i = 0; i < 50; i++) {

            vm.items[i] = {
                ratio: Math.max(0.5, Math.random() * 2),
                color: '#' + ('000000' + Math.floor(Math.random() * 16777215).toString(16)).slice(-6)
            };

        }
        console.log(vm.items);

    });
})();