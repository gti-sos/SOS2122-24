<script>
    import { onMount } from "svelte";
    import {Navbar, Nav, NavItem, NavLink, NavbarBrand, Dropdown, DropdownToggle, DropdownMenu, DropdownItem,Button} from 'sveltestrap';

    const delay=ms=>new Promise(res=>setTimeout(res,ms));

    let pneumonias=[];
    let country=[];
    let year=[];
    let ages_zero_fifty=[];
    let ages_fifty_seventy=[];
    let ages_seventy=[];
    let datosOrdenados=[];

    async function getData(){
        console.log("Fetching pneumonia....");
        const res = await fetch("/api/v1/pneumonia-stats");
        if(res.ok){
            const data = await res.json();          
            pneumonias = data;
            if (pneumonias.length == 0) {
                const res = await fetch("/api/v1/pneumonia-stats/loadInitialData");
                console.log("Entradas recibidas: "+pneumonias.length);
            //con la siguiente funcion ordeno los datos por años de menor a mayor
            datosOrdenados = pneumonias.sort(function (a, b){
            return (a.year - b.year)
            });
            console.log("Ordenadas correctamente");
            datosOrdenados.forEach(pneumonia => {
                year.push(pneumonia.year);
                country.push(pneumonia.country+"-"+ pneumonia.year);
                ages_zero_fifty.push(pneumonia.ages_zero_fifty);
                ages_fifty_seventy.push(pneumonia.ages_fifty_seventy);
                ages_seventy.push(pneumonia.ages_seventy);          
            });
            location.reload();
            }
            else{
               console.log("Entradas recibidas: "+pneumonias.length);
            //con la siguiente funcion ordeno los datos por años de menor a mayor
            datosOrdenados = pneumonias.sort(function (a, b){
            return (a.year - b.year)
            });
            console.log("Ordenadas correctamente");
            datosOrdenados.forEach(pneumonia => {
                year.push(pneumonia.year);
                country.push(pneumonia.country+"-"+pneumonia.year);
                ages_zero_fifty.push(pneumonia.ages_zero_fifty);
                ages_fifty_seventy.push(pneumonia.ages_fifty_seventy);
                ages_seventy.push(pneumonia.ages_seventy);            
            }); 
            }
            
        }else{
            console.log("Error, can`t charge data");
        }
    }
    

    async function loadGraph() {
        Highcharts.chart("container", {
            chart: {
                type: "column",
            },
            title: {
                text: "Muertes por neumonia",
            },
            subtitle: {
                text: "Source: https://ourworldindata.org/pneumonia",
            },
            xAxis: {
                categories: country,
                crosshair: true
            },
            yAxis: {
                min: 0,
                title: {
                    text: "Muertes por neumonia",
                },
            },
            tooltip: {
                headerFormat:
                    '<span style="font-size:10px">{point.key}</span><table>',
                pointFormat:
                    '<tr><td style="color:{series.color};padding:0">{series.name}: </td>' +
                    '<td style="padding:0"><b>{point.y} muertes</b></td></tr>',
                footerFormat: "</table>",
                shared: true,
                useHTML: true,
            },
            plotOptions: {
                column: {
                    pointPadding: 0.2,
                    borderWidth: 0,
                },
            },
            series: [
                {
                name: 'Mayores de 70 años',
                data: ages_seventy
                },
                {
                name: 'De 50 a 70 años',
                data: ages_fifty_seventy
                },
                {
                name: 'Menores de 50 años',
                data: ages_zero_fifty
                
                }
                
            ]
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
		</Nav>
	</Navbar>
    <figure class="highcharts-figure">
        <div id="container" />
        <p class="highcharts-description">
            Este gráfico compara los valores de muertes por neumonia en distintas edades
    </figure>
</main>
