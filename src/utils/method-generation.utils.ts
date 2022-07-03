/**
 * Selects a random place bell from those available
 * @param stage the number of bells being rung
 * @returns Text representation of the spoken form of the chosen place bell (e.g "2nds place")
 */
export const generatePlaceBell = (stage: number) => {
  const placeBell = Math.floor(Math.random() * (stage - 1)) + 2; // Random int from 2 to {stage} inclusive
  switch (placeBell) {
    case 2:
      return '2nds place';
    case 3:
      return '3rds place';
    default:
      return `${placeBell}ths place`;
  }
};

/**
 * Selects a method at random from the provided list of methods
 * @param methodList The list of the methods to select a random place bell from
 * @returns Text containing the chosen method
 */
export const generatePracticeMethod = (methodList: string[]) => {
  const methodIndex = Math.floor(Math.random() * methodList.length);
  return methodList[methodIndex];
};
