//Laura Martinez Sanchez
const bodyParser = require("body-parser");

const BASE_API_URL_PNEUMONIA_STATS = "/api/v1/pneumonia-stats";



var pneumonia_stats = [
    {
        country: "france",
        year: 2019,
        ages_zero_fifty: 2,
        ages_zero_fifty: 8,
        ages_seventy: 230
    },
    {
        country: "argentina",
        year: 2019,
        ages_zero_fifty: 21,
        ages_zero_fifty: 71,
        ages_seventy: 835
    },
    {
        country: "brazil",
        year: 2019,
        ages_zero_fifty: 40,
        ages_zero_fifty: 43,
        ages_seventy: 455
    },
    {
        country: "china",
        year: 2019,
        ages_zero_fifty: 20,
        ages_zero_fifty: 7,
        ages_seventy: 130
    },
    {
        country: "japan",
        year: 2019,
        ages_zero_fifty: 4,
        ages_zero_fifty: 17,
        ages_seventy: 409
    },
    {
        country: "england",
        year: 2019,
        ages_zero_fifty: 5,
        ages_zero_fifty: 16,
        ages_seventy: 440
    },
    {
        country: "india",
        year: 2019,
        ages_zero_fifty: 117,
        ages_zero_fifty: 43,
        ages_seventy: 328

    },
    {
        country: "eeuu",
        year: 2019,
        ages_zero_fifty: 5,
        ages_zero_fifty: 16,
        ages_seventy: 184
    },
    {
        country: "spain",
        year: 2019,
        ages_zero_fifty: 3,
        ages_zero_fifty: 8,
        ages_seventy: 198
    }
]

module.exports.register = (app) =>{

    app.get(BASE_API_URL_PNEUMONIA_STATS+"/loadInitialData",(req, res)=>{
    
        if(pneumonia_stats.length==0){
            pneumonia_stats = [
                {
                    country: "france",
                    year: 2019,
                    ages_zero_fifty: 2,
                    ages_zero_fifty: 8,
                    ages_seventy: 230
                },
                {
                    country: "argentina",
                    year: 2019,
                    ages_zero_fifty: 21,
                    ages_zero_fifty: 71,
                    ages_seventy: 835
                },
                {
                    country: "brazil",
                    year: 2019,
                    ages_zero_fifty: 40,
                    ages_zero_fifty: 43,
                    ages_seventy: 455
                },
                {
                    country: "china",
                    year: 2019,
                    ages_zero_fifty: 20,
                    ages_zero_fifty: 7,
                    ages_seventy: 130
                },
                {
                    country: "japan",
                    year: 2019,
                    ages_zero_fifty: 4,
                    ages_zero_fifty: 17,
                    ages_seventy: 409
                },
                {
                    country: "england",
                    year: 2019,
                    ages_zero_fifty: 5,
                    ages_zero_fifty: 16,
                    ages_seventy: 440
                },
                {
                    country: "india",
                    year: 2019,
                    ages_zero_fifty: 117,
                    ages_zero_fifty: 43,
                    ages_seventy: 328
            
                },
                {
                    country: "eeuu",
                    year: 2019,
                    ages_zero_fifty: 5,
                    ages_zero_fifty: 16,
                    ages_seventy: 184
                },
                {
                    country: "spain",
                    year: 2019,
                    ages_zero_fifty: 3,
                    ages_zero_fifty: 8,
                    ages_seventy: 198
                }
            ]
        }
        res.sendStatus(200, "OK.")
        
    })
    
    // Documentos
    
    app.get(BASE_API_URL_PNEUMONIA_STATS+"/docs",(req,res)=>
    {
        res.redirect("https://documenter.getpostman.com/view/20091922/UVsQrixc")
    })
    
    
    app.get(BASE_API_URL_PNEUMONIA_STATS,(req, res)=>{
    
        var year = req.query.year;
        var from = req.query.from;
        var to = req.query.to;
        if(year != null){
            var filteredList = pneumonia_stats.filter((reg)=>
            {
                return (reg.year == year);
            });
            if (filteredList==0){
                res.sendStatus(404, "NO EXISTE");
            }else{
                res.send(JSON.stringify(filteredList,null,2));
            }
        }else if(from != null && to != null){
            var filteredList = pneumonia_stats.filter((reg)=>
            {
                return (reg.year >= from && reg.year <=to);
            });
            if (filteredList==0){
                res.sendStatus(404, "NO EXISTE");
            }else{
                res.send(JSON.stringify(filteredList,null,2));
            }
    
        }else if(year == null && from == null && to == null){
            res.send(JSON.stringify(pneumonia_stats,null,2));
        }else{
            res.sendStatus(400, "BAD REQUEST");
        }
    })
    
    
    
    app.get(BASE_API_URL_PNEUMONIA_STATS+"/:country",(req, res)=>{
    
        var country =req.params.country
        var filteredList = pneumonia_stats.filter((reg)=>
        {
            return (reg.country == country);
        });
    
        var from = req.query.from;
        var to = req.query.to;
    
        if(from != null && to != null){
            filteredList = filteredList.filter((reg)=>
            {
                return (reg.year >= from && reg.year <=to);
            });
            if (filteredList==0){
                res.sendStatus(404, "NO EXISTE");
            }else{
                res.send(JSON.stringify(filteredList,null,2));
            }
    
        }else{
            if (filteredList==0){
                res.sendStatus(404, "NO EXISTE");
            }else{
                res.send(JSON.stringify(filteredList,null,2));
            }
        }
    
    })
    
    
    app.get(BASE_API_URL_PNEUMONIA_STATS+"/:country/:year",(req, res)=>{
    
        var country =req.params.country
        var year = req.params.year
        var filteredList = pneumonia_stats.filter((reg)=>
        {
            return (reg.country == country && reg.year == year);
        });
        if (filteredList==0){
            res.sendStatus(404, "NO EXISTE");
        }else{
            res.send(JSON.stringify(filteredList,null,2));
        }
    })
    
    
    
    app.post(BASE_API_URL_PNEUMONIA_STATS,(req, res)=>{
        
        if(comprobar_body(req)){
            res.sendStatus(400,"BAD REQUEST - Parametros incorrectos");
        }else{
            var filteredList = pneumonia_stats.filter((reg)=>
            {
                return(req.body.country == reg.country && req.body.year == reg.year)
            })
        
            if(filteredList.length != 0){
                res.sendStatus(409,"CONFLICT");
            }else{
                pneumonia_stats.push(req.body);
                res.sendStatus(201,"CREATED");
            }
        }
    
    })
    
    
    
    app.post(BASE_API_URL_PNEUMONIA_STATS+"/:country",(req, res)=>{
        res.sendStatus(405,"METHOD NOT ALLOWED");
    })
    
    
    app.put(BASE_API_URL_PNEUMONIA_STATS,(req, res)=>{
        
        res.sendStatus(405,"METHOD NOT ALLOWED");
    })
    
    
    app.put(BASE_API_URL_PNEUMONIA_STATS+"/:country/:year",(req, res)=>{
        
        if(comprobar_body(req)){
            res.sendStatus(400,"BAD REQUEST - Parametros incorrectos");
        }else{
            var country = req.params.country;
            var year = req.params.year;
            var body = req.body;  
            var index = pneumonia_stats.findIndex((reg) =>{
                return (reg.country == country && reg.year == year)
            })
            if(index == null){
                res.sendStatus(404,"NOT FOUND");
            }else if(country != body.country || year != body.year){
                res.sendStatus(400,"BAD REQUEST");
            }else{
                var  update_pneumonia_stats = {...body};
                pneumonia_stats[index] = update_pneumonia_stats;
            
                res.sendStatus(200,"UPDATED");
            }
        }
    
    })
    
    
    app.delete(BASE_API_URL_PNEUMONIA_STATS,(req, res)=>{
        pneumonia_stats = [];
        res.sendStatus(200,"DELETED");
    })
    
    
    
    app.delete(BASE_API_URL_PNEUMONIA_STATS+"/:country/:year",(req, res)=>{
        var country = req.params.country;
        var year = req.params.year;
        pneumonia_stats = pneumonia_stats.filter((reg)=>{
            return (reg.country!=country || (reg.country == country && reg.year != year))
        })
        res.sendStatus(200,"DELETED");
    })
    
    function comprobar_body(req){
        return (req.body.country == null |
                 req.body.year == null | 
                 req.body.death_rate == null | 
                 req.body.life_expectancy_birth == null | 
                 req.body.birth_rates == null);
    }
}
