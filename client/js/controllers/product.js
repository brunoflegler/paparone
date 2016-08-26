myApp.controller('productController', function($scope, $http, URL, toastr, $filter) {

    $scope.currentPage = 1;
    $scope.pageSize = 10;
    $scope.totalItens = 0;


    //TODO lista products
    $scope.list = function () {
        $scope.load = true;
        $http.get(URL.base + 'products/' + 0 + '/' + $scope.pageSize ).then(function (response) {
            $scope.products = response.data;
            $scope.load = false;
        }, function (error) {
            console.log(error);
        });
    }

    //TODO lista units
    $scope.units = function () {
        $http.get(URL.base + 'units').then(function (response) {
            $scope.units = response.data;
        }, function (error) {
            console.log(error);
        });
    }

    //TODO lista total forms
    $scope.total = function () {
        $scope.load = true;
        $http.get(URL.base + 'products' ).then(function (response) {
            $scope.totalItens = response.data.length;
        }, function (error) {
            console.log(error);
        });
    }
    $scope.list();
    $scope.total();
    $scope.units();

    $scope.back = function(){
        $('#formulario').addClass('hide');
        $('#grid').removeClass('hide');
    }

    //TODO edit to product
    $scope.edit = function(product){
        $scope.product = {};
        angular.copy(product, $scope.product);
        var unit = $filter('filter')($scope.units, $scope.product.unit )[0];
        $scope.product.unit = unit;
        $('#formulario').removeClass('hide');
        $('#grid').addClass('hide');
    }


    //TODO delete to product
    $scope.delete = function (product) {
        $http.delete(URL.base +  'products/' + product._id).then(function (response) {
            $scope.list();
        }, function (error) {
            console.log(error);
        });
    }

    //TODO new product
    $scope.new = function(){
        $scope.product = {}
        $('#formulario').removeClass('hide');
        $('#grid').addClass('hide');
    }

    //TODO save to product
    $scope.save = function(){
        if($scope.product._id == null) {
            $http.post(URL.base + 'products', $scope.product).then(function (response) {
                toastr.success('Resgistro salvo!', 'Sucesso!');
                $scope.list();
                $scope.back();
            }, function (error) {
                toastr.error('Não foi possível realizar essa operação ', 'Erro!');
                console.log(error);
            });
        }else{
            $http.put(URL.base + 'products', $scope.product).then(function (response) {
                toastr.success('Resgistro salvo!', 'Sucesso!');
                $scope.list();
                $scope.back();
            }, function (error) {
                toastr.error('Não foi possível realizar essa operação ', 'Erro!');
                console.log(error);
            });
        }
    }

    //TODO pagination
    $scope.pageChangeHandler = function(page) {
        var skip = (page - 1) * $scope.pageSize;

        $http.get(URL.base + 'products/' + skip + '/' + $scope.pageSize ).then(function (response) {
            $scope.products = response.data;
        }, function (error) {
            console.log(error);
        });
    };


});