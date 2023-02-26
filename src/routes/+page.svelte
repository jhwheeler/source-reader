<script>
  export let form

  let url = ''

  $: console.log('parsed source html', form?.html)

</script>

<form method="POST" class="url-input-wrapper">
  <label>Source URL
    <input name="url-input" type="text" bind:value={url} />
  </label>
  <input type="submit" value="Read" />
</form>

{#if form?.html}
  {@html form?.html}
{/if}

<style>
  .url-input-wrapper {
    display: flex;
    flex-direction: column;
  }
</style>