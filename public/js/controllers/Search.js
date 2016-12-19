/**
 * Created by Marta_ on 25/11/2016.
 */

angular.module('myApp').controller('SearchCtrl',['$scope','$http','$routeParams' ,function($scope, $http, $routeParams){
    $http.get('/subjects')
        .success(function(data) {
            $scope.subjects = data;
            console.log(data);
        })
        .error(function(data) {
            console.log('Error: ' + data);
        });
    $scope.showAll = function(){
        $http.get('/subjects')
            .success(function(data) {
                $scope.subjects = data;
                console.log(data);
            })
            .error(function(data) {
                console.log('Error: ' + data);
            });
    };
    $scope.DeleteSubject = function (id) {
        $http.delete('/subjects/' + id)
            .success(function(data){
                $scope.subjects = data;
            })
            .error(function(data){
                console.log('Error:' + data);
            });
    };
}]);