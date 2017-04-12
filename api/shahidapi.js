var google_api_key =   "AIzaSyCbQ_Hk3eqc7UB-fqKqYqUDFtjDjDBe2V8" ;
// var google_api_key = "AIzaSyBKDSx_T1NPT6POTrShPCed43ULC1mx9U8";
 var google_output_format = "json";
 var textSearch = new TextSearch(google_api_key, google_output_format);
 var parameters = {
    query: "private airports in"+cityname
 };
global.airship = {} ;
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
               }
           airship = airports ;
           var jsonairports = JSON.parse(JSON.stringify(airportsnames))
           airports.results = jsonairports ;
           global.airship = airports;
           //console.log(airship);
           goOn()
         }

});

function goOn(response) {
      // continue your code here
   console.log("test here");
  return airship ;
}
