<script>
	import Router from 'svelte-spa-router';
	import Home from './Home.svelte';
	import Info from './Info.svelte';

	import Pneumonia from './pneumonia-stats/Pneumonia.svelte';
	import EditPneumonia from "./pneumonia-stats/EditPneumonia.svelte";
	import MyGraphPneumonia from './pneumonia-stats/MyGraphPneumonia.svelte';
	import ApiPopulationLevels from './pneumonia-stats/ApiPopulationLevels.svelte';
	import AgriculturalProductions from './pneumonia-stats/AgriculturalProductions.svelte';
	import Billboard from './pneumonia-stats/Billboard.svelte';
	import Cancerdeaths from './cancerdeaths-stats/Cancerdeaths.svelte';
	import EditCancerdeaths from "./cancerdeaths-stats/EditCancerdeaths.svelte";
	import MyGraphCancerdeaths from "./cancerdeaths-stats/MyGraphCancerdeaths.svelte";
	import MyGraphCancerdeathsC3 from "./cancerdeaths-stats/MyGraphCancerdeathsC3.svelte";
	import GraphAPISOS1 from "./cancerdeaths-stats/GraphAPISOS1.svelte";
	import Airpollution from './air-pollution-stats/AirPollution.svelte';
	import EditAirpollution from "./air-pollution-stats/EditAirPollution.svelte";

	
import AirPollutionGraph from './air-pollution-stats/AirPollutionGraph.svelte';
import MyGraph from './MyGraph.svelte';
	//export let name;

	const routes={
		'/' : Home,
		"/info" : Info,

		"/pneumonia-stats" : Pneumonia,
		"/pneumonia/:country/:year" : EditPneumonia,
		"/graphpneumonia": MyGraphPneumonia,
		"/graphpopulationlevels": ApiPopulationLevels,
		"/graphagricultural":AgriculturalProductions,
		"/graphbillboard" : Billboard,
		"/cancerdeaths-stats" : Cancerdeaths,
		"/cancerdeaths/:country/:year" : EditCancerdeaths,
		"/cancerdeaths-graph": MyGraphCancerdeaths,
		"/cancerdeaths-graph-C3": MyGraphCancerdeathsC3,
		"/cancerdeaths-graph-SOS1": GraphAPISOS1,
		"/air-pollution-stats" : Airpollution,
		"/air-pollution/:country/:year" : EditAirpollution,
		"/graphAirPollution" : AirPollutionGraph,
		"/graph": MyGraph


	};
	


</script>

<main>
	<!--<h1>Hello {name}!</h1>
	<p>Visit the <a href="https://svelte.dev/tutorial">Svelte tutorial</a> to learn how to build Svelte apps.</p>
	<Pneumonia /> -->
	<Router {routes} />
	
</main>

