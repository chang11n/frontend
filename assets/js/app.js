/* global angular */

(function () {
    var PTapp = angular.module('PTapp', []);
    PTapp.config(['$httpProvider', function ($httpProvider) {
            $httpProvider.defaults.headers.common['Accept'] = 'application/json';
            $httpProvider.defaults.headers.common['Content-Type'] = 'application/json';
            delete $httpProvider.defaults.headers.common['X-Requested-With'];
            $httpProvider.defaults.headers.common['Accept-Language'] = 'en, en-US';
        }]);


    PTapp.controller('userController', ['$http', function ($http) {
            var rest = this;
            rest.user = [];

            this.send = function (user) {
                $http({method: 'POST', url: 'http://localhost:8080/signin',
                    headers: {
                        "id": user.email,
                        "credential": user.password
                    }})
                        .then(function (response) {
                            rest.user = response.data;
                        }, function (response) {
                            alert('Failed: ' + response.status);
                        });};
        }]);
})();
