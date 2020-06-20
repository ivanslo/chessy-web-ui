<script>
    import Board from './Board.svelte'

    // TODO: consume from another file (JSON?)
    const boards = [
      [
        ['r', 'n', 'b', 'q', 'k', 'b', 'n', 'r'],
        ['p', 'p', 'p', 'p', 'p', 'p', 'p', 'p'],
        ['.', '.', '.', '.', '.', '.', '.', '.'],
        ['.', '.', '.', '.', '.', '.', '.', '.'],
        ['.', '.', '.', '.', '.', '.', '.', '.'],
        ['.', '.', '.', '.', '.', '.', '.', '.'],
        ['P', 'P', 'P', 'P', 'P', 'P', 'P', 'P'],
        ['R', 'N', 'B', 'Q', 'K', 'B', 'N', 'R']
      ],
      [
        ['r', 'n', 'b', 'q', 'k', 'b', 'n', 'r'],
        ['p', 'p', 'p', 'p', 'p', 'p', 'p', 'p'],
        ['.', '.', '.', '.', '.', '.', '.', '.'],
        ['.', '.', '.', '.', '.', '.', '.', '.'],
        ['.', '.', '.', '.', 'P', '.', '.', '.'],
        ['.', '.', '.', '.', '.', '.', '.', '.'],
        ['P', 'P', 'P', 'P', '.', 'P', 'P', 'P'],
        ['R', 'N', 'B', 'Q', 'K', 'B', 'N', 'R']
      ],
      [
        ['r', '.', 'b', 'q', 'k', 'b', 'n', 'r'],
        ['p', 'p', 'p', 'p', 'p', 'p', 'p', 'p'],
        ['.', '.', 'n', '.', '.', '.', '.', '.'],
        ['.', '.', '.', '.', '.', '.', '.', '.'],
        ['.', '.', '.', '.', 'P', '.', '.', '.'],
        ['.', '.', '.', '.', '.', '.', '.', '.'],
        ['P', 'P', 'P', 'P', '.', 'P', 'P', 'P'],
        ['R', 'N', 'B', 'Q', 'K', 'B', 'N', 'R']
      ],
      [
        ['r', '.', 'b', 'q', 'k', 'b', 'n', 'r'],
        ['p', 'p', 'p', 'p', 'p', 'p', 'p', 'p'],
        ['.', '.', 'n', '.', '.', '.', '.', '.'],
        ['.', '.', '.', '.', '.', '.', '.', '.'],
        ['.', '.', '.', '.', 'P', '.', '.', '.'],
        ['.', '.', '.', 'P', '.', '.', '.', '.'],
        ['P', 'P', 'P', '.', '.', 'P', 'P', 'P'],
        ['R', 'N', 'B', 'Q', 'K', 'B', 'N', 'R']
      ]
    ]

    let boardIndex = 0;

    const clamp = (n, min, max) => {
      if( n < min ) return min;
      if( n > max ) return max;
      return n;
    }

    const playNext = () => {
      boardIndex = clamp(boardIndex+1, 0, boards.length-1)
    }

    const playBefore = () => {
      boardIndex = clamp(boardIndex-1, 0, boards.length-1)
    }
</script>

<main>
  <Board boardPieces={boards[boardIndex]} />
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