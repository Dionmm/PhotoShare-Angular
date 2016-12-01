(function(){
    'use strict';

    angular.module('PhotoShare').controller('ChatController', function($window, $scope){
        var vm = this;

        var chat = $.connection.chatHub;
        var token = $window.sessionStorage.access_token;
        var chatHidden = false;
        var initialChatHeight = $('.chat').prop('scrollHeight');
        $.connection.hub.logging = true;
        $.connection.hub.qs = {'bearerToken' : token};


        //Chat clientside functions
        chat.client.addNewMessage = function(name, message){
            console.info(message, name);
            if (vm.content) {
                vm.content.push({ Content: message, UserName: name });
                
                var scrollHeight = $('.chat').prop('scrollHeight');
                var scrollPosition = Math.floor($('.chat').scrollTop());

                if (scrollHeight - scrollPosition === initialChatHeight) {
                    $scope.$apply();
                    $(".chat").scrollTop($('.chat').prop("scrollHeight"));
                } else {
                    $scope.$apply();

                }
            }
        };

        chat.client.loadMessages = function(messages){
            vm.content = messages.reverse();

        };
        chat.client.error = function(error){
            console.error(error);
            $.connection.hub.stop();
        };

        //Init the chat
        $.connection.hub.start().done(function(){
            console.log('Chat is loaded');
            $scope.$apply();
            $(".chat").scrollTop($('.chat').prop("scrollHeight"));

        });


        vm.sendMessage = function() {
            console.info('Message sent');
            chat.server.send(vm.message);
            vm.message = '';
        }

        vm.hideChat = function () {
            if (chatHidden) {
                $('.chatBox').animate({bottom: 0}, 250);
                $('.chatHeader p').text('Hide Chat');
                chatHidden = false;
            } else {
                $('.chatBox').animate({ bottom: '-275px' }, 250);
                $('.chatHeader p').text('Show Chat');
                chatHidden = true;
            }
        }
    });

})();