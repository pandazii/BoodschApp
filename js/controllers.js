angular
  .module("boodschapp")
  .controller("homeController", function ($scope, $filter) {
    // Controller variablen
    $scope.list = [];
    $scope.savedLists = [];


    //Model - Favoriete producten
    $scope.producten = [{
        naam: "Banaan",
        product_afbeelding: "content/producten/banaan.png"
      },
      {
        naam: "Kiwi",
        product_afbeelding: "content/producten/kiwi.png"
      },
      {
        naam: "Appel",
        product_afbeelding: "content/producten/appel.png"
      },
      {
        naam: "Peer",
        product_afbeelding: "content/producten/peer.png"
      },
      {
        naam: "Meloen",
        product_afbeelding: "content/producten/meloen.png"
      },
      {
        naam: "Druiven"
      },
      {
        naam: "Grapefruit"
      }
    ];

    $scope.saveList = function (beschrijving, datum) {

      let datum_format = moment(datum).format('DD MMM YYYY');
      var originalData = angular.copy($scope.list);

      $scope.savedLists.push({
        'beschrijving': beschrijving,
        'datum': datum_format,
        'list': originalData
      });

      $scope.list = [];
    }

    $scope.loadSavedList = function (savedProducts) {
      console.log(savedProducts.list)
      $scope.list = [];
      $scope.list = savedProducts.list;
      console.log($scope.list)
    }

    $scope.addFavoriteProduct = function (favoriteProductName) {
      $scope.isInProductList = false;

      for (let i = 0; i < $scope.producten.length; i++) {
        if ($scope.producten[i].naam == favoriteProductName) {
          $scope.isInProductList = true;
        }
      }

      if (!$scope.isInProductList) {
        $scope.producten.push({
          naam: favoriteProductName
        });
      }
    };

    $scope.savePersonalName = function (name) {
      $scope.personalName = name;
    };

    $scope.orderFavoriteProductsByName = function () {

      let favoriteProductsOrdered = false;

      if (favoriteProductsOrdered) {
        $scope.producten = $filter("orderBy")($scope.producten, "-naam");
        favoriteProductsOrdered = false;
      } else {
        $scope.producten = $filter("orderBy")($scope.producten, "naam");
        favoriteProductsOrdered = true;
      }
    };

    // Plaats afgevinkte producten in de boodschappenlijst onderaan.
    $scope.listCheckboxChanged = function () {
      $scope.list = $filter("orderBy")($scope.list, "done");
    };

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
            naam: naam,
            aantal: aantal,
            opmerking: opmerking,
            done: false
          });
          //Afgevinkte producten onderaan de lijst houden als er nieuwe producten worden toegevoegd aan de lijst.
          $scope.list = $filter("orderBy")($scope.list, "done");
        } else {
          for (var i = 0; i < $scope.list.length; i++) {
            if ($scope.list[i].naam == naam) {
              $scope.list[i].aantal += aantal;
            }
          }
        }
        // Input velden resetten
        $scope.naam = null;
        $scope.aantal = null;
        $scope.opmerking = null;
      }
    };
  });