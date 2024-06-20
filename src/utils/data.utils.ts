import { fiveSplicedRoyal, nottinghamEight, smiths, standardEight } from '../method-data';

export const getMethodSetData = (setName: string) => {
  switch (setName) {
    case 'smiths':
      return smiths;
    case 'standard-eight':
      return standardEight;
    case 'nottingham-eight':
      return nottinghamEight;
    case 'five-spliced-royal':
      return fiveSplicedRoyal;
    default:
      console.error('`selectMethodSet` received an invalid set name: ' + setName);
      return;
  }
};
