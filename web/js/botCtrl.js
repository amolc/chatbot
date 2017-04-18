'use strict';
var label = '';

var app = angular.module('mybot', ['angular-storage','angucomplete-alt']);


app.config(['storeProvider', function (storeProvider) {
    storeProvider.setStore('sessionStorage');
}]);
app.factory('socket', ['$rootScope', function ($rootScope) {
    var socket = io.connect();
    return {
        on: function (eventName, callback) {
            socket.on(eventName, callback);
        },
        emit: function (eventName, data) {
            socket.emit(eventName, data);
        }
    };
}]);
app.controller('botCtrl', function ($scope, $http, $sce, $timeout, socket, store) {


    


    $scope.init = function(){
        $scope.toggle = false ;
        $scope.label = "whereto";
        $scope.sessionId = Math.random(10);
        store.set('label', 'whereto');
        store.set('session_id', $scope.sessionId);
    
        $scope.textinput =  false ;
        $scope.airports =  false ;
        $scope.planetype =  false ;
        $scope.planesuggest = false ;
    }

  
       
    $scope.renderHtml = function(htmlcode)
        {
            
              return $sce.trustAsHtml(htmlcode);
        };

    $scope.toggleme = function(){
        
        $scope.toggle = true;
        
        $scope.textinput = true;
        
       

        setTimeout(function () {

        $scope.fakemessage0 = 'Hello I am Julia,Your personal flight assistant..!!' ;
        $scope.fakemessage1 = 'Where do you wanna fly today ' ;
        
        var msg0 = angular.element('<div class="message new"><figure class="avatar"><img src="img/profile.png" /></figure>' + $scope.fakemessage0 + '</div>');
        var msg1 = angular.element('<div class="message new"><figure class="avatar"><img src="img/profile.png" /></figure>' + $scope.fakemessage1 + '</div>');

        angular.element(msg0).appendTo('.mCSB_container').addClass('new');
        angular.element(msg1).appendTo('.mCSB_container').addClass('new');
     
        //$('<div class="message new">' + $scope.fakemessage[1] + '</div>').appendTo($('.mCSB_container')).addClass('new');
        updateScrollbar();
    }, 100);

    }
    
    $scope.insertmsg = function() {
      
    var msg = $('.message-input').val();
    if ($.trim(msg) == '') {
      return false;
    }
    console.log('message',msg);
    $('<div class="message message-personal">' + msg + '</div>').appendTo($('.mCSB_container')).addClass('new');
    $('.message-input').val(null);

    updateScrollbar();
    emitmsg(msg);
  }
   
$scope.selectairportfunc = function() {
      
    var selected  = {} ;
        selected = $scope.selectedairport ;
    var msg = selected.originalObject.id ; 
    var msgname = selected.originalObject.name ; 
    console.log('message',msg);
    $('<div class="message message-personal">' + msgname + '</div>').appendTo($('.mCSB_container')).addClass('new');
    
    $scope.airportsuggest = false ;
    $scope.planesuggest = false ;
    $scope.textinput = true ;
    $scope.airportsnames = [] ;
      document.getElementById("chatinput").focus();
    updateScrollbar();
    emitmsg(msg);
  }


$scope.selectplanefunc = function() {
      
    var selected  = {} ;
        selected = $scope.selectedplane ;
    var msg = selected.originalObject.id ; 
    var msgname = selected.originalObject.name ; 
    console.log('message',msg);
    $('<div class="message message-personal">' + msgname + '</div>').appendTo($('.mCSB_container')).addClass('new');
    $scope.textinput = true ;
    $scope.airportsuggest = false ;
    $scope.planesuggest = false ;
    $scope.airportsnames = [] ;
    document.getElementById("chatinput").focus();
    updateScrollbar();
    emitmsg(msg);
  }
   
    

    socket.on('getresponse', function (response) {


        if (response.nextlabel == "toairports" || response.nextlabel == 'fromairports') {
           
            label = response.nextlabel;
            store.set('label', response.nextlabel);
            console.log('reponse.label', response.nextlabel);
            $scope.$broadcast('angucomplete-alt:clearInput');
            $scope.planesuggest = false ;
            $scope.textinput=false ;
            $scope.airportsuggest = true ;
            document.getElementById("chatinput").focus();

            setTimeout(function () {
                $('.message.loading').remove();
                if (response.status == 'success') {
                    console.log('success msg', response.msg);
                    console.log('response length', response.msg.results.length);
                    if (response.nextlabel == "toairports") {
                        store.set('toairports', response.msg);
                    } else {
                        store.set('fromairports', response.msg);
                    }
                    $scope.airportsnames = [];

                    if (response.msg.results.length > 0) {
                        for (var i = 0; i < response.msg.results.length; i++) {

                            var srno = i + 1;
                            $('<div class="message new"><figure class="avatar"><img src="img/profile.png" /></figure>' + srno + '. ' + response.msg.results[i].name + '</div>').appendTo($('.mCSB_container')).addClass('new');
                            $scope.airportsnames.push({id:srno, name:response.msg.results[i].name});
                     }
                    } else {
                        $('<div class="message new"><figure class="avatar"><img src="img/profile.png" /></figure>' + response.msg + '</div>').appendTo($('.mCSB_container')).addClass('new');
                    }
                } else {

                    $('<div class="message new"><figure class="avatar"><img src="img/profile.png" /></figure>' + response.msg + '</div>').appendTo($('.mCSB_container')).addClass('new');
                }

                updateScrollbar();
                
            }, 2000);
        } else if (response.nextlabel == "whichplane") {
            label = response.nextlabel;
            console.log('label:116', response.nextlabel);
            store.set('label', response.nextlabel);
            console.log(response);
            setTimeout(function () {
                $('.message.loading').remove();
                if (response.status == 'success') {
                    console.log('success msg', response.msg);
                    console.log('response length', response.msg.results.length);
                    store.set('planes', response.msg);
                    if (response.msg.results.length > 1) {
                        $scope.planetype = [];
                        for (var i = 0; i < response.msg.results.length; i++) {
                                var srno = i + 1;
                            $('<div class="message new"><figure class="avatar"><img src="img/profile.png" /></figure>' + response.msg.results[i].id + '. ' + response.msg.results[i].name + ' US ' + response.msg.results[i].costperhr + '/hr</div>').appendTo($('.mCSB_container')).addClass('new');
                                 $scope.planetype.push({id:srno, name:response.msg.results[i].name});
                         }
                    } else {
                        $('<div class="message new"><figure class="avatar"><img src="img/profile.png" /></figure>' + response.msg + '</div>').appendTo($('.mCSB_container')).addClass('new');
                    }
                } else {

                    $('<div class="message new"><figure class="avatar"><img src="img/profile.png" /></figure>' + response.msg + '</div>').appendTo($('.mCSB_container')).addClass('new');
                }
                $scope.planesuggest = true ;
                $scope.textinput=false ;
                $scope.airportsuggest = false ;
                   document.getElementById("chatinput").focus();
                updateScrollbar();
            }, 200);

        } else {
            label = response.nextlabel;
            store.set('label', response.nextlabel);
            console.log(response);
            setTimeout(function () {
                $('.message.loading').remove();
                if (response.status == 'success') {
                    console.log('success msg', response.msg);
                    console.log('response length', response.msg.results.length);
                    if (response.msg.results.length > 1) {
                        for (var i = 0; i < response.msg.results.length; i++) {
                            $('<div class="message new"><figure class="avatar"><img src="img/profile.png" /></figure>' + response.msg.results[i].id + '. ' + response.msg.results[i].name + '</div>').appendTo($('.mCSB_container')).addClass('new');
                        }
                    } else {
                        $('<div class="message new"><figure class="avatar"><img src="img/profile.png" /></figure>' + response.msg + '</div>').appendTo($('.mCSB_container')).addClass('new');
                    }
                } else {

                    $('<div class="message new"><figure class="avatar"><img src="img/profile.png" /></figure>' + response.msg + '</div>').appendTo($('.mCSB_container')).addClass('new');
                }
            
                updateScrollbar();
            }, 200);
        }


    });

   

    function emitmsg(msg) {
        console.log({'msg':msg});
        var data = {}
        data.sessionId = store.get('session_id');
        data.label = store.get('label');
        data.msg = msg;
        /* Let's store the sessionid and count in localstorage */
        if (data.label == "whereto") {
            console.log('data', data);
            store.set('whereto', msg);
            socket.emit('apicall', data);
        } else if (data.label == "toairports") {
            var airports = store.get('toairports');
            console.log('airports', airports);

            var selectAirport = data.msg - 1;

            store.set('toairport', airports.results[selectAirport].name);
            store.set('toairportlat', airports.results[selectAirport].geometry.location.lat);
            store.set('toairportlng', airports.results[selectAirport].geometry.location.lng);

            console.log('toairport', airports.results[selectAirport].name);
            console.log('toairportlat', airports.results[selectAirport].geometry.location.lat);
            console.log('toairportlng', airports.results[selectAirport].geometry.location.lng);

            console.log('data', data);
            socket.emit('apicall', data);
        } else if (data.label == "fromwhere") {
            store.set('fromwhere', msg)
            console.log('data', data);
            socket.emit('apicall', data);
        } else if (data.label == "fromairports") {
            var airports = store.get('fromairports');
            console.log('airports', airports);
            var selectAirport = data.msg - 1;

            store.set('fromairport', airports.results[selectAirport].name);
            store.set('fromairportlat', airports.results[selectAirport].geometry.location.lat);
            store.set('fromairportlng', airports.results[selectAirport].geometry.location.lng);

            console.log('fromairport', airports.results[selectAirport].name);
            console.log('fromairportlat', airports.results[selectAirport].geometry.location.lat);
            console.log('fromairportlng', airports.results[selectAirport].geometry.location.lng);
            console.log('data', data);


            socket.emit('apicall', data);
        } else if (data.label == "startdate") {

            store.set('startdate', msg)
            console.log('data', data);
            socket.emit('apicall', data);
        } else if (data.label == "starttime") {
            store.set('starttime', msg)
            console.log('data', data);
            socket.emit('apicall', data);
        } else if (data.label == "whichplane") {
            var planes = store.get('planes');
            console.log('planes', planes);
            for (var index = 0; index < planes.results.length; index++) {
                console.log(planes.results[index]);
                if (data.msg == planes.results[index].id) {
                    console.log('Matched Plane', planes.results[index].name);
                    store.set('plane-type', planes.results[index].name);
                    store.set('plane-speed', planes.results[index].speed);
                    store.set('plane-range', planes.results[index].range);
                    store.set('plane-costperhr', planes.results[index].costperhr);

                }

            }
            console.log('data', data);
            socket.emit('apicall', data);
        } else if (data.label == "returnboolen") {
            store.set('returnboolen', msg)
            console.log('data', data);
            socket.emit('apicall', data);
        } else if (data.label == "returndate") {
            store.set('returnboolen', msg)
            console.log('data', data);
            socket.emit('apicall', data);
        } else if (data.label == "summary") {
            store.set('summary', data)
            console.log('data', data);
            socket.emit('apicall', data);
        } else if (data.label == "email") {
            store.set('email', msg);
            data.whereto = store.get('whereto');
            data.toairport = store.get('toairport');
            data.toairportlat = store.get('toairportlat');
            data.toairportlng = store.get('toairportlng');
            data.fromwhere = store.get('fromwhere');
            data.fromairport = store.get('fromairport');
            data.fromairportlat = store.get('fromairportlat');
            data.fromairportlng = store.get('fromairportlng');
            data.startdate = store.get('startdate');
            data.starttime = store.get('starttime');
            data.planetype = store.get('plane-type');
            data.planespeed = store.get('plane-speed');
            data.planerange = store.get('plane-range');
            data.planecostperhr = store.get('plane-costperhr');
            data.returnboolen = store.get('returnboolen');
            data.email = store.get('email');
            console.log('data', data);
            socket.emit('apicall', data);
        }

    }



});