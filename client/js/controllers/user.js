myApp.controller('userController', function($scope, $http, URL,toastr, $auth) {


    //TODO lista forms
    $scope.load = true;
    $scope.list = function () {
        $scope.load = true;
        $http.get(URL.base + 'users').then(function (response) {
            $scope.users = response.data;
            $scope.load = false;
        }, function (error) {
            console.log(error);
        });
    }
    $scope.list();


    //TODO delete to form
    $scope.delete = function (form) {
        $http.delete(URL.base + 'forms/' + form._id).then(function (response) {
            $scope.list();
        }, function (error) {
            console.log(error);
        });
    }

    //TODO new form
    $scope.new = function(){
        $scope.user = {};
        $('#user').removeClass('hide');
        $('#grid').addClass('hide');
    }


    //TODO edit to form
    $scope.edit = function(user){
        $scope.user = {};
        angular.copy(user, $scope.user);
        $('#user').removeClass('hide');
        $('#grid').addClass('hide');
    }

    $scope.back = function(){
        $('#user').addClass('hide');
        $('#grid').removeClass('hide');
    }

    //TODO save to form
    $scope.save = function(){
        if($scope.user._id == null) {
            $http.post(URL.base + 'users', $scope.user).then(function (response) {
                toastr.success('Resgistro cadastrado!');
                $scope.list();
                $scope.back();
            }, function (error) {
                toastr.error('Não foi possível realizar essa operação ');
                console.log(error);
            });
        }else{
            $http.put(URL.base + 'users', $scope.user).then(function (response) {
                toastr.success('Registro alterado com sucesso!');
                $scope.list();
                $scope.back();
            }, function (error) {
                toastr.error('Não foi possível realizar essa operação');
                console.log(error);
            });
        }
    }



});