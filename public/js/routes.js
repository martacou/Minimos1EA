/**
 * Created by Marta_ on 25/11/2016.
 */

var myApp = angular.module('myApp', ['ngRoute']);
myApp.config(['$routeProvider', function($routeProvider){
    console.log('Holi desde routes');
    $routeProvider
        .when('/', {
            templateUrl : 'views/subjects.html',
            controller: 'SubjectsCtrl'
        })
        .when('/subjects', {
            templateUrl : 'views/subjects.html',
            controller  : 'SubjectsCtrl'
        })
        .when('/subjects/:id', {
            templateUrl : 'views/subject.html',
            controller  : 'SubjectCtrl'
        })
        .when('/students/:id', {
            templateUrl : 'views/student.html',
            controller  : 'StudentCtrl'
        })

        // route for the about page
        .when('/students', {
            templateUrl : 'views/students.html',
            controller  : 'StudentsCtrl'
        })
    .when('/search', {
        templateUrl: 'views/search.html',
        controller: 'SearchCtrl'
    });

}]);