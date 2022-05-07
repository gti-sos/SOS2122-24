<script>
	import Router from 'svelte-spa-router';
	import Home from './Home.svelte';
	import Info from './Info.svelte';

	import Pneumonia from './pneumonia-stats/Pneumonia.svelte';
	import EditPneumonia from "./pneumonia-stats/EditPneumonia.svelte";
	import MyGraphPneumonia from './pneumonia-stats/MyGraphPneumonia.svelte';
	import Cancerdeaths from './cancerdeaths-stats/Cancerdeaths.svelte';
	import EditCancerdeaths from "./cancerdeaths-stats/EditCancerdeaths.svelte";
	import MyGraphCancerdeaths from "./cancerdeaths-stats/MyGraphCancerdeaths.svelte";
	import Airpollution from './air-pollution-stats/Airpollution.svelte';
	import EditAirpollution from "./air-pollution-stats/EditAirpollution.svelte";
	//export let name;

	const routes={
		'/' : Home,
		"/info" : Info,

		"/pneumonia-stats" : Pneumonia,
		"/pneumonia/:country/:year" : EditPneumonia,
		"/graphpneumonia": MyGraphPneumonia,
		"/cancerdeaths-stats" : Cancerdeaths,
		"/cancerdeaths/:country/:year" : EditCancerdeaths,
		"/cancerdeaths-graph": MyGraphCancerdeaths,
		"/air-pollution-stats" : Airpollution,
		"/air-pollution/:country/:year" : EditAirpollution


	};
	


</script>

<main>
	<!--<h1>Hello {name}!</h1>
	<p>Visit the <a href="https://svelte.dev/tutorial">Svelte tutorial</a> to learn how to build Svelte apps.</p>
	<Pneumonia /> -->
	<Router {routes} />
	
</main>

