<script>
    import * as c3 from "c3";

    import { onMount } from 'svelte';
    import {Navbar, Nav, NavItem, NavLink, NavbarBrand, Dropdown, DropdownToggle, DropdownMenu, DropdownItem,Button} from 'sveltestrap';
    const delay = ms => new Promise(res => setTimeout(res, ms));

    let year = [];
    let country = [];
    let ages_zero_fifty = ["ages_zero_fifty"];
    let ages_fifty_seventy = ["ages_fifty_seventy"];
    let ages_seventy = ["ages_seventy"];
    let datos = []; 
    let datosOrdenados = [];   
    //creo 2 let datos para poder ordenado los datos por año

    async function getData(){
        console.log("Fetching cancerdeaths....");
        const res = await fetch("/api/v1/cancerdeaths-stats");
        if(res.ok){
            const data = await res.json();          
            datos = data;
            //si no tenemos ningun dato cargado, cargamos los datos iniciales, si tiene datos los obtiene sin cargar los iniciales
            if (datos.length == 0) {
                const res = await fetch("/api/v1/cancerdeaths-stats/loadInitialData");
                console.log("Entradas recibidas: "+datos.length);
            //con la siguiente funcion ordeno los datos por años de menor a mayor
            datosOrdenados = datos.sort(function (a, b){
            return (a.year - b.year)
            });
            console.log("Ordenadas correctamente");
            datosOrdenados.forEach(dato => {
                year.push(dato.year);
                country.push(dato.country+"-"+dato.year);
                ages_zero_fifty.push(dato.ages_zero_fifty);
                ages_fifty_seventy.push(dato.ages_fifty_seventy);
                ages_seventy.push(dato.ages_seventy);          
            });
            location.reload();
            }
            else{
               console.log("Entradas recibidas: "+datos.length);
            //con la siguiente funcion ordeno los datos por años de menor a mayor
            datosOrdenados = datos.sort(function (a, b){
            return (a.year - b.year)
            });
            console.log("Ordenadas correctamente");
            datosOrdenados.forEach(dato => {
                year.push(dato.year);
                country.push(dato.country+"-"+dato.year);
                ages_zero_fifty.push(dato.ages_zero_fifty);
                ages_fifty_seventy.push(dato.ages_fifty_seventy);
                ages_seventy.push(dato.ages_seventy);            
            }); 
            }
            
        }else{
            console.log("Error, can`t charge data");
		}
        loadGraph();
    }

    async function loadGraph(){
        var chart = c3.generate({
            title: {
                text: 'Grafica de muertes producidad por cancer - Source: https://ourworldindata.org/cancer#deaths-from-cancer',
                
            },
            
            
    data: {
        
        columns: [
            ages_zero_fifty,
            ages_fifty_seventy,
            ages_seventy
        ],
        type: 'bar'
    },
    bar: {
        width: {
            ratio: 0.5 // this makes bar width 50% of length between ticks
        }
        // or
        //width: 100 // this makes bar width 100px
    },
    axis: {
        x: {
            type: 'category',
            categories: country
        }
}
});
    }  
    onMount(getData); 
</script>

<svelte:head>
   
 <!-- Load c3.css -->
 <link rel="stylesheet" href="./jscd/c3/c3.css"  >



</svelte:head>

<main>
    
    
    <!--barra de navegacion-->
	<Navbar style="background-color: #6EAA8D; color:white;" light expand="lg" >
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
		</Nav>
	</Navbar>
	<!---->
    <br>
    
    <div id="chart"></div>
</main>