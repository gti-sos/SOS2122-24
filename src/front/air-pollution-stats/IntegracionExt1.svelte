<script>
 
    import { onMount } from 'svelte';
       import * as c3 from "c3";
       import {Navbar, Nav, NavItem, NavLink, NavbarBrand, Dropdown, DropdownToggle, DropdownMenu, DropdownItem} from 'sveltestrap';
       
       let stats = [];
       let stats1=[];
           let country= [];
           let year = [];
           let ages_fifty_seventy = ["ages_fifty_seventy"];
           let cas =["cases"];
           async function getData(){
               console.log("Fetching stats....");
               const res = await fetch("/api/v1/air-pollution-stats");
               const res1= await fetch("https://disease.sh/v2/countries")
               if(res.ok&&res1.ok){
                   const data = await res.json();
                   const data1= await res1.json();
                   stats = data;
                   console.log("Estadísticas recibidas: "+stats.length);
                   //inicializamos los arrays para mostrar los datos
                   stats.forEach(stat => {
                       country.push(stat.country+"-"+stat.year);  
                       ages_fifty_seventy.push(stat.ages_fifty_seventy);
                       cas.push(0);
                   });
                  
                   stats1 = data1;
                   console.log(stats1);
                   console.log("Estadísticas recibidas: "+stats1.length);
                   //inicializamos los arrays para mostrar los datos
                   
                 for(var i=0;i<=1;i++){
                   
                       country.push(stats1[i].country);
                       cas.push(stats1[i].cases);
                       ages_fifty_seventy.push(0);
       
                   };
               loadGraph();
           } else {
               console.log("Error cargando los datos");
           }
       }
       
       async function loadGraph(){
           var chart= c3.generate({
                   bindto: '#chart',
       data: {
           
           columns: [
            ages_fifty_seventy,
               cas,
              
           ],
           type: 'scatter'
       },
       axis:{
           x:{
               type:'category',
               categories:country
       
           }
           }
   });
       }
              
   
          
       onMount(getData);
       </script>
       <svelte:head>
           <link rel="stylesheet" href="./c3/c3.css"  >
   
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
       
        <div id="chart"></div>
              <figure>
                  Integración externa 1
              </figure>
             
           
       </main>