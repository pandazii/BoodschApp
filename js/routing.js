angular.module('boodschapp')
    .config(function ($routeProvider) {
        $routeProvider
            .when("/", {
                templateUrl: "/views/home.html",
                controller: 'homeController'
            })
    })