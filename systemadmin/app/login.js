var session = require('express-session');

var session;

app.get('/login', function(req, res){
    res.sendFile('/systemadin/login.html', {root: __dirname});
});
