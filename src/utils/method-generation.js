/**
 * Selects a random place bell from those available
 * @param {number} stage the number of bells being rung
 * @returns {string} Text representation of the spoken form of the chosen place bell (e.g "2nds place")
 */
export const generatePlaceBell = (stage) => {
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
 * @param {string[]} methodList The list of the methods to select a random place bell from
 * @returns {string} Text containing the chosen method
 */
export const generatePracticeMethod = (methodList) => {
  const methodIndex = Math.floor(Math.random() * methodList.length);
  return methodList[methodIndex];
};
