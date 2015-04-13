myApp.controller('LoginCtrl', ['$scope', '$window', '$location', 'UserAuthFactory', 'AuthenticationFactory',
    function($scope, $window, $location, UserAuthFactory, AuthenticationFactory) {

        $scope.login = function() {

            var username = $scope.user.username || "",
            password = $scope.user.password || "";

            UserAuthFactory.login(username, password).success(function(data) {

                if (data.type) {
                    AuthenticationFactory.isLogged = true;
                    AuthenticationFactory.user = data.data.username;
                    //AuthenticationFactory.userRole = data.data.role;

                    $window.sessionStorage.token = data.token;
                    $window.sessionStorage.user = data.data.username; // to fetch the user details on refresh
                    //$window.sessionStorage.userRole = data.user.role; // to fetch the user details on refresh

                    $location.path("/");
                } else {
                    alert("Invalid credentials -- Try again");
                }
            }).error(function(status) {
                alert('Oops something went wrong! ');
            });

        };

        $scope.register = function() {

            var username = $scope.user.username || "",
            password = $scope.user.password || "",
            faction = $scope.user.faction || "";

            UserAuthFactory.register(username, password, faction).success(function(data) {
                if (data.type) {
                    alert("Your account has successfully been created!");
                    AuthenticationFactory.isLogged = true;
                    AuthenticationFactory.user = data.data.username;
                    //AuthenticationFactory.userRole = data.data.role;

                    $window.sessionStorage.token = data.token;
                    $window.sessionStorage.user = data.data.username; // to fetch the user details on refresh
                    //$window.sessionStorage.userRole = data.user.role; // to fetch the user details on refresh

                    $location.path("/");
                } else {
                    alert(data.data);
                }
            }).error(function(status) {
                alert('Oops something went wrong! ');
            });
        }
    }
]);
