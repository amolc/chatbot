
var TextSearch = require("./TextSearch.js");
var internalfunctions = {
   airportlist: function(city) {
     var google_api_key =   "AIzaSyCbQ_Hk3eqc7UB-fqKqYqUDFtjDjDBe2V8" ;
     var google_output_format = "json";
     var textSearch = new TextSearch(google_api_key, google_output_format);
    var parameters = {
        query: "private airports in"+city
    };

     textSearch(parameters, function (error, response) {
          //console.log(response);
          if(response.results.length==0){
            console.log("No Airport Found");
          }
          else{
            var airports = {}, airportsnames = [];
            for(var index = 0; index < response.results.length; index++) {
                    var srno = index+1 ;
                     airportsnames.push({id:srno, name:response.results[index].name});
                    console.log(response.results[index].name);
               }
          }

          var jsonairports = JSON.parse(JSON.stringify(airportsnames))
          airports.results = jsonairports ;
          console.log(airports);
          return airports;
      });

    }

}
module.exports = internalfunctions;
