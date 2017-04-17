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


    $scope.countries = [
            {name: 'Afghanistan', code: 'AF'},
            {name: 'Aland Islands', code: 'AX'},
            {name: 'Albania', code: 'AL'},
            {name: 'Algeria', code: 'DZ'},
            {name: 'American Samoa', code: 'AS'},
            {name: 'AndorrA', code: 'AD'},
            {name: 'Angola', code: 'AO'},
            {name: 'Anguilla', code: 'AI'},
            {name: 'Antarctica', code: 'AQ'},
            {name: 'Antigua and Barbuda', code: 'AG'},
            {name: 'Argentina', code: 'AR'},
            {name: 'Armenia', code: 'AM'},
            {name: 'Aruba', code: 'AW'},
            {name: 'Australia', code: 'AU'},
            {name: 'Austria', code: 'AT'},
            {name: 'Azerbaijan', code: 'AZ'},
            {name: 'Bahamas', code: 'BS'},
            {name: 'Bahrain', code: 'BH'},
            {name: 'Bangladesh', code: 'BD'},
            {name: 'Barbados', code: 'BB'},
            {name: 'Belarus', code: 'BY'},
            {name: 'Belgium', code: 'BE'},
            {name: 'Belize', code: 'BZ'},
            {name: 'Benin', code: 'BJ'},
            {name: 'Bermuda', code: 'BM'},
            {name: 'Bhutan', code: 'BT'},
            {name: 'Bolivia', code: 'BO'},
            {name: 'Bosnia and Herzegovina', code: 'BA'},
            {name: 'Botswana', code: 'BW'},
            {name: 'Bouvet Island', code: 'BV'},
            {name: 'Brazil', code: 'BR'},
            {name: 'British Indian Ocean Territory', code: 'IO'},
            {name: 'Brunei Darussalam', code: 'BN'},
            {name: 'Bulgaria', code: 'BG'},
            {name: 'Burkina Faso', code: 'BF'},
            {name: 'Burundi', code: 'BI'},
            {name: 'Cambodia', code: 'KH'},
            {name: 'Cameroon', code: 'CM'},
            {name: 'Canada', code: 'CA'},
            {name: 'Cape Verde', code: 'CV'},
            {name: 'Cayman Islands', code: 'KY'},
            {name: 'Central African Republic', code: 'CF'},
            {name: 'Chad', code: 'TD'},
            {name: 'Chile', code: 'CL'},
            {name: 'China', code: 'CN'},
            {name: 'Christmas Island', code: 'CX'},
            {name: 'Cocos (Keeling) Islands', code: 'CC'},
            {name: 'Colombia', code: 'CO'},
            {name: 'Comoros', code: 'KM'},
            {name: 'Congo', code: 'CG'},
            {name: 'Congo, The Democratic Republic of the', code: 'CD'},
            {name: 'Cook Islands', code: 'CK'},
            {name: 'Costa Rica', code: 'CR'},
            {name: 'Cote D\'Ivoire', code: 'CI'},
            {name: 'Croatia', code: 'HR'},
            {name: 'Cuba', code: 'CU'},
            {name: 'Cyprus', code: 'CY'},
            {name: 'Czech Republic', code: 'CZ'},
            {name: 'Denmark', code: 'DK'},
            {name: 'Djibouti', code: 'DJ'},
            {name: 'Dominica', code: 'DM'},
            {name: 'Dominican Republic', code: 'DO'},
            {name: 'Ecuador', code: 'EC'},
            {name: 'Egypt', code: 'EG'},
            {name: 'El Salvador', code: 'SV'},
            {name: 'Equatorial Guinea', code: 'GQ'},
            {name: 'Eritrea', code: 'ER'},
            {name: 'Estonia', code: 'EE'},
            {name: 'Ethiopia', code: 'ET'},
            {name: 'Falkland Islands (Malvinas)', code: 'FK'},
            {name: 'Faroe Islands', code: 'FO'},
            {name: 'Fiji', code: 'FJ'},
            {name: 'Finland', code: 'FI'},
            {name: 'France', code: 'FR'},
            {name: 'French Guiana', code: 'GF'},
            {name: 'French Polynesia', code: 'PF'},
            {name: 'French Southern Territories', code: 'TF'},
            {name: 'Gabon', code: 'GA'},
            {name: 'Gambia', code: 'GM'},
            {name: 'Georgia', code: 'GE'},
            {name: 'Germany', code: 'DE'},
            {name: 'Ghana', code: 'GH'},
            {name: 'Gibraltar', code: 'GI'},
            {name: 'Greece', code: 'GR'},
            {name: 'Greenland', code: 'GL'},
            {name: 'Grenada', code: 'GD'},
            {name: 'Guadeloupe', code: 'GP'},
            {name: 'Guam', code: 'GU'},
            {name: 'Guatemala', code: 'GT'},
            {name: 'Guernsey', code: 'GG'},
            {name: 'Guinea', code: 'GN'},
            {name: 'Guinea-Bissau', code: 'GW'},
            {name: 'Guyana', code: 'GY'},
            {name: 'Haiti', code: 'HT'},
            {name: 'Heard Island and Mcdonald Islands', code: 'HM'},
            {name: 'Holy See (Vatican City State)', code: 'VA'},
            {name: 'Honduras', code: 'HN'},
            {name: 'Hong Kong', code: 'HK'},
            {name: 'Hungary', code: 'HU'},
            {name: 'Iceland', code: 'IS'},
            {name: 'India', code: 'IN'},
            {name: 'Indonesia', code: 'ID'},
            {name: 'Iran, Islamic Republic Of', code: 'IR'},
            {name: 'Iraq', code: 'IQ'},
            {name: 'Ireland', code: 'IE'},
            {name: 'Isle of Man', code: 'IM'},
            {name: 'Israel', code: 'IL'},
            {name: 'Italy', code: 'IT'},
            {name: 'Jamaica', code: 'JM'},
            {name: 'Japan', code: 'JP'},
            {name: 'Jersey', code: 'JE'},
            {name: 'Jordan', code: 'JO'},
            {name: 'Kazakhstan', code: 'KZ'},
            {name: 'Kenya', code: 'KE'},
            {name: 'Kiribati', code: 'KI'},
            {name: 'Korea, Democratic People\'S Republic of', code: 'KP'},
            {name: 'Korea, Republic of', code: 'KR'},
            {name: 'Kuwait', code: 'KW'},
            {name: 'Kyrgyzstan', code: 'KG'},
            {name: 'Lao People\'S Democratic Republic', code: 'LA'},
            {name: 'Latvia', code: 'LV'},
            {name: 'Lebanon', code: 'LB'},
            {name: 'Lesotho', code: 'LS'},
            {name: 'Liberia', code: 'LR'},
            {name: 'Libyan Arab Jamahiriya', code: 'LY'},
            {name: 'Liechtenstein', code: 'LI'},
            {name: 'Lithuania', code: 'LT'},
            {name: 'Luxembourg', code: 'LU'},
            {name: 'Macao', code: 'MO'},
            {name: 'Macedonia, The Former Yugoslav Republic of', code: 'MK'},
            {name: 'Madagascar', code: 'MG'},
            {name: 'Malawi', code: 'MW'},
            {name: 'Malaysia', code: 'MY'},
            {name: 'Maldives', code: 'MV'},
            {name: 'Mali', code: 'ML'},
            {name: 'Malta', code: 'MT'},
            {name: 'Marshall Islands', code: 'MH'},
            {name: 'Martinique', code: 'MQ'},
            {name: 'Mauritania', code: 'MR'},
            {name: 'Mauritius', code: 'MU'},
            {name: 'Mayotte', code: 'YT'},
            {name: 'Mexico', code: 'MX'},
            {name: 'Micronesia, Federated States of', code: 'FM'},
            {name: 'Moldova, Republic of', code: 'MD'},
            {name: 'Monaco', code: 'MC'},
            {name: 'Mongolia', code: 'MN'},
            {name: 'Montserrat', code: 'MS'},
            {name: 'Morocco', code: 'MA'},
            {name: 'Mozambique', code: 'MZ'},
            {name: 'Myanmar', code: 'MM'},
            {name: 'Namibia', code: 'NA'},
            {name: 'Nauru', code: 'NR'},
            {name: 'Nepal', code: 'NP'},
            {name: 'Netherlands', code: 'NL'},
            {name: 'Netherlands Antilles', code: 'AN'},
            {name: 'New Caledonia', code: 'NC'},
            {name: 'New Zealand', code: 'NZ'},
            {name: 'Nicaragua', code: 'NI'},
            {name: 'Niger', code: 'NE'},
            {name: 'Nigeria', code: 'NG'},
            {name: 'Niue', code: 'NU'},
            {name: 'Norfolk Island', code: 'NF'},
            {name: 'Northern Mariana Islands', code: 'MP'},
            {name: 'Norway', code: 'NO'},
            {name: 'Oman', code: 'OM'},
            {name: 'Pakistan', code: 'PK'},
            {name: 'Palau', code: 'PW'},
            {name: 'Palestinian Territory, Occupied', code: 'PS'},
            {name: 'Panama', code: 'PA'},
            {name: 'Papua New Guinea', code: 'PG'},
            {name: 'Paraguay', code: 'PY'},
            {name: 'Peru', code: 'PE'},
            {name: 'Philippines', code: 'PH'},
            {name: 'Pitcairn', code: 'PN'},
            {name: 'Poland', code: 'PL'},
            {name: 'Portugal', code: 'PT'},
            {name: 'Puerto Rico', code: 'PR'},
            {name: 'Qatar', code: 'QA'},
            {name: 'Reunion', code: 'RE'},
            {name: 'Romania', code: 'RO'},
            {name: 'Russian Federation', code: 'RU'},
            {name: 'RWANDA', code: 'RW'},
            {name: 'Saint Helena', code: 'SH'},
            {name: 'Saint Kitts and Nevis', code: 'KN'},
            {name: 'Saint Lucia', code: 'LC'},
            {name: 'Saint Pierre and Miquelon', code: 'PM'},
            {name: 'Saint Vincent and the Grenadines', code: 'VC'},
            {name: 'Samoa', code: 'WS'},
            {name: 'San Marino', code: 'SM'},
            {name: 'Sao Tome and Principe', code: 'ST'},
            {name: 'Saudi Arabia', code: 'SA'},
            {name: 'Senegal', code: 'SN'},
            {name: 'Serbia and Montenegro', code: 'CS'},
            {name: 'Seychelles', code: 'SC'},
            {name: 'Sierra Leone', code: 'SL'},
            {name: 'Singapore', code: 'SG'},
            {name: 'Slovakia', code: 'SK'},
            {name: 'Slovenia', code: 'SI'},
            {name: 'Solomon Islands', code: 'SB'},
            {name: 'Somalia', code: 'SO'},
            {name: 'South Africa', code: 'ZA'},
            {name: 'South Georgia and the South Sandwich Islands', code: 'GS'},
            {name: 'Spain', code: 'ES'},
            {name: 'Sri Lanka', code: 'LK'},
            {name: 'Sudan', code: 'SD'},
            {name: 'Suriname', code: 'SR'},
            {name: 'Svalbard and Jan Mayen', code: 'SJ'},
            {name: 'Swaziland', code: 'SZ'},
            {name: 'Sweden', code: 'SE'},
            {name: 'Switzerland', code: 'CH'},
            {name: 'Syrian Arab Republic', code: 'SY'},
            {name: 'Taiwan, Province of China', code: 'TW'},
            {name: 'Tajikistan', code: 'TJ'},
            {name: 'Tanzania, United Republic of', code: 'TZ'},
            {name: 'Thailand', code: 'TH'},
            {name: 'Timor-Leste', code: 'TL'},
            {name: 'Togo', code: 'TG'},
            {name: 'Tokelau', code: 'TK'},
            {name: 'Tonga', code: 'TO'},
            {name: 'Trinidad and Tobago', code: 'TT'},
            {name: 'Tunisia', code: 'TN'},
            {name: 'Turkey', code: 'TR'},
            {name: 'Turkmenistan', code: 'TM'},
            {name: 'Turks and Caicos Islands', code: 'TC'},
            {name: 'Tuvalu', code: 'TV'},
            {name: 'Uganda', code: 'UG'},
            {name: 'Ukraine', code: 'UA'},
            {name: 'United Arab Emirates', code: 'AE'},
            {name: 'United Kingdom', code: 'GB'},
            {name: 'United States', code: 'US'},
            {name: 'United States Minor Outlying Islands', code: 'UM'},
            {name: 'Uruguay', code: 'UY'},
            {name: 'Uzbekistan', code: 'UZ'},
            {name: 'Vanuatu', code: 'VU'},
            {name: 'Venezuela', code: 'VE'},
            {name: 'Vietnam', code: 'VN'},
            {name: 'Virgin Islands, British', code: 'VG'},
            {name: 'Virgin Islands, U.S.', code: 'VI'},
            {name: 'Wallis and Futuna', code: 'WF'},
            {name: 'Western Sahara', code: 'EH'},
            {name: 'Yemen', code: 'YE'},
            {name: 'Zambia', code: 'ZM'},
            {name: 'Zimbabwe', code: 'ZW'}
        ];


    $scope.init = function(){
        $scope.toggle = false ;
        $scope.label = "whereto";
        $scope.sessionId = Math.random(10);
        store.set('label', 'whereto');
        store.set('session_id', $scope.sessionId);
    
        $scope.textinput =  false ;
        $scope.airports =  false ;
        $scope.planetype =  false ;
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
   
$scope.selectairport = function() {
      
    var selected  = {} ;
        selected = $scope.selectedairport ;
    var msg = selected.originalObject.id ; 
    console.log('message',msg);
    $('<div class="message message-personal">' + msg + '</div>').appendTo($('.mCSB_container')).addClass('new');
        $scope.inputtext = true ;
        $scope.airportsnames = false ;
    updateScrollbar();
    $scope.airportsuggest = false ;
    $scope.textinput = true ;
    emitmsg(msg);
  }
   
    

    socket.on('getresponse', function (response) {


        if (response.nextlabel == "toairports" || response.nextlabel == 'fromairports') {
           
            

            label = response.nextlabel;
            store.set('label', response.nextlabel);
            console.log('reponse.label', response.nextlabel);
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
                 $scope.$broadcast('angucomplete-alt:clearInput');
                 $scope.textinput=false ;
                 $scope.airportsuggest = true ;
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
                        for (var i = 0; i < response.msg.results.length; i++) {
                            $('<div class="message new"><figure class="avatar"><img src="img/profile.png" /></figure>' + response.msg.results[i].id + '. ' + response.msg.results[i].name + ' US ' + response.msg.results[i].costperhr + '/hr</div>').appendTo($('.mCSB_container')).addClass('new');
                        }
                    } else {
                        $('<div class="message new"><figure class="avatar"><img src="img/profile.png" /></figure>' + response.msg + '</div>').appendTo($('.mCSB_container')).addClass('new');
                    }
                } else {

                    $('<div class="message new"><figure class="avatar"><img src="img/profile.png" /></figure>' + response.msg + '</div>').appendTo($('.mCSB_container')).addClass('new');
                }
                
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