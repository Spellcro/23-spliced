<script>
  const methodList = [
    'Ashtead',
    'Bristol',
    'Cambridge',
    'Cassiobury',
    'Cornwall',
    'Cray',
    'Double Dublin',
    'Glasgow',
    'Ipswich',
    'Jersey',
    'Lincolnshire',
    'Lindum',
    'London',
    'Preston',
    'Pudsey',
    'Rutland',
    'Superlative',
    'Tavistock',
    'Uxbridge',
    'Watford',
    'Wembley',
    'Whalley',
    'Yorkshire',
  ];

  const generatePlaceBell = () => {
    const placeBell = Math.floor(Math.random() * 7) + 2; // Random int from 2 to 8 inclusive
    switch (placeBell) {
      case 2:
        return '2nds';
      case 3:
        return '3rds';
      default:
        return `${placeBell}ths`;
    }
  };

  const generatePracticeMethod = () => {
    const place = generatePlaceBell();
    const methodIndex = Math.floor(Math.random() * methodList.length);
    const method = methodList[methodIndex];
    return `${place} place ${method}`;
  };

  const generateRequest = () => {
    target = generatePracticeMethod();
  };

  let target = generatePracticeMethod();
</script>

<main>
  <h1>{target}</h1>
  <button on:click={generateRequest}>Generate</button>
</main>

<style>
  main {
    text-align: center;
    padding: 1rem;
  }

  h1 {
    color: #d33500;
    text-transform: uppercase;
    font-size: 3rem;
    font-weight: 200;
  }
</style>
