<script>
  import * as queryString from "query-string"
  import MatchPlayer from "./Components/MatchPlayer.svelte"
  import LoadingError from "./Components/LoadingError.svelte"
  let gameId = queryString.parseUrl(window.location.href).query.gameId
  import { getGame } from './Data/GameProvider'
  
  async function fetchGame(gId) {
    if (!gId) {
	  throw Error('No gameId specified')
    }
    return getGame(gId);
  }

  let gamePromise = fetchGame(gameId);
</script>

<main>
	<h1>Chessy Web UI!</h1>
	
  {#await gamePromise}
	<LoadingError failed={false} />
  {:then game}
	<MatchPlayer class="match-player" game={game}/>
  {:catch error}
	<LoadingError failed={true} errorMsg={error.message}/>
  {/await}

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