<script>
  export let failed = false;
  export let errorMsg = ""
  const spinnerUrl = "build/assets/ui/spinner.svg";
</script>

<main>

{#if !failed}

 <p>Loading Game..</p>
 <img src={spinnerUrl} alt="loading game" data-testid="loading-indicator"/>

{:else}

 <p>Loading Failed</p>
 <p class="error" data-testid="loading-error-msg">{errorMsg}</p>
 <p class="instructions" data-testid="loading-instructons-msg">Please pass a valid <i>gameId</i> value in the query</p>

{/if}

</main>



<style>
main {
  background-color: darkgray;
  display: flex;
  align-items: center;
  flex-direction: column;
  padding:2em;
}

.error{
    color: brown;
}
</style>