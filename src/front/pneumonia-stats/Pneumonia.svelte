<script>
    import {onMount} from 'svelte';
	import Table from 'sveltestrap/src/Table.svelte';
	import Button from 'sveltestrap/src/Button.svelte'; 
	import Alert from 'sveltestrap/src/Alert.svelte';
	import {Navbar, Nav, NavItem, NavLink, NavbarBrand, Dropdown, DropdownToggle, DropdownMenu, DropdownItem} from 'sveltestrap';

	let pneumonia=[];
	let from=null;
	let to=null;
	let offset=0;
	let limit=10;
	let checkMSG = "";
    let visible = false;
    let color = "danger";
	


	let numEntries;

    let newPneumonia={
        country: "",
        year:"",
        ages_zero_fifty:"",
        ages_fifty_seventy:"",
        ages_seventy:""
    }

	onMount(getPneumonia);

	async function getPneumonia(){
		console.log("fetching pneumonia ....");
		let cadena=`/api/v1/pneumonia-stats?offset=+${offset}+&limit=+${limit}`;
		if(from !=null){
			cadena=cadena + `&from=${from}&` 
		}
		if(to !=null){
			cadena=cadena + `to=${to}`
		}

		const res= await fetch(cadena);
		if(res.ok){
			const data= await res.json();
			pneumonia=data;
			numEntries=pneumonia.length;
			console.log("Received pneumonia: " + pneumonia.length);
		}else{
			color="danger";
			checkMSG="No hay entradas para esas fechas";
			visible="true";
			//window.alert("No hay entradas para esas fechas");
		}
	}
	async function getPgAnt() {
		if(offset>=10){

			offset=offset-10;
		}
		//limit=limit+10;
        console.log("fetching pneumonia ....");
		let cadena = `/api/v1/pneumonia-stats?offset=+${offset}+&limit=+${limit}`;
		if(from !=null){
            cadena=cadena + `&from=${from}&` 
        }
        if(to !=null){
            cadena=cadena + `to=${to}`
        }
		const res= await fetch(cadena);
		if(res.ok){
			const data= await res.json();
			pneumonia=data;
			console.log("Received pneumonia: " + pneumonia.length);
		}
    }
	async function getPgSig() {
		if(pneumonia.length>=10){

			offset=offset+10;
		}
		//limit=limit+10;
        console.log("fetching pneumonia ....");
		let cadena = `/api/v1/pneumonia-stats?offset=+${offset}+&limit=+${limit}`;
		if(from !=null){
            cadena=cadena + `&from=${from}&` 
        }
        if(to !=null){
            cadena=cadena + `to=${to}`
        }
		const res= await fetch(cadena);
		if(res.ok){
			const data= await res.json();
			pneumonia=data;
			console.log("Received pneumonia: " + pneumonia.length);
		}
    }
	
	async function insertPneumonia(){
		if (newPneumonia.country == "" || newPneumonia.country == null || newPneumonia.year == "" || newPneumonia.year == null || newPneumonia.ages_zero_fifty == "" || newPneumonia.ages_zero_fifty == null || newPneumonia.ages_fifty_seventy == "" || newPneumonia.ages_fifty_seventy == null || newPneumonia.ages_seventy == "" || newPneumonia.ages_seventy == null) {
			color="danger";
			checkMSG="Debe completar todos los campos";
			visible="true";
         }else{
        console.log("Inserting Pneumonia...."+JSON.stringify(newPneumonia));
        const res = await fetch("/api/v1/pneumonia-stats",
			{
				method: "POST",
				body: JSON.stringify(newPneumonia),
				headers: {
					"Content-Type": "application/json"
				}
			}).then(function (res){
				if(res.status == 201){
					color="success";
					checkMSG="Entrada introducida con éxito";
					visible="true";
					newPneumonia.country = null;
					newPneumonia.year = null;
					newPneumonia.ages_zero_fifty = null;
					newPneumonia.ages_fifty_seventy = null;
					newPneumonia.ages_seventy = null;
				getPneumonia();

				//window.alert("Entrada introducida con éxito");
				}
				else if(res.status == 409){
					color="danger";
					checkMSG="Ya existe ese recurso en la base de datos";
					visible="true";
					
                     //window.alert("Ya existe ese recurso en la base de datos");
                     console.log("ERROR There is already a data with that country and year in the database");
                     
                 }
			});  
    }}
	async function BorrarPneumonia(name,year){
        console.log("Deleting Pneumonia....");
        const res = await fetch("/api/v1/pneumonia-stats/" + name +"/" + year,
			{
				method: "DELETE"
			}).then(function (res){
				getPneumonia();
				if (res.status==200) {
					color="success";
					checkMSG=name + " entrada borrada correctamente";
					visible="true";
                console.log("Deleted " + name); 
				//window.alert(name + " elimida con éxito");           
            }else  {
				color="danger";
				checkMSG=name + "no se ha podido borrar la entrada";
				visible="true";
                //window.alert(name + " no se ha podida eliminar");
                console.log("DATA NOT FOUND");            
            
            }      
        });
    }
	async function BorrarPneumoniasAll(){
        console.log("Deleting pneumonias....");
        const res = await fetch("/api/v1/pneumonia-stats/",
			{
				method: "DELETE"
			}).then(function (res){
				color="success";
				checkMSG="Entradas elimidas con éxito";
				visible="true";
				getPneumonia();
				//window.alert("Entradas elimidas con éxito");
			});
    }

	async function LoadPneumonia(){
        console.log("Loading pneumonia....");
        const res = await fetch("/api/v1/pneumonia-stats/loadInitialData",
			{
				method: "GET"
			}).then(function (res){
				color="success";
				checkMSG="Entradas cargadas con éxito";
				visible="true";
				getPneumonia();
				//window.alert("Entradas cargadas con éxito");
			});
    }
</script>

<main>
	<Navbar style="background-color: #6EAA8D; color:white;" light expand="lg" >
		<NavbarBrand href="#/info">INICIO</NavbarBrand>
		<Nav navbar>
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
				  <DropdownItem divider/>
				  <DropdownItem href="./#/Pneumonia-stats">Pneumonia FRONT_END</DropdownItem>
				  <DropdownItem divider/>
				  <DropdownItem href="#/air-pollution-stats">AirPollution FRONT-END</DropdownItem>
				</DropdownMenu>
			  </Dropdown>
			  
			  <Dropdown >
				<DropdownToggle nav caret> Gráficas </DropdownToggle>
				<DropdownMenu end>
				  <DropdownItem href="./#/cancerdeaths-graph">Cancerdeaths-Stats</DropdownItem>
				  <DropdownItem divider/>
				  <DropdownItem href="./#/graphpneumonia">Pneumonia-Stats</DropdownItem>
				  <DropdownItem divider/>
				  <DropdownItem href="#/graphAirPollution">AirPollution-Stats</DropdownItem>
				  <DropdownItem divider/>
				  <DropdownItem href="./#/graph">Grafica comun</DropdownItem>
				</DropdownMenu>
			  </Dropdown>
		  <!--<NavItem>
			<NavLink style="float:right; margin:left;" href="#/about">Acerca de</NavLink>
		  </NavItem>-->
		</Nav>
	</Navbar>
    <h1>Tasa de muertes por neumonia</h1>
	<Button on:click="{getPgAnt}">
		Página Anterior
	</Button>
	<Button on:click="{getPgSig}">
		Página Siguiente
	</Button>
    {#await pneumonia}
loading
	{:then pneumonia}

	<Alert color={color} isOpen={visible} toggle={() => (visible = false)}>
		{#if checkMSG}
			{checkMSG}
		{/if}
	</Alert>	

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
					color="success";
					checkMSG="Los campos fecha inicio y fecha fin no pueden estar vacíos";
					visible="true";
					//window.alert('Los campos fecha inicio y fecha fin no pueden estar vacíos')
				}else{
					getPneumonia();
				}
			}}">
				Buscar
				</Button>
			</td>
			<td align="center"><Button outline color="info" on:click="{()=>{
				from = null;
				to = null;
				getPneumonia();
				
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
				<td><input bind:value="{newPneumonia.country}"></td>
				<td><input type="number" bind:value="{newPneumonia.year}"></td>
				<td><input type="number" bind:value="{newPneumonia.ages_zero_fifty}"></td>
				<td><input type="number" bind:value="{newPneumonia.ages_fifty_seventy}"></td>
				<td><input type="number" bind:value="{newPneumonia.ages_seventy}"></td>

				<td><Button outline color="primary" on:click="{insertPneumonia}">
					Añadir
					</Button>
				</td>
				<td align="center"><Button outline color="primary" on:click="{()=>{
					newPneumonia.country = null;
					newPneumonia.year = null;
					newPneumonia.ages_zero_fifty = null;
					newPneumonia.ages_fifty_seventy = null;
					newPneumonia.ages_seventy = null;
				}}">
					Limpiar
					</Button>
				</td>
			</tr>
			{#each pneumonia as pneumoniaa}
			<tr>
				<td>{pneumoniaa.country}</td>
				<td>{pneumoniaa.year}</td>
                <td>{pneumoniaa.ages_zero_fifty}</td>
                <td>{pneumoniaa.ages_fifty_seventy}</td>
                <td>{pneumoniaa.ages_seventy}</td>

				<td><Button outline color="warning" on:click={function (){
					window.location.href = `/#/Pneumonia/${pneumoniaa.country}/${pneumoniaa.year}`
				}}>
					Editar
				</Button>
				<td><Button outline color="danger" on:click={BorrarPneumonia(pneumoniaa.country,pneumoniaa.year)}>
					Borrar
				</Button>
				
				</td>
			</tr>
			{/each}
			<tr>
				<td><Button outline color="success" on:click={LoadPneumonia}>
					Cargar datos
				</Button></td>
				<td><Button outline color="danger" on:click={BorrarPneumoniasAll}>
					Borrar todo
				</Button></td>
			</tr>
			
		</tbody>
	</Table>

{/await}
</main>