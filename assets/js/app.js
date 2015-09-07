/* global angular */
var PTapp = angular.module('PTapp', ['ui.bootstrap']);
PTapp.config(['$httpProvider', function ($httpProvider) {
        $httpProvider.defaults.headers.common['Accept'] = 'application/json';
        $httpProvider.defaults.headers.common['Content-Type'] = 'application/json';
        delete $httpProvider.defaults.headers.common['X-Requested-With'];
        $httpProvider.defaults.headers.common['Accept-Language'] = 'en, en-US';
    }]);


// Please note that $modalInstance represents a modal window (instance) dependency.
// It is not the same as the $modal service used above.
var WindowInstanceController = PTapp.controller('WindowInstanceController', function ($scope, $modalInstance, content) {
    $scope.content = content;
    $scope.ok = function () {
        $modalInstance.close();
    };
});


var signinController = PTapp.controller('SigninController', ['$http', '$scope', '$modal', '$log', function ($http, $scope, $modal, $log) {
        $scope.open = function (error) {
            var modalInstance = $modal.open({
                animation: true,
                templateUrl: 'assets/template/SigninFailed.html',
                controller: 'WindowInstanceController',
                size: 'sm',
                resolve: {
                    content: function () {
                        return error;
                    }}});
            modalInstance.result.then(function () {
            }, function () {
                $log.info('Modal dismissed at: ' + new Date());
            });
        };


        var rest = this;
        rest.responsebody = [];
        this.send = function (user) {
            if (undefined === user || undefined === user.email || undefined === user.password)
            {
                return;
            }
            $http({method: 'POST', url: 'http://localhost:8080/signin',
                headers: {
                    "id": user.email,
                    "credential": user.password
                }})
                    .then(function (response) {
                        if (null === response.data || null === response.data.message || undefined === response.data || undefined === response.data.message)
                        {
                            return;
                        }
                        rest.responsebody = response.data;
                    }, function (response) {
                        if (null === response.data || null === response.data.message || undefined === response.data || undefined === response.data.message)
                        {
                            return;
                        }
                        $scope.open(response.data.message);
                    });
        };

    }]);