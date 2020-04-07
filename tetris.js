const canvas = document.getElementById("tetris");
const context = canvas.getContext("2d");

// scales each tetris piece
context.scale(20, 20);

const matrix = [
  [0, 0, 0],
  [1, 1, 1],
  [0, 1, 0],
];

function draw() {
  // Canvas
  context.fillStyle = "#000";
  context.fillRect(0, 0, canvas.clientWidth, canvas.height);
  drawMatrix(player.matrix, player.pos);
}

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

// drop animation
let dropCounter = 0;
let dropInterval = 1000;

let lastTime = 0;
function update(time = 0) {
  const deltaTime = time - lastTime;
  lastTime = time;

  dropCounter += deltaTime;
  if (dropCounter > dropInterval) {
    player.pos.y++;
    dropCounter = 0;
  }
  draw();
  requestAnimationFrame(update);
}

// player containing position and metrix
const player = {
  pos: { x: 1, y: 5 },
  matrix: matrix,
};

update();
