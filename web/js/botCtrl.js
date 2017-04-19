'use strict';
var label = '';

var app = angular.module('mybot', ['angular-storage','angucomplete-alt']);

app.directive('googleplace', function() {
    return {
        require: 'ngModel',
        link: function(scope, element, attrs, model) {
            var options = {
                types: [],
                componentRestrictions: {}
            };
            scope.gPlace = new google.maps.places.Autocomplete(element[0], options);

            google.maps.event.addListener(scope.gPlace, 'place_changed', function() {
                scope.$apply(function() {
                    model.$setViewValue(element.val());                
                });
            });
        }
    };
});

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


    $scope.gPlace;


    $scope.init = function(){
        $scope.toggle = false ;
        $scope.label = "whereto";
        $scope.sessionId = Math.random(10);
        store.set('label', 'whereto');
        store.set('session_id', $scope.sessionId);
        showcities();
    
    }

  
       
    $scope.renderHtml = function(htmlcode)
        {
            
              return $sce.trustAsHtml(htmlcode);
        };

    $scope.toggleme = function(){
        
        $scope.toggle = true;
        
      
        
       

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
    
    // $scope.insertmsg = function() {
      
    // var msg = $('.message-input').val();
    // if ($.trim(msg) == '') {
    //   return false;
    // }
    // console.log('message',msg);
    // $('<div class="message message-personal">' + msg + '</div>').appendTo($('.mCSB_container')).addClass('new');
    // $('.message-input').val(null);

    // updateScrollbar();
    // emitmsg(msg);
    //}

function insertMessage() {   
    var msg = $('#gcities').val();
    if ($.trim(msg) == '') {
      return false;
    }
    console.log('message',msg);
    $('<div class="message message-personal">' + msg + '</div>').appendTo($('.mCSB_container')).addClass('new');
    $('#gcities').val(null);
    updateScrollbar();
    emitmsg(msg);
    
  }

$scope.selectcalendarfunc = function (){   
   
    var msg = $scope.selecteddate ; 
    $scope.selecteddate = null ;
    console.log('airport',msg);
    $('<div class="message message-personal">' + msg + '</div>').appendTo($('.mCSB_container')).addClass('new');
    $scope.airports  = [] ;
    updateScrollbar();
    emitmsg(msg);
    
  }

$scope.selectplacefunc = function() {
    console.log("selectedplace");
   // console.log($scope.gPlace);
    console.log('chosenplace' , $scope.chosenPlace);
    insertMessage();
    
    //   var msg = $scope.chosenPlace ; 
    //    $('<div class="message message-personal">' + msg + '</div>').appendTo($('.mCSB_container')).addClass('new');
    //    updateScrollbar();
    //    emitmsg(msg);
}




$scope.selectairportfunc = function() {
      
    var msg = $scope.selectedairportId ; 
    msg = msg - 1  ;
    
    var msgname = $scope.airports[msg].name  ; 
    console.log('airport',msg);
    console.log('airportname',msgname);
    $('<div class="message message-personal">' + msgname + '</div>').appendTo($('.mCSB_container')).addClass('new');
    
    $scope.airports  = [] ;
    updateScrollbar();
    emitmsg(msg);
  }


$scope.selectplanefunc = function() {
      
   var msg = $scope.selectedplaneId ; 
    msg = msg - 1  ;
    
    var msgname = $scope.planes[msg].name  ; 
    console.log('airport',msg);
    console.log('airportname',msgname);
    console.log('message',msg);
    $('<div class="message message-personal">' + msgname + '</div>').appendTo($('.mCSB_container')).addClass('new'); 
    $scope.planes = [] ;
    updateScrollbar();
    emitmsg(msg);
  }
   
    

    socket.on('getresponse', function (response) {


        if (response.nextlabel == "toairports" || response.nextlabel == 'fromairports') {
           
            label = response.nextlabel;
            store.set('label', response.nextlabel);
            console.log('reponse.label', response.nextlabel);
            $scope.$broadcast('angucomplete-alt:clearInput');
           
         
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
                  $scope.airports = [];

                    if (response.msg.results.length > 0) {
                        for (var i = 0; i < response.msg.results.length; i++) {

                            var srno = i + 1;
                            $('<div class="message new"><figure class="avatar"><img src="img/profile.png" /></figure>' + srno + '. ' + response.msg.results[i].name + '</div>').appendTo($('.mCSB_container')).addClass('new');
                                $scope.airports.push({id:srno, name:response.msg.results[i].name});
                     }
                    } else {
                        
                        $('<div class="message new"><figure class="avatar"><img src="img/profile.png" /></figure>' + response.msg + '</div>').appendTo($('.mCSB_container')).addClass('new');
                    }

                   // $scope.airports = JSON.stringify($scope.airportsnames) ;
                    $scope.selectedairportId = 1 ;
                    showairports();
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
                        $scope.planes = [];
                        for (var i = 0; i < response.msg.results.length; i++) {
                                var srno = i + 1;
                            $('<div class="message new"><figure class="avatar"><img src="img/profile.png" /></figure>' + response.msg.results[i].id + '. ' + response.msg.results[i].name + ' US ' + response.msg.results[i].costperhr + '/hr</div>').appendTo($('.mCSB_container')).addClass('new');
                                 $scope.planes.push({id:srno, name:response.msg.results[i].name});
                         }
                    } else {
                        $('<div class="message new"><figure class="avatar"><img src="img/profile.png" /></figure>' + response.msg + '</div>').appendTo($('.mCSB_container')).addClass('new');
                    }
                } else {

                    $('<div class="message new"><figure class="avatar"><img src="img/profile.png" /></figure>' + response.msg + '</div>').appendTo($('.mCSB_container')).addClass('new');
                }
                
                 $scope.selectedplaneId = 1 ;
                 showplanes();
                updateScrollbar();
            }, 200);

        } else if (response.nextlabel == "fromwhere") {
            label = response.nextlabel;
            console.log('label', response.nextlabel);
            store.set('label', response.nextlabel);
            console.log(response);
            setTimeout(function () {
                $('.message.loading').remove();
                if (response.status == 'success') {
                    console.log('success msg', response.msg);
                   
                        $('<div class="message new"><figure class="avatar"><img src="img/profile.png" /></figure>' + response.msg + '</div>').appendTo($('.mCSB_container')).addClass('new');
                    }
                else {

                    $('<div class="message new"><figure class="avatar"><img src="img/profile.png" /></figure>' + response.msg + '</div>').appendTo($('.mCSB_container')).addClass('new');
                }
             
                showcities();
                updateScrollbar();
            }, 200);

        }else if (response.nextlabel == "startdate" || response.nextlabel == "starttime" || response.nextlabel == "returnboolen" ) {
            label = response.nextlabel;
            console.log('label', response.nextlabel);
            store.set('label', response.nextlabel);
            console.log(response);
            setTimeout(function () {
                $('.message.loading').remove();
                if (response.status == 'success') {
                    console.log('success msg', response.msg);
                   
                        $('<div class="message new"><figure class="avatar"><img src="img/profile.png" /></figure>' + response.msg + '</div>').appendTo($('.mCSB_container')).addClass('new');
                    
                }
                else {

                    $('<div class="message new"><figure class="avatar"><img src="img/profile.png" /></figure>' + response.msg + '</div>').appendTo($('.mCSB_container')).addClass('new');
                }
             
                showcalendar();
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
            var selectAirport = data.msg ;
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
            var selectAirport = data.msg ;

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

        function showcities() {
            console.log('showcities', "showcities");
            $('#gcities').val(null);
            $('#citiesfield').show('slow');
            $('#airportsfield').hide();
            $('#calendarfield').hide();
            $('#planesfield').hide();

        }

        function showairports() {
         console.log('showairports', "showairports");
            $('#citiesfield').hide('slow');
            $('#airportsfield').show('slow');
            $('#calendarfield').hide('slow');
            $('#planesfield').hide();
        }

          function showcalendar() {
         console.log('showcalendar', "showcalendar");
            $('#calendarfield').show('slow');
            $('#citiesfield').hide();
            $('#airportsfield').hide();
            $('#planesfield').hide();
            
        }

          function showplanes(){
            $('#calendarfield').hide();
            $('#citiesfield').hide();
            $('#airportsfield').hide();
            $('#planesfield').show('slow');
            }


});