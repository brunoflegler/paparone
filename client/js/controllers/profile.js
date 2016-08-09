myApp.controller('profileController', function($scope, $auth, $location, Account, toastr, $http, URL  ) {
    $scope.getProfile = function() {
        Account.getProfile()
            .then(function(response) {
                $scope.user = response.data;
            })
            .catch(function(response) {
                toastr.error(response.data.message, response.status);
            });
    };
    $scope.updateProfile = function() {
        Account.updateProfile($scope.user)
            .then(function() {
                toastr.success('Profile has been updated');
            })
            .catch(function(response) {
                toastr.error(response.data.message, response.status);
            });
    };
    $scope.link = function(provider) {
        $auth.link(provider)
            .then(function() {
                toastr.success('You have successfully linked a ' + provider + ' account');
                $scope.getProfile();
            })
            .catch(function(response) {
                toastr.error(response.data.message, response.status);
            });
    };
    $scope.unlink = function(provider) {
        $auth.unlink(provider)
            .then(function() {
                toastr.info('You have unlinked a ' + provider + ' account');
                $scope.getProfile();
            })
            .catch(function(response) {
                toastr.error(response.data ? response.data.message : 'Could not unlink ' + provider + ' account', response.status);
            });
    };

    $scope.getProfile();


    $scope.updatePassword = function(){
        if($scope.profile.confirmPassword != $scope.profile.newPassword){
            toastr.error('Senha de confirmação está diferente!');
        }else {
            $auth.login({username: $scope.user.username, password: $scope.profile.currentPassword})
                .then(function () {
                    $http.post(URL.base + 'crypto', {password: $scope.profile.newPassword}).then(function (response) {
                        $scope.user.password = response.data;
                        $http.put(URL.base + 'users', $scope.user).then(function (response) {
                            toastr.success('Registro alterado com sucesso!');
                            $('#modal-user').modal('hide');
                        }, function (error) {
                            toastr.error('Não foi possível realizar essa operação');
                            console.log(error);
                        });
                    }, function (error) {
                        toastr.error('Não foi possível realizar essa operação');
                        console.log(error);
                    });
                })
                .catch(function (error) {
                    toastr.error('Senha Atual inválida!');
                });
        }
    }
});

