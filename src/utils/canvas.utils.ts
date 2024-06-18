import { getCharacterNotation } from './notation.utils';

const columnWidth = 16;
const rowHeight = 16;

export const setCanvasData = (gridRows: string[][], placeBell: string, canvas?: HTMLCanvasElement) => {
  if (!canvas || !gridRows?.length) return null;

  const methodStage = gridRows[0].length;
  const currentBell = getCharacterNotation(placeBell);

  const context = canvas.getContext('2d');
  context.font = '14px Segoe UI';
  context.fillStyle = '#777';
  // Add text representations for each bell besides the treble and current place bell
  gridRows.forEach((row, rowIndex) => {
    row.forEach((bell, place) => {
      if (bell === currentBell || bell === '1') return;
      context.fillText(bell, columnWidth * place, rowHeight * (rowIndex + 1));
    });
  });

  // Add a line for the treble
  context.strokeStyle = '#2156cc';
  context.beginPath();
  context.moveTo(...getLineCoords(0, 0));
  gridRows.forEach((row, rowIndex) => {
    const treblesPosition = row.findIndex((bell) => bell === '1');
    context.lineTo(...getLineCoords(rowIndex, treblesPosition));
  });
  context.stroke();
  context.closePath();

  // Highlight current bell
  const startingPosition = parseInt(placeBell) - 1;
  context.lineWidth = 2;
  context.strokeStyle = '#e93a00';
  context.beginPath();
  context.moveTo(...getLineCoords(0, startingPosition));
  gridRows.forEach((row, rowIndex) => {
    const bellPosition = row.findIndex((bell) => bell === currentBell);
    context.lineTo(...getLineCoords(rowIndex, bellPosition));
  });
  context.stroke();
  context.closePath();

  // Indicate the end placebell
  const nextPlacebell = gridRows[gridRows.length - 1].findIndex((bell) => bell === currentBell) + 1;
  context.lineWidth = 1;
  context.fillStyle = '#e93a00';
  context.beginPath();
  context.arc(...getLineCoords(gridRows.length - 1, methodStage), rowHeight / 2, 0, 2 * Math.PI);
  context.stroke();
  context.closePath();
  context.fillText(getCharacterNotation(nextPlacebell), columnWidth * methodStage, rowHeight * gridRows.length);
};

const getLineCoords = (row: number, col: number): [number, number] => [columnWidth * col + 4, rowHeight * row + 10];

/**
 * Gets an appropriate width and height for the canvas, based on the stage
 * @returns [width, height] tuple
 */
export const getCanvasDimensions = (gridRows: string[][]): [number, number] => {
  const stage = gridRows?.length ? gridRows[0].length : 0;
  return [columnWidth * (stage + 1), rowHeight * gridRows.length + 3];
};
