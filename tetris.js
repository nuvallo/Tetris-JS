const canvas = document.getElementById("tetris");
const context = canvas.getContext("2d");

// scales each tetris piece
context.scale(20, 20);

const matrix = [
  [0, 0, 0],
  [1, 1, 1],
  [0, 1, 0],
];

function createMatrix(w, h) {
  const matrix = [];
  while (h--) {
    matrix.push(new Array(w).fill(0));
  }
  return matrix;
}

function draw() {
  // Canvas
  context.fillStyle = "#000";
  context.fillRect(0, 0, canvas.clientWidth, canvas.height);

  drawMatrix(arena, { x: 0, y: 0 });

  drawMatrix(player.matrix, player.pos);
}

// Each tetris piece
function drawMatrix(matrix, offset) {
  matrix.forEach((row, y) => {
    row.forEach((value, x) => {
      if (value !== 0) {
        context.fillStyle = "purple";
        // Allows to move around the x and y axis
        context.fillRect(x + offset.x, y + offset.y, 1, 1);
      }
    });
  });
}

function collide(arena, player) {
  const [m, o] = [player.matrix, player.pos];
  for (let y = 0; y < m.length; ++y) {
    for (let x = 0; x < m[y].length; ++x) {
      if (m[y][x] !== 0 && (arena[y + o.y] && arena[y + o.y][x + o.x]) !== 0) {
        return true;
      }
    }
  }
  return false;
}

function merge(arena, player) {
  player.matrix.forEach((row, y) => {
    row.forEach((value, x) => {
      if (value !== 0) {
        arena[y + player.pos.y][x + player.pos.x] = value;
      }
    });
  });
}

function playerDrop() {
  player.pos.y++;
  if (collide(arena, player)) {
    player.pos.y--;
    merge(arena, player);
    player.pos.y = 0;
  }
  dropCounter = 0;
}

function playerMove(dir) {
  player.pos.x + dir;
  if (collide(arena, player)) {
    player.pos.x + dir;
  }
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
    playerDrop();
  }
  draw();
  requestAnimationFrame(update);
}

// where pieces collect
const arena = createMatrix(12, 20);

// player containing position and metrix
const player = {
  pos: { x: 1, y: 5 },
  matrix: matrix,
};

// Event to move positioning
document.addEventListener("keydown", (event) => {
  if (event.keyCode === 37) {
    playerMove(-1);
  } else if (event.keyCode === 39) {
    playerMove(1);
  } else if (event.keyCode === 40) {
    playerDrop();
  }
});

update();
