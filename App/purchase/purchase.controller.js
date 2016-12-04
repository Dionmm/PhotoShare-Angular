(function(){
    angular.module('PhotoShare').controller("PurchaseController",function(photoShareAPI){
        var vm = this;

        vm.cardNumber = 4242424242424242;
        vm.cvc = 123;
        vm.month = 12;
        vm.year = 21;

        vm.createChargeRequest = function(){
            var card = {
                number: vm.cardNumber,
                cvc: vm.cvc,
                exp_month: vm.month,
                exp_year: vm.year
            };

            Stripe.card.createToken(card, function(status, response){

                if(response.error){
                    toastr.error(response.error);
                    return console.error(response.error);
                }

                photoShareAPI.addPurchaseToDB(response.id, 23)
                    .then(function(response){
                        console.info(response);
                        toastr.success('Good choice', 'Purchase Successful');
                    }, function(error){
                        console.error(error);
                        toastr.error(error);

                    });
            });
        }
    });
})();