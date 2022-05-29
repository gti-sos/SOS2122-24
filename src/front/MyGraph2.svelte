<script>
    import { onMount } from 'svelte';
    import {Navbar, Nav, NavItem, NavLink, NavbarBrand, Dropdown, DropdownToggle, DropdownMenu, DropdownItem,Button} from 'sveltestrap';

   
    let airpollutions = [];
    let pneumonias = [];
    let cancerdeaths = [];

    let country= [];
    let year = [];
    let ages_seventy = [];
    let ages_fifty_seventy = [];
    let ages_zero_fifty = []; 
    let ages1 =[];
    let ages2=[];
    let ages3=[];
    async function getData(){
        const res1= await fetch("/api/v1/air-pollution-stats");
        const res2= await fetch("/api/v1/cancerdeaths-stats");
        const res3= await fetch("/api/v1/pneumonia-stats");
        if(res1.ok && res2.ok && res3.ok){
            const data1 = await res1.json();
            const data2 = await res2.json();
            const data3 = await res3.json();
            airpollutions = data1;
            console.log("Recibido: "+airpollutions.length);
            //inicializamos los arrays para mostrar los datos
            airpollutions.forEach(airpollution => {
                country.push(airpollution.country+"-"+airpollution.year);
                year.push(airpollution.year);
                ages1.push(airpollution.ages_seventy+airpollution.ages_fifty_seventy+airpollution.ages_zero_fifty);
                ages_fifty_seventy.push(airpollution.ages_fifty_seventy);
                ages_zero_fifty.push(airpollution.ages_zero_fifty);   
            });
            pneumonias=data3;
            console.log("Recibido: " + pneumonias.length);
            pneumonias.forEach(pneumonia=>{
               // year.push(pneumonia.year);
                //country.push(pneumonia.country);
                ages_zero_fifty.push(pneumonia.ages_zero_fifty);
                ages_fifty_seventy.push(pneumonia.ages_fifty_seventy);
                ages2.push(pneumonia.ages_seventy+pneumonia.ages_fifty_seventy+pneumonia.ages_zero_fifty);
                ages_seventy.push(pneumonia.ages_seventy);
            });
            cancerdeaths=data2;
            console.log("Recibido: " + cancerdeaths.length);
            cancerdeaths.forEach(cancerdeath=>{
                //year.push(cancerdeath.year);
                //country.push(cancerdeath.country);
                ages_zero_fifty.push(cancerdeath.ages_zero_fifty);
                ages_fifty_seventy.push(cancerdeath.ages_fifty_seventy);
                ages3.push(cancerdeath.ages_seventy+cancerdeath.ages_fifty_seventy+cancerdeath.ages_zero_fifty);
                ages_seventy.push(cancerdeath.ages_seventy);
            });


        }else{
            console.log("Error in request");
        }
    }

    async function loadGraph(){

        Highcharts.chart("container", {
            chart: {
                type: 'scatter',
        margin: [70, 50, 60, 80],
        events: {
            click: function (e) {
                // find the clicked values and the series
                var x = Math.round(e.xAxis[0].value),
                    y = Math.round(e.yAxis[0].value),
                    series = this.series[0];

                // Add it
                series.addPoint([x, y]);}}
    },
        title: {
            text: "Muertes por cancer, neumonia y contaminacion de aire en interiores",
            align: 'left'
        },

        subtitle: {
            text: "Source: thesolarfoundation.com",
            align: 'left'
        },

        yAxis: {
            title: {
                text: "Muertes",
            },

        },

        xAxis: {
            title: {
                text: "Pais-año",
            }
            ,categories: country,
        },
        tooltip: {
        shared: true
    },
        legend: {
            layout: 'vertical',
        align: 'left',
        x: 80,
        verticalAlign: 'top',
        y: 55,
        floating: true,
        backgroundColor:
            Highcharts.defaultOptions.legend.backgroundColor || // theme
            'rgba(255,255,255,0.25)'
        },

        

        series: [
        {
        name: 'AirPollution',
        data: ages1,
    },{
        name: 'Pneumonia',
        data: ages2,
    },{
        name: 'CancerDeaths',
        data: ages3,
    },
    ],

        responsive: {
            rules: [
                {
                    condition: {
                        maxWidth: 500,
                    },
                    chartOptions: {
                        legend: {
                            layout: "horizontal",
                            align: "center",
                            verticalAlign: "bottom",
                        },
                    },
                },
            ],
        },
    });

    }
   
    onMount(getData);
</script>
<svelte:head>

    
    <script src="https://code.highcharts.com/highcharts.js"on:load="{loadGraph}"></script>
    <script src="https://code.highcharts.com/modules/exporting.js"on:load="{loadGraph}"></script>
    <script src="https://code.highcharts.com/modules/export-data.js"on:load="{loadGraph}"></script>
    <script src="https://code.highcharts.com/modules/accessibility.js"on:load="{loadGraph}"></script>




</svelte:head>

<main>

    <Navbar style="background-color: #6EAA8D; color:white;" light expand="lg" >
		<NavbarBrand href="#/info">INICIO</NavbarBrand>
		<Nav navbar>
			<Dropdown >
				<DropdownToggle nav caret> Ali </DropdownToggle>
				<DropdownMenu end>
					<DropdownItem href="./#/aleali">AirPollution-Stats-SOS1</DropdownItem>
					<DropdownItem divider/>
					<DropdownItem href="./#/felipe">AirPollution-Stats-SOS2</DropdownItem>
					<DropdownItem divider/>
					<DropdownItem href="./#/ext1">AirPollution-Stats-Ext1</DropdownItem>
					<DropdownItem divider/>
					<DropdownItem href="./#/ext2">AirPollution-Stats-Ext2</DropdownItem>
					<DropdownItem divider/>
					<DropdownItem href="#/graphAirPollution">AirPollution-Stats</DropdownItem>
					<DropdownItem divider/>
					<DropdownItem href="#/airpollution-apexcharts">AirPollution-Stats-ApexCharts</DropdownItem>
					
				</DropdownMenu>
			  </Dropdown>
			<Dropdown >
				<DropdownToggle nav caret> API </DropdownToggle>
				<DropdownMenu end>
				  <DropdownItem href="./api/v1/cancerdeaths-stats">Cancerdeaths-Stats</DropdownItem>
				  <DropdownItem divider/>
				  <DropdownItem href="./api/v1/pneumonia-stats">Pneumonia-Stats</DropdownItem>
				  <DropdownItem divider/>
				  <DropdownItem href="./api/v1/air-pollution-stats">Airpollution-Stats</DropdownItem>
				</DropdownMenu>
            </Dropdown>
              
            <Dropdown>
				<DropdownToggle nav caret> FRONT-END </DropdownToggle>
				<DropdownMenu end>
				  <DropdownItem href="./#/Cancerdeaths-stats">Cancerdeaths FRONT-END</DropdownItem>
				  <DropdownItem href="./#/Pneumonia-stats">Pneumonia FRONT_END</DropdownItem>
				  <DropdownItem href="#/air-pollution-stats">AirPollution FRONT-END</DropdownItem>
				  <DropdownItem divider/>
				  <DropdownItem href="#/analytics">Conjunto</DropdownItem>
				</DropdownMenu>
			  </Dropdown>
			  
			  <Dropdown >
				<DropdownToggle nav caret> Gráficas </DropdownToggle>
				<DropdownMenu end>
					  <DropdownItem href="./#/graph">Gráfica común</DropdownItem><DropdownItem divider/>
					  <DropdownItem href="./#/graph2"> 2º Gráfica común</DropdownItem>
				</DropdownMenu>
			  </Dropdown>
		  <!--<NavItem>
			<NavLink style="float:right; margin:left;" href="#/about">Acerca de</NavLink>
		  </NavItem>-->
		</Nav>
	</Navbar>

    
    <figure class="highcharts-figure">
        <div id="container"></div>
        <p class="highcharts-description">
           
        </p>
    </figure>
    
    

</main>