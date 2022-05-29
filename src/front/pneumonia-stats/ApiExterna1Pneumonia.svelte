<script>
  import { onMount } from "svelte";
  import {Navbar,Nav,NavItem,NavLink,NavbarBrand,Dropdown,DropdownToggle,DropdownMenu,DropdownItem,Button,} from "sveltestrap";

  let pneumonias = [];
  let datos = [];
  let country = [];
  let year = [];
  let ages_zero_fifty = ["menos de 50 años"];
  let ages_fifty_seventy = ["de 50 a 70 años"];
  let ages_seventy = ["mayores de 70 años"];
  let id = ["id"];
  let first_name=[];

  async function getData() {
    const options = {
      method: "GET",
      headers: {
        "X-RapidAPI-Host": "free-nba.p.rapidapi.com",
        "X-RapidAPI-Key": "c39120aa81msh087d47ca1543c02p1d12abjsnfb5f66461395",
      },
    };
    //cargar los datos

    const datosPneumonia = await fetch("/api/v1/pneumonia-stats/loadInitialData");
    console.log("Fetching pneumonia y datos....");
    const res1 = await fetch('https://free-nba.p.rapidapi.com/players?page=0&per_page=25',options);
    const res2 = await fetch("/api/v1/pneumonia-stats");
    if (res1.ok && res2.ok) {
      const data1 = await res1.json();
      const data2 = await res2.json();
      datos = data1.data;
      console.log(datos);
      console.log("Recibido: " + datos.length);

      datos.forEach(dato =>{
        country.push(dato.first_name);
        //country.push(dato.city);
        id.push(dato.id);
        ages_zero_fifty.push("-");
        ages_fifty_seventy.push("-");
        ages_seventy.push("-");
      });
      
      pneumonias = data2;
      console.log("Recibido: " + pneumonias.length);
      pneumonias.forEach(pneumonia => {
        //year.push(pneumonia.year);
        country.push(pneumonia.country + "-" + pneumonia.year);
        ages_zero_fifty.push(pneumonia.ages_zero_fifty);
        ages_fifty_seventy.push(pneumonia.ages_fifty_seventy);
        ages_seventy.push(pneumonia.ages_seventy);
        id.push("-");
      });
    } else {
      console.log("Error, can`t charge data");
    }
    loadGraph();
  }

  async function loadGraph() {
    var chart = bb.generate({
      data: {
        columns: [
          ["data1", 30],
          ["data2", 120],
        ],
        type: "bar", 
      },
      axis: {
            x: {
                type: "category",
                categories: country,
                tick: {
                  rotate: -65,
        multiline: false,
        tooltip: true
      },
      height: 130
            },
        },
      bindto: "#pieChart",
    });

    setTimeout(function () {
      chart.load({
        columns: [
          ages_zero_fifty,
          ages_fifty_seventy,
          ages_seventy,
          id
        ]
      });
    }, 1500);

    setTimeout(function () {
      chart.unload({ ids: "data1" });
      chart.unload({ ids: "data2" });
    }, 2500);
  }

  onMount(getData);
</script>

<svelte:head>
  <script type="text/javascript" src="https://d3js.org/d3.v6.min.js"></script>
  <link rel="stylesheet" href="./jssss/billboard.js/dist/billboard.css" />
  <link rel="stylesheet" href="./jssss/billboard.js/dist/theme/insight.css" />
  <script
    type="text/javascript"
    src="/jssss/billboard.js/dist/billboard.js"></script>
</svelte:head>

<main>
  <Navbar style="background-color: #6EAA8D; color:white;" light expand="lg">
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
  <br />
  <div id="pieChart" />
  <br />
  <br />
  
</main>
