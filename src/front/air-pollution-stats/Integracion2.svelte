<script>
    import { onMount } from 'svelte';
    import {Navbar, Nav, NavItem, NavLink, NavbarBrand, Dropdown, DropdownToggle, DropdownMenu, DropdownItem} from 'sveltestrap';
    let apiData = {};
    const delay = ms => new Promise(res => setTimeout(res,ms));
    let stats = [];
    let stats1 = [];
    let datafinal =[];
    let country= [];
    let ages_seventy= [];
    let ages_fifty_seventy = [];
    let ages_zero_fifty = [];
    let total_debt = [];
    let debt_gdp = [];
    let per_capita_debt = [];
        
        
    async function getData(){
            console.log("Fetching stats....");
            const res = await fetch("/api/v1/air-pollution-stats");
            const res1= await fetch("/DeudaApi");
            if(res.ok&&res1.ok){
                const data = await res.json();
                const data1= await res1.json();
                stats = data;
                console.log("Estadísticas recibidas: "+stats.length);
                //inicializamos los arrays para mostrar los datos
                stats.forEach(stat => {
                    country.push(stat.country+"-"+stat.year);
                    
                    ages_seventy.push(stat["ages_seventy"]);
                    ages_fifty_seventy.push(stat["ages_fifty_seventy"]);
                    ages_zero_fifty.push(stat["ages_zero_fifty"]);
                    total_debt.push(0);
                    debt_gdp.push(0);
                    per_capita_debt.push(0);
                              
                });
                stats1 = data1;
                console.log("Estadísticas recibidas: "+stats1.length);
                //inicializamos los arrays para mostrar los datos
                stats1.forEach(stat => {
                    country.push(stat.country+"-"+stat.year);
                    
                    total_debt.push(stat["total_debt"]);
                    debt_gdp.push(stat["debt_gdp"]);
                    per_capita_debt.push(stat["per_capita_debt"]);
                    ages_seventy.push(0);
                    ages_fifty_seventy.push(0);
                    ages_zero_fifty.push(0); 
                });
            }else{
                console.log("Error cargando los datos");

            }
            loadGraph();
        }
        async function loadGraph(){
        var trace_pe_to_gdp = {
            x: country,
            y: ages_fifty_seventy,
            type: 'scatter',
            name: 'Entre 50 y 70 años'
        };
        var trace_pe_on_defence = {
            x: country,
            y: ages_seventy,
            type: 'scatter',
            name: 'Mayores de 70 años)'
        };
        var trace_PE = {
            x: country,
            y: ages_zero_fifty,
            type: 'scatter',
            name: 'Menores de 50 años'
        };
        var a = {
            x: country,
            y: total_debt,
            type: 'scatter',
            name: 'Deuda publica total'
        };
        var b = {
            x: country,
            y: debt_gdp,
            type: 'scatter',
            name: 'Deuda publica respecto al PIB'
        };
        var c = {
            x: country,
            y: per_capita_debt,
            type: 'scatter',
            name: 'Deuda publica per cápita'
        };
        var dataPlot = [trace_pe_on_defence, trace_pe_to_gdp, trace_PE, a, b, c];
        Plotly.newPlot('myDiv', dataPlot);
        
 
    }
    onMount(getData);
    
</script>

<svelte:head>
    <script src='https://cdn.plot.ly/plotly-2.11.1.min.js'></script>
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
    <h2>Integracion2</h2>
    <h4>Biblioteca: Plotly</h4>
    <div id='myDiv'><!-- Plotly chart will be drawn inside this DIV --></div>
</main>

<style>
    h2{
        text-align: center;
    }
    h4{
        text-align: center;
    }
</style>