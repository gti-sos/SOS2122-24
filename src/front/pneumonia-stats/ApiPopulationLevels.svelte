<script>
    import { onMount } from "svelte";
    import Highcharts from "highcharts";
    import {Navbar, Nav, NavItem, NavLink, NavbarBrand, Dropdown, DropdownToggle, DropdownMenu, DropdownItem,Button} from 'sveltestrap';

    //const delay=ms=>new Promise(res=>setTimeout(res,ms));

    let population_levels=[];
    let pneumonias=[];
    let country=[];
    let year=[];
    let ages_zero_fifty=[];
    let ages_fifty_seventy=[];
    let ages_seventy=[];
    let death_rate=[];
    let life_expectancy_birth=[];
    let birth_rate=[];
    let datosOrdenados=[];

    async function getData(){
        console.log("Fetching pneumonia y population_levels....");
        const res1 = await fetch("https://sos2122-10.herokuapp.com/api/v2/population-levels");
        const res2= await fetch("/api/v1/pneumonia-stats");
        if(res1.ok && res2.ok){
            const data1 = await res1.json();
            const data2 = await res2.json();          
            population_levels = data1;
            console.log("Ordenadas correctamente");
            population_levels.forEach(population_level => {
                year.push(population_level.year);
                country.push(population_level.country+"-"+ population_level.year);
                death_rate.push(population_level.death_rate);
                life_expectancy_birth.push(population_level.life_expectancy_birth);
                birth_rate.push(population_level.birth_rate);          
            });
            pneumonias=data2;
            console.log("Recibido: " + pneumonias.length);
            pneumonias.forEach(pneumonia=>{
                ages_zero_fifty.push(pneumonia.ages_zero_fifty);
                ages_fifty_seventy.push(pneumonia.ages_fifty_seventy);
                ages_seventy.push(pneumonia.ages_seventy);
            });    
            
        }else{
            console.log("Error, can`t charge data");
        }
    }
    

    async function loadGraph() {
        Highcharts.chart('container', {
        chart: {
            plotBackgroundColor: null,
            plotBorderWidth: null,
            plotShadow: false,
            type: 'pie'
        },
        title: {
            text: 'Browser market shares in January, 2018'
        },
        tooltip: {
            pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>'
        },
        accessibility: {
            point: {
            valueSuffix: '%'
        }
        },
        plotOptions: {
            pie: {
                allowPointSelect: true,
                cursor: 'pointer',
                dataLabels: {
                    enabled: true,
                    format: '<b>{point.name}</b>: {point.percentage:.1f} %'
                }
            }
        },
        series: [{
            name: country,
            colorByPoint: true,
            data: [{
                name: 'ages_zero_fifty',
                data:ages_zero_fifty,
                sliced: true,
                selected: true
            }, {
                name: 'ages_fifty_seventy',
                data:ages_fifty_seventy
            }, {
                name: 'ages_seventy',
                data:ages_seventy
            }, {
                name: 'death_rate',
                data:death_rate
            }, {
                name: 'life_expectancy_birth',
                data:life_expectancy_birth
            }, {
                name: 'birth_rate',
                data:birth_rate
            }]
        }]
        });
    }
    onMount(getData);
</script>

<svelte:head>
    <script src="https://code.highcharts.com/highcharts.js" on:load="{loadGraph}"></script>
    <script src="https://code.highcharts.com/modules/exporting.js" on:load="{loadGraph}"></script>
    <script src="https://code.highcharts.com/modules/export-data.js" on:load="{loadGraph}"></script>
    <script src="https://code.highcharts.com/modules/accessibility.js" on:load="{loadGraph}"></script>
</svelte:head>

<main>
    <Navbar style="background-color: #6EAA8D; color:white;" light expand="lg" >
		<NavbarBrand href="#/info">INICIO</NavbarBrand>
		<Nav navbar>
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
                  <DropdownItem divider/>
				  <DropdownItem href="./#/Pneumonia-stats">Pneumonia FRONT_END</DropdownItem>
                  <DropdownItem divider/>
				  <DropdownItem href="#/air-pollution-stats">AirPollution FRONT-END</DropdownItem>
				</DropdownMenu>
			  </Dropdown>
			  
			  <Dropdown >
				<DropdownToggle nav caret> Gráficas </DropdownToggle>
				<DropdownMenu end>
				  <DropdownItem href="./#/cancerdeaths-graph">Cancerdeaths-Stats</DropdownItem>
                  <DropdownItem divider/>
				  <DropdownItem href="./#/graphpneumonia">Pneumonia-Stats</DropdownItem>
                  <DropdownItem divider/>
				  <DropdownItem href="#/graphAirPollution">AirPollution-Stats</DropdownItem>
                  <DropdownItem divider/>
                  <DropdownItem href="./#/graph">Grafica comun</DropdownItem>
				</DropdownMenu>
			  </Dropdown>
		</Nav>
	</Navbar>
    <figure class="highcharts-figure">
        <div id="container"></div>
        <p class="highcharts-description">
            Pie charts are very popular for showing a compact overview of a
            composition or comparison. While they can be harder to read than
            column charts, they remain a popular choice for small datasets.
        </p>
    </figure>
    
</main>