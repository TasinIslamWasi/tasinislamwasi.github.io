const canvas = document.getElementById("game");
const ctx = canvas.getContext("2d");
const scoreEl = document.getElementById("score");
const bestEl = document.getElementById("best");
const overlay = document.getElementById("overlay");
const overlayTitle = document.getElementById("overlayTitle");
const overlaySubtitle = document.getElementById("overlaySubtitle");
const startBtn = document.getElementById("startBtn");
const touchButtons = document.querySelectorAll(".touch-btn");

const gridSize = 24;
const tiles = 26;
canvas.width = gridSize * tiles;
canvas.height = gridSize * tiles;

const directions = {
  ArrowUp: { x: 0, y: -1 },
  ArrowDown: { x: 0, y: 1 },
  ArrowLeft: { x: -1, y: 0 },
  ArrowRight: { x: 1, y: 0 },
  w: { x: 0, y: -1 },
  s: { x: 0, y: 1 },
  a: { x: -1, y: 0 },
  d: { x: 1, y: 0 },
  W: { x: 0, y: -1 },
  S: { x: 0, y: 1 },
  A: { x: -1, y: 0 },
  D: { x: 1, y: 0 },
};

let snake;
let direction;
let nextDirection;
let food;
let score = 0;
let bestScore = Number(localStorage.getItem("neon-snake-best")) || 0;
let lastTime = 0;
let speed = 120;
let paused = true;
let gameOver = false;
let touchStart = null;

bestEl.textContent = bestScore;

function resetGame() {
  snake = [
    { x: 8, y: 13 },
    { x: 7, y: 13 },
    { x: 6, y: 13 },
  ];
  direction = { x: 1, y: 0 };
  nextDirection = { x: 1, y: 0 };
  score = 0;
  speed = 120;
  gameOver = false;
  placeFood();
  updateScore();
}

function placeFood() {
  let position;
  do {
    position = {
      x: Math.floor(Math.random() * tiles),
      y: Math.floor(Math.random() * tiles),
    };
  } while (snake.some((segment) => segment.x === position.x && segment.y === position.y));
  food = position;
}

function updateScore() {
  scoreEl.textContent = score;
  if (score > bestScore) {
    bestScore = score;
    bestEl.textContent = bestScore;
    localStorage.setItem("neon-snake-best", String(bestScore));
  }
}

function setOverlay(show, title, subtitle) {
  if (show) {
    overlay.classList.add("show");
  } else {
    overlay.classList.remove("show");
  }
  overlayTitle.textContent = title;
  overlaySubtitle.textContent = subtitle;
}

function drawGrid() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.fillStyle = "rgba(6, 10, 22, 0.9)";
  ctx.fillRect(0, 0, canvas.width, canvas.height);
}

function drawSnake() {
  snake.forEach((segment, index) => {
    const gradient = ctx.createLinearGradient(0, 0, gridSize, gridSize);
    gradient.addColorStop(0, "#7cf7ff");
    gradient.addColorStop(1, "#a67cff");
    ctx.fillStyle = index === 0 ? "#5cff89" : gradient;
    ctx.shadowColor = index === 0 ? "rgba(92, 255, 137, 0.8)" : "rgba(124, 247, 255, 0.6)";
    ctx.shadowBlur = 12;
    ctx.fillRect(segment.x * gridSize + 3, segment.y * gridSize + 3, gridSize - 6, gridSize - 6);
  });
  ctx.shadowBlur = 0;
}

function drawFood() {
  const pulse = 0.6 + Math.sin(Date.now() / 200) * 0.4;
  const size = gridSize * (0.5 + pulse * 0.15);
  const offset = (gridSize - size) / 2;
  ctx.beginPath();
  ctx.fillStyle = "#ff6b6b";
  ctx.shadowColor = "rgba(255, 107, 107, 0.8)";
  ctx.shadowBlur = 18;
  ctx.arc(
    food.x * gridSize + gridSize / 2,
    food.y * gridSize + gridSize / 2,
    size / 2,
    0,
    Math.PI * 2
  );
  ctx.fill();
  ctx.shadowBlur = 0;
}

function update(time) {
  if (paused || gameOver) {
    requestAnimationFrame(update);
    return;
  }

  if (time - lastTime < speed) {
    requestAnimationFrame(update);
    return;
  }
  lastTime = time;

  direction = nextDirection;
  const head = { x: snake[0].x + direction.x, y: snake[0].y + direction.y };

  if (head.x < 0 || head.x >= tiles || head.y < 0 || head.y >= tiles) {
    endGame();
    requestAnimationFrame(update);
    return;
  }

  if (snake.some((segment) => segment.x === head.x && segment.y === head.y)) {
    endGame();
    requestAnimationFrame(update);
    return;
  }

  snake.unshift(head);

  if (head.x === food.x && head.y === food.y) {
    score += 10;
    speed = Math.max(60, speed - 2);
    placeFood();
    updateScore();
  } else {
    snake.pop();
  }

  drawFrame();
  requestAnimationFrame(update);
}

function drawFrame() {
  drawGrid();
  drawFood();
  drawSnake();
}

function startGame() {
  resetGame();
  paused = false;
  setOverlay(false, "", "");
  drawFrame();
  requestAnimationFrame(update);
}

function togglePause() {
  if (gameOver) {
    return;
  }
  paused = !paused;
  if (paused) {
    setOverlay(true, "Paused", "Press P or Space to resume.");
  } else {
    setOverlay(false, "", "");
  }
}

function endGame() {
  gameOver = true;
  paused = true;
  setOverlay(true, "Game Over", "Press R or Space to restart.");
}

function handleDirectionChange(key) {
  const next = directions[key];
  if (!next) return;
  if (next.x === -direction.x && next.y === -direction.y) return;
  nextDirection = next;
}

function handleDirectionVector(next) {
  if (!next) return;
  if (next.x === -direction.x && next.y === -direction.y) return;
  nextDirection = next;
}

function handleTouchMove(deltaX, deltaY) {
  if (Math.abs(deltaX) < 20 && Math.abs(deltaY) < 20) return;
  if (Math.abs(deltaX) > Math.abs(deltaY)) {
    handleDirectionVector(deltaX > 0 ? { x: 1, y: 0 } : { x: -1, y: 0 });
  } else {
    handleDirectionVector(deltaY > 0 ? { x: 0, y: 1 } : { x: 0, y: -1 });
  }
}

window.addEventListener("keydown", (event) => {
  if (event.key === " " || event.key === "Spacebar") {
    event.preventDefault();
    if (gameOver || paused) {
      startGame();
    }
    return;
  }

  if (event.key === "p" || event.key === "P") {
    event.preventDefault();
    togglePause();
    return;
  }

  if (event.key === "r" || event.key === "R") {
    event.preventDefault();
    startGame();
    return;
  }

  handleDirectionChange(event.key);
});

startBtn.addEventListener("click", () => {
  startGame();
});

touchButtons.forEach((button) => {
  button.addEventListener("click", (event) => {
    const dir = event.currentTarget.getAttribute("data-dir");
    const action = event.currentTarget.getAttribute("data-action");
    if (dir) {
      const map = {
        up: { x: 0, y: -1 },
        down: { x: 0, y: 1 },
        left: { x: -1, y: 0 },
        right: { x: 1, y: 0 },
      };
      handleDirectionVector(map[dir]);
      return;
    }
    if (action === "start") {
      startGame();
    } else if (action === "pause") {
      togglePause();
    }
  });
});

canvas.addEventListener("touchstart", (event) => {
  if (!event.touches.length) return;
  const touch = event.touches[0];
  touchStart = { x: touch.clientX, y: touch.clientY };
});

canvas.addEventListener("touchmove", (event) => {
  if (!touchStart || !event.touches.length) return;
  const touch = event.touches[0];
  const deltaX = touch.clientX - touchStart.x;
  const deltaY = touch.clientY - touchStart.y;
  handleTouchMove(deltaX, deltaY);
});

canvas.addEventListener("touchend", () => {
  touchStart = null;
});

setOverlay(true, "Press Space to Start", "Arrow keys or WASD to steer. P to pause.");

drawFrame();
