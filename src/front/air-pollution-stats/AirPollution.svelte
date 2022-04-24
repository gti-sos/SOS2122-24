<script>
    import {onMount} from 'svelte';
	import Table from 'sveltestrap/src/Table.svelte';
	import Button from 'sveltestrap/src/Button.svelte'; 

	let airpollution=[];

    let newAirpollution={
        country: "",
        year:"",
        ages_zero_fifty:"",
        ages_fifty_seventy:"",
        ages_seventy:""
    }

	onMount(getAirpollution);

	async function getAirpollution(){
		console.log("fetching airpollution ....");
		const res= await fetch("/api/v1/air-pollution-stats");
		if(res.ok){
			const data= await res.json();
			airpollution=data;
			console.log("Received air pollution: " + airpollution.length);
		}
	}
	async function insertAirpollution(){
        console.log("Inserting Airpollution...."+JSON.stringify(newAirpollution));
        const res = await fetch("/api/v1/air-pollution-stats",
			{
				method: "POST",
				body: JSON.stringify(newAirpollution),
				headers: {
					"Content-Type": "application/json"
				}
			}).then(function (res){
				getAirpollution();
				window.alert("Entrada introducida con éxito");
			}); 
    }
	async function BorrarAirpollution(country,year){
        console.log("Deleting Airpollution....");
        const res = await fetch("/api/v1/air-pollution-stats/" + country +"/" + year,
			{
				method: "DELETE"
			}).then(function (res){
				getAirpollution();
				window.alert("Entrada eliminada con éxito");
			});
    }
	async function BorrarAirpollution(){
        console.log("Deleting air pollution....");
        const res = await fetch("/api/v1/air-pollution-stats/",
			{
				method: "DELETE"
			}).then(function (res){
				getAirpollution();
				window.alert("Entradas elimidas con éxito");
			});
    }

	async function LoadAirpollution(){
        console.log("Loading air pollution....");
        const res = await fetch("/api/v1/air-pollution-stats/loadInitialData",
			{
				method: "GET"
			}).then(function (res){
				getAirpollution();
				window.alert("Entradas cargadas con éxito");
			});
    }
</script>

<main>
    <h1>Tasa de muertes por contaminacion de aire</h1>
    {#await airpollution}
loading
	{:then airpollution}

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
				<td><input bind:value="{newAirpollution.country}"></td>
				<td><input bind:value="{newAirpollution.year}"></td>
				<td><input bind:value="{newAirpollution.ages_zero_fifty}"></td>
				<td><input bind:value="{newAirpollution.ages_fifty_seventy}"></td>
				<td><input bind:value="{newAirpollution.ages_seventy}"></td>

				<td><Button outline color="primary" on:click="{insertAirpollution}">
					Añadir
					</Button>
				</td>
			</tr>
			{#each airpollution as airpollution}
			<tr>
				<td>{airpollution.country}</td>
				<td>{airpollution.year}</td>
                <td>{airpollution.ages_zero_fifty}</td>
                <td>{airpollution.ages_fifty_seventy}</td>
                <td>{airpollution.ages_seventy}</td>

				<td><Button outline color="warning" on:click={function (){
					window.location.href = `/#/Airpollution/${airpollution.country}`
				}}>
					Editar
				</Button>
				<td><Button outline color="danger" on:click={BorrarAirpollution}>
					Borrar
				</Button>
				</td>
			</tr>
			{/each}
			<tr>
				<td><Button outline color="success" on:click={LoadAirpollution}>
					Cargar datos
				</Button></td>
				<td><Button outline color="danger" on:click={BorrarAirpollution}>
					Borrar todo
				</Button></td>
			</tr>
			
		</tbody>
	</Table>

{/await}
</main>