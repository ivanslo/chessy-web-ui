<script>
    import { createEventDispatcher } from "svelte"

    export let gameInfo;

    const dispatch = createEventDispatcher();

    const dispatchSelectGame = (gameStr) => {
        dispatch( 'gameSelected', { text: gameStr});
    }
</script>


<div class="gameItem" on:click={() => dispatchSelectGame(gameInfo.id.S)}>
    <span class="white" >{gameInfo.White.S}</span>
    <span class="vs">{gameInfo.Result.S}</span>
    <span class="black">{gameInfo.Black.S}</span>
    <span class="where">{gameInfo.Event.S}</span>
</div>


<style>
    .gameItem {
        font-family: "aceh";
        width:100%;
        display: flex;
        color: #0A0908;
    }
    .gameItem:hover {
        background-color: #F5853F;
        color: #F5F0F6;
    }

    p {
        padding: 0;
        margin:0;
    }
    span {
        white-space: nowrap;
    }
    span.white {
        flex: 1;
        text-align: right;
    }
    span.black {
        flex: 1;
        text-align: left;
    }
    span.vs{
        width: 6em;
        text-align: center;
        font-weight: bold;
    }
    span.where{
        display: none;
    }
    @media (min-width: 640px) {
        span.where{
            display:block;
            flex: 1;
            text-align: left;
            color: rgba(10,9,8,0.6)
        }
    }
</style>

