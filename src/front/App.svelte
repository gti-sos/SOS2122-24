<script>
	import Router from 'svelte-spa-router';
	import Home from './Home.svelte';
	import Info from './Info.svelte';
	import Integraciones from './integraciones.svelte';

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
	import GraphAPISOS2 from "./cancerdeaths-stats/GraphAPISOS2.svelte";
	import GraphAPIEXT1 from "./cancerdeaths-stats/GraphAPIEXT1.svelte";
	import GraphAPIEXT2 from "./cancerdeaths-stats/GraphAPIEXT2.svelte";
	import GraphAPIEXT3 from "./cancerdeaths-stats/GraphAPIEXT3.svelte";
	import Airpollution from './air-pollution-stats/AirPollution.svelte';
	import EditAirpollution from "./air-pollution-stats/EditAirPollution.svelte";

	
import AirPollutionGraph from './air-pollution-stats/AirPollutionGraph.svelte';
import MyGraph from './MyGraph.svelte';
import AirPollutionApexcharts from './air-pollution-stats/AirPollutionApexcharts.svelte';
import MyGraph2 from './MyGraph2.svelte';
import Integracion1 from './air-pollution-stats/Integracion1.svelte';
import Integracion2 from './air-pollution-stats/Integracion2.svelte';
import IntegracionExt1 from './air-pollution-stats/IntegracionExt1.svelte';
import IntegracionExt2 from './air-pollution-stats/IntegracionExt2.svelte';

	//export let name;

	const routes={
		'/' : Home,
		"/info" : Info,
		"/integrations" : Integraciones,

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
		"/cancerdeaths-graph-SOS2": GraphAPISOS2,
		"/cancerdeaths-graph-EXT1": GraphAPIEXT1,
		"/cancerdeaths-graph-EXT2": GraphAPIEXT2,
		"/cancerdeaths-graph-EXT3": GraphAPIEXT3,
		"/air-pollution-stats" : Airpollution,
		"/air-pollution/:country/:year" : EditAirpollution,
		"/graphAirPollution" : AirPollutionGraph,
		"/airpollution-apexcharts": AirPollutionApexcharts,
		"/aleali": Integracion1,
		"/felipe": Integracion2,
		"/ext1": IntegracionExt1,
		"/ext2": IntegracionExt2,
		"/graph": MyGraph,
		"/analytics": MyGraph2


	};
	


</script>

<main>
	<!--<h1>Hello {name}!</h1>
	<p>Visit the <a href="https://svelte.dev/tutorial">Svelte tutorial</a> to learn how to build Svelte apps.</p>
	<Pneumonia /> -->
	<Router {routes} />
	
</main>

