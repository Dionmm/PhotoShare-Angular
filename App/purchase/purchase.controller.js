(function(){
    angular.module('PhotoShare').controller("PurchaseController",function(photoShareAPI, $scope){
        var vm = this;

        //Test data, left here deliberately so you don't need to look up Stripe's test
        //criteria
        vm.cardNumber = 4242424242424242;
        vm.cvc = 123;
        vm.month = 12;
        vm.year = 21;
        $scope.$on('photoLoaded', function(event, args){
            vm.photoId = args.photoId;
        });

        vm.createChargeRequest = function(){
            var card = {
                number: vm.cardNumber,
                cvc: vm.cvc,
                exp_month: vm.month,
                exp_year: vm.year
            };
            console.log('ran');

            Stripe.card.createToken(card, function(status, response){
                if(response.error){
                    toastr.error(response.error);
                    return console.error(response.error);
                }

                if(vm.photoId !== null && vm.photoId !== undefined){
                    photoShareAPI.addPurchaseToDB(response.id, vm.photoId)
                        .then(function(response){
                            console.info(response);
                            toastr.success('Good choice', 'Purchase Successful');
                        }, function(error){
                            console.error(error);
                            toastr.error(error.data.Message);

                        });
                }
            });
        }
    });
})();