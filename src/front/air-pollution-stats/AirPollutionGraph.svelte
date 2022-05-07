<script>

import { onMount } from 'svelte';

let apiData = {};

const delay = ms => new Promise(res => setTimeout(res,ms));
    let stats = [];
    let country= [];
    let year = [];
    let ages_seventy = [];
    let ages_fifty_seventy = [];
    let ages_zero_fifty = []; 
    async function getPEStats(){
        console.log("Fetching stats....");
        const res = await fetch("/api/v1/air-pollution-stats");
        if(res.ok){
            const data = await res.json();
            stats = data;
            console.log("Estadísticas recibidas: "+stats.length);
            //inicializamos los arrays para mostrar los datos
            stats.forEach(stat => {
                country.push(stat.country+"-"+stat.year);
                year.push(stat.year);
                ages_seventy.push(stat.ages_seventy);
                ages_fifty_seventy.push(stat.ages_fifty_seventy);
                ages_zero_fifty.push(stat.ages_zero_fifty);            
            });
        }else{
            console.log("Error cargando los datos");
		}
    }

async function getData(){
    const res= await fetch("/api/v1/air-pollution-stats");
    if(res.ok){
        const json = await res.json();
        apiData = json;
        loadGraph();

    }else{
        console.log("Error in request");
    }
}

async function loadGraph(){


Highcharts.chart('container', {
    chart: {
        type: 'spline',
        inverted: true
    },
    title: {
        text: 'Muertes por contaminacion de aire en interiores'
    },
    
    xAxis: {
        title: {
                    text: "País-Año",
                },
                categories: country,
            
    },
    yAxis: {
        title: {
            text: 'Muertes'
        },
       
    },
    legend: {
        enabled: false
    },
    tooltip: {
        headerFormat: '<b>{series.name}</b><br/>',
        pointFormat: '{point.y}muertes'
    },
    plotOptions: {
        spline: {
            marker: {
                enable: false
            }
        }
    },
    series: [
        {
        name: 'Mayores de 70 años',
        data: ages_seventy
    },
    {   name: 'Entre 50 y 70 años',
        data: ages_fifty_seventy},
    {   name:'Menores de 50 años',
        data: ages_zero_fifty}
    ]
});
}
onMount(getPEStats);
</script>
<svelte:head>


    <script src="https://code.highcharts.com/highcharts.js"></script>
    <script src="https://code.highcharts.com/modules/exporting.js"></script>
    <script src="https://code.highcharts.com/modules/export-data.js"></script>
    <script src="https://code.highcharts.com/modules/accessibility.js" on:load="{loadGraph}"></script>


</svelte:head>

<main>
    <figure class="highcharts-figure">
        <div id="container"></div>
        <p class="highcharts-description">
            Los gráficos de spline son gráficos de líneas suavizadas y este ejemplo muestra un 
            gráfico de spline invertido. Invertir el gráfico significa que el eje X se coloca como 
            el eje vertical y el eje Y se coloca como el eje horizontal. Esto puede ser más intuitivo 
            para ciertos conjuntos de datos, como en este gráfico donde el eje X representa la altitud 
            vertical.
        </p>
    </figure>
    
</main>