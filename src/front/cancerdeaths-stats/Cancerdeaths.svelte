<script>
    import {onMount} from 'svelte';
	import Table from 'sveltestrap/src/Table.svelte';
	import Button from 'sveltestrap/src/Button.svelte'; 
	import { Alert } from "sveltestrap";
	import {Navbar, Nav, NavItem, NavLink, NavbarBrand, Dropdown, DropdownToggle, DropdownMenu, DropdownItem} from 'sveltestrap';
	

	let cancerdeaths=[];
	let datos2 = [];
	let offset=0;
	let limit=10;
	let numEntries;

	let from=null;
	let to=null;

	let visibleError = false;
	let visibleMsg = false;
	let errorMsg = "";
	let msg = "";

    let newcancerdeaths={
        country: "",
        year:"",
        ages_zero_fifty:"",
        ages_fifty_seventy:"",
        ages_seventy:""
    }

	onMount(getcancerdeaths);

	async function getcancerdeaths(){
		console.log("fetching cancerdeaths ....");
		let cadena = `/api/v1/cancerdeaths-stats?offset=+${offset}+&limit=+${limit}`;
		if(from !=null){
            cadena=cadena + `&from=${from}&` 
        }
        if(to !=null){
            cadena=cadena + `to=${to}`
        }
		const res= await fetch(cadena);
		
		if(res.ok){
			
			const data= await res.json();
			datos2=data;
			cancerdeaths = datos2.sort(function (a, b){
				return (a.year - b.year);
			});
			numEntries=cancerdeaths.length;
			console.log("Received cancerdeaths: " + cancerdeaths.length);
		}
		else{
			visibleError = true;
					visibleMsg = false;
					msg = "No hay ningún dato entre "+from+" y "+to;
				//window.alert("No hay ningún dato entre estos límites")
			}
	}
	async function getPgAnt() {
		if(offset>=10){

			offset=offset-10;
		}
		//limit=limit+10;
        console.log("fetching cancerdeaths ....");
		let cadena = `/api/v1/cancerdeaths-stats?offset=+${offset}+&limit=+${limit}`;
		if(from !=null){
            cadena=cadena + `&from=${from}&` 
        }
        if(to !=null){
            cadena=cadena + `to=${to}`
        }
		const res= await fetch(cadena);
		if(res.ok){
			const data= await res.json();
			datos2=data;
			cancerdeaths = datos2.sort(function (a, b){
				return (a.year - b.year);
			});
			console.log("Received cancerdeaths: " + cancerdeaths.length);
		}
    }
	async function getPgSig() {
		if(cancerdeaths.length>=10){

			offset=offset+10;
		}
		//limit=limit+10;
        console.log("fetching cancerdeaths ....");
		let cadena = `/api/v1/cancerdeaths-stats?offset=+${offset}+&limit=+${limit}`;
		if(from !=null){
            cadena=cadena + `&from=${from}&` 
        }
        if(to !=null){
            cadena=cadena + `to=${to}`
        }
		const res= await fetch(cadena);
		if(res.ok){
			const data= await res.json();
			datos2=data;
			cancerdeaths = datos2.sort(function (a, b){
				return (a.year - b.year);
			});
			console.log("Received cancerdeaths: " + cancerdeaths.length);
		}
    }
	
	async function insertcancerdeaths(){
		if (newcancerdeaths.country == "" || newcancerdeaths.country == null || newcancerdeaths.year == "" || newcancerdeaths.year == null|| newcancerdeaths.ages_zero_fifty == "" || newcancerdeaths.ages_zero_fifty == null || newcancerdeaths.ages_fifty_seventy == "" || newcancerdeaths.ages_fifty_seventy == null || newcancerdeaths.ages_seventy == "" || newcancerdeaths.ages_seventy == null) {
			visibleError = true;
					visibleMsg = false;
					msg = "Debe de rellenar todos los campos";
         }
		 else{
        console.log("Inserting cancerdeaths...."+JSON.stringify(newcancerdeaths));
        const res = await fetch("/api/v1/cancerdeaths-stats",
			{
				method: "POST",
				body: JSON.stringify(newcancerdeaths),
				headers: {
					"Content-Type": "application/json"
				}
			}).then(function (res){
				if(res.status == 201){
				getcancerdeaths();
				newcancerdeaths.country = null;
					newcancerdeaths.year = null;
					newcancerdeaths.ages_zero_fifty = null;
					newcancerdeaths.ages_fifty_seventy = null;
					newcancerdeaths.ages_seventy = null;
				visibleError = false;
					visibleMsg = true;
					msg = "Entrada introducida con éxito";}
				
				else if(res.status == 409){
                     
					 visibleError = true;
					visibleMsg = false;
					msg = "Ya existe ese recurso en la base de datos";
                     console.log("ERROR There is already a data with that country and year in the database");
                     
                 }
			}); 
    }}
	async function Borrarcancerdeaths(name, year) {
        const res = await fetch("/api/v1/cancerdeaths-stats/"+name+"/"+year, {
            method: "DELETE"
        }).then(function(res) {
           
            getcancerdeaths();      
            if (res.status==200) {
                console.log("Deleted " + name); 
				//window.alert(name + " elimida con éxito"); 
				visibleError = false;
					visibleMsg = true;
					msg = name + " elimida con éxito";				          
            }else  {
                //window.alert(name + " no se ha podida eliminar");
				visibleError = true;
					visibleMsg = flase;
					msg = name + " no se ha podida eliminar";
                console.log("DATA NOT FOUND");            
            
            }      
        });
    }
	async function BorrarcancerdeathsAll(){
        console.log("Deleting cancerdeathss....");
        const res = await fetch("/api/v1/cancerdeaths-stats/",
			{
				method: "DELETE"
			}).then(function (res){
				getcancerdeaths();
				//window.alert("Entradas elimidas con éxito");
				visibleError = false;
					visibleMsg = true;
					msg = "Entradas elimidas con éxito";
			});
    }

	async function Loadcancerdeaths(){
        console.log("Loading cancerdeaths....");
        const res = await fetch("/api/v1/cancerdeaths-stats/loadInitialData",
			{
				method: "GET"
			}).then(function (res){
				getcancerdeaths();
				//window.alert("Entradas cargadas con éxito");
				visibleError = false;
					visibleMsg = true;
					msg = "Entradas cargadas con éxito";
			});
    }
</script>

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
				  <DropdownItem divider/>
				  <DropdownItem href="./#/graph">Gráfica común</DropdownItem>
				</DropdownMenu>
			  </Dropdown>
		</Nav>
	</Navbar>
	<!---->
	<br>
    <h1>Tasa de muertes por cancer</h1>
	<Alert color="danger" isOpen={visibleError} toggle={() => (visibleError = false)}>
		{#if msg}
			<p>ERROR: {msg}</p>
		   {/if}
	</Alert>
	<Alert color="success" isOpen={visibleMsg} toggle={() => (visibleMsg = false)}>
		{#if msg}
			<p>Correcto: {msg}</p>
		{/if}
	</Alert>
	<Button on:click="{getPgAnt}">
		Página Anterior
	</Button>
	<Button on:click="{getPgSig}">
		Página Siguiente
	</Button>
    {#await cancerdeaths}
loading
	{:then cancerdeaths}
	<Table bordered>
        <thead>
            <tr>
                <th>Fecha de inicio</th>
                <th>Fecha fin</th>
            </tr>
        </thead>
        <tbody>

        
        <tr>
            <td><input type="number" min="0" bind:value="{from}"></td>
            <td><input type="number" min="0" bind:value="{to}"></td>
            <td align="center"><Button outline color="dark" on:click="{()=>{
                if (from == null || to == null) {
                    //window.alert('Los campos fecha inicio y fecha fin no pueden estar vacíos')
					visibleError = true;
					visibleMsg = false;
					msg = "Los campos fecha inicio y fecha fin no pueden estar vacíos";
                }else{
                    getcancerdeaths();
                }
            }}">
                Buscar
                </Button>
            </td>
            <td align="center"><Button outline color="info" on:click="{()=>{
                from = null;
                to = null;
                getcancerdeaths();
                
            }}">
                Limpiar Búsqueda
                </Button>
            </td>
        </tr>
        </tbody>
    </Table>
	<Table bordered>
		<thead>
			<tr>
				<th>País</th>
				<th>Año</th>
                <th>Muertes 0-50 años</th>
                <th>Muertes 50-70 años</th>
                <th>Muertes 70 años</th>
			</tr>
		</thead>
		<tbody>
			<tr>
				<td><input bind:value="{newcancerdeaths.country}"></td>
				<td><input type="number" bind:value="{newcancerdeaths.year}"></td>
				<td><input type="number" bind:value="{newcancerdeaths.ages_zero_fifty}"></td>
				<td><input type="number" bind:value="{newcancerdeaths.ages_fifty_seventy}"></td>
				<td><input type="number" bind:value="{newcancerdeaths.ages_seventy}"></td>

				<td align="center"><Button outline color="primary" on:click="{insertcancerdeaths}">
					Añadir
					</Button>
					
				</td>
				<td align="center"><Button outline color="primary" on:click="{()=>{
					newcancerdeaths.country = null;
					newcancerdeaths.year = null;
					newcancerdeaths.ages_zero_fifty = null;
					newcancerdeaths.ages_fifty_seventy = null;
					newcancerdeaths.ages_seventy = null;
				}}">
					Limpiar
					</Button>
				</td>
				
			</tr>
			
			{#each cancerdeaths as cd}
			<tr>
				<td>{cd.country}</td>
				<td>{cd.year}</td>
                <td>{cd.ages_zero_fifty}</td>
                <td>{cd.ages_fifty_seventy}</td>
                <td>{cd.ages_seventy}</td>

				<td align="center"><Button outline color="warning" on:click={function (){
					window.location.href = `/#/cancerdeaths/${cd.country+"/"+cd.year}`
				}}>
					Editar
				</Button>
				<td align="center"><Button outline color="danger" on:click={Borrarcancerdeaths(cd.country,cd.year)}>
					Borrar
				</Button>
				</td>
			</tr>
			{/each}
			<tr>
				<td><Button outline color="success" on:click={Loadcancerdeaths}>
					Cargar datos
				</Button></td>
				<td><Button outline color="danger" on:click={BorrarcancerdeathsAll}>
					Borrar todo
				</Button></td>
			</tr>
			
		</tbody>
	</Table>

{/await}
</main>