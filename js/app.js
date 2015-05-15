(function () {
    var foodApp = angular.module('foodApp', []);


    foodApp.controller('menuController',['$http', function($http){
        var rest=this;
        rest.menu=[];

        this.send=function(){$http.get('http://domba-06.cs.umanitoba.ca:3000/menu/suggestion/random').success(function(data){
            rest.menu=data;});
        };
    }]);
})();
