angular.module('boodschapp')
    .controller('homeController', function ($scope, $filter) {

        // Controller variablen
        $scope.list = [];
        let listOrdered = false;
        let favoriteProductsOrdered = false;

        $(function () {
            $('tbody').sortable();
        });

        //Model - Producten
        $scope.producten = [{
                "naam": "Banaan",
                "product_afbeelding": "content/producten/banaan.png",
            },
            {
                "naam": "Kiwi",
                "product_afbeelding": "content/producten/kiwi.png",
            },
            {
                "naam": "Appel",
                "product_afbeelding": "content/producten/appel.png",
            },
            {
                "naam": "Peer",
                "product_afbeelding": "content/producten/peer.png",
            },
            {
                "naam": "Meloen",
                "product_afbeelding": "content/producten/meloen.png",
            },
            {
                "naam": "Druiven",
            },
            {
                "naam": "Grapefruit",
            },
        ]

        $scope.addFavoriteProduct = function(favoName){
            $scope.producten.push({"naam": favoName});
        }

        $scope.savePersonalName = function(name){
                $scope.personalName = name;
        }

        // sorteer producten in de boodschappenlijst op product naam
        $scope.orderShoppingListByName = function () {
            if (listOrdered) {
                $scope.list = $filter('orderBy')($scope.list, '-naam');
                $scope.list = $filter('orderBy')($scope.list, 'done');
                listOrdered = false;
            } else {
                $scope.list = $filter('orderBy')($scope.list, 'naam');
                $scope.list = $filter('orderBy')($scope.list, 'done');
                listOrdered = true;
            }
        }

        $scope.orderFavoriteProductsByName = function () {
            if (favoriteProductsOrdered) {
                $scope.producten = $filter('orderBy')($scope.producten, '-naam');
                favoriteProductsOrdered = false;
            } else {
                $scope.producten = $filter('orderBy')($scope.producten, 'naam');
                favoriteProductsOrdered = true;
            }
        }

        // Plaats afgevinkte producten in de boodschappenlijst onderaan.
        $scope.checkboxChanged = function () {
            $scope.list = $filter('orderBy')($scope.list, 'done');
        }

        $scope.addProductToList = function (naam, aantal, opmerking) {

            let inList = false;

            if (naam != null && aantal != null) {
                // Controle of het product al bestaat in de boodschappenlijst.
                for (var i = 0; i < $scope.list.length; i++) {
                    if ($scope.list[i].naam == naam) {
                        inList = true;
                    }
                }
                // Wanneer het product niet in de lijst voorkomt, voeg dan toe aan de lijst. Indien het product voorkomt in de lijst, pas dan alleen het aantal van het product aan.
                if (!inList) {
                    $scope.list.push({
                        "naam": naam,
                        "aantal": aantal,
                        "opmerking": opmerking,
                        "done": false
                    });
                    //Afgevinkte producten onderaan de lijst houden als er nieuwe producten worden toegevoegd aan de lijst.
                    $scope.list = $filter('orderBy')($scope.list, 'done');
                } else {
                    for (var i = 0; i < $scope.list.length; i++) {
                        if ($scope.list[i].naam == naam) {
                            $scope.list[i].aantal += aantal

                        }
                    }
                }
                // Input velden resetten
                $scope.naam = null;
                $scope.aantal = null;
                $scope.opmerking = null;
            }
        }
    })