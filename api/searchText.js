var auth = require('./Auth');
var querystring = require('querystring');
var https = require('https');
// include httpModule which accumulates the response data
var httpmodule = require('./httpModule');

var parameters = {
        key : auth.API_KEY,
        query: "food, Raleigh"
};

// searchText function that creates a HTTP request:
function searchText(format){
  function searchData(parameters, callback){
    // if parameter query does not exist add restaurants
    parameters.query = parameters.query || "airports in Dubai";
    // create an option for the HTTP request
    var options = {
      hostname : 'maps.googleapis.com',
      path : '/maps/api/place/textsearch/' + format + '?' + querystring.stringify(parameters)
    }
    // create an HTTP request and pass our httpModule as callback to accumulate the response texts
    var request = https.request(options, new httpmodule(format = 'json',callback));
    //incase of error send it back to callback
    request.on("error", function (error) {
                callback(new Error(error));
      });
      // close the request
      request.end();
  };
  // return the function(closure)
  console.log(searchData);
  return searchData;
};


searchText: function (callback) {
  // calling searchFunction by passing parameters and callback
  searchFunction(parameters,callback);
}
searchText();
