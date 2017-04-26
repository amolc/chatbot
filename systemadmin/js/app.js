'use strict';
var label = '';

var app = angular.module('myApp', []);




app.controller('backend', function ($scope, $http, $sce, $timeout) {


    $scope.gPlace;


    $scope.init = function(){
        $scope.toggle = false ;
        $scope.label = "whereto";
        $scope.sessionId = Math.random(10);
        store.set('label', 'whereto');
        store.set('session_id', $scope.sessionId);
        showcities();
        
    
    }

  
       
   



   
    


});