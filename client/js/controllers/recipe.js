myApp.controller('recipeController', function($scope, $http, URL, toastr, $filter) {

    $scope.currentPage = 1;
    $scope.pageSize = 10;
    $scope.totalItens = 0;


    //TODO lista recipes
    $scope.list = function () {
        $scope.load = true;
        $http.get(URL.base + 'recipes/' + 0 + '/' + $scope.pageSize ).then(function (response) {
            $scope.recipes = response.data;
            $scope.load = false;
        }, function (error) {
            console.log(error);
        });
    }

    //TODO lista total forms
    $scope.total = function () {
        $scope.load = true;
        $http.get(URL.base + 'recipes' ).then(function (response) {
            $scope.totalItens = response.data.length;
        }, function (error) {
            console.log(error);
        });
    }
    $scope.list();
    $scope.total();

    $scope.back = function(){
        $('#formulario').addClass('hide');
        $('#grid').removeClass('hide');
    }

    //TODO edit to recipe
    $scope.edit = function(recipe){
        $scope.recipe = {};
        angular.copy(recipe, $scope.recipe);
        $scope.ingredients = [];
        angular.copy($scope.recipe.ingredients, $scope.ingredients);

        $scope.complements = [];
        angular.copy($scope.recipe.complements, $scope.complements);

        var unit = $filter('filter')($scope.units, $scope.recipe.produce.unit )[0];
        $scope.recipe.produce.unit = unit;

        if($scope.recipe.packing != null) {
            var packing = $filter('filter')($scope.products, {_id: $scope.recipe.packing._id})[0];
            $scope.recipe.packing = packing;
        }
        valorAtual();

        $('#formulario').removeClass('hide');
        $('#grid').addClass('hide');
    }


    //TODO delete to recipe
    $scope.delete = function (recipe) {
        $http.delete(URL.base +  'recipes/' + recipe._id).then(function (response) {
            $scope.list();
        }, function (error) {
            console.log(error);
        });
    }

    //TODO new recipe
    $scope.new = function(){
        $scope.recipe = {};
        $scope.recipe.produce = {};
        $scope.recipe.produce.lost = 0;
        $scope.recipe.ingredients = [];
        $scope.ingredients = [];

        $scope.recipe.complements = [];
        $scope.complements = [];

        $('#formulario').removeClass('hide');
        $('#grid').addClass('hide');
    }

    //TODO save to recipe
    $scope.save = function(){
        if($scope.recipe._id == null) {
            $http.post(URL.base + 'recipes', $scope.recipe).then(function (response) {
                toastr.success('Resgistro salvo!', 'Sucesso!');
                $scope.list();
                $scope.back();
            }, function (error) {
                toastr.error('Não foi possível realizar essa operação ', 'Erro!');
                console.log(error);
            });
        }else{
            $http.put(URL.base + 'recipes', $scope.recipe).then(function (response) {
                toastr.success('Resgistro salvo!', 'Sucesso!');
                $scope.list();
                $scope.back();
            }, function (error) {
                toastr.error('Não foi possível realizar essa operação ', 'Erro!');
                console.log(error);
            });
        }
    }

    //TODO lista products
    $scope.searchproducts = function () {
        $scope.load = true;
        $http.get(URL.base + 'products').then(function (response) {
            $scope.products = response.data;
            $scope.load = false;
        }, function (error) {
            console.log(error);
        });
    }

    //TODO lista products
    $scope.searchComplements = function () {
        $http.get(URL.base + 'recipes').then(function (response) {
            $scope.resultComplements = response.data;
        }, function (error) {
            console.log(error);
        });
    }



    $scope.searchproducts();
    $scope.searchComplements();

    $scope.productSelect = {};
    $scope.addProduct = function(){
        $scope.ingredients.push($scope.productSelect);
        $scope.recipe.ingredients.push({product: $scope.productSelect.product._id, quantity: $scope.productSelect.quantity});
        $('#modalIngredients').modal('hide');

        valorAtual();
    }

    $scope.complementSelect = {};
    $scope.addComplement= function(){
        $scope.complements.push($scope.complementSelect);
        $scope.recipe.complements.push({complement: $scope.complementSelect.complement._id, quantity: $scope.complementSelect.quantity});
        $('#modalComplements').modal('hide');
    }


    $scope.modalIngredients = function(){
        $scope.productSelect = {};
        $('#modalIngredients').modal('show');

    }

    $scope.modalComplements = function(){
        $scope.complementSelect = {};
        $('#modalComplements').modal('show');

    }


    $scope.editIngredient = function(index){
       alert('fazer editar');
    }

    $scope.deleteIngredient = function(index){
        alert('fazer o delete');
    }

    $scope.editComplement = function(index){
        alert('fazer editar');
    }

    $scope.deleteComplement = function(index){

    }


    //TODO lista units
    $scope.units = function () {
        $http.get(URL.base + 'units').then(function (response) {
            $scope.units = response.data;
        }, function (error) {
            console.log(error);
        });
    }

    $scope.units();


    var valorAtual = function(){
        if($scope.recipe != null) {
            $scope.recipe.produce.vlr_total = 0;
            for (var i = 0; i < $scope.ingredients.length; i++) {
                $scope.recipe.produce.vlr_total += ($scope.ingredients[i].product.vlr_unit / $scope.ingredients[i].product.quantity) * $scope.ingredients[i].quantity;
            }

            //$scope.recipe.produce.vlr_total_lost = $scope.recipe.produce.vlr_total + (($scope.recipe.produce.vlr_total * $scope.recipe.lost) / 100);
            //$scope.recipe.produce.vlr_unit = ($scope.recipe.produce.vlr_total_lost / $scope.recipe.produce.quantity);

            var total_complements = 0
            for (var y = 0; y < $scope.complements.length; y++) {
                total_complements += $scope.complements[y].complement.produce.vlr_unit * $scope.complements[y].quantity;
            }

            $scope.recipe.produce.vlr_total += total_complements;
            console.log($scope.recipe.produce.vlr_total);

            $scope.recipe.produce.vlr_unit = ($scope.recipe.produce.vlr_total / $scope.recipe.produce.quantity);

            console.log($scope.recipe.produce.vlr_unit);
            if ($scope.recipe.packing != null) {
                $scope.recipe.produce.vlr_unit = $scope.recipe.produce.vlr_unit * $scope.recipe.quantity_pack ;
            }
            if ($scope.recipe.packing != null) {
                $scope.recipe.produce.vlr_unit += $scope.recipe.packing.vlr_unit;
            }
            $scope.recipe.produce.vlr_unit += (($scope.recipe.produce.vlr_unit * $scope.recipe.lost) / 100);

        }


    }

    $scope.$watch('recipe.lost', function(){
        valorAtual();
    });

    $scope.$watch('recipe.produce.quantity', function(){
        valorAtual();
    });

    $scope.$watch('recipe.packing', function(){
        valorAtual();
    });

    $scope.$watch('recipe.quantity_pack', function(){
        valorAtual();
    });


});