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