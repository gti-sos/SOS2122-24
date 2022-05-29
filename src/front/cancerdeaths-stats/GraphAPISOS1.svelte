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
    var x = [];
    //creo 2 let datos para poder ordenado los datos por año

    let grazing_area2 = ["grazing_area"];
    let built_area2 = ["built_area"];
    let cropland_area2 = ["cropland_area"]; 
    let datos2 = []; 
    let datosOrdenados2 = []; 

    async function getData(){
        console.log("Fetching cancerdeaths....");
        const res = await fetch("/api/v1/cancerdeaths-stats");
        console.log("Fetching stats....");
        const res2 = await fetch("/remoteAPISOS1");
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
                country.push(dato.country+"-"+dato.year);
                ages_zero_fifty.push(dato.ages_zero_fifty);
                ages_fifty_seventy.push(dato.ages_fifty_seventy);
                ages_seventy.push(dato.ages_seventy);
                grazing_area2.push(0);
                    built_area2.push(0);
                    cropland_area2.push(0); 
                          
            });
            
            }
            else{
               console.log("Entradas recibidas: "+datos.length);
            //con la siguiente funcion ordeno los datos por años de menor a mayor
            datosOrdenados = datos.sort(function (a, b){
            return (a.year - b.year)
            });
            console.log("Ordenadas correctamente");
            datosOrdenados.forEach(dato => {
                country.push(dato.country+"-"+dato.year);
                ages_zero_fifty.push(dato.ages_zero_fifty);
                ages_fifty_seventy.push(dato.ages_fifty_seventy);
                ages_seventy.push(dato.ages_seventy); 
                grazing_area2.push(0);
                    built_area2.push(0);
                    cropland_area2.push(0); 
                   
                        
            }); 
            }
            
        }else{
            console.log("Error, can`t charge data");
		}
        // api externa
        if(res2.ok){
            const data2 = await res2.json();          
            datos2 = data2;
            //si no tenemos ningun dato cargado, cargamos los datos iniciales, si tiene datos los obtiene sin cargar los iniciales
            if (datos2.length == 0) {
                const res2 = await fetch("/remoteAPISOS1/loadInitialData");
                console.log("Entradas recibidas: "+datos.length);
            //con la siguiente funcion ordeno los datos por años de menor a mayor
            datosOrdenados2 = datos2.sort(function (a, b){
            return (a.year - b.year)
            });
            console.log("Ordenadas correctamente");
            datosOrdenados2.forEach(stat => {
                if (country.includes(stat.country+"-"+stat.year)){
                  x = country.indexOf(stat.country+"-"+stat.year);
                  grazing_area2.splice(x+1,1,stat.grazing_area)
                  built_area2.splice(x+1,1,stat.built_area);
                  cropland_area2.splice(x+1,1,stat.cropland_area);

                }else{
                  country.push(stat.country+"-"+stat.year); 
                  grazing_area2.push(stat.grazing_area);
                    built_area2.push(stat.built_area);
                    cropland_area2.push(stat.cropland_area); 
                    ages_fifty_seventy.push(0);
                    ages_seventy.push(0);
                    ages_zero_fifty.push(0);
                };        
            });
            
            }
            else{
               console.log("Entradas recibidas: "+datos2.length);
            //con la siguiente funcion ordeno los datos por años de menor a mayor
            datosOrdenados2 = datos2.sort(function (a, b){
            return (a.year - b.year)
            });
            console.log("Ordenadas correctamente");
            datosOrdenados2.forEach(stat => {
                //country.push(stat.country+"-"+stat.year); 
                if (country.includes(stat.country+"-"+stat.year)){
                  x = country.indexOf(stat.country+"-"+stat.year);
                  grazing_area2.splice(x+1,1,stat.grazing_area)
                  built_area2.splice(x+1,1,stat.built_area);
                  cropland_area2.splice(x+1,1,stat.cropland_area);
                }else{
                  country.push(stat.country+"-"+stat.year); 
                  grazing_area2.push(stat.grazing_area);
                    built_area2.push(stat.built_area);
                    cropland_area2.push(stat.cropland_area); 
                    ages_fifty_seventy.push(0);
                    ages_seventy.push(0);
                    ages_zero_fifty.push(0);
                };                      
            });
            }
            
        }else{
            console.log("Error, can`t charge data");
		}
        loadGraph();
    }

    async function loadGraph(){
        var chart = c3.generate({
            
    data: {
        
        columns: [
            ages_zero_fifty,
            ages_fifty_seventy,
            ages_seventy,
            grazing_area2,
            built_area2,
            cropland_area2
        ],
        type: 'area'
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
    <p style="text-align:center ;">Grafica de muertes producidad por cancer e integración SOS-1 - Source: https://ourworldindata.org/cancer#deaths-from-cancer</p>
    <div id="chart"></div>
</main>