<script>
    import { onMount } from 'svelte';
    import {Navbar, Nav, NavItem, NavLink, NavbarBrand, Dropdown, DropdownToggle, DropdownMenu, DropdownItem} from 'sveltestrap';
       
       let stats=[];
       let stats1=[];
       let ages_seventy=[];
       let c=[];
       let hsc =[];
       let mp=[];
    async function getData(){
        console.log("Fetching covid data...");
       const res= await fetch("/api/v1/air-pollution-stats");
        const res1 = await fetch("https://soccer-games1.p.rapidapi.com/games/livegames", {
            "method" : "GET",
            "headers":{
                'X-RapidAPI-Host': 'soccer-games1.p.rapidapi.com',
                'X-RapidAPI-Key': '50d3d41c7dmsha1d98e11141b0d9p1baaf7jsnfe2b03a5f21d',
            }
        });
        if(res.ok && res1.ok){
            const data = await res.json();
                   
                   stats = data;
                   console.log("Estadísticas recibidas: "+stats.length);
                   //inicializamos los arrays para mostrar los datos
                   stats.forEach(stat => {
                       ages_seventy.push(stat.ages_seventy);
                       
                   });
                   
                   const data1= await res1.json();
                   stats1 = data1;
                   console.log(stats1);
                   console.log("Estadísticas recibidas: "+stats1.length);
                   //inicializamos los arrays para mostrar los datos
                   stats1.forEach(stat=>{
                    c.push(stat.country);
                    hsc.push(parseInt(stat["homeScore"]));
                    mp.push(parseInt(stat["minutesPlayed"]));
                   });
               loadGraph();
           } else {
               console.log("Error cargando los datos");
           }
       }
       async function loadGraph(){
        Highcharts.chart('container', {
            chart: {
                type: 'spline'
            },
            title: {
                text: 'Integracion2'
            },
            subtitle: {
                text: 'Biblioteca: Highcharts'
            },
            yAxis: {
                title: {
                    text: 'Valor'
                }
            },
            xAxis: {
                title: {
                    text: "País",
                },
                categories: c,
            },
            legend: {
                layout: 'vertical',
                align: 'right',
                verticalAlign: 'middle'
            },
            
            series: [
                {
                name: 'minutesPlayed',
                data: mp
                },
                {
                name: 'homeScore',
                data: hsc
                },
                {
                name: 'ages_seventy',
                data: ages_seventy
                },
            ],
            responsive: {
                rules: [{
                    condition: {
                        maxWidth: 500
                    },
                    chartOptions: {
                        legend: {
                            layout: 'horizontal',
                            align: 'center',
                            verticalAlign: 'bottom'
                        }
                    }
                }]
            }
        });
       
       
    }
    onMount(getData);
</script>

<svelte:head>
    <script src="https://code.highcharts.com/highcharts.js"></script>
    <script src="https://code.highcharts.com/modules/series-label.js"></script>
    <script src="https://code.highcharts.com/modules/exporting.js"></script>
    <script src="https://code.highcharts.com/modules/export-data.js"></script>
    <script src="https://code.highcharts.com/modules/accessibility.js"  on:load="{loadGraph}"></script>
    
   
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
					  <DropdownItem href="./#/analytics"> 2º Gráfica común</DropdownItem>
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
              Integracion externa 2
            </p>
        </figure>  
    </main>
    
    
    <style>
        .highcharts-figure {
          min-width: 100%;
          max-width:100%;
          margin: 1em auto;
        }
        #container {
          height: 600px;
        }
        
    </style>