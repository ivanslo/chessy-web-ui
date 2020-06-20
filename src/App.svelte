<script>
  import MatchPlayer from "./Components/MatchPlayer.svelte"
</script>

<main>
	<h1>Chessy Web UI!</h1>
	<MatchPlayer class="match-player"/>
	
	<p>Over-simplistic UI powered by Svelte</p>
</main>

<style>
	main {
		text-align: center;
		padding: 1em;
		max-width: 240px;
		margin: 0 auto;
	}

	h1 {
		color: #ff3e00;
		text-transform: uppercase;
		font-size: 4em;
		font-weight: 100;
	}

	@media (min-width: 640px) {
		main {
			max-width: none;
		}
	}
</style>