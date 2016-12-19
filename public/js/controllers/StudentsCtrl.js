/**
 * Created by Marta_ on 25/11/2016.
 */

angular.module('myApp').controller('StudentsCtrl',['$scope','$http','$routeParams' ,function($scope, $http, $routeParams){
    $scope.newstudent = {};

    var refresh = function(){
        $http.get('/students').success(function(response){
            console.log("Refresh");
            $scope.students = response;

        });
    };
    // get all students
    $http.get('/students')
        .success(function(data) {
            $scope.students = data;
            console.log(data);
        })
        .error(function(data) {
            console.log('Error: ' + data);
        });

    $scope.CreateStudent = function () {
        $http.post('/students', $scope.newstudent)
            .success(function(data){
                $scope.newstudent = {}; //clear the form
                $scope.students = data;
                console.log(data);
                console.log("createstudent");
                refresh();
            })
            .error(function(data){
                console.log('Error:' + data);
            });
    };

    $scope.DeleteStudent = function (id) {
        $http.delete('/students/' + id)
            .success(function(data){
                $scope.students = data;
                refresh();
            })
            .error(function(data){
                console.log('Error:' + data);
            });
    };
}]);