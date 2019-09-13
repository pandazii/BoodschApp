angular.module('boodschapp')
    .config(function ($routeProvider) {
        $routeProvider
            .when("/", {
                templateUrl: "views/home_v2.html",
                controller: 'homeController'
            })
            .when("/producten", {
                templateUrl: "views/producten.html",
                controller: 'productenController'
            })
    })