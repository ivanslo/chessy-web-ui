<script>
  import * as queryString from "query-string"
  import MatchPlayer from "./Components/MatchPlayer.svelte"
  import LoadingError from "./Components/LoadingError.svelte"
  import GameList  from "./Components/GameList.svelte"
  import { getGame, parseGame } from './Data/GameProvider'
  
  /* Context API - Store the list of games, and don't fetch it over and over
  ------------------------------------------------------------------------------*/
  import { setContext } from "svelte";

  import { gameURL } from "./Data/Constants"
  let allGames = undefined;

  setContext('gamesCache', { 
    getGameList: () => allGames,
    setGameList: (newGameList) => {
      allGames = newGameList
    }
  });

  /* Select/show game from list
  ----------------------------------*/
  let selectedGame = undefined;
  let selectedGameDownloaded = undefined

  async function fetcdhGameSpecific(gameId) {
    const queryBody = { 'gameId': gameId}
    const gameUrl = `${gameURL}`;
    const response = await fetch(gameUrl, { method: "POST", body: JSON.stringify(queryBody), headers:{"Content-Type":"application/json"}});
    const json = await response.json();
    const game = parseGame(JSON.parse(json.Item.jsonFile.S))
    return game
  }
  
  const handleGameSelected = (event) => {
    selectedGame = event.detail.text
    selectedGameDownloaded = fetcdhGameSpecific(selectedGame)
  }

  const handleBackFromMatch = (event) => {
    selectedGame = undefined
  }
</script>


<h1>CHESSY</h1>
<main>

{#if selectedGame === undefined }
  <GameList on:gameSelected={handleGameSelected}/>
{:else}
  {#await selectedGameDownloaded}
    <LoadingError failed={false} />
  {:then result}
    <MatchPlayer on:backFromMatch={handleBackFromMatch} game={result}/>
  {:catch error}
    <LoadingError failed={true} errorMsg={error.message}/>
  {/await} 
{/if}

</main>
<footer>Over-simplistic UI powered by Svelte</footer>

<style>
main {
  flex: 1;
  display: flex;
  overflow: scroll;
  flex-direction: column;
  align-items: center;
  width: 100%;
}

h1 {
  color: #0A0908;
  font-size: 3em;
}

footer {
  width: 100%;
  padding: 10px;
  color: #F5F0F6;
  text-align: center;
  background-color:#22333B;
  font-family: 'aceh';
}
</style>