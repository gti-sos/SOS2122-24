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
  let city=[];

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
        //city.push(dato.city);
        //country.push(city);
        id.push(dato.id);
      });
      
      pneumonias = data2;
      console.log("Recibido: " + pneumonias.length);
      pneumonias.forEach(pneumonia => {
        //year.push(pneumonia.year);
        country.push(pneumonia.country + "-" + pneumonia.year);
        ages_zero_fifty.push(pneumonia.ages_zero_fifty);
        ages_fifty_seventy.push(pneumonia.ages_fifty_seventy);
        ages_seventy.push(pneumonia.ages_seventy);
        id.push(0);
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
          categories: country
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
      <Dropdown>
        <DropdownToggle nav caret>API</DropdownToggle>
        <DropdownMenu end>
          <DropdownItem href="./api/v1/cancerdeaths-stats"
            >Cancerdeaths-Stats</DropdownItem
          >
          <DropdownItem divider />
          <DropdownItem href="./api/v1/pneumonia-stats"
            >Pneumonia-Stats</DropdownItem
          >
          <DropdownItem divider />
          <DropdownItem href="./api/v1/air-pollution-stats"
            >Airpollution-Stats</DropdownItem
          >
        </DropdownMenu>
      </Dropdown>

      <Dropdown>
        <DropdownToggle nav caret>FRONT-END</DropdownToggle>
        <DropdownMenu end>
          <DropdownItem href="./#/Cancerdeaths-stats"
            >Cancerdeaths FRONT-END</DropdownItem
          >
          <DropdownItem divider />
          <DropdownItem href="./#/Pneumonia-stats"
            >Pneumonia FRONT_END</DropdownItem
          >
          <DropdownItem divider />
          <DropdownItem href="#/air-pollution-stats"
            >AirPollution FRONT-END</DropdownItem
          >
        </DropdownMenu>
      </Dropdown>

      <Dropdown>
        <DropdownToggle nav caret>Gráficas</DropdownToggle>
        <DropdownMenu end>
          <DropdownItem href="./#/cancerdeaths-graph"
            >Cancerdeaths-Stats</DropdownItem
          >
          <DropdownItem divider />
          <DropdownItem href="./#/graphpneumonia">Pneumonia-Stats</DropdownItem>
          <DropdownItem divider />
          <DropdownItem href="#/graphAirPollution"
            >AirPollution-Stats</DropdownItem
          >
          <DropdownItem divider />
          <DropdownItem href="./#/graph">Grafica comun</DropdownItem>
        </DropdownMenu>
      </Dropdown>
    </Nav>
  </Navbar>
  <br />
  <div id="pieChart" />
  <br />
  <br />
  <p>
    Este grafico compara las muertes por neumonia en distintos rangos de edades
    y el estudio de la poblacion en la actualidad
  </p>
</main>
