<script>
  import Piece from './Piece.svelte'
  export let boardPieces;
</script>

<main>
  <div class="board">
    {#each boardPieces as piecesRow, nr}
      {#each piecesRow as piece}
        {#if (nr % 2 === 0) }
          <div class="board-position even-row">
            <Piece piece={piece} ></Piece>
          </div>
        {:else}
          <div class="board-position odd-row">
            <Piece piece={piece} ></Piece>
          </div>
        {/if}
      {/each}
    {/each}
  </div>
</main>



<style>
.board{
  background-color: burlywood;
  display:grid;
  grid-template-rows: repeat(8,1fr) ;
  grid-template-columns: repeat(8,1fr) 
}  
.board-position{
  padding: 10px;
}
.even-row:nth-child(odd) {
  background-color:white;
}
.even-row:nth-child(even) {
  background-color:gray;
}
.odd-row:nth-child(odd) {
  background-color:gray;
}
.odd-row:nth-child(even) {
  background-color:white;
}
</style>