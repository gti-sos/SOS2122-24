<script>
    import { onMount } from 'svelte';
    import {Navbar, Nav, NavItem, NavLink, NavbarBrand, Dropdown, DropdownToggle, DropdownMenu, DropdownItem} from 'sveltestrap';
    let apiData = {};
    const delay = ms => new Promise(res => setTimeout(res,ms));
        let stats = [];
        let stats1=[];
        let country= [];
        let ages_seventy = [];
        let ages_fifty_seventy = [];
        let ages_zero_fifty = []; 
        let quantity = [];
        let relative_change = [];
        let absolute_change = [];
        async function getData(){
            console.log("Fetching stats....");
            const res = await fetch("/api/v1/air-pollution-stats");
            const res1= await fetch("https://sos2122-20.herokuapp.com/api/v1/fertilizers-stats")
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
                    quantity.push(0);
                    relative_change.push(0);
                    absolute_change.push(0);
                              
                });
                stats1 = data1;
                console.log("Estadísticas recibidas: "+stats1.length);
                //inicializamos los arrays para mostrar los datos
                stats1.forEach(stat => {
                    country.push(stat.country+"-"+stat.year);
              
                    quantity.push(stat["quantity"]);
                    relative_change.push(stat["relative_change"]);
                    absolute_change.push(stat["absolute_change"]); 
                    ages_seventy.push(0);
                    ages_fifty_seventy.push(0);
                    ages_zero_fifty.push(0);
                });
            }else{
                console.log("Error cargando los datos");
            }
            loadGraph();
        }
    async function loadGraph() {
        var ctx = document.getElementById("myChart").getContext("2d");
        var trace_olympic_gold_medals = new Chart(ctx, {
            type: "radar",
            data: {
                labels: country,
                datasets: [
                    {
                        label: "Cantidad",
                        backgroundColor: "rgb(0, 128, 128)",
                        borderColor: "rgb(255, 255, 255)",
                        data: quantity,
                    },
                    {
                        label: "Valor absoluto",
                        backgroundColor: "#FFFF00",
                        borderColor: "#FFFF00",
                        data: relative_change,
                    },
                    {
                        label: "Valor relativo",
                        backgroundColor: "#FF0000",
                        borderColor: "#FF0000",
                        data: absolute_change,
                    },
                    {
                        label: "Mayores de 70 años",
                        backgroundColor: "#0000FF",
                        borderColor: "#0000FF",
                        data: ages_seventy,
                    },
                    {
                        label: "Entre 50 y 70 años",
                        backgroundColor: "#008000",
                        borderColor: "#008000",
                        data: ages_fifty_seventy,
                    },
                    {
                        label: "Menores de 50 años",
                        backgroundColor: "#ff8000",
                        borderColor: "#ff8000",
                        data: ages_zero_fifty,
                    },
                ],
            },
            options: {
                responsive: true,
                plugins: {
                    legend: {
                        position: 'top',
                    },
                }
            },
        });
       
       
    }
    onMount(getData);
</script>

<svelte:head>
    <script
        src="https://cdn.jsdelivr.net/npm/chart.js"
        on:load={loadGraph}></script>
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
    <h2>Integracion1</h2>
  

    <canvas id="myChart" />

</main>

<style>
    h2 {
        text-align: center;
    }
</style>