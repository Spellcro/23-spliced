const columnWidth = 16;
const rowHeight = 16;

export const setCanvasData = (gridRows: string[][], currentPlace: string, canvas?: HTMLCanvasElement) => {
  console.log('Running setCanvasData', canvas, currentPlace);
  if (!canvas) return null;
  const context = canvas.getContext('2d');
  context.font = '14px Segoe UI';
  context.fillStyle = '#777';
  // Add the other working bells
  gridRows.forEach((row, rowIndex) => {
    row.forEach((bell, place) => {
      // Don't add the treble or current bell
      if (bell === currentPlace || bell === '1') return;
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

  // Highlight current bell
  const startingPosition = parseInt(currentPlace) - 1;
  context.lineWidth = 2;
  context.strokeStyle = '#e93a00';
  context.beginPath();
  context.moveTo(...getLineCoords(0, startingPosition));
  gridRows.forEach((row, rowIndex) => {
    const bellPosition = row.findIndex((bell) => bell === currentPlace);
    context.lineTo(...getLineCoords(rowIndex, bellPosition));
  });
  context.stroke();

  // Draw a small circle at the start and end locations
};

const getLineCoords = (row: number, col: number): [number, number] => [
  columnWidth * col + 4,
  rowHeight * (row + 1) - 4,
];
