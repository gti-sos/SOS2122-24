const cool = require("cool-ascii-faces");
const express = require("express");
const bodyParser = require("body-parser")
const app = express();
app.use(bodyParser.json());
const port = process.env.PORT || 8080;

const BASE_API_URL ="/api/v1";

app.use("/", express.static(`public`))

var pneumonia= [ 
    {
        country: "france",
        year: 2019,
        death:240
    },
    {
        country: "argentina",
        year: 2019,
        death:927
    }
];

var cancerDeaths = [
    {
        country: "spain",
        year: 2019,
        deaths: 12345
    },
    {
        country: "italy",
        year:2020,
        deaths: 56789
    }
];

app.get(BASE_API_URL+"/pneumonia-stats",(req,res)=>{
    res.send(JSON.stringify(pneumonia));
});
app.post(BASE_API_URL+"/pneumonia-stats",(req,res)=>{
    pneumonia.push(req.body);
    res.sendStatus(201,"CREATED")
});

app.get(BASE_API_URL+"/cancerDeaths-stats",(req,res)=>{
    res.send(JSON.stringify(cancerDeaths,null,2));
});

app.post(BASE_API_URL+"/cancerDeaths-stats",(req,res)=>{
    cancerDeaths.push(req.body);
    res.sendStatus(201,"CREATED")
});

app.get("/cool", (req,res)=>{
    console.log("Requested /cool route");
    res.send("<html><body><h1>" + cool()+ "</h1></body></html>")
});

app.listen(port, ()=>{
    console.log(`Server ready at port ${port}`);
});

