import { getInitialChange, splitPlaceNotationIntoChanges } from '../utils/grid-generation.utils';
import { checkIsValidPlaceNotation } from '../utils/place-notation.utils';

const bristolNotation = '-58-14.58-58.36.14-14.58-14-18,18';

test('Identifies correct place notation', () => {
  expect(checkIsValidPlaceNotation(bristolNotation)).toBe(true);
});

test('Identifies incorrect place notation', () => {
  expect(checkIsValidPlaceNotation('-14-58-12--12-16-38.14-58,12')).toBe(false);
  expect(checkIsValidPlaceNotation('-14-58-12-.12-16-38.14-58,12')).toBe(false);
  expect(checkIsValidPlaceNotation('-14-58-12..12-16-38.14-58,12')).toBe(false);
});

test('Correctly generate rounds for Major', () => {
  expect(getInitialChange(8)).toEqual(['1', '2', '3', '4', '5', '6', '7', '8']);
});

test('Correctly generate rounds for Royal', () => {
  expect(getInitialChange(10)).toEqual(['1', '2', '3', '4', '5', '6', '7', '8', '9', '0']);
});

test('Correctly generate rounds for Max', () => {
  expect(getInitialChange(12)).toEqual(['1', '2', '3', '4', '5', '6', '7', '8', '9', '0', 'E', 'T']);
});

test('Correctly split place notation into an array of changes', () => {
  const expectedChanges = [
    '-',
    '58',
    '-',
    '14',
    '58',
    '-',
    '58',
    '36',
    '14',
    '-',
    '14',
    '58',
    '-',
    '14',
    '-',
    '18',
    '-',
    '14',
    '-',
    '58',
    '14',
    '-',
    '14',
    '36',
    '58',
    '-',
    '58',
    '14',
    '-',
    '58',
    '-',
    '18',
  ];

  const changes = splitPlaceNotationIntoChanges(bristolNotation);
  expect(changes.length).toBe(expectedChanges.length);
  expect(changes).toEqual(expectedChanges);
});
