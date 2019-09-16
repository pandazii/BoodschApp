angular.module('boodschapp')
    .config(function ($routeProvider) {
        $routeProvider
            .when("/", {
                templateUrl: "home.html",
                controller: 'homeController'
            })
    })