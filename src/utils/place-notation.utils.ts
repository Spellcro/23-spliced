const placeNotationRegex = new RegExp(/^-?((\d|E|T){2,}(\.|-))+(\d|E|T){2,},(\d|E|T){2,}$/);

export const checkIsValidPlaceNotation = (notation: string) => {
  return placeNotationRegex.test(notation);
};
