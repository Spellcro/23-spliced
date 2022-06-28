<script lang="ts">
  import { smiths } from './method-data/smiths';
  import { generatePlaceBell, generatePracticeMethod } from './utils/method-generation';

  const methodSet = smiths;
  let targetPlace = '';
  let targetMethod = '';
  let completedLeads = [];
  let allowRepeats = localStorage.getItem('repeat') === 'true';

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
    const place = generatePlaceBell(methodSet.stage);
    const method = generatePracticeMethod(methodSet.methods);
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
    if (shouldGenerateNewMethod) generateRequest();
  };

  const handleRepeatChange = () => {
    // Save new value to localStorage
    localStorage.setItem('repeat', JSON.stringify(allowRepeats));
    // Reset the form without generating a new lead
    reset(false);
  };

  // On initialisation we should generate a lead, and calculate the number of total leads
  const uniqueLeads = methodSet.methods.length * (methodSet.stage - 1);
  generateRequest();

  // Reactive properties
  $: completedLeadsCount = Math.min(uniqueLeads, completedLeads.length + 1);
</script>

<!-- Template -->
<main>
  <label for="allow-repeats" class="checkbox-wrapper">
    <!-- Reset the 'completed leads' status when toggling the checkbox -->
    <input type="checkbox" name="allow-repeats" bind:checked={allowRepeats} on:change={handleRepeatChange} />
    Allow repeats
  </label>
  <p class="chosen-method">{targetPlace} <br /> {targetMethod}</p>
  <button class="button__generate" on:click={handleGenerate}>Generate</button>
  {#if !allowRepeats}
    <p class="lead-count">{completedLeadsCount}/{uniqueLeads}</p>
    <button class="button__reset" on:click={() => reset(true)}>Reset</button>
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
    padding: 1rem;
    color: $brand-primary;
    font-weight: 200;
    text-align: center;
    text-transform: uppercase;
  }

  .checkbox-wrapper {
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 5px;
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

  .lead-count {
    font-size: 0.8rem;
    position: absolute;
    top: 40px;
    left: 50%;
    transform: translateX(-50%);
  }

  .chosen-method {
    margin-top: 2rem;
    font-size: 3rem;
  }

  button {
    display: block;
    border-radius: 3px;
    margin: auto;
    text-transform: inherit;
    transition: all 0.12s linear;
  }

  .button__generate {
    color: $background;
    background-color: $brand-primary;
    padding: 0.5rem 2rem;
    font-size: 2rem;
    margin: 10px auto;

    &:hover {
      background-color: $brand-dark;
    }
  }

  .button__reset {
    margin-top: 1rem;
    background-color: transparent;
    border: 2px solid $brand-primary;
    color: $brand-primary;
    font-size: 1.5rem;

    &:hover,
    &:focus {
      background-color: $brand-primary;
      color: $background;
    }
  }
</style>
