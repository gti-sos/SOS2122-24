<script>
    import { onMount } from "svelte";

    const delay=ms=>new Promise(res=>setTimeout(res,ms));

    let pneumonias=[];
    let country=[];
    let year=[];
    let ages_zero_fifty=["menos de 50 años"];
    let ages_fifty_seventy=["de 50 a 70 años"];
    let ages_seventy=["mayores de 70 años"];
    let datosOrdenados=[];

    async function getData(){
        console.log("Fetching pneumonia....");
        const res = await fetch("/api/v1/pneumonia-stats");
        if(res.ok){
            const data = await res.json();          
            pneumonias = data;
            if (pneumonias.length == 0) {
                const res = await fetch("/api/v1/pneumonia-stats/loadInitialData");
                console.log("Entradas recibidas: "+pneumonias.length);
            //con la siguiente funcion ordeno los datos por años de menor a mayor
            datosOrdenados = pneumonias.sort(function (a, b){
            return (a.year - b.year)
            });
            console.log("Ordenadas correctamente");
            datosOrdenados.forEach(pneumonia => {
                year.push(pneumonia.year);
                country.push(pneumonia.country+"-"+ pneumonia.year);
                ages_zero_fifty.push(pneumonia.ages_zero_fifty);
                ages_fifty_seventy.push(pneumonia.ages_fifty_seventy);
                ages_seventy.push(pneumonia.ages_seventy);          
            });
            location.reload();
            }
            else{
               console.log("Entradas recibidas: "+pneumonias.length);
            //con la siguiente funcion ordeno los datos por años de menor a mayor
            datosOrdenados = pneumonias.sort(function (a, b){
            return (a.year - b.year)
            });
            console.log("Ordenadas correctamente");
            datosOrdenados.forEach(pneumonia => {
                year.push(pneumonia.year);
                country.push(pneumonia.country+"-"+pneumonia.year);
                ages_zero_fifty.push(pneumonia.ages_zero_fifty);
                ages_fifty_seventy.push(pneumonia.ages_fifty_seventy);
                ages_seventy.push(pneumonia.ages_seventy);            
            }); 
            }
            
        }else{
            console.log("Error, can`t charge data");
        }
    }

    async function loadGraph() {
        var chart = bb.generate({
        data: {
          columns: [
            ["data1", 30],
	        ["data2", 120]
          ],
          type: "scatter", // for ESM specify as: pie()
         
          onclick: function(d, i) {
          console.log("onclick", d, i);
         },
          onover: function(d, i) {
          console.log("onover", d, i);
         },
          onout: function(d, i) {
          console.log("onout", d, i);
         }
        },
        axis: {
            x: {
                type: "category",
                categories: country
            },
        },
        bindto: "#pieChart"
      });
      
      setTimeout(function() {
          chart.load({
              columns: [
                  ages_zero_fifty,
                  ages_fifty_seventy,
                  ages_seventy,
              ]
          });
      }, 1500);
      
      setTimeout(function() {
        chart.unload({ ids: "data1" });
	    chart.unload({ ids: "data2" });
      }, 2500);

    }

    onMount(getData);
</script>

<svelte:head>
    <script type="text/javascript" src="https://d3js.org/d3.v6.min.js"></script>
    <link rel="stylesheet" href="./jssss/billboard.js/dist/billboard.css">
    <link rel="stylesheet" href="./jssss/billboard.js/dist/theme/insight.css">
    <script type="text/javascript" src="/jssss/billboard.js/dist/billboard.js" on:load="{loadGraph}"></script>
    
</svelte:head>

<main>
    <div id="pieChart"></div>
    <br>
    <br>
    <p> Este grafico compara las muertes por neumonia en distintos rangos de edades</p>
</main>
