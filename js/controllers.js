angular.module('boodschapp')
    .controller('homeController', function ($scope, $http) {

        function getProducts() {
            $http.get('models/producten.json').then(function (data) {
                $scope.producten = data;
                console.log($scope.producten);
            });
        }

        getProducts();
    })