<script>
	import Router from 'svelte-spa-router';
	import Home from './Home.svelte';

	import Pneumonia from './pneumonia-stats/Pneumonia.svelte';
	import EditPneumonia from "./pneumonia-stats/EditPneumonia.svelte";
	import Cancerdeaths from './cancerdeaths-stats/Cancerdeaths.svelte';
	import EditCancerdeaths from "./cancerdeaths-stats/EditCancerdeaths.svelte";
	//export let name;

	const routes={
		"/" : Home,

		"/pneumonia-stats" : Pneumonia,
		"/pneumonia/:country" : EditPneumonia,
		"/cancerdeaths-stats" : Cancerdeaths,
		"/cancerdeaths/:country" : EditCancerdeaths


	};
	


</script>

<main>
	<!--<h1>Hello {name}!</h1>
	<p>Visit the <a href="https://svelte.dev/tutorial">Svelte tutorial</a> to learn how to build Svelte apps.</p>
	<Pneumonia /> -->
	<Router {routes} />
	
</main>

