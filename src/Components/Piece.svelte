
<script >
    export let piece = '.'; 

    const whitePieces = ['R', 'N', 'B', 'K', 'Q', 'P'];

    $: isWhite = whitePieces.some(p => p === piece)
    $: imgName = `${isWhite ? 'W' : 'B'}${piece.toUpperCase()}`
    $: imgSrc = `/build/assets/chess_pieces/${imgName}.svg`

    // TODO: Map `piece` to the word, not the symbol
    $: altText = `${isWhite ? 'White' : 'Black'} ${piece}`;
</script>


<div class='piece' data-piecevalue={piece} data-testid="piece">
    {#if whitePieces.some(p => p === piece.toUpperCase()) }
        <img src={imgSrc} alt={altText} data-testid="piece-img"/>
    {/if}
</div>
