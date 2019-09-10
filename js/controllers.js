angular.module('boodschapp')
    .controller('homeController', function ($scope, $http) {


        $scope.arr = [];
        $scope.list = [];

        function getProducts() {
            $http.get('models/producten.json').then(function (data) {
                $scope.producten = data.data;
                console.log($scope.producten);
            });
        }

        getProducts();

        $scope.addProductsToList = function (index) {
            $scope.list.push(index);
        }
    })