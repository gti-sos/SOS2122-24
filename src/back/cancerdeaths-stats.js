// Raúl Gómez Morales

const bodyParser = require("body-parser");

const BASE_API_URL_CANCERDEATHS_STATS = "/api/v1/cancerdeaths-stats";


var cancerdeaths_stats = [
    {				
        country: "france",	
        years: 2019,
        ages_zero_fifty: 34,
        ages_fifty_seventy: 359,
        ages_seventy: 1374
    },
    {				
        country: "argentina",	
        years: 2019,
        ages_zero_fifty: 41,
        ages_fifty_seventy: 396,
        ages_seventy: 1341
    },
    {				
        country: "brazil",	
        years: 2019,
        ages_zero_fifty: 40,
        ages_fifty_seventy: 273,
        ages_seventy: 926
    },
    {				
        country: "china",	
        years: 2019,
        ages_zero_fifty: 46,
        ages_fifty_seventy: 319,
        ages_seventy: 1176
    },
    {				
        country: "japan",	
        years: 2019,
        ages_zero_fifty: 26,
        ages_fifty_seventy: 260,
        ages_seventy: 1254
    },
    {				
        country: "england",	
        years: 2019,
        ages_zero_fifty: 28,
        ages_fifty_seventy: 303,
        ages_seventy: 1553
    },
    {				
        country: "india",	
        years: 2019,
        ages_zero_fifty: 30,
        ages_fifty_seventy: 213,
        ages_seventy: 581
    },
    {								
        country: "eeuu",	
        years: 2019,
        ages_zero_fifty: 29,
        ages_fifty_seventy: 335,
        ages_seventy: 1294
    },
    {												
        country: "spain",	
        years: 2019,
        ages_zero_fifty: 33,
        ages_fifty_seventy: 300,
        ages_seventy: 1269
    }
]

module.exports.register = (app) =>{
   
    
    // Cargar datos iniciales
    
    app.get(BASE_API_URL_CANCERDEATHS_STATS+"/loadInitialData",(req, res)=>{
    
        if(cancerdeaths_stats.length==0){
            cancerdeaths_stats = [
                {				
                    country: "france",	
                    years: 2019,
                    ages_zero_fifty: 34,
                    ages_fifty_seventy: 359,
                    ages_seventy: 1374
                },
                {				
                    country: "argentina",	
                    years: 2019,
                    ages_zero_fifty: 41,
                    ages_fifty_seventy: 396,
                    ages_seventy: 1341
                },
                {				
                    country: "brazil",	
                    years: 2019,
                    ages_zero_fifty: 40,
                    ages_fifty_seventy: 273,
                    ages_seventy: 926
                },
                {				
                    country: "china",	
                    years: 2019,
                    ages_zero_fifty: 46,
                    ages_fifty_seventy: 319,
                    ages_seventy: 1176
                },
                {				
                    country: "japan",	
                    years: 2019,
                    ages_zero_fifty: 26,
                    ages_fifty_seventy: 260,
                    ages_seventy: 1254
                },
                {				
                    country: "england",	
                    years: 2019,
                    ages_zero_fifty: 28,
                    ages_fifty_seventy: 303,
                    ages_seventy: 1553
                },
                {				
                    country: "india",	
                    years: 2019,
                    ages_zero_fifty: 30,
                    ages_fifty_seventy: 213,
                    ages_seventy: 581
                },
                {								
                    country: "eeuu",	
                    years: 2019,
                    ages_zero_fifty: 29,
                    ages_fifty_seventy: 335,
                    ages_seventy: 1294
                },
                {												
                    country: "spain",	
                    years: 2019,
                    ages_zero_fifty: 33,
                    ages_fifty_seventy: 300,
                    ages_seventy: 1269
                }
            ]
        }
        res.sendStatus(200, "OK.")
        
    })
    
    // Documentos
    
    app.get(BASE_API_URL_CANCERDEATHS_STATS+"/docs",(req,res)=>
    {
        res.redirect("")
    })
    
    // GETs
    
    // GET por año
    
    app.get(BASE_API_URL_CANCERDEATHS_STATS,(req, res)=>{
    
        var year = req.query.year;
        var from = req.query.from;
        var to = req.query.to;
        if(year != null){
            // Apartado para búsqueda por año
            var filteredList = cancerdeaths_stats.filter((reg)=>
            {
                return (reg.year == year);
            });
            if (filteredList==0){
                res.sendStatus(404, "NO EXISTE");
            }else{
                res.send(JSON.stringify(filteredList,null,2));
            }
        }else if(from != null && to != null){
            // Apartado para from y to
            var filteredList = cancerdeaths_stats.filter((reg)=>
            {
                return (reg.year >= from && reg.year <=to);
            });
            if (filteredList==0){
                res.sendStatus(404, "NO EXISTE");
            }else{
                res.send(JSON.stringify(filteredList,null,2));
            }
    
        }else if(year == null && from == null && to == null){
            res.send(JSON.stringify(cancerdeaths_stats,null,2));
        }else{
            res.sendStatus(400, "BAD REQUEST");
        }
    })
    
    // GET por país
    
    app.get(BASE_API_URL_CANCERDEATHS_STATS+"/:country",(req, res)=>{
    
        var country =req.params.country
        var filteredList = cancerdeaths_stats.filter((reg)=>
        {
            return (reg.country == country);
        });
    
        var from = req.query.from;
        var to = req.query.to;
    
        if(from != null && to != null){
            // Apartado para from y to
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
    
    // GET por año y pais
    
    app.get(BASE_API_URL_CANCERDEATHS_STATS+"/:country/:year",(req, res)=>{
    
        var country =req.params.country
        var year = req.params.year
        var filteredList = cancerdeaths_stats.filter((reg)=>
        {
            return (reg.country == country && reg.year == year);
        });
        if (filteredList==0){
            res.sendStatus(404, "NO EXISTE");
        }else{
            res.send(JSON.stringify(filteredList,null,2));
        }
    })
    
    // POSTs
    
    // POST para lista de recursos
    
    app.post(BASE_API_URL_CANCERDEATHS_STATS,(req, res)=>{
        
        if(comprobar_body(req)){
            res.sendStatus(400,"BAD REQUEST - Parametros incorrectos");
        }else{
            var filteredList = cancerdeaths_stats.filter((reg)=>
            {
                return(req.body.country == reg.country && req.body.year == reg.year)
            })
        
            if(filteredList.length != 0){
                res.sendStatus(409,"CONFLICT");
            }else{
                cancerdeaths_stats.push(req.body);
                res.sendStatus(201,"CREATED");
            }
        }
    
    })
    
    // POST para recurso concreto
    
    app.post(BASE_API_URL_CANCERDEATHS_STATS+"/:country",(req, res)=>{
        res.sendStatus(405,"METHOD NOT ALLOWED");
    })
    
    
    // PUTs
    
    // PUT de una lista de recursos
    
    app.put(BASE_API_URL_CANCERDEATHS_STATS,(req, res)=>{
        
        res.sendStatus(405,"METHOD NOT ALLOWED");
    })
    
    // PUT de un recurso especifico
    
    app.put(BASE_API_URL_CANCERDEATHS_STATS+"/:country/:year",(req, res)=>{
        
        if(comprobar_body(req)){
            res.sendStatus(400,"BAD REQUEST - Parametros incorrectos");
        }else{
            var country = req.params.country;
            var year = req.params.year;
            var body = req.body;  
            var index = cancerdeaths_stats.findIndex((reg) =>{
                return (reg.country == country && reg.year == year)
            })
            if(index == null){
                res.sendStatus(404,"NOT FOUND");
            }else if(country != body.country || year != body.year){
                res.sendStatus(400,"BAD REQUEST");
            }else{
                var  update_cancerdeaths_stats = {...body};
                cancerdeaths_stats[index] = update_cancerdeaths_stats;
            
                res.sendStatus(200,"UPDATED");
            }
        }
    
    })
    
    // DELETEs
    
    // DELETE de una lista de recursos
    
    app.delete(BASE_API_URL_CANCERDEATHS_STATS,(req, res)=>{
        cancerdeaths_stats = [];
        res.sendStatus(200,"DELETED");
    })
    
    // DELETE de un recurso especifico
    
    app.delete(BASE_API_URL_CANCERDEATHS_STATS+"/:country/:year",(req, res)=>{
        var country = req.params.country;
        var year = req.params.year;
        cancerdeaths_stats = cancerdeaths_stats.filter((reg)=>{
     
            // Con la primera parte comprobamos si es un país distinto al seleccionado
            // y con la segunda en caso de ser el mismo país se comprueba si es el mismo año
            return (reg.country!=country || (reg.country == country && reg.year != year))
        })
        res.sendStatus(200,"DELETED");
    })
    
    // Método auxiliares
    
    function comprobar_body(req){
        return (req.body.country == null |
                 req.body.year == null | 
                 req.body.death_rate == null | 
                 req.body.life_expectancy_birth == null | 
                 req.body.birth_rates == null);
    }
}
