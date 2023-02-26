<script>
  export let form

  let url = ''


</script>

<form method="POST" class="url-input-wrapper">
  <label>Source URL
    <input name="url-input" type="text" bind:value={url} />
  </label>
  <button type="submit">READ</button>
</form>

{#if form?.html}
  {@html form?.html}
{/if}

<style>
  .url-input-wrapper {
    display: flex;
    flex-direction: column;
  }

  button {
    height: 2rem;
    width: 4.5rem;
  }
</style>