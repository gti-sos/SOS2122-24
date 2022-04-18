<script>
    import {onMount} from 'svelte';
	import Table from 'sveltestrap/src/Table.svelte';
	import Button from 'sveltestrap/src/Button.svelte'; 

	let pneumonia=[];

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
		const res= await fetch("/api/v1/pneumonia-stats");
		if(res.ok){
			const data= await res.json();
			pneumonia=data;
			console.log("Received pneumonia: " + pneumonia.length);
		}
	}
	async function insertPneumonia(){
        console.log("Inserting Pneumonia...."+JSON.stringify(newPneumonia));
        const res = await fetch("/api/v1/pneumonia-stats",
			{
				method: "POST",
				body: JSON.stringify(newPneumonia),
				headers: {
					"Content-Type": "application/json"
				}
			}).then(function (res){
				getPneumonia();
				window.alert("Entrada introducida con éxito");
			}); 
    }
	async function BorrarPneumonia(countryDelete){
        console.log("Deleting Pneumonia....");
        const res = await fetch("/api/v1/pneumonia-stats/"+countryDelete,
			{
				method: "DELETE"
			}).then(function (res){
				getPneumonia();
				window.alert("Entrada eliminada con éxito");
			});
    }
	async function BorrarPneumonias(){
        console.log("Deleting pneumonias....");
        const res = await fetch("/api/v1/pneumonia-stats/",
			{
				method: "DELETE"
			}).then(function (res){
				getPneumonia();
				window.alert("Entradas elimidas con éxito");
			});
    }

	async function LoadPneumonia(){
        console.log("Loading pneumonia....");
        const res = await fetch("/api/v1/pneumonia-stats/loadInitialData",
			{
				method: "GET"
			}).then(function (res){
				getPneumonia();
				window.alert("Entradas cargadas con éxito");
			});
    }
</script>

<main>
    <h1>Tasa de muertes por neumonia</h1>
    {#await pneumonia}
loading
	{:then pneumonia}

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
				<td><input bind:value="{newPneumonia.year}"></td>
				<td><input bind:value="{newPneumonia.ages_zero_fifty}"></td>
				<td><input bind:value="{newPneumonia.ages_fifty_seventy}"></td>
				<td><input bind:value="{newPneumonia.ages_seventy}"></td>

				<td><Button outline color="primary" on:click="{insertPneumonia}">
					Añadir
					</Button>
				</td>
			</tr>
			{#each pneumonia as pneumonia}
			<tr>
				<td>{pneumonia.country}</td>
				<td>{pneumonia.year}</td>
                <td>{pneumonia.ages_zero_fifty}</td>
                <td>{pneumonia.ages_fifty_seventy}</td>
                <td>{pneumonia.ages_seventy}</td>

				<td><Button outline color="warning" on:click={function (){
					window.location.href = `/#/Pneumonia/${pneumonia.country}`
				}}>
					Editar
				</Button>
				<td><Button outline color="danger" on:click={BorrarPneumonia}>
					Borrar
				</Button>
				</td>
			</tr>
			{/each}
			<tr>
				<td><Button outline color="success" on:click={LoadPneumonia}>
					Cargar datos
				</Button></td>
				<td><Button outline color="danger" on:click={BorrarPneumonias}>
					Borrar todo
				</Button></td>
			</tr>
			
		</tbody>
	</Table>

{/await}
</main>