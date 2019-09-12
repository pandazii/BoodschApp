angular.module('boodschapp')
    .controller('homeController', function ($scope, $http) {


        $scope.arr = [];
        $scope.list = [];
        $scope.strikedList = [];

        function getProducts() {
            $http.get('models/producten.json').then(function (data) {
                $scope.producten = data.data;
               
            });
        }

        getProducts();

        $scope.addProductsToList = function (index) {
            
            console.log($scope.list)

            var inList = false;

            for(var i = 0; i < $scope.list.length; i++){
                if($scope.list[i].product == index.product){
                    var inList = true;
                }
            } 
            
            if(!inList){
                $scope.list.push(index);
            }

        }

        $scope.deleteProductFromList = function (index) {
            $scope.list.splice(index);
        }

       console.log()

    })