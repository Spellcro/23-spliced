<script lang="ts">
  import Grid from './components/Grid.svelte';
  import { smiths } from './method-data/smiths';
  import { generateGrid } from './utils/grid-generation';
  import { generatePlaceBell, generatePracticeMethod } from './utils/method-generation';

  const methodSet = smiths;
  const methodNames = methodSet.methods.map((m) => m.name);
  let targetPlace = '';
  let targetMethod = '';
  let completedLeads = [];
  let allowRepeats = localStorage.getItem('repeat') === 'true';
  let gridRows = [];
  let isShowingGrid = false;

  const handleGenerate = () => {
    // If repeats are disabled, add the current lead to the list of completed leads
    if (!allowRepeats) {
      // Have to reassign in this way for svelte computed properties to work
      completedLeads = [...completedLeads, `${targetPlace}_${targetMethod}`];
    }

    // If we finished all the leads, show a completion screen
    if (completedLeads.length >= uniqueLeads) {
      showFinishState();
      return;
    }
    // Otherwise we should generate a new lead
    generateRequest();
  };

  const generateRequest = () => {
    hideGrid();

    const place = generatePlaceBell(methodSet.stage);
    const method = generatePracticeMethod(methodNames);
    if (completedLeads.includes(`${place}_${method}`)) {
      generateRequest();
      return;
    }
    targetPlace = place;
    targetMethod = method;
  };

  const showFinishState = () => {
    targetPlace = 'Completed!';
    targetMethod = 'Reset to continue';
  };

  const reset = (shouldGenerateNewMethod: boolean) => {
    completedLeads = [];
    hideGrid();
    if (shouldGenerateNewMethod) generateRequest();
  };

  const handleRepeatChange = () => {
    // Save new value to localStorage
    localStorage.setItem('repeat', JSON.stringify(allowRepeats));
    // Reset the form without generating a new lead
    reset(false);
  };

  const showGrid = () => {
    const placeNotation = methodSet.methods.find((m) => m.name === targetMethod)?.placeNotation;
    gridRows = generateGrid(methodSet.stage, placeNotation);
    isShowingGrid = true;
  };

  const hideGrid = () => {
    isShowingGrid = false;
  };

  // On initialisation we should generate a lead, and calculate the number of total leads
  const uniqueLeads = methodSet.methods.length * (methodSet.stage - 1);
  generateRequest();

  // Reactive properties
  $: currentPlace = parseInt(targetPlace);
  $: completedLeadsCount = Math.min(uniqueLeads, completedLeads.length + 1);
</script>

<!-- Template -->
<main>
  <label for="allow-repeats" class="repeats-checkbox">
    <!-- Reset the 'completed leads' status when toggling the checkbox -->
    <input type="checkbox" name="allow-repeats" bind:checked={allowRepeats} on:change={handleRepeatChange} />
    Allow repeats
  </label>
  <!-- Lead tracker and reset button -->
  {#if !allowRepeats}
    <div class="tracker">
      <p>{completedLeadsCount}/{uniqueLeads}</p>
      <button on:click={() => reset(true)}>Reset</button>
    </div>
  {/if}
  {#if isShowingGrid}
    <p class="chosen-method__small">{targetMethod}</p>
    <Grid {gridRows} {currentPlace} />
    <button class="actions--button" on:click={hideGrid}>Hide Grid</button>
  {:else}
    <p class="chosen-method">{targetPlace} <br /> {targetMethod}</p>
    <div class="actions--container">
      <button class="actions--button" on:click={handleGenerate}>Next Lead</button>
      <button class="actions--button" on:click={showGrid}>Show Grid</button>
    </div>
  {/if}
</main>

<!--  -->
<style lang="scss">
  $brand-primary: #e93a00;
  $brand-dark: #d33500;
  $background: #111;

  main {
    max-width: 360px;
    max-height: 540px;
    margin: auto;
    padding: 0.5rem 1rem;
    color: $brand-primary;
    font-weight: 200;
    text-align: center;
    text-transform: uppercase;
  }

  .repeats-checkbox {
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 5px;
    margin-bottom: 3rem;
  }

  input[type='checkbox'] {
    // Hide the default checkbox styles:
    appearance: none;
    margin: 0;
    // Style actual checkbox
    width: 1.15em;
    height: 1.15em;
    border: 0.15em solid $brand-primary;
    border-radius: 3px;
    transform: translateY(-0.075em);
    // Allow easy centering of ::before element
    display: grid;
    place-content: center;

    &::before {
      content: '';
      width: 0.65em;
      height: 0.65em;
      transform: scale(0); // Checked state should be hidden by default
      transition: 80ms transform ease-in-out;
      box-shadow: inset 1em 1em $brand-primary;
    }

    &:checked::before {
      // Scale up the 'checked' state of the input when checked
      transform: scale(1);
    }
  }

  .tracker {
    position: absolute;
    display: flex;
    // align-items: center;
    // justify-content: center;
    top: 40px;
    left: 50%;
    transform: translateX(-50%);

    p {
      margin: 0.4em;
    }

    button {
      background-color: transparent;
      color: $brand-primary;

      &:hover {
        background-color: rgba(233, 58, 0, 0.15);
      }
    }
  }

  .chosen-method {
    font-size: 3rem;

    &__small {
      font-size: 1rem;
      margin: 0;
    }
  }

  button {
    text-transform: inherit;
    transition: all 0.12s linear;
  }

  .actions {
    &--container {
      display: grid;
      grid-template-columns: repeat(2, minmax(0, 1fr));
      gap: 2px;
    }

    &--button {
      display: block;
      border-radius: 3px;
      color: $background;
      background-color: $brand-primary;
      padding: 0.75rem 0.5rem;
      font-size: 1.5rem;
      width: 100%;

      &:hover {
        background-color: $brand-dark;
      }
    }
  }
</style>
