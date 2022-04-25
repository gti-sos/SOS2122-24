<script>

    export let params={};
    import {pop} from 'svelte-spa-router';
    import { onMount } from 'svelte';
    import {Button} from 'sveltestrap';
    import Table from 'sveltestrap/src/Table.svelte';

    let airpollution={};

    
    let updatedCountry;
    let updatedYear;
    let updatedAgesZeroFifty;
    let updatedAgesFiftySeventy;
    let updatedAgesSeventy;

    onMount(getAirpollution);

	async function getAirpollution(){
		console.log("fetching airpollution ....");
		const res= await fetch("/api/v1/air-pollution-stats/" +params.country);
		if(res.ok){
			const data= await res.json();
			airpollution=data;
			updatedCountry=airpollution.country;
            updatedYear=airpollution.year;
            updatedAgesZeroFifty=airpollution.ages_zero_fifty;
            updatedAgesFiftySeventy=airpollution.ages_fifty_seventy;
            updatedAgesSeventy=airpollution.ages_seventy;
		}else{
            Fallos(res.status,params.country);
            pop();
        }
	}

    async function EditAirpollution(){
        console.log("Updating Airpollution...."+updatedCountry);
        const res = await fetch("/api/v1/air-pollution-stats/"+params.country,
			{
				method: "PUT",
				body: JSON.stringify({
                    country: updatedCountry,
                    year: updatedYear,
                    ages_zero_fifty: updatedAgesZeroFifty,
                    ages_fifty_seventy: updatedAgesFiftySeventy,
                    ages_seventy: updatedAgesSeventy
                }),
				headers: {
					"Content-Type": "application/json"
				}
			}); 
    }
    async function Fallos(code,entrada){
        
        let msg;
        if(code == 404){
            msg = "No se encuentra "+entrada
        }
        if(code == 400){
            msg = "solicitud incorrecta"
        }
        if(code == 409){
            msg = "El dato introducido ya existe"
        }
        if(code == 401){
            msg = "No autorizado"
        }
        if(code == 405){
            msg = "Método no permitido"
        }
        window.alert(msg)
            return;
    }



    

</script>

<main>
    <h1> Editar "{params.country}" </h1>
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
                    <td>{updatedCountry}</td>
                    <td><input bind:value="{updatedYear}"></td>
                    <td><input bind:value="{updatedAgesZeroFifty}"></td>
                    <td><input bind:value="{updatedAgesFiftySeventy}"></td>
                    <td><input bind:value="{updatedAgesSeventy}"></td>
    
                    <td><Button outline color="primary" on:click="{EditAirpollution}">
                        Editar
                        </Button>
                    </td>
                </tr>                
            </tbody>
        </Table>
    
    {/await}
    <Button outline color="secondary" on:click= "{pop}">Back</Button> 
</main>