import { isCharNumber } from './characters.utils';

const checkIsValidPlaceNotation = (notation: string) => {
  const regex = new RegExp(/-?(\d{2,}(\.|-))+\d{2,},\d{2,}/);
  return regex.test(notation);
};

/**
 * Takes a place notation string and returns an array
 * containing each change
 */
export const splitPlaceNotationIntoChanges = (notation: string) => {
  if (!checkIsValidPlaceNotation(notation)) return [];
  // TODO: What the fuck
  const firstHalfChanges: string[] = [];
  const [leadNotation, leadEndChange] = notation.split(',');
  // split the 'lead' portion of the notation into each change

  for (let i = 0; i < leadNotation.length; i++) {
    const char = leadNotation.charAt(i);
    switch (leadNotation.charAt(i)) {
      case '.':
        break;
      case '-':
        firstHalfChanges.push(char);
        break;
      default:
        // If the previous char was a number, append this char to the last string in the array. Else start a new array element
        if (i > 0 && isCharNumber(leadNotation.charAt(i - 1))) {
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

  console.log(finalChangeOrder);
  return finalChangeOrder;
};
