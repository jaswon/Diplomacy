myApp.factory('dataFactory', function($http) {
  /** https://docs.angularjs.org/guide/providers **/
  var urlBase = 'http://localhost:3000';
  var _prodFactory = {};

  _prodFactory.getFactionInfo = function() {
    return $http.get(urlBase+"/faction");
  };

  _prodFactory.getUserInfo = function() {
      return $http.get(urlBase+"/me");
  }

  return _prodFactory;
});
