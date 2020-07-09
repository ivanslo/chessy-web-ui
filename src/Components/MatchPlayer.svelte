<script >
    import Board from './Board.svelte'
    export let game; 

    let boardIndex = 0;

    const clamp = (n, min, max) =>  {
      if( n < min ) return min;
      if( n > max ) return max;
      return n;
    }

    const playNext = () => {
      boardIndex = clamp(boardIndex+1, 0, game.steps.length-1)
    }

    const playBefore = () => {
      boardIndex = clamp(boardIndex-1, 0, game.steps.length-1)
    }
</script>

<main data-testid="match-player">
  <Board boardPieces={game.steps[boardIndex].boardStrings} />
  <div >
    <button on:click={playBefore}>{"<"}</button>
    <button on:click={playNext}>{">"}</button>
  </div>
</main>

    
<style>

main {
  background-color: rgb(147, 177, 203);
  display: flex;
  align-items: center;
  flex-direction: column;
  padding:2em;
}

</style>