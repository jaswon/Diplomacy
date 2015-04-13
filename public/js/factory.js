myApp.factory('dataFactory', function($http) {
  /** https://docs.angularjs.org/guide/providers **/
  var _prodFactory = {};

  _prodFactory.getFactionInfo = function() {
    return $http.get("/faction");
  };

  _prodFactory.getUserInfo = function() {
      return $http.get("/me");
  }

  return _prodFactory;
});
