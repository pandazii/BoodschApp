angular.module('boodschapp')
    .controller('homeController', function ($scope, $filter) {

        // Controller variablen
        $scope.shoppingList = [];
        $scope.strikedList = [];
        let shoppingListOrderd = false;
        let productListOrderd = false;

        //Model - Producten
        $scope.producten = [{
                "product": "Banaan",
                "prijs": 0.99,
                "product_afbeelding": "content/producten/banaan.png",
                "done": false
            },
            {
                "product": "Kiwi",
                "prijs": 0.99,
                "product_afbeelding": "content/producten/kiwi.png",
                "done": false
            },
            {
                "product": "Appel",
                "prijs": 0.99,
                "product_afbeelding": "content/producten/appel.png",
                "done": false
            },
            {
                "product": "Peer",
                "prijs": 0.99,
                "product_afbeelding": "content/producten/peer.png",
                "done": false
            },
            {
                "product": "Meloen",
                "prijs": 0.99,
                "product_afbeelding": "content/producten/meloen.png",
                "done": false
            },
            {
                "product": "Banaan",
                "prijs": 0.99,
                "product_afbeelding": "content/producten/banaan.png",
                "done": false
            },
            {
                "product": "Kiwi",
                "prijs": 0.99,
                "product_afbeelding": "content/producten/kiwi.png",
                "done": false
            },
            {
                "product": "Appel",
                "prijs": 0.99,
                "product_afbeelding": "content/producten/appel.png",
                "done": false
            },
            {
                "product": "Peer",
                "prijs": 0.99,
                "product_afbeelding": "content/producten/peer.png",
                "done": false
            },
            {
                "product": "Meloen",
                "prijs": 0.99,
                "product_afbeelding": "content/producten/meloen.png",
                "done": false
            },
            {
                "product": "Banaan",
                "prijs": 0.99,
                "product_afbeelding": "content/producten/banaan.png",
                "done": false
            },
            {
                "product": "Kiwi",
                "prijs": 0.99,
                "product_afbeelding": "content/producten/kiwi.png",
                "done": false
            },
            {
                "product": "Appel",
                "prijs": 0.99,
                "product_afbeelding": "content/producten/appel.png",
                "done": false
            },
            {
                "product": "Peer",
                "prijs": 0.99,
                "product_afbeelding": "content/producten/peer.png",
                "done": false
            },
            {
                "product": "Meloen",
                "prijs": 0.99,
                "product_afbeelding": "content/producten/meloen.png",
                "done": false
            }
        ]


        // Werkt niet bij static websites
        // function getProducts() {
        //     $http.get('models/producten.json').then(function (data) {
        //         $scope.producten = data.data;

        //     }).catch(function (error) {
        //         console.log("fout bij het ophalen van de producten" + error)
        //     })
        // }


        // sorteer producten in de boodschappenlijst op product naam
        $scope.sortShoppingListByName = function () {
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

        $scope.sortProductsByName = function () {
            if (productListOrderd) {
                $scope.producten = $filter('orderBy')($scope.producten, '-product');
                productListOrderd = false;
            } else {
                $scope.producten = $filter('orderBy')($scope.producten, 'product');
                productListOrderd = true;
            }
        }

        // Plaats afgevinkte producten in de boodschappenlijst onderaan.
        $scope.checkboxChanged = function () {
            $scope.shoppingList = $filter('orderBy')($scope.shoppingList, 'done');
        }

        $scope.addProductToShoppingList = function (index, aantalProducten) {

            let inShoppingList = false;

            if (aantalProducten != null) {
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
        }
    })