/* global angular */

(function () {
    var PTapp = angular.module('PTapp', []);


    PTapp.controller('userController', ['$http', function ($http) {
            var rest = this;
            rest.user = [];

            this.send = function () {
                $http({method: 'GET', url: 'http://localhost:8080/user/1',
                    headers: {
                        "id": "1",
                        "credential": "123456"
                    }})
                        .then(function (response) {
                            rest.user = response.data;
                        }, function (response) {
                            alert('Failed: ' + response.status);
                        });};
        }]);
})();
