const canvas = document.getElementById("tetris");
const context = canvas.getContext("2d");

// scales each tetris piece
context.scale(20, 20);

// Canvas
context.fillStyle = "#000";
context.fillRect(0, 0, canvas.clientWidth, canvas.height);

const matrix = [
  [0, 0, 0],
  [1, 1, 1],
  [0, 1, 0],
];

// Each tetris piece
function drawMatrix(matrix, offset) {
  matrix.forEach((row, y) => {
    row.forEach((value, x) => {
      if (value !== 0) {
        context.fillStyle = "red";
        // Allows to move around the x and y axis
        context.fillRect(x + offset.x, y + offset.y, 1, 1);
      }
    });
  });
}

// player containing position and metrix
const player = {
  pos: { x: 1, y: 5 },
  matrix: matrix,
};

// Takes in the x and y values
drawMatrix(player.matrix, player.pos);
