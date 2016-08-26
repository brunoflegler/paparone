myApp.controller('unitController', function($scope, $http, URL, toastr, $filter) {

    $scope.currentPage = 1;
    $scope.pageSize = 10;
    $scope.totalItens = 0;


    //TODO lista units
    $scope.list = function () {
        $scope.load = true;
        $http.get(URL.base + 'units/' + 0 + '/' + $scope.pageSize ).then(function (response) {
            $scope.units = response.data;
            $scope.load = false;
        }, function (error) {
            console.log(error);
        });
    }


    //TODO lista total forms
    $scope.total = function () {
        $scope.load = true;
        $http.get(URL.base + 'units' ).then(function (response) {
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

    //TODO edit to unit
    $scope.edit = function(unit){
        $scope.unit = {};
        angular.copy(unit, $scope.unit);
        var unit = $filter('filter')($scope.units, $scope.unit.unit )[0];
        $scope.unit.unit = unit;
        $('#formulario').removeClass('hide');
        $('#grid').addClass('hide');
    }


    //TODO delete to unit
    $scope.delete = function (unit) {
        $http.delete(URL.base +  'units/' + unit._id).then(function (response) {
            $scope.list();
        }, function (error) {
            console.log(error);
        });
    }

    //TODO new unit
    $scope.new = function(){
        $scope.unit = {}
        $('#formulario').removeClass('hide');
        $('#grid').addClass('hide');
    }

    //TODO save to unit
    $scope.save = function(){
        if($scope.unit._id == null) {
            $http.post(URL.base + 'units', $scope.unit).then(function (response) {
                toastr.success('Resgistro salvo!', 'Sucesso!');
                $scope.list();
                $scope.back();
            }, function (error) {
                toastr.error('Não foi possível realizar essa operação ', 'Erro!');
                console.log(error);
            });
        }else{
            $http.put(URL.base + 'units', $scope.unit).then(function (response) {
                toastr.success('Resgistro salvo!', 'Sucesso!');
                $scope.list();
                $scope.back();
            }, function (error) {
                toastr.error('Não foi possível realizar essa operação ', 'Erro!');
                console.log(error);
            });
        }
    }


});