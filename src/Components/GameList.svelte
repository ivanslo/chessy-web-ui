<script>
  import { gameAllURL, gameListURL } from "../Data/Constants"
  import LoadingError from "./LoadingError.svelte"
  import GameListItem from "./GameListItem.svelte"

  import { getContext } from "svelte"; 
  const ctx = getContext('gamesCache');

  async function fetchGameList() {
    if (ctx.getGameList() !== undefined) {
      return ctx.getGameList()
    }
    const gameUrl = `${gameListURL}`;
    const response = await fetch(gameUrl, { method: "POST" });
    const json = await response.json();
    ctx.setGameList(json)
    return json;
  }

  let gameList = fetchGameList();
</script>

<div class="gamelist">
	{#await gameList}
		<LoadingError failed={false} />
	{:then result}
		{#each result.Items as game, nr}
			<GameListItem gameInfo={game} on:gameSelected/>
		{/each}
	{:catch error}
		<LoadingError failed={true} errorMsg={error.message}/>
	{/await}
</div>

<style>
	.gamelist {
		background-color: rgba(245, 240, 246, 0.6);
		display: flex;
		flex-direction: column;
		width: 100%;
	}
	@media (min-width: 640px) {
		.gamelist {
			max-width: 720px;
		}
	}
</style>

