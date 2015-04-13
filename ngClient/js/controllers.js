myApp.controller("HeaderCtrl", ['$scope', '$location',
  function($scope, $location) {
    $scope.isActive = function(route) {
      return route === $location.path();
    }
  }
]);

myApp.controller("HomeCtrl", ['$scope',
  function($scope) {
    $scope.name = "Home Controller";
  }
]);

myApp.controller("HeaderCtrl", ['$scope', '$location', 'UserAuthFactory',
  function($scope, $location, UserAuthFactory) {

    $scope.isActive = function(route) {
      return route === $location.path();
    }

    $scope.logout = function () {
      UserAuthFactory.logout();
    }
  }
]);

myApp.controller("MeCtrl", ['$scope', 'dataFactory',
  function($scope, dataFactory) {
    dataFactory.getUserInfo().then(function(data) {
      $scope.userinfo = data.data.data;
    });
  }
]);

myApp.controller("FactionCtrl", ['$scope', 'dataFactory',
  function($scope, dataFactory) {
    dataFactory.getFactionInfo().then(function(data) {
      $scope.factioninfo = data.data.data;
    });
  }
]);
