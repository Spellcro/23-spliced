<script>
  import { smiths } from './method-data/smiths';
  import { generatePlaceBell, generatePracticeMethod } from './utils/method-generation';

  const methodSet = smiths;
  let targetPlace = '';
  let targetMethod = '';
  let completedMethods = [];

  const uniqueLeads = methodSet.methods.length * (methodSet.stage - 1);

  const handleGenerate = () => {
    completedMethods.push(`${targetPlace}_${targetMethod}`);
    console.log(completedMethods);
    // If we finished all the leads, show a completion screen
    if (completedMethods.length >= uniqueLeads) {
      showFinishState();
      return;
    }
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
</script>

<!-- Template -->
<main>
  <p class="chosen-method">{targetPlace} <br /> {targetMethod}</p>
  <button class="method-generator" on:click={handleGenerate}>Generate</button>
  <button class="method-reset" on:click={reset}>Reset</button>
</main>

<!--  -->
<style>
  main {
    max-width: 360px;
    max-height: 540px;
    height: 100%;
    margin: auto;
    text-align: center;
    padding: 1rem;
    border: 1px solid black;
  }

  .chosen-method {
    color: #d33500;
    text-transform: uppercase;
    font-size: 3rem;
    font-weight: 200;
  }

  .method-generator,
  .method-reset {
    display: block;
    color: white;
    background-color: #e93a00;
    border: 1px solid #cccccc;
    border-radius: 4px;
    padding: 0.5rem 2rem;
    font-size: 2rem;
    font-weight: 200;
    margin: 10px auto;
  }

  .method-generator:hover,
  .method-reset:hover {
    background-color: #d33500;
  }
</style>
