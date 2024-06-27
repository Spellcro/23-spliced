import { getInitialChange, splitPlaceNotationIntoChanges } from '../utils/grid-generation.utils';
import { checkIsValidPlaceNotation } from '../utils/place-notation.utils';

const bristolMajor = '-58-14.58-58.36.14-14.58-14-18,18';
const bristolRoyal = '-50-14.50-50.36.14-70.58.16-16.70-16-10,10';
const bristolMax = '-5T-14.5T-5T.36.14-7T.58.16-9T.70.18-18.9T-18-1T,1T';

test('Identifies correct place notation', () => {
  expect(checkIsValidPlaceNotation(bristolMajor)).toBe(true);
  expect(checkIsValidPlaceNotation(bristolRoyal)).toBe(true);
  expect(checkIsValidPlaceNotation(bristolMax)).toBe(true);
});

test('Identifies incorrect place notation', () => {
  expect(checkIsValidPlaceNotation('-14-58-12--12-16-38.14-58,12')).toBe(false);
  expect(checkIsValidPlaceNotation('-14-58-12-.12-16-38.14-58,12')).toBe(false);
  expect(checkIsValidPlaceNotation('-14-58-12..12-16-38.14-58,12')).toBe(false);
  expect(checkIsValidPlaceNotation('-1F-58-12..12-16-38.14-58,12')).toBe(false);
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

  const changes = splitPlaceNotationIntoChanges(bristolMajor);
  expect(changes.length).toBe(expectedChanges.length);
  expect(changes).toEqual(expectedChanges);
});
