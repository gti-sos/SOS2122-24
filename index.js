const cool = require("cool-ascii-faces");
const express = require("express");
const bodyParser = require("body-parser")
const app = express();
//Proxy

const request = require('request');
const cors = require('cors');
const path= require('path'); 
//

app.use(bodyParser.json());
const port = process.env.PORT || 8080;

//Ruta Apis
const cancerdeaths_stats_API = require("./src/back/cancerdeaths-stats.js");
const cancerdeaths_stats_APIV2 = require("./src/back/v2/cancerdeaths-stats.js");
const pneumonia_stats_API = require("./src/back/pneumonia-stats.js");
const pneumonia_stats_APIV2 = require("./src/back/v2/pneumonia-stats.js");
const airpollution_stats_API = require("./src/back/air-pollution-stats.js");
const Datastore = require('nedb');


//DB
db_cancerdeaths_stats = new Datastore();
db_cancerdeaths_statsV2 = new Datastore();
db_pneumonia_stats = new Datastore();
db_pneumonia_statsv2 = new Datastore();
db_airpollution_stats = new Datastore();


//Proxy
app.use(cors());

//Proxy Laura
var paths='/remoteAPI';
var apiServerHost = 'https://sos2122-24.herokuapp.com/api/v2/pneumonia-stats';

app.use(paths, function(req, res) {
  var url = apiServerHost + req.url;
  //console.log('piped: ' + req.url);
  req.pipe(request(url)).pipe(res);
});

//Proxy Raúl
var paths='/remoteAPI2';
var apiServerHost = 'https://sos2122-24.herokuapp.com/api/v2/cancerdeaths-stats';

app.use(paths, function(req, res) {
  var url = apiServerHost + req.url;
  console.log('piped: ' + req.url);
  req.pipe(request(url)).pipe(res);
});


//Proxy Ali

var paths='/remoteAPI3';
var apiServerHost = 'https://sos2122-24.herokuapp.com/api/v1/air-pollution-stats';

app.use(paths, function(req, res) {
  var url = apiServerHost + req.url;
  console.log('piped: ' + req.url);
  req.pipe(request(url)).pipe(res);
});


//proxy Integracion Laura con API population
var pathsL1='/remoteAPIPOPULATION';
var apiServerHostL1 = 'https://sos2122-10.herokuapp.com/api/v2/population-levels';

app.use(pathsL1, function(req, res) {
  var url = apiServerHostL1 + req.url;
  //console.log('piped: ' + req.url);
  req.pipe(request(url)).pipe(res);
});

//proxy Integracion Laura con API Agricultural
var pathsL2='/remoteAPIAGRICULTURAL';
var apiServerHostL2 = 'https://sos2122-20.herokuapp.com/api/v1/agriculturalproduction-stats';

app.use(pathsL2, function(req, res) {
  var url = apiServerHostL2 + req.url;
  //console.log('piped: ' + req.url);
  req.pipe(request(url)).pipe(res);
});


//DB
cancerdeaths_stats_API.register(app,db_cancerdeaths_stats);
cancerdeaths_stats_APIV2.register(app,db_cancerdeaths_statsV2);
pneumonia_stats_API.register(app,db_pneumonia_stats);
pneumonia_stats_APIV2.register(app,db_pneumonia_statsv2);
airpollution_stats_API.register(app,db_airpollution_stats);

//Ruta Estática
app.use("/", express.static(`public`))

app.get("/cool", (req,res)=>{
    console.log("Requested /cool route");
    res.send("<html><body><h1>" + cool()+ "</h1></body></html>")
});


//Puerto
app.listen(port, ()=>{
    console.log(`Server ready at port ${port}`);
});








