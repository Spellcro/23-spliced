<script>
  import { smiths } from './method-data/smiths';
  import { generatePlaceBell, generatePracticeMethod } from './utils/method-generation';

  const methodSet = smiths;
  let targetPlace = '';
  let targetMethod = '';
  let completedMethods = [];

  const uniqueLeads = methodSet.methods.length * (methodSet.stage - 1);

  const handleGenerate = () => {
    // Have to reassign in this way for svelte computed properties to work
    completedMethods = [...completedMethods, `${targetPlace}_${targetMethod}`];

    // If we finished all the leads, show a completion screen
    if (completedMethods.length >= uniqueLeads) {
      showFinishState();
      return;
    }
    // Otherwise we should generate a new lead
    generateRequest();
  };

  const generateRequest = () => {
    const place = generatePlaceBell(methodSet.stage);
    const method = generatePracticeMethod(methodSet.methods);
    if (completedMethods.includes(`${place}_${method}`)) {
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
    completedMethods = [];
    generateRequest();
  };

  generateRequest();

  $: completedMethodsCount = Math.min(uniqueLeads, completedMethods.length + 1);
</script>

<!-- Template -->
<main>
  <p class="methods-completed">{completedMethodsCount}/{uniqueLeads}</p>
  <p class="chosen-method">{targetPlace} <br /> {targetMethod}</p>
  <button class="method-generator" on:click={handleGenerate}>Generate</button>
  <button class="method-reset" on:click={reset}>Reset</button>
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

  .method-generator {
    color: #111111;
    background-color: #e93a00;
    padding: 0.5rem 2rem;
    font-size: 2rem;
    margin: 10px auto;
    border: none;
  }

  .method-generator:hover {
    background-color: #d33500;
  }

  .method-reset {
    margin-top: 1rem;
    background-color: transparent;
    border: 2px solid #e93a00;
    color: #e93a00;
    font-size: 1.5rem;
  }

  .method-reset:hover {
    background-color: #e93a00;
    color: #111111;
  }
</style>
