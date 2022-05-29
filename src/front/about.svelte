<script>  
	import {Navbar, Nav, NavItem, NavLink, NavbarBrand, Dropdown, DropdownToggle, DropdownMenu, DropdownItem,Button} from 'sveltestrap';
</script>


<body><Navbar style="background-color: #6EAA8D; color:white;" light expand="lg" >
	<NavbarBrand href="#/info">INICIO</NavbarBrand>
	<Nav navbar>

		<Dropdown >
			<DropdownToggle nav caret> Raúl </DropdownToggle>
			<DropdownMenu end>
				<DropdownItem ><h7>FRONT-END</h7></DropdownItem>
				<DropdownItem divider/>
				<DropdownItem href="./#/Cancerdeaths-stats">Cancerdeaths FRONT-END</DropdownItem>
				<DropdownItem divider style="border-color:black;"/>
				<DropdownItem ><h7>API</h7></DropdownItem>
				<DropdownItem divider/>
				<DropdownItem href="./api/v1/cancerdeaths-stats">Cancerdeaths-Stats-API</DropdownItem>
				<DropdownItem divider/>
				<DropdownItem href="./api/v2/cancerdeaths-stats">Cancerdeaths-Stats-V2-API</DropdownItem>
			  <DropdownItem divider style="border-color:black;"/>
			  <DropdownItem ><h7>Graficas</h7></DropdownItem>
				<DropdownItem divider/>
			  <DropdownItem href="./#/cancerdeaths-graph">Cancerdeaths-Stats</DropdownItem>
			  <DropdownItem divider/>
			  <DropdownItem href="./#/cancerdeaths-graph-C3">Cancerdeaths-Stats-C3</DropdownItem>
			  <DropdownItem divider/>
			  <DropdownItem href="./#/cancerdeaths-graph-SOS1">Cancerdeaths-Stats-SOS1</DropdownItem>
			  <DropdownItem divider/>
			  <DropdownItem href="./#/cancerdeaths-graph-SOS2">Cancerdeaths-Stats-SOS2</DropdownItem>
			  <DropdownItem divider/>
			  <DropdownItem href="./#/cancerdeaths-graph-EXT1">Cancerdeaths-Stats-EXT1</DropdownItem>
			  <DropdownItem divider/>
			  <DropdownItem href="./#/cancerdeaths-graph-EXT2">Cancerdeaths-Stats-EXT2</DropdownItem>
			  <DropdownItem divider/>
			  <DropdownItem href="./#/cancerdeaths-graph-EXT3">Cancerdeaths-Stats-EXT3</DropdownItem>
			</DropdownMenu>
		  </Dropdown>
		  <Dropdown >
			<DropdownToggle nav caret> Laura </DropdownToggle>
			<DropdownMenu end>
			  <DropdownItem ><h7>FRONT-END</h7></DropdownItem>
			  <DropdownItem divider/>
			  <DropdownItem href="./#/Pneumonia-stats">Pneumonia FRONT_END</DropdownItem>
			  <DropdownItem divider style="border-color:black;"/>
			  <DropdownItem ><h7>API</h7></DropdownItem>
			  <DropdownItem divider/>
			  <DropdownItem href="./api/v1/pneumonia-stats">Pneumonia-Stats-API</DropdownItem>
			  <DropdownItem divider/>
			  <DropdownItem href="./api/v2/pneumonia-stats">Pneumonia-Stats-V2-API</DropdownItem>
			  <DropdownItem divider style="border-color:black;"/>
			  <DropdownItem ><h7>Graficas</h7></DropdownItem>
			  <DropdownItem divider/>
			  <DropdownItem href="./#/graphpneumonia">Pneumonia-Stats</DropdownItem>
			  <DropdownItem divider/>
			  <DropdownItem href="./#/graphbillboard">Pneumonia-Stats-Billboard</DropdownItem>
			  <DropdownItem divider/>
			  <DropdownItem href="./#/graphpopulationlevels">Pneumonia-Stats-PopulationLevels</DropdownItem>
			  <DropdownItem divider/>
			  <DropdownItem href="./#/graphagricultural">Pneumonia-Stats-Agricultural</DropdownItem>
			  <DropdownItem divider/>
			  <DropdownItem href="./#/graphexterna1-pneumonia">Pneumonia-Stats-Externa1</DropdownItem>
			  <DropdownItem divider/>
			  <DropdownItem href="./#/graphexterna2-pneumonia">Pneumonia-Stats-Externa2</DropdownItem>
			  <DropdownItem divider/>
			  <DropdownItem href="./#/graphexterna3-pneumonia">Pneumonia-Stats-Externa3</DropdownItem>
			</DropdownMenu>
			</Dropdown>

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
  </body>
<main>
    <h1>VIDEOS</h1>

	
    <p>- <a href="https://youtu.be/0dVCFjsCvnI">Video</a>(developed by <a href="https://github.com/AliciaCamposCastello">Alicia Campos Castelló</a>)</p>
	<p>- <a href="https://youtu.be/22za4t8aZw4">VIDEO - RAUGOMMOR1</a> (developed by  <a href="https://github.com/Rgm13">Raúl Gómez Morales</a>)</p>
	
    <br>
</main>
<style>
	main {
		text-align: center;
		padding: 1em;
		max-width: 240px;
		margin: 0 auto;
	}
    h1 {
		color: #ff3e00;
		text-transform: uppercase;
		font-size: 4em;
		font-weight: 100;
	}

	@media (min-width: 640px) {
		main {
			max-width: none;
		}
	}
</style>