exports.createConnection = function () {

    var connection = mysql.createConnection({
      	     database : 'pravola-chatbot',
		    user : 'ftdev',
			password : '10gXWOqeaf',
		    host :'apps.fountaintechies.com',
    });
    //console.log("yess");
    console.log(connection);
    return connection;
};

//function getSubscribers(req, res) {
//    connection.query('SELECT * FROM quote',function(err, data){
//      if(err)
//      {
//        res.send(err);
//      }
//      res.send(data);
//      //res.render('pacientes',{data:data});
//      console.log(data);
//    });
//    return
//}
//
//function htmlSubscribers(req, res) {
//    res.sendFile(path.join(__dirname + '/web/subscriber.html'));
//    return;
//}
