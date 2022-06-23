<script>
  import { smiths } from './method-data/smiths';
  import { generatePlaceBell, generatePracticeMethod } from './utils/method-generation';

  const methodSet = smiths;
  let targetPlace = '';
  let targetMethod = '';

  const generateRequest = () => {
    targetPlace = generatePlaceBell(methodSet.stage);
    targetMethod = generatePracticeMethod(methodSet.methods);
  };

  generateRequest();
</script>

<!-- Template -->
<main>
  <p class="chosen-method">{targetPlace} <br /> {targetMethod}</p>
  <button class="method-generator" on:click={generateRequest}>Generate</button>
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

  .method-generator {
    display: block;
    color: white;
    background-color: #e93a00;
    border: 1px solid #cccccc;
    border-radius: 4px;
    padding: 0.5rem 2rem;
    font-size: 2rem;
    font-weight: 200;
    margin: auto;
  }

  .method-generator:hover {
    background-color: #d33500;
  }
</style>
