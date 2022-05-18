const cool = require("cool-ascii-faces");
const express = require("express");
const bodyParser = require("body-parser")
const app = express();
const jwt=require('jsonwebtoken');
const request = require('request');
const cors = require('cors'); 


app.use(bodyParser.json());
const port = process.env.PORT || 8080;

const cancerdeaths_stats_API = require("./src/back/cancerdeaths-stats.js");
const pneumonia_stats_API = require("./src/back/pneumonia-stats.js");
const pneumonia_stats_APIV2 = require("./src/back/v2/pneumonia-stats.js");
const airpollution_stats_API = require("./src/back/air-pollution-stats.js");
const Datastore = require('nedb');



db_cancerdeaths_stats = new Datastore();
db_pneumonia_stats = new Datastore();
db_pneumonia_statsv2 = new Datastore();
db_airpollution_stats = new Datastore();


app.use(cors());

var paths='/remoteAPI';
var apiServerHost = 'https://sos2122-24.herokuapp.com/api/v2/pneumonia-stats';

app.use(paths, function(req, res) {
  var url = apiServerHost + req.url;
  console.log('piped: ' + req.url);
  req.pipe(request(url)).pipe(res);
});



cancerdeaths_stats_API.register(app,db_cancerdeaths_stats);
pneumonia_stats_API.register(app,db_pneumonia_stats);
pneumonia_stats_APIV2.register(app,db_pneumonia_statsv2);
airpollution_stats_API.register(app,db_airpollution_stats);

app.use("/", express.static(`public`))

app.get("/cool", (req,res)=>{
    console.log("Requested /cool route");
    res.send("<html><body><h1>" + cool()+ "</h1></body></html>")
});

app.listen(port, ()=>{
    console.log(`Server ready at port ${port}`);
});




