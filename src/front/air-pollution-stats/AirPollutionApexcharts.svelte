<script>
    import {onMount} from 'svelte';
    import {Navbar, Nav, NavItem, NavLink, NavbarBrand, Dropdown, DropdownToggle, DropdownMenu, DropdownItem,Button} from 'sveltestrap';

    const delay = ms => new Promise(res => setTimeout(res,ms));
    let stats = [];
    let country = [];
    let year = [];
    let ages_seventy = [];
    let ages_fifty_seventy = []; 
    let ages_zero_fifty = [];
    async function getStats(){
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
          await delay(500);
          loadGraph();
      }else{
          console.log("Error cargando los datos");
      }
    }
    async function loadGraph(){
      var options = {
        
        series: [{
            name: 'Mayores de 70 años',
        data: ages_seventy
        }, {
            name: 'Entre 50 y 70 años',
        data: ages_fifty_seventy
        }, {
            name:'Menores de 50 años',
        data: ages_zero_fifty
        }],
        chart: {
        height: 350,
        type: 'area'
        },
        dataLabels: {
          enabled: false
        },
        stroke: {
          curve: 'smooth'
        },
        xaxis: {
          type: 'País-Año',
          categories: country
        },
        yAxis: {
          title: {
              text: 'Valor'
          }
        },
        
      };
      var chart = new ApexCharts(document.querySelector("#chart"), options);
      chart.render();
    }
    onMount(getStats);
    
</script>

<svelte:head>
    <script src="https://cdn.jsdelivr.net/npm/apexcharts"></script>
    <script type="text/javascript" src="https://cdn.jsdelivr.net/npm/chart.js@3.7.1/dist/chart.min.js"></script>
    <link rel="stylesheet" type="text/css" href="css/style.css">
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
    <h2>Public air pollution stats by country and year</h2>
    <h4>Biblioteca: ApexChart.js</h4>
    <div id='chart'></div>
</main>

<style>
#chart {
  width: 90%;
  margin: 35px auto;
  border: 1px solid black;
}
h2{
  text-align: center;
}
h4{
  text-align: center;
}
</style>