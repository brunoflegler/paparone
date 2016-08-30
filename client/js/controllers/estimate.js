myApp.controller('estimateController', function($scope, $http, URL, toastr) {

    $scope.currentPage = 1;
    $scope.pageSize = 10;
    $scope.totalItens = 0;


    //TODO lista estimates
    $scope.list = function () {
        $scope.load = true;
        $http.get(URL.base + 'estimates/' + 0 + '/' + $scope.pageSize ).then(function (response) {
            $scope.estimates = response.data;
            $scope.load = false;
        }, function (error) {
            console.log(error);
        });
    }

    //TODO lista total forms
    $scope.total = function () {
        $scope.load = true;
        $http.get(URL.base + 'estimates' ).then(function (response) {
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

    //TODO edit to estimate
    $scope.edit = function(estimate){
        $scope.estimate = {};
        angular.copy(estimate, $scope.estimate);

        $('#formulario').removeClass('hide');
        $('#grid').addClass('hide');
    }


    //TODO delete to estimate
    $scope.delete = function (estimate) {
        $http.delete(URL.base +  'estimates/' + estimate._id).then(function (response) {
            $scope.list();
        }, function (error) {
            console.log(error);
        });
    }

    //TODO new estimate
    $scope.new = function(){
        $scope.estimate = {};
        $scope.estimate.ingredients = [];
        $scope.estimate.produce = {};
        $scope.estimate.produce.total = 0.00;
        $('#formulario').removeClass('hide');
        $('#grid').addClass('hide');
    }

    //TODO save to estimate
    $scope.save = function(){
        if($scope.estimate._id == null) {
            $http.post(URL.base + 'estimates', $scope.estimate).then(function (response) {
                toastr.success('Resgistro salvo!', 'Sucesso!');
                $scope.list();
                $scope.back();
            }, function (error) {
                toastr.error('Não foi possível realizar essa operação ', 'Erro!');
                console.log(error);
            });
        }else{
            $http.put(URL.base + 'estimates', $scope.estimate).then(function (response) {
                toastr.success('Resgistro salvo!', 'Sucesso!');
                $scope.list();
                $scope.back();
            }, function (error) {
                toastr.error('Não foi possível realizar essa operação ', 'Erro!');
                console.log(error);
            });
        }
    }

    //TODO lista recipes
    $scope.searchRecipes = function () {
        $http.get(URL.base + 'recipes').then(function (response) {
            $scope.recipes = response.data;
        }, function (error) {
            console.log(error);
        });
    }

    $scope.searchRecipes();


    //$scope.getTotal = function(ingredients){
    //    var total = 0;
    //    for(var i = 0; i < ingredients.length; i++){
    //        total += ((ingredients[i].quantity * ingredients[i].product.vlr_unit)/ingredients[i].product.quantity );
    //    }
    //    return total;
    //}

    var calcular = function(){
        $scope.estimate.produce.total = 0;
        $scope.estimate.total = 0;
        for(var i = 0; i < $scope.estimate.ingredients.length; i++){
            $scope.estimate.produce.total += (($scope.estimate.ingredients[i].quantity * $scope.estimate.ingredients[i].product.vlr_unit)/$scope.estimate.ingredients[i].product.quantity );
        }
        console.log($scope.estimate.produce.total);
        console.log($scope.estimate.produce.quantity);

        $scope.estimate.produce.vlr_unit = $scope.estimate.produce.total / $scope.estimate.produce.quantity;

        console.log($scope.estimate.produce.vlr_unit);

        $scope.estimate.total += $scope.estimate.produce.vlr_unit;
        if($scope.estimate.packing != null){
            $scope.estimate.total += $scope.estimate.packing.vlr_unit;
        }


        for(var y = 0; y < $scope.estimate.complements.length; y++) {
            $scope.estimate.complements[y].complement.produce.total = 0;
            for(var z = 0; z < $scope.estimate.complements[y].complement.ingredients.length; z++) {
                $scope.estimate.complements[y].complement.produce.total += (($scope.estimate.complements[y].complement.ingredients[z].quantity * $scope.estimate.complements[y].complement.ingredients[z].product.vlr_unit)/$scope.estimate.complements[y].complement.ingredients[z].product.quantity );
            }
            $scope.estimate.complements[y].complement.produce.vlr_unit = $scope.estimate.complements[y].complement.produce.total / $scope.estimate.complements[y].complement.produce.quantity;
            $scope.estimate.complements[y].complement.produce.vlr_utility = $scope.estimate.complements[y].complement.produce.vlr_unit * $scope.estimate.complements[y].quantity;
            $scope.estimate.total += $scope.estimate.complements[y].complement.produce.vlr_utility;
        }

        $scope.estimate.total += ($scope.estimate.total * $scope.estimate.lost)/100;
    }

    $scope.choose = function(){
        if( $scope.estimate)
            calcular();
    }


});