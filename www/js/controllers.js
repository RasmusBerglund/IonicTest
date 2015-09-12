angular.module('starter.controllers', ['ngOpenFB'])

.controller('AppCtrl', function ($scope, ngFB) {
    $scope.fbLogin = function () {
    ngFB.login({scope: 'email,read_stream,publish_actions'}).then(
        function (response) {
            if (response.status === 'connected') {
                console.log('Facebook login succeeded');
                $scope.closeLogin();
            } else {
                alert('Facebook login failed');
            }
        });
    }
})

.controller('DashCtrl', function ($scope, $ionicModal, $timeout, ngFB) {
     $scope.fbLogin = function () {
    ngFB.login({scope: 'email'}).then(
        function (response) {
            if (response.status === 'connected') {
                console.log('Facebook login succeeded');
                $scope.closeLogin();
            } else {
                alert('Facebook login failed');
            }
        });
    }
})


.controller('ChatsCtrl', function($scope, Chats) {
  $scope.chats = Chats.all();
  $scope.remove = function(chat) {
    Chats.remove(chat);
  }
})

.controller('ChatDetailCtrl', function($scope, $stateParams, Chats) {
  $scope.chat = Chats.get($stateParams.chatId);
})

.controller('AccountCtrl', function($scope) {
  $scope.settings = {
    enableFriends: true
  };
})


.controller('CardsCtrl', function ($scope, TDCardDelegate, ngFB) {
    var cardTypes = [
      { image: 'http://thebanginbeats.com/wp-content/uploads/2015/09/coldplay-4fc0c69c452a3.jpg' },
      { image: 'http://cdn.hitfix.com/photos/5555745/Coldplay.jpg' },
      { image: 'http://i.ytimg.com/vi/BDaWsqytrfI/hqdefault.jpg' }
    ];
    $scope.getStatus = function () {
        ngFB.getLoginStatus();
    }

    $scope.cardDestroyed = function (index) {
        $scope.cards.splice(index, 1);
    };

    $scope.addCard = function () {
        var newCard = cardTypes[Math.floor(Math.random() * cardTypes.length)];
        newCard.id = Math.random();
        $scope.cards.unshift(angular.extend({}, newCard));
    }

    $scope.cards = [];
    for (var i = 0; i < 3; i++) $scope.addCard();
})

.controller('CardCtrl', function ($scope, TDCardDelegate) {
    $scope.cardSwipedLeft = function (index) {
        console.log('LEFT SWIPE');
        $scope.addCard();
    };
    $scope.cardSwipedRight = function (index) {
        console.log('RIGHT SWIPE');
        $scope.addCard();
    };
})

.controller("ExampleController", function($scope) {
 
    $scope.savePerson = function(firstname, lastname) {
        var PeopleObject = Parse.Object.extend("PeopleObject");
        var person = new PeopleObject();
        person.set("firstname", firstname);
        person.set("lastname", lastname);
        person.save(null, {});
    };

    $scope.getPeople = function (params) {
        var PeopleObject = Parse.Object.extend("PeopleObject");
        var query = new Parse.Query(PeopleObject);
        if (params !== undefined) {
            if (params.lastname !== undefined) {
                query.equalTo("lastname", params.lastname);
            }
            if (params.firstname !== undefined) {
                query.equalTo("firstname", params.lastname);
            }
        }
        query.find({
            success: function (results) {
                alert("Successfully retrieved " + results.length + " people!");
                for (var i = 0; i < results.length; i++) {
                    var object = results[i];
                    console.log(object.id + ' - ' + object.get("firstname") + " " + object.get("lastname"));
                }
            },
            error: function (error) {
                alert("Error: " + error.code + " " + error.message);
            }
        });
    };
 
});


