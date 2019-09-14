angular.module('boodschapp')
    .controller('homeController', function ($scope, $http, $filter) {

        $scope.shoppingList = [];
        $scope.strikedList = [];
        var shoppingListOrderd = false;

        getProducts();

        function getProducts() {
            $http.get('models/producten.json').then(function (data) {
                $scope.producten = data.data;

            }).catch(function (error) {
                console.log("fout bij het ophalen van de producten" + error)
            })
        }

        // sorteer producten in de boodschappenlijst op product naam
        $scope.sortShoppingListProductName = function () {
            if (shoppingListOrderd) {
                $scope.shoppingList = $filter('orderBy')($scope.shoppingList, '-product');
                $scope.shoppingList = $filter('orderBy')($scope.shoppingList, 'done');
                shoppingListOrderd = false;
            } else {
                $scope.shoppingList = $filter('orderBy')($scope.shoppingList, 'product');
                $scope.shoppingList = $filter('orderBy')($scope.shoppingList, 'done');
                shoppingListOrderd = true;
            }
        }

        // Plaats afgevinkte producten in de boodschappenlijst onderaan.
        $scope.checkboxChanged = function () {
            $scope.shoppingList = $filter('orderBy')($scope.shoppingList, 'done');
        }

        $scope.addProductToShoppingList = function (index, aantalProducten) {

            let inShoppingList = false;

            // Controle of het product al bestaat in de boodschappenlijst.
            for (var i = 0; i < $scope.shoppingList.length; i++) {
                if ($scope.shoppingList[i].product == index.product) {
                    inShoppingList = true;
                }
            }

            // Wanneer het product niet in de lijst voorkomt, voeg dan toe aan de lijst. Indien het product voorkomt in de lijst, pas dan alleen het aantal van het product aan.
            if (!inShoppingList) {
                index.aantal = aantalProducten;
                $scope.shoppingList.push(index);
                //Afgevinkte producten onderaan de lijst houden als er nieuwe producten worden toegevoegd aan de lijst.
                $scope.shoppingList = $filter('orderBy')($scope.shoppingList, 'done');
            } else {
                for (var i = 0; i < $scope.shoppingList.length; i++) {
                    if ($scope.shoppingList[i].product == index.product) {
                        $scope.shoppingList[i].aantal += aantalProducten

                    }
                }
            }
        }
    })