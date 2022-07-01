<script lang="ts">
  export let gridRows: string[][];
  export let currentPlace: number;

  $: currentBell = currentPlace?.toString();
</script>

{#if gridRows}
  <ul class="grid--container">
    {#each gridRows as row}
      <li class="grid--row">
        {#each row as bell}
          <span
            class="grid--element"
            class:grid--bell__active={bell === currentBell}
            class:grid--bell__treble={bell === '1'}>{bell}</span
          >
        {/each}
      </li>
    {/each}
  </ul>
{/if}

<style lang="scss">
  .grid {
    &--container {
      display: flex;
      flex-direction: column;
      align-items: center;
      padding: 0;
      color: #777;
      list-style: none;
      list-style-position: outside;
      margin: none;
      font-size: 1.2rem;
    }

    &--row {
      display: flex;
      gap: 8px;
      justify-content: center;
      margin: -2px auto;
    }

    &--bell {
      &__treble {
        color: #2563eb;
      }

      &__active {
        color: #e93a00;
      }
    }
  }
</style>
