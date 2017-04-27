'use strict';
var label = '';

var app = angular.module('myApp', []);




app.controller('backend', function ($scope, $http, $sce, $timeout) {


    $scope.gPlace;


    $scope.init = function(){
        $scope.toggle = false ;
        $scope.getquotes();

    }

  
       $scope.getquotes = function() {
     
        $http.get('/api/quotes').success(function(res) {
            //console.log("res listexternalcontact:",res);
                     $scope.subscribers = res ;
             console.log('res',$scope.subscribers);
              }).error(function(error) {
                 console.log("something is wrong");
            });
        };

            



   
    


});
