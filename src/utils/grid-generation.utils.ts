import { checkIsValidPlaceNotation } from './place-notation.utils';
import { getNumericalPosition } from './notation.utils';

/**
 * Takes a place notation string and returns an array
 * containing each change
 */
export const splitPlaceNotationIntoChanges = (notation: string) => {
  if (!checkIsValidPlaceNotation(notation)) return [];

  const firstHalfChanges: string[] = [];
  const [leadNotation, leadEndChange] = notation.split(',');
  // split the 'lead' portion of the notation into each change

  for (let i = 0; i < leadNotation.length; i++) {
    const char = leadNotation.charAt(i);
    switch (char) {
      case '.':
        break;
      case '-':
        firstHalfChanges.push(char);
        break;
      default:
        // If the previous char was a number, append this char to the last string in the array. Else start a new array element
        if (i > 0 && !isNaN(parseInt(leadNotation.charAt(i - 1)))) {
          firstHalfChanges[firstHalfChanges.length - 1] += char;
        } else {
          firstHalfChanges.push(char);
        }
        break;
    }
  }

  // Mirror the array around the halflead
  const secondHalfChanges = firstHalfChanges.slice(0, -1).reverse();

  // Assemble the complete order of changes
  const finalChangeOrder = [...firstHalfChanges, ...secondHalfChanges, leadEndChange];

  return finalChangeOrder;
};

export const generateGrid = (stage: number, notation: string) => {
  const changes = splitPlaceNotationIntoChanges(notation);
  const rounds = getInitialChange(stage);

  const rows: string[][] = [rounds];

  changes.forEach((change, index) => {
    const previousRow = rows[index];
    const nextRow: string[] = [];

    // Make places if the change is not a 'cross'
    if (change !== '-') {
      change.split('').forEach((place) => {
        const position = getNumericalPosition(place);
        nextRow[position - 1] = previousRow[position - 1];
      });
    }

    for (let i = previousRow.length - 1; i >= 0; i -= 1) {
      // If it already has a value ignore it
      // if it has a neigbour with no value switch it, else keep it as it was
      if (!nextRow[i]) {
        if (i > 0 && !nextRow[i - 1]) {
          nextRow[i] = previousRow[i - 1]; // need swapping
          nextRow[i - 1] = previousRow[i];
        } else {
          nextRow[i] = previousRow[i]; // forced places
        }
      }
    }
    rows.push(nextRow);
  });

  return rows;
};

/**
 * Generates 'rounds' for a given stage
 * @param stage
 */
export const getInitialChange = (stage: number) => {
  const rounds: string[] = [];

  for (let i = 1; i <= stage; i++) {
    switch (i) {
      case 10:
        rounds.push('0');
        break;
      case 11:
        rounds.push('E');
        break;
      case 12:
        rounds.push('T');
        break;
      default:
        rounds.push(i.toString());
    }
  }

  return rounds;
};
