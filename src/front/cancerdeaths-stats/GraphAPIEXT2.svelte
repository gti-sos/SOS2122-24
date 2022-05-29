<script>
    const options = {
	method: 'GET',
	headers: {
		'X-RapidAPI-Host': 'amazon-data-scraper58.p.rapidapi.com',
		'X-RapidAPI-Key': 'eca9d9dcb9mshdd4d65d4646bc18p192490jsn55ba9c868f8c'
	}
};

    import { onMount } from "svelte";
    import {
        Navbar,
        Nav,
        NavItem,
        NavLink,
        NavbarBrand,
        Dropdown,
        DropdownToggle,
        DropdownMenu,
        DropdownItem,
        Button,
    } from "sveltestrap";
    const delay = (ms) => new Promise((res) => setTimeout(res, ms));

    let country = [];
    let ages_zero_fifty = [];
    let ages_fifty_seventy = [];
    let ages_seventy = [];
    let datos = [];
    let datosOrdenados = [];
    var x = [];
    //creo 2 let datos para poder ordenado los datos por año

    let precio = [];
    let estrellas = [];
    let datos2 = [];

  

    async function getData() {
        console.log("Fetching cancerdeaths....");
        const res = await fetch("/api/v1/cancerdeaths-stats");
        console.log("Fetching stats....");
        const res2 = await fetch('https://amazon-data-scraper58.p.rapidapi.com/search/apple', options);
        if (res.ok) {
            const data = await res.json();
            datos = data;
            //si no tenemos ningun dato cargado, cargamos los datos iniciales, si tiene datos los obtiene sin cargar los iniciales
            if (datos.length == 0) {
                const res = await fetch(
                    "/api/v1/cancerdeaths-stats/loadInitialData"
                );
                console.log("Entradas recibidas: " + datos.length);
                //con la siguiente funcion ordeno los datos por años de menor a mayor
                datosOrdenados = datos.sort(function (a, b) {
                    return a.year - b.year;
                });
                console.log("Ordenadas correctamente");
                datosOrdenados.forEach((dato) => {
                    country.push(dato.country + "-" + dato.year);
                    ages_zero_fifty.push(dato.ages_zero_fifty);
                    ages_fifty_seventy.push(dato.ages_fifty_seventy);
                    ages_seventy.push(dato.ages_seventy);
                    precio.push("-");
                    estrellas.push("-");
                });
            } else {
                console.log("Entradas recibidas: " + datos.length);
                //con la siguiente funcion ordeno los datos por años de menor a mayor
                datosOrdenados = datos.sort(function (a, b) {
                    return a.year - b.year;
                });
                console.log("Ordenadas correctamente");
                datosOrdenados.forEach((dato) => {
                    country.push(dato.country + "-" + dato.year);
                    ages_zero_fifty.push(dato.ages_zero_fifty);
                    ages_fifty_seventy.push(dato.ages_fifty_seventy);
                    ages_seventy.push(dato.ages_seventy);
                    precio.push("-");
                    estrellas.push("-");
                });
            }
        } else {
            console.log("Error, can`t charge data");
        }
        // api externa
        if (res2.ok) {
            const data2 = await res2.json();
            datos2 = data2.results;
            console.log(datos2);            
                console.log("Entradas recibidas: " + datos2.length);                

                datos2.forEach((stat) => {
                        country.push(stat.name.substring(0, 25));
                        ages_fifty_seventy.push("-");
                        ages_seventy.push("-");
                        ages_zero_fifty.push("-");
                        precio.push(stat.price);
                        estrellas.push(stat.stars*100);                             
                });
            
        } else {
            console.log("Error, can`t charge data");
        }
        loadGraph();
    }

    async function loadGraph() {
        var ctx = document.getElementById("myChart").getContext("2d");
        var trace_consumption = new Chart(ctx, {
            type: "bar",
            data: {
                labels: country,
                
                datasets: [
                    {
                        label: "ages_fifty_seventy",
                        borderColor: "rgba(255, 99, 132, 0.2)",
                        backgroundColor: "rgba(255, 99, 132, 1)",
                        data: ages_fifty_seventy,
                    },
                    {
                        label: "ages_seventy",
                        backgroundColor: "#bc98f3",
                        borderColor: "#bc98f3",
                        data: ages_seventy,
                    },
                    {
                        label: "ages_zero_fifty",
                        backgroundColor: "#bdecb6",
                        borderColor: "#bdecb6",
                        data: ages_zero_fifty,
                    },
                    {
                        label: "Price",
                        backgroundColor: "#0049FF",
                        borderColor: "#0049FF",
                        data: precio,
                    },
                    {
                        label: "Stars",
                        backgroundColor: "#FF9E00",
                        borderColor: "#FF9E00",
                        data: estrellas,
                    },
                    
                ],
            },
            
            options: {
                scales: {
            xAxes: [{
                ticks: {
                    autoSkip: false,
                    maxRotation: 90,
                    minRotation: 90
                }
            }]
        },
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
    <!-- Load c3.css -->
    <script
    src="https://cdnjs.cloudflare.com/ajax/libs/Chart.js/2.4.0/Chart.min.js"
    ></script>
</svelte:head>

<main>
    <!--barra de navegacion-->
    <Navbar style="background-color: #6EAA8D; color:white;" light expand="lg">
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
				  <DropdownItem divider/>
				  <DropdownItem href="./#/graph">Gráfica común</DropdownItem>
				</DropdownMenu>
			  </Dropdown>
        </Nav>
    </Navbar>
    <!---->
    <br />
    <p style="text-align:center ;">Grafica de muertes producidad por cancer y precio y rating Amazon - Source: https://ourworldindata.org/cancer#deaths-from-cancer</p>
    <div style="margin-left: 12%;max-width: 75%;">

        <canvas id="myChart" ></canvas>
    </div>
</main>
