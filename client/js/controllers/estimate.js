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
        $scope.estimate = {}
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

});