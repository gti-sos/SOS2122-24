<script>
    import {onMount} from 'svelte';
	import Table from 'sveltestrap/src/Table.svelte';
	import Button from 'sveltestrap/src/Button.svelte'; 

	let cancerdeaths=[];

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
		const res= await fetch("/api/v1/cancerdeaths-stats");
		if(res.ok){
			const data= await res.json();
			cancerdeaths=data;
			console.log("Received cancerdeaths: " + cancerdeaths.length);
		}
	}
	async function insertcancerdeaths(){
        console.log("Inserting cancerdeaths...."+JSON.stringify(newcancerdeaths));
        const res = await fetch("/api/v1/cancerdeaths-stats",
			{
				method: "POST",
				body: JSON.stringify(newcancerdeaths),
				headers: {
					"Content-Type": "application/json"
				}
			}).then(function (res){
				getcancerdeaths();
				window.alert("Entrada introducida con éxito");
			}); 
    }
	async function Borrarcancerdeaths(countryDelete){
        console.log("Deleting cancerdeaths....");
        const res = await fetch("/api/v1/cancerdeaths-stats/"+countryDelete,
			{
				method: "DELETE"
			}).then(function (res){
				getcancerdeaths();
				window.alert("Entrada eliminada con éxito");
			});
    }
	async function Borrarcancerdeathss(){
        console.log("Deleting cancerdeathss....");
        const res = await fetch("/api/v1/cancerdeaths-stats/",
			{
				method: "DELETE"
			}).then(function (res){
				getcancerdeaths();
				window.alert("Entradas elimidas con éxito");
			});
    }

	async function Loadcancerdeaths(){
        console.log("Loading cancerdeaths....");
        const res = await fetch("/api/v1/cancerdeaths-stats/loadInitialData",
			{
				method: "GET"
			}).then(function (res){
				getcancerdeaths();
				window.alert("Entradas cargadas con éxito");
			});
    }
</script>

<main>
    <h1>Tasa de muertes por cancer</h1>
    {#await cancerdeaths}
loading
	{:then cancerdeaths}

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
				<td><input bind:value="{newcancerdeaths.year}"></td>
				<td><input bind:value="{newcancerdeaths.ages_zero_fifty}"></td>
				<td><input bind:value="{newcancerdeaths.ages_fifty_seventy}"></td>
				<td><input bind:value="{newcancerdeaths.ages_seventy}"></td>

				<td><Button outline color="primary" on:click="{insertcancerdeaths}">
					Añadir
					</Button>
				</td>
			</tr>
			{#each cancerdeaths as cancerdeaths}
			<tr>
				<td>{cancerdeaths.country}</td>
				<td>{cancerdeaths.year}</td>
                <td>{cancerdeaths.ages_zero_fifty}</td>
                <td>{cancerdeaths.ages_fifty_seventy}</td>
                <td>{cancerdeaths.ages_seventy}</td>

				<td><Button outline color="warning" on:click={function (){
					window.location.href = `/#/cancerdeaths/${cancerdeaths.country}`
				}}>
					Editar
				</Button>
				<td><Button outline color="danger" on:click={Borrarcancerdeaths}>
					Borrar
				</Button>
				</td>
			</tr>
			{/each}
			<tr>
				<td><Button outline color="success" on:click={Loadcancerdeaths}>
					Cargar datos
				</Button></td>
				<td><Button outline color="danger" on:click={Borrarcancerdeathss}>
					Borrar todo
				</Button></td>
			</tr>
			
		</tbody>
	</Table>

{/await}
</main>