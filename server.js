/**
 * Created by Marta_ on 20/11/2016.
 */
var express = require('express');
var app = express();
var bodyParser =require('body-parser');
//var methodOverride = require('mehod-override');
var mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/minimosdb', function(err, res){
  if(err) throw err;
  console.log('Conexión a la base de datos');
});


app.all('/*', function(req, res, next) {
  // CORS headers
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization, Content-Length, X-Requested-With, Access-Control-Allow-Origin');
  res.header("Access-Control-Max-Age", "86400"); // 24 hours

  // intercept OPTIONS method
  if ('OPTIONS' == req.method) {
    res.send(200);
  }
  else {
    next();
  }
});

app.use(express.static(__dirname + "/public"));
app.use(bodyParser.json());
//app.use(methodOverride());
app.use(bodyParser.urlencoded({ extended: false }));
// API Rutas

routes = require('./app/routes/routes')(app);



app.listen(3000);
console.log("Server running on port 3000");