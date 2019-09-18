angular.module('boodschapp')
    .controller('homeController', function ($scope, $filter) {

        // Controller variablen
        $scope.shoppingList = [];
        $scope.strikedList = [];
        let shoppingListOrderd = false;
        let productListOrderd = false;

        $scope.nameVal = true;

        $(function () {
            $('tbody').sortable();
        });

        //Model - Producten
        $scope.producten = [{
                "naam": "Banaan",
                "prijs": 0.99,
                "product_afbeelding": "content/producten/banaan.png",
                "done": false
            },
            {
                "naam": "Kiwi",
                "prijs": 0.99,
                "product_afbeelding": "content/producten/kiwi.png",
                "done": false
            },
            {
                "naam": "Appel",
                "prijs": 0.99,
                "product_afbeelding": "content/producten/appel.png",
                "done": false
            },
            {
                "naam": "Peer",
                "prijs": 0.99,
                "product_afbeelding": "content/producten/peer.png",
                "done": false
            },
            {
                "naam": "Meloen",
                "prijs": 0.99,
                "product_afbeelding": "content/producten/meloen.png",
                "done": false
            },
            {
                "naam": "Druiven",
                "prijs": 0.99,
                "done": false
            },
            {
                "naam": "Grapefruit",
                "done": false
            },
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
                $scope.shoppingList = $filter('orderBy')($scope.shoppingList, '-naam');
                $scope.shoppingList = $filter('orderBy')($scope.shoppingList, 'done');
                shoppingListOrderd = false;
            } else {
                $scope.shoppingList = $filter('orderBy')($scope.shoppingList, 'naam');
                $scope.shoppingList = $filter('orderBy')($scope.shoppingList, 'done');
                shoppingListOrderd = true;
            }
        }

        $scope.sortProductsByName = function () {
            if (productListOrderd) {
                $scope.producten = $filter('orderBy')($scope.producten, '-naam');
                productListOrderd = false;
            } else {
                $scope.producten = $filter('orderBy')($scope.producten, 'naam');
                productListOrderd = true;
            }
        }

        // Plaats afgevinkte producten in de boodschappenlijst onderaan.
        $scope.checkboxChanged = function () {
            $scope.shoppingList = $filter('orderBy')($scope.shoppingList, 'done');
        }

        $scope.addProductToShoppingList = function (naam, aantal, prijs, opmerking) {

            let inShoppingList = false;

            if (naam != null && aantal != null ) {
                // Controle of het product al bestaat in de boodschappenlijst.
                for (var i = 0; i < $scope.shoppingList.length; i++) {
                    if ($scope.shoppingList[i].naam == naam) {
                        inShoppingList = true;
                    }
                }

                console.log($scope.shoppingList)

                // Wanneer het product niet in de lijst voorkomt, voeg dan toe aan de lijst. Indien het product voorkomt in de lijst, pas dan alleen het aantal van het product aan.
                if (!inShoppingList) {
                    $scope.shoppingList.push({"naam": naam, "prijs": prijs, "aantal": aantal, "opmerking": opmerking});
                    //Afgevinkte producten onderaan de lijst houden als er nieuwe producten worden toegevoegd aan de lijst.
                    $scope.shoppingList = $filter('orderBy')($scope.shoppingList, 'done');
                } else {
                    console.log('In winkelwagen')
                    for (var i = 0; i < $scope.shoppingList.length; i++) {
                        if ($scope.shoppingList[i].naam == naam) {
                            $scope.shoppingList[i].aantal += aantal

                        }
                    }
                }
            }
        }
    })