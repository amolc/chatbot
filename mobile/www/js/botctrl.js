// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
var app = angular.module('mybot', ['ionic','angular-storage','ngScrollbars'])

.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    if(window.cordova && window.cordova.plugins.Keyboard) {
      // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
      // for form inputs)
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);

      // Don't remove this line unless you know what you are doing. It stops the viewport
      // from snapping when text inputs are focused. Ionic handles this internally for
      // a much nicer keyboard experience.
      cordova.plugins.Keyboard.disableScroll(true);
    }
    if(window.StatusBar) {
      StatusBar.styleDefault();
    }
  });
})
//

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
    var socket = io.connect('http://atlanta.fountaintechies.com:2001');
    return {
        on: function (eventName, callback) {
            socket.on(eventName, callback);
        },
        emit: function (eventName, data) {
            socket.emit(eventName, data);
        }
    };
}]);
app.controller('botCtrl', function ($scope, $http, $sce, $timeout,$ionicScrollDelegate, socket, store) {

     
    $scope.gPlace;
        $scope.config = {
            autoHideScrollbar: true,
            theme: 'dark',
            advanced:{
                updateOnContentResize: true
            },
                setHeight: 300,
                scrollInertia: 100
            };
        

    $scope.init = function(){
        $scope.toggle = false ;
        $scope.label = "whereto";
        $scope.sessionId = Math.random(10);
        store.set('label', 'whereto');
        store.set('session_id', $scope.sessionId);
        $scope.selectedplaneId = "1" ;
        //angular.element('.messages-content').mCustomScrollbar({theme:"dark"});
      
        typing();
        setTimeout(function () {
                $('#loadchat').remove();
                $scope.fakemessage0 = 'Hello I am Julia' ;
                var msg0 = angular.element('<div class="message new"><figure class="avatar"><img src="lib/img/profile.png" /></figure>' + $scope.fakemessage0 + '</div>');
                angular.element(msg0).appendTo('.messages-content').addClass('new');
                typing();
                updateScrollbar();
           },2000);
        setTimeout(function () {
              $scope.fake2();
           },4000);
        showcities();
    
    }

// $scope.updateScrollbar = function() {
//    // var $messages = Jquery('.messages-content');
//     //  console.log("updatescrollbar");
//     //  var result = document.getElementsByClassName("messages-content");
//     //  var wrappedResult = angular.element(result);
//     //     wrappedResult.mCustomScrollbar('scrollTo', 'bottom', {
//     //   scrollInertia: 10,
//     //   timeout: 0
//         //});

//      console.log('updateScrollbar');
//      $timeout(function() {
//         $scope.updateScrollbar('scrollTo', "bottom",{
//              scrollInertia:10,
//              setTimeout:0,
            
//               });
//     });
    
//   }

 function  updateScrollbar() {
     console.log('updateScrollbar');
    //  $timeout(function() {
    //     $scope.updateScrollbar('scrollTo', "bottom",{
    //          scrollInertia:10,
    //          setTimeout:0,
            
    //           });
    // });
    
  }
  
    function typing(){
        setTimeout(function () {
     
        var msg3 = angular.element('<div id="loadchat" class="message new"><figure class="avatar"><img src="lib/img/profile.png" /></figure><img class="imgsize"  src="lib/img/chat.svg" /></div>');
        angular.element(msg3).appendTo('.messages-content').addClass('new').show('slow');
        updateScrollbar();
         }, 300);

      }
    
    

function insertMessage() {   
    var msg = $('#gcities').val();
    if ($.trim(msg) == '') {
      return false;
    }
    console.log('message',msg);
    $('<div class="message message-personal">' + msg + '</div>').appendTo($('.mCSB_container')).addClass('new');
    $('#gcities').val(null);
    $ionicScrollDelegate.scrollBottom();
    updateScrollbar();
    emitmsg(msg);
    
  }
  
$scope.selectdatafunc = function (){   
    var msg = $('#gtextfield').val();
    if ($.trim(msg) == '') {
      return false;
    }
    console.log('message',msg);
    $('<div class="message message-personal">' + msg + '</div>').appendTo($('.mCSB_container')).addClass('new');
    $('#gtextfield').val(null);
    updateScrollbar();
     $ionicScrollDelegate.scrollBottom();
    emitmsg(msg);
    
  }

$scope.selectcalendarfunc = function (){   
   
    var msg = $scope.selecteddate ; 
    $scope.selecteddate = null ;
    console.log('calendar-',msg);
    $('<div class="message message-personal">' + msg + '</div>').appendTo($('.mCSB_container')).addClass('new');
   
    updateScrollbar();
     $ionicScrollDelegate.scrollBottom();
    emitmsg(msg);
    
  }

$scope.selectplacefunc = function() {
    
    var msg = $('#gcities').val();
    if ($.trim(msg) == '') {
      return false;
    }
    console.log('message',msg);
    $('<div class="message message-personal">' + msg + '</div>').appendTo($('.mCSB_container')).addClass('new');
    $('#gcities').val(null);
    $scope.gPlace = "";
    updateScrollbar();
     $ionicScrollDelegate.scrollBottom();
    emitmsg(msg);
    
}


$scope.selectfromairportfunc = function() {
      
    var msg = $scope.selectedfromairportId ; 
    msg = msg - 1  ;
    
    var msgname = $scope.fromairports[msg].name  ; 
    console.log('fromairport',msg);
    console.log('fromairportname',msgname);
    $('<div class="message message-personal">' + msgname + '</div>').appendTo($('.mCSB_container')).addClass('new');
    
    $scope.fromairports  = [] ;
    updateScrollbar();
     $ionicScrollDelegate.scrollBottom();
    emitmsg(msg);
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
     $ionicScrollDelegate.scrollBottom();
    emitmsg(msg);
  }


$scope.selectplanefunc = function() {  
   var msg = $scope.selectedplaneId ; 
    msg = msg - 1  ;
    var msgname = $scope.planes[msg].name  ; 
    console.log('msg',msg);
    console.log('planename',msgname);
    $('<div class="message message-personal">' + msgname + '</div>').appendTo($('.mCSB_container')).addClass('new'); 
    updateScrollbar();
    emitmsg(msg);
  }
   
  $scope.toggleme = function(){
        
        $scope.toggle = true;
        typing();

        setTimeout(function () {
                $('#loadchat').remove();
                $scope.fakemessage0 = 'Hello I am Julia' ;
                var msg0 = angular.element('<div class="message new"><figure class="avatar"><img src="lib/img/profile.png" /></figure>' + $scope.fakemessage0 + '</div>');
                angular.element(msg0).appendTo('.messages-content').addClass('new');
                typing();
                updateScrollbar();
           },2000);
           setTimeout(function () {
              $scope.fake2();
           },4000);
    }

    $scope.fake2 = function(){
        
         setTimeout(function () {
                $('#loadchat').remove();
                $scope.fakemessage1 = 'Where do you wanna fly today ? ' ;
                var msg1 = angular.element('<div class="message new"><figure class="avatar"><img src="lib/img/profile.png" /></figure>' + $scope.fakemessage1 + '</div>');
                angular.element(msg1).appendTo('.messages-content').addClass('new');
                updateScrollbar();
           },3000);

    }
    $scope.fake3 = function(){
        
         setTimeout(function () {
                $('#loadchat').remove();
                $scope.fakemessage1 = 'Would you like to get a formal quote ? ' ;
                var msg1 = angular.element('<div class="message new"><figure class="avatar"><img src="lib/img/profile.png" /></figure>' + $scope.fakemessage1 + '</div>');
                angular.element(msg1).appendTo('.messages-content').addClass('new');
                updateScrollbar();
           },3000);

    }
    socket.on('getresponse', function (response) {


        if (response.nextlabel == "toairports") {
           
            label = response.nextlabel;
            store.set('label', response.nextlabel);
            console.log('reponse.label', response.nextlabel);
            $scope.$broadcast('angucomplete-alt:clearInput');
           
            typing();
            setTimeout(function () {
                $('#loadchat').remove();
                if (response.status == 'success') {
                    console.log('success msg', response.msg);
                    console.log('response length', response.msg.results.length);
                     store.set('toairports', response.msg);
                    // if (response.nextlabel == "toairports") {
                       
                    // } else {
                    //     store.set('fromairports', response.msg);
                     
                    // }
                
                  $scope.airports = [];

                    if (response.msg.results.length > 0) {
                            $scope.defaultairport = response.msg.results[0].name ;
                        for (var i = 0; i < response.msg.results.length; i++) {

                            var srno = i + 1;
                           // $('<div class="message new"><figure class="avatar"><img src="lib/img/profile.png" /></figure>' + srno + '. ' + response.msg.results[i].name + '</div>').appendTo($('.mCSB_container')).addClass('new');
                                $scope.airports.push({id:srno, name:response.msg.results[i].name});
                     }
                    } else {
                        
                        //$('<div class="message new"><figure class="avatar"><img src="lib/img/profile.png" /></figure>' + response.msg + '</div>').appendTo($('.mCSB_container')).addClass('new');
                    }

                    $('<div class="message new"><figure class="avatar"><img src="lib/img/profile.png" /></figure>' + response.custommessage + '</div>').appendTo($('.mCSB_container')).addClass('new');
           
                 
                   
                } else {

                    $('<div class="message new"><figure class="avatar"><img src="lib/img/profile.png" /></figure>' + response.msg + '</div>').appendTo($('.mCSB_container')).addClass('new');
                }
                 $scope.selectedairportId = 1 ;
                 loadgif();
                updateScrollbar();
                console.log($scope.airports);
                
            }, 100);
                setTimeout( function(){
                    showairports();
                },10000);
            
        } 
        else if (response.nextlabel == 'fromairports') {
           
            label = response.nextlabel;
            store.set('label', response.nextlabel);
            console.log('reponse.label', response.nextlabel);
              store.set('fromairports', response.msg);
           
         
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
                
                  $scope.fromairports = [];

                    if (response.msg.results.length > 0) {
                            $scope.defaultfromairport = response.msg.results[0].name ;
                        for (var i = 0; i < response.msg.results.length; i++) {

                            var srno = i + 1;
                           // $('<div class="message new"><figure class="avatar"><img src="lib/img/profile.png" /></figure>' + srno + '. ' + response.msg.results[i].name + '</div>').appendTo($('.mCSB_container')).addClass('new');
                                $scope.fromairports.push({id:srno, name:response.msg.results[i].name});
                     }
                    } else {
                        
                       // $('<div class="message new"><figure class="avatar"><img src="lib/img/profile.png" /></figure>' + response.msg + '</div>').appendTo($('.mCSB_container')).addClass('new');
                    }
                    $('<div class="message new"><figure class="avatar"><img src="lib/img/profile.png" /></figure>' + response.custommessage + '</div>').appendTo($('.mCSB_container')).addClass('new');
           
                   // $scope.airports = JSON.stringify($scope.airportsnames) ;
                   
                } else {

                    $('<div class="message new"><figure class="avatar"><img src="lib/img/profile.png" /></figure>' + response.msg + '</div>').appendTo($('.mCSB_container')).addClass('new');
                }
                 $scope.selectedfromairportId = 1 ;
                 loadgif();
                 updateScrollbar();
                  }, 200);
                setTimeout(function () {
                     showfromairports();
                },10000);
           
        }  
        else if (response.nextlabel == "fromwhere") {
            label = response.nextlabel;
            store.set('label', response.nextlabel);
              loadgif();
              typing();
              setTimeout(function () {
                if (response.status == 'success') {
                    $('#loadchat').remove();
                     store.set('toairports', response.msg);
                     $scope.airports = [];

                    if (response.msg.results.length > 0) {
                            $scope.defaultairport = response.msg.results[0].name ;
                             store.set('toairport', response.msg.results[0].name);
                             store.set('toairportlat', response.msg.results[0].geometry.location.lat);
                             store.set('toairportlng', response.msg.results[0].geometry.location.lng);

                                console.log('toairport', response.msg.results[0].name);
                                console.log('toairportlat', response.msg.results[0].geometry.location.lat);
                                console.log('toairportlng', response.msg.results[0].geometry.location.lng);
                        
                    $('<div class="message new"><figure class="avatar"><img src="lib/img/profile.png" /></figure>' + response.custommessage + '</div>').appendTo($('.mCSB_container')).addClass('new');
           
                  
                   
                } else {

                    $('<div class="message new"><figure class="avatar"><img src="lib/img/profile.png" /></figure>' + response.msg + '</div>').appendTo($('.mCSB_container')).addClass('new');
                }
                 $scope.selectedairportId = 1 ;
                 showcities();
                 updateScrollbar();
                 console.log($scope.airports);
                }
            }, 6000);

        }else if (response.nextlabel == "startdate" ) {
            label = response.nextlabel;
            console.log('label', response.nextlabel);
            store.set('label', response.nextlabel);
            console.log(response);
            loadgif();
            typing();
             setTimeout(function () {
                $('#loadchat').remove();
                if (response.status == 'success') {
                    console.log('success msg', response.msg);
                    console.log('response length', response.msg.results.length);
                    if (response.nextlabel == "toairports") {
                        store.set('toairports', response.msg);
                    } else {
                        store.set('fromairports', response.msg);
                     
                    }
                
                  $scope.fromairports = [];

                    if (response.msg.results.length > 0) {
                            $scope.defaultfromairport = response.msg.results[0].name ;
                         store.set('fromairport', response.msg.results[0].name);
                         store.set('fromairportlat', response.msg.results[0].geometry.location.lat);
                         store.set('fromairportlng', response.msg.results[0].geometry.location.lng);

                        console.log('fromairport', response.msg.results[0].name);
                        console.log('fromairportlat', response.msg.results[0].geometry.location.lat);
                        console.log('fromairportlng', response.msg.results[0].geometry.location.lng);
                    $('<div class="message new"><figure class="avatar"><img src="lib/img/profile.png" /></figure>' + response.custommessage + '</div>').appendTo($('.mCSB_container')).addClass('new');
           
                   // $scope.airports = JSON.stringify($scope.airportsnames) ;
                   
                } else {

                    $('<div class="message new"><figure class="avatar"><img src="lib/img/profile.png" /></figure>' + response.msg + '</div>').appendTo($('.mCSB_container')).addClass('new');
                }
                 $scope.selectedfromairportId = 1 ;
                 showcalendar();
                 updateScrollbar();
                }
            }, 6000);
            

        }else if (response.nextlabel == "whichplane") {
            label = response.nextlabel;
            console.log('label:116', response.nextlabel);
            store.set('label', response.nextlabel);
            console.log(response);
            loadgif();
            typing();
            setTimeout(function () {
                $('#loadchat').remove();
                if (response.status == 'success') {
                    console.log('success msg', response.msg);
                    console.log('response length', response.msg.results.length);
                    store.set('planes', response.msg);
                    if (response.msg.results.length > 1) {
                        $scope.planes = [];
                        for (var i = 0; i < response.msg.results.length; i++) {
                                var srno = i + 1;
                           // $('<div class="message new"><figure class="avatar"><img src="lib/img/profile.png" /></figure>' + response.msg.results[i].id + '. ' + response.msg.results[i].name + ' US ' + response.msg.results[i].costperhr + '/hr</div>').appendTo($('.mCSB_container')).addClass('new');
                                 $scope.planes.push({id:srno, name:response.msg.results[i].name});
                                 console.log(response.msg.results[i].name);
                         }
                    } else {
                       // $('<div class="message new"><figure class="avatar"><img src="lib/img/profile.png" /></figure>' + response.msg + '</div>').appendTo($('.mCSB_container')).addClass('new');
                       
                 }
                 $('<div class="message new"><figure class="avatar"><img src="lib/img/profile.png" /></figure>' + response.custommessage + '</div>').appendTo($('.mCSB_container')).addClass('new');
           
                } else {

                    $('<div class="message new"><figure class="avatar"><img src="lib/img/profile.png" /></figure>' + response.msg + '</div>').appendTo($('.mCSB_container')).addClass('new');
                }
                
                 $scope.selectedplaneId = "1" ;
                showplanes();
                updateScrollbar();
            }, 6000);

            

        } 
        else if (response.nextlabel == "returndate" ) {
            label = response.nextlabel;
            console.log('label', response.nextlabel);
            store.set('label', response.nextlabel);
            console.log(response);
            loadgif();
            typing();
            setTimeout(function () {
                  $('#loadchat').remove();
                if (response.status == 'success') {
                    console.log('success msg', response.msg);
                   
                        $('<div class="message new"><figure class="avatar"><img src="lib/img/profile.png" /></figure>' + response.msg + '</div>').appendTo($('.mCSB_container')).addClass('new');
                    
                }
                else {

                    $('<div class="message new"><figure class="avatar"><img src="lib/img/profile.png" /></figure>' + response.msg + '</div>').appendTo($('.mCSB_container')).addClass('new');
                }
             
                showcalendar();
                updateScrollbar();
            }, 4000);

        } else if (response.nextlabel == "formalquote") {
            label = response.nextlabel;
            console.log('label', response.nextlabel);
            store.set('label', response.nextlabel);
            console.log(response);
            typing();
            $('#loadchat').remove();
            setTimeout(function () {
             
                if (response.status == 'success') {
                    $('#loadchat').remove();
                    console.log('success msg', response.msg);
                    var msg3 = "Would you like a formal quote" ;
                        $('<div class="message new"><figure class="avatar"><img src="lib/img/profile.png" /></figure>' + response.msg + '</div>').appendTo($('.mCSB_container')).addClass('new').delay(1000);
                       // $('<div class="message new"><figure class="avatar"><img src="lib/img/profile.png" /></figure>' + msg3 + '</div>').appendTo($('.mCSB_container')).addClass('new');
               
                }
                else {

                    $('<div class="message new"><figure class="avatar"><img src="lib/img/profile.png" /></figure>' + response.msg + '</div>').appendTo($('.mCSB_container')).addClass('new');

                }
                updateScrollbar();
                $scope.fake3();
                showtextfield();
            }, 6000);
           
        }else if (response.nextlabel == "email") {
            label = response.nextlabel;
            console.log('label', response.nextlabel);
            store.set('label', response.nextlabel);
            console.log(response);
            loadgif();
            typing();
            setTimeout(function () {
                 $('#loadchat').remove();
                if (response.status == 'success') {
                    console.log('success msg', response.msg);
                        $('<div class="message new"><figure class="avatar"><img src="lib/img/profile.png" /></figure>' + response.msg + '</div>').appendTo($('.mCSB_container')).addClass('new');
                }
                else {
                    $('<div class="message new"><figure class="avatar"><img src="lib/img/profile.png" /></figure>' + response.msg + '</div>').appendTo($('.mCSB_container')).addClass('new');

                }
                updateScrollbar();
                showtextfield();
            }, 3000);

        }
        else if (response.nextlabel == "returnboolen") {
            label = response.nextlabel;
            console.log('label', response.nextlabel);
            store.set('label', response.nextlabel);
            console.log(response);
            loadgif();
            typing();
            setTimeout(function () {
                 $('#loadchat').remove();
                if (response.status == 'success') {
                    console.log('success msg', response.msg);
                        $('<div class="message new"><figure class="avatar"><img src="lib/img/profile.png" /></figure>' + response.msg + '</div>').appendTo($('.mCSB_container')).addClass('new');
                }
                else {
                    $('<div class="message new"><figure class="avatar"><img src="lib/img/profile.png" /></figure>' + response.msg + '</div>').appendTo($('.mCSB_container')).addClass('new');

                }
                updateScrollbar();
                showtextfield();
            }, 3000);

        }
        else {
            label = response.nextlabel;
            store.set('label', response.nextlabel);
            console.log(response);
            typing();
            setTimeout(function () {
                   $('#loadchat').remove();
                if (response.status == 'success') {
                $('#loadchat').remove();
                    console.log('success msg', response.msg);
                   
                    if (response.msg.results.length > 1) {
                        for (var i = 0; i < response.msg.results.length; i++) {
                            $('<div class="message new"><figure class="avatar"><img src="lib/img/profile.png" /></figure>' + response.msg.results[i].id + '. ' + response.msg.results[i].name + '</div>').appendTo($('.mCSB_container')).addClass('new');
                        }
                    } else {
                        $('<div class="message new"><figure class="avatar"><img src="lib/img/profile.png" /></figure>' + response.msg + '</div>').appendTo($('.mCSB_container')).addClass('new');
                    }
                } else {

                    $('<div class="message new"><figure class="avatar"><img src="lib/img/profile.png" /></figure>' + response.msg + '</div>').appendTo($('.mCSB_container')).addClass('new');
                }
                loadgif();
                updateScrollbar();
                showtextfield();
            }, 6000);
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
            console.log(data.msg);

                    console.log('Matched Plane', planes.results[msg].name);
                    store.set('plane-type', planes.results[msg].name);
                    store.set('plane-speed', planes.results[msg].speed);
                    store.set('plane-range', planes.results[msg].range);
                    store.set('plane-costperhr', planes.results[msg].costperhr);


            
            console.log('data', data);
            socket.emit('apicall', data);
        } else if (data.label == "returnboolen") {
            store.set('returnboolen', msg);
            data.whereto = store.get('whereto');
            data.toairport = store.get('toairport');
            data.toairportlat = store.get('toairportlat');
            data.toairportlng = store.get('toairportlng');
            data.fromwhere = store.get('fromwhere');
            data.fromairport = store.get('fromairport');
            data.fromairportlat = store.get('fromairportlat');
            data.fromairportlng = store.get('fromairportlng');
            data.startdate = store.get('startdate');
           // data.starttime = store.get('starttime');
            data.planetype = store.get('plane-type');
            data.planespeed = store.get('plane-speed');
            data.planerange = store.get('plane-range');
            data.planecostperhr = store.get('plane-costperhr');
            data.returnboolen = store.get('returnboolen');
            console.log('data', data);
            socket.emit('apicall', data);
        } else if (data.label == "returndate") {
            store.set('returndate', msg)
            data.whereto = store.get('whereto');
            data.toairport = store.get('toairport');
            data.toairportlat = store.get('toairportlat');
            data.toairportlng = store.get('toairportlng');
            data.fromwhere = store.get('fromwhere');
            data.fromairport = store.get('fromairport');
            data.fromairportlat = store.get('fromairportlat');
            data.fromairportlng = store.get('fromairportlng');
            data.startdate = store.get('startdate');
            data.returndate = store.get('returndate');
            data.planetype = store.get('plane-type');
            data.planespeed = store.get('plane-speed');
            data.planerange = store.get('plane-range');
            data.planecostperhr = store.get('plane-costperhr');
            data.returnboolen = store.get('returnboolen');
            console.log('data', data);
            socket.emit('apicall', data);
        }else if (data.label == "formalquote") {
            store.set('formalquote', msg);
            data.formalquote = store.get('formalquote');
            console.log('data', data);
            socket.emit('apicall', data);
        }
         else if (data.label == "summary") {
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
            data.planetype = store.get('plane-type');
            data.planespeed = store.get('plane-speed');
            data.planerange = store.get('plane-range');
            data.planecostperhr = store.get('plane-costperhr');
            data.returnboolen = store.get('returnboolen');
            data.returndate = store.get('returndate');
            data.email = store.get('email');
            console.log('data', data);
            socket.emit('apicall', data);
        }

    }

        function loadgif() {
            $('#loading').show('slow');
            $('#citiesfield').hide();
            $('#airportsfield').hide();
            $('#calendarfield').hide();
            $('#planesfield').hide();
            $('#fromairportsfield').hide();
            $('#textfield').hide();

        }
        function unloadgif() {
            $('#loading').hide();
            $('#citiesfield').hide();
            $('#airportsfield').hide();
            $('#calendarfield').hide();
            $('#planesfield').hide();
            $('#fromairportsfield').hide();
            $('#textfield').hide();

        }

        function showcities() {
            $('#loading').hide('slow');
            $('#gcities').val(null);
            $('#citiesfield').show('slow');
            $('#airportsfield').hide();
            $('#calendarfield').hide();
            $('#planesfield').hide();
            $('#fromairportsfield').hide();
            $('#textfield').hide();

        }

        function showairports() {
         console.log('showairports', "showairports");
            $('#loading').hide();
            $('#citiesfield').hide('slow');
            $('#airportsfield').show('slow');
            $('#calendarfield').hide('slow');
            $('#planesfield').hide();
            $('#fromairportsfield').hide();
            $('#textfield').hide();
            $scope.defaultairport ="";
        }

        function showfromairports() {
         console.log('showfromairports', "showfromairports");
          $('#loading').hide();
            $('#fromairportsfield').show('slow');
            $('#calendarfield').hide();
            $('#citiesfield').hide();
            $('#planesfield').hide();
            $('#airportsfield').hide();
            $('#textfield').hide();
           console.log("over-shhowfromairports");
           
        }

          function showcalendar() {
         console.log('showcalendar', "showcalendar");
            $('#gcalendar').datetimepicker({
                   // value:'2017/01/01 07:00',
                    format: 'm.d.y h:m A',
                    step:30,
                    startDate:'0'//or 1986/12/08
            });
             $('#loading').hide();
            $('#calendarfield').show('slow');
            $('#citiesfield').hide();
            $('#airportsfield').hide();
            $('#planesfield').hide();
            $('#fromairportsfield').hide();
            $('#textfield').hide();
            
        }

          function showplanes(){
            $('#loading').hide();
            $('#calendarfield').hide();
            $('#citiesfield').hide();
            $('#airportsfield').hide();
            $('#planesfield').show('slow');
            $('#fromairportsfield').hide();
            $('#textfield').hide();
            }

        function showtextfield(){
            $('#loading').hide();
            $('#textfield').show('slow');
            $('#calendarfield').hide();
            $('#citiesfield').hide();
            $('#airportsfield').hide();
            $('#planesfield').hide();
            $('#fromairportsfield').hide();
            $('#textfield').show();

            }


});