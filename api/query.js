

//    var connection = mysql.createConnection({
//        host: 'localhost',
//        user: 'root',
//        password: '',
//        database: 'pravola-chatbot'
//    });
//    connection.connect();

var query = function(req, res){
    
        var chat_data = {
            to_country: data.whereto,
            to_airport: data.toairport,
            from_country: data.fromwhere,
            from_airport: data.fromairport,
            planetype: data.planetype,
            startdate: data.startdate,
            starttime: data.starttime,
            returndate: 'yes/no',
            returntime: 'yes/no',
            email: data.email,
            distance: data.distance,
            estimatedhrs: data.estimatedhrs,
            planecostperhr: data.planecostperhr,
            estimatedcost: data.estimatedcost,
            estimated_time: data.estimated_time
        };

        var insert = Dbconnection.query("INSERT INTO chat SET ?", chat_data, function(err, result){
            if(err) throw err;
            console.log('data inserted'+insert);
        });

};

module.exports = query;
