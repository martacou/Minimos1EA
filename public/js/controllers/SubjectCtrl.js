/**
 * Created by Marta_ on 25/11/2016.
 */

angular.module('myApp').controller('SubjectCtrl',['$scope','$http','$routeParams' ,function($scope, $http, $routeParams){

    var SubjectID = window.location.href.split("/").pop();

    // when landing on the page get subject
    $http.get('/subjects/'+ SubjectID)
        .success(function(data) {
            $scope.subject = data;
            $scope.subjectstudents = data.students;
            console.log($scope.subjectstudents);
            console.log(data);
        })
        .error(function(data) {
            console.log('Error: ' + data);
        });

    // when landing on the page, get all students
    $http.get('/students')
        .success(function(data) {
            $scope.students = data;
            console.log(data);
        })
        .error(function(data) {
            console.log('Error: ' + data);
        });

    $scope.AddStudentInSubject = function (id) {
        $scope.addstudent = {
            student_id: id
        };
        $scope.ID = id;
        console.log($scope.addstudent);
        $http.put('/subjects/' + SubjectID, $scope.addstudent)
            .success(function(data){
                $scope.subject = data;
                $scope.subjectstudents= data.students;
            })
            .error(function(data){
                console.log('Error:' + data);
            });
    };

    $scope.DeleteStudentSubject = function (id) {
        $http.delete('/subjects/' + SubjectID +'/'+ id)
            .success(function(data){
                $scope.subject = data;
                $scope.subjectstudents= data.students;
            })
            .error(function(data){
                console.log('Error:' + data);
            });
    };

}]);