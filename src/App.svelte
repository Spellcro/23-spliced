<script>
  import { smiths } from './method-data/smiths';
  import { generatePlaceBell, generatePracticeMethod } from './utils/method-generation';

  const methodSet = smiths;
  let targetPlace = '';
  let targetMethod = '';
  let completedLeads = [];

  const handleGenerate = () => {
    // Have to reassign in this way for svelte computed properties to work
    completedLeads = [...completedLeads, `${targetPlace}_${targetMethod}`];

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

  const reset = () => {
    completedLeads = [];
    generateRequest();
  };

  // On initialisation we should generate a lead, and calculate the number of total leads
  const uniqueLeads = methodSet.methods.length * (methodSet.stage - 1);
  generateRequest();

  // Reactive properties
  $: completedLeadsCount = Math.min(uniqueLeads, completedLeads.length + 1);
</script>

<!-- Template -->
<main>
  <p class="methods-completed">{completedLeadsCount}/{uniqueLeads}</p>
  <p class="chosen-method">{targetPlace} <br /> {targetMethod}</p>
  <!-- <div class="checkbox-wrapper">
    <input type="checkbox" name="allow-repeats" />
    <label for="allow-repeats">Allow repeats</label>
  </div> -->
  <button class="button__generate" on:click={handleGenerate}>Generate</button>
  <button class="button__reset" on:click={reset}>Reset</button>
</main>

<!--  -->
<style>
  :global(body) {
    background-color: #111111;
  }

  main {
    max-width: 360px;
    max-height: 540px;
    height: 100%;
    margin: auto;
    padding: 1rem;
    color: #e93a00;
    font-weight: 200;
    text-align: center;
    text-transform: uppercase;
  }

  .checkbox-wrapper {
    display: flex;
    justify-content: center;
    align-items: center;
  }

  input[type='checkbox'] {
    margin: 0 5px 0 0;
  }

  .methods-completed {
    font-size: 0.8rem;
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
    color: #111111;
    background-color: #e93a00;
    padding: 0.5rem 2rem;
    font-size: 2rem;
    margin: 10px auto;
    border: none;
  }

  .button__generate:hover {
    background-color: #d33500;
  }

  .button__reset {
    margin-top: 1rem;
    background-color: transparent;
    border: 2px solid #e93a00;
    color: #e93a00;
    font-size: 1.5rem;
  }

  .button__reset:hover {
    background-color: #e93a00;
    color: #111111;
  }
</style>