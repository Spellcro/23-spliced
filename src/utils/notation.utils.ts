/**
 * Converts a bell's number to its character representation in place notation
 */
export const getCharacterNotation = (bell: string | number) => {
  switch (bell.toString()) {
    case '12':
      return 'T';
    case '11':
      return 'E';
    case '10':
      return '0';
    default:
      return bell.toString();
  }
};

/**
 * Converts a bell's character representation in place notation to the number
 */
export const getNumericalPosition = (place: string) => {
  switch (place) {
    case '0':
      return 10;
    case 'E':
      return 11;
    case 'T':
      return 12;
    default:
      return parseInt(place);
  }
};
