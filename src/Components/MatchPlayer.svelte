<script >
    import Board from './Board.svelte'
    import { createEventDispatcher } from "svelte"

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

   const dispatch = createEventDispatcher();

    const goBack = () => {
      dispatch('backFromMatch');
    }
</script>

<main data-testid="match-player">
  <Board boardPieces={game.steps[boardIndex].boardStrings} />
  <div >
    <button on:click={playBefore}>{"<"}</button>
    <button on:click={playNext}>{">"}</button>
    <button on:click={goBack}>{"<back>"}</button>
  </div>
</main>

    
<style>

main {
  display: flex;
  align-items: center;
  flex-direction: column;
}

</style>