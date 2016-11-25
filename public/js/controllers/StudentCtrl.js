/**
 * Created by Marta_ on 25/11/2016.
 */

angular.module('myApp').controller('StudentCtrl',['$scope','$http','$routeParams' ,function($scope, $http, $routeParams){
    $scope.Phone = {};
    var StudentID = window.location.href.split("/").pop();

    // when landing on the page, get all subjects
    $http.get('/students/' + StudentID)
        .success(function(data) {
            $scope.student = data;
            $scope.phones = data.phones;
            console.log(data);
        })
        .error(function(data) {
            console.log('Error: ' + data);
        });

    var refresh = function(){
        $http.get('/students/' + StudentID)
            .success(function(data) {
                $scope.student = data;
                $scope.phones = data.phones;
                console.log(data);
            })
            .error(function(data) {
                console.log('Error: ' + data);
            });
    };

    $scope.AddPhone = function () {
        $http.post('/students/addphone/' + StudentID, $scope.Phone)
            .success(function(data){
                $scope.Phone ={};
                $scope.student = data;
                $scope.phones = data.phones;
            })
            .error(function(data){
                console.log('Error:' + data);
            });
    };
    $scope.RemovePhone = function (phone) {
        console.log("remove phone!!!!");
        $http.delete('/students/deletephone/' + StudentID +'/' + phone)
            .success(function(data){
                console.log("remove phone!!!!");
                $scope.student = data;
                $scope.phones = data.phones;
            })
            .error(function(data){
                console.log('Error:' + data);
            });
    };

}]);