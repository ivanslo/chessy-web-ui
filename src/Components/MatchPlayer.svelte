<script lang="typescript">
    import Board from './Board.svelte'
    import { getGame , Game } from '../Data/GameProvider'


    const game:Game = getGame('anyone');

    let boardIndex: number = 0;

    const clamp = (n:number, min: number, max:number) =>  {
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

<main>
  <Board boardPieces={game.steps[boardIndex].board} />
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