
<script >
    export let piece = '.'; 

    $: isWhite = ['R', 'N', 'B', 'K', 'Q', 'P'].some(p => p === piece)
    $: imgName = `${isWhite ? 'W' : 'B'}${piece.toUpperCase()}`
    $: imgSrc = `/build/assets/chess_pieces/${imgName}.svg`

    // TODO: Map `piece` to the word, not the symbol
    $: altText = `${isWhite ? 'White' : 'Black'} ${piece}`;
</script>


<div class='piece'>
    {#if piece !== '.'}
        <img src={imgSrc} alt={altText}/>
    {/if}
</div>
