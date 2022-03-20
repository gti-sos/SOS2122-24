const cool= require("cool-ascii-faces");
const express = require("express");

const app= express();
const port= process.env.PORT || 8080;

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

app.get(BASE_API_URL+"/pneumonia",(req,res)=>{
    res.send(JSON.stringify(pneumonia));
});
 
app.get("/cool", (req,res)=>{
    console.log("Requested /cool route");
    res.send("<html><body><h1>" + cool()+ "</h1></body></html>")
});

app.listen(port, ()=>{
    console.log(`Server ready at port ${port}`);
});

