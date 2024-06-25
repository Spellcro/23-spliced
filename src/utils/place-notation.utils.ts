const placeNotationRegex = new RegExp(/^-?(\d{2,}(\.|-))+\d{2,},\d{2,}$/);

export const checkIsValidPlaceNotation = (notation: string) => {
  return placeNotationRegex.test(notation);
};
