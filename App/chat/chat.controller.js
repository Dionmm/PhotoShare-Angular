(function(){
    'use strict';

    angular.module('PhotoShare').controller('ChatController', function($window, $scope){
        var vm = this;

        var chat = $.connection.chatHub;
        var token = $window.sessionStorage.access_token;
        $.connection.hub.logging = true;
        $.connection.hub.qs = {'bearerToken' : token};

        chat.client.addNewMessage = function(name, message){
            console.info(message, name);
            vm.content.push({Content: message, UserName: name});
            $scope.$apply();
        };
        chat.client.addMessages = function(messages){
            vm.content = messages.reverse();
        };
        chat.client.error = function(error){
            console.error(error);
            $.connection.hub.stop();
        };

        $.connection.hub.start().done(function(){
            console.log('Chat is loaded');
            chat.client.addMEssages = function(messages){
                vm.content = messages.reverse();

                for(var message of messages.reverse()){
                    console.info(message.Content, message.UserName);
                }
            };
            $scope.$apply();

            vm.sendMessage = function(){
                console.info('Message sent');
                chat.server.send(vm.message);
            }



        });



    });

})();