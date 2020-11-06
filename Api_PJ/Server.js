var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var mysql = require('mysql')

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));

app.get('/', function (req, res) {
    return res.send({ error: true, message: 'Test Student Web API' })
});

var dbConn = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'hotel_mb'
});

dbConn.connect();


app.post('/customer', function (req, res) {
    var cus = req.body;
    console.log(cus);

    if (!cus) {
        return res.status(400).send({ error: true, message: 'Please provide student ' });
    }

    dbConn.query("INSERT INTO customer SET ?", cus, function (error, results, fields) {
        if (error) throw error;
        console.log(results);
        return res.send({ error: false, message: 'successfully' });
    });
});
app.post('/login', function (req, res) {
    var login1 = req.body.Cus_username;
    var login2 = req.body.Cus_password;

    if (!login1 && !login2){
        return res.status(400).send({ error: true, message: 'Login Fail ' });
    }
    dbConn.query("SELECT * FROM customer where Cus_username = ? AND Cus_password = ?", [login1,login2], function (error, results, fields) {
        if (error) throw error;
        console.log(results);
        return res.send(results[0]);
    });

}

);

app.listen(3000, function () {
    console.log('Node app is running on port 3000');
});