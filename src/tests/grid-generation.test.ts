import { splitPlaceNotationIntoChanges } from '../utils/grid-generation.utils';

test('It should split place notation correctly into an array of changes', () => {
  const bristolNotation = '-58-14.58-58.36.14-14.58-14-18,18';
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
  expectedChanges.forEach((change, idx) => {
    expect(changes[idx]).toBe(change);
  });
});
