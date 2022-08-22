let blockSize = 25;
let rows = 20;
let cols = 20;
let board;
let ctx;
let score = 0;
// kepala dan buntut ular
let snakeX = blockSize * 5;
let snakeY = blockSize * 5;
let sec = 0;
let velocityX = 0;
let velocityY = 0;
let snakeBody = [];

// makanan ular
let foodX = blockSize * 10;
let foodY = blockSize * 10;

let gameOver = false;

let go = document.getElementById("go");
window.onload = function () {
  board = document.getElementById("board");
  board.height = rows * blockSize;
  board.width = cols * blockSize;
  ctx = board.getContext("2d");
  placeFood();
  runTime();
  document.addEventListener("keyup", ChangeDirection);
  setInterval(update, 1000 / 10);
};

function update() {
  if (gameOver) {
    return;
  }

  //   mengatur background color dari board game
  ctx.fillStyle = "#292b2c";
  ctx.fillRect(0, 0, board.width, board.height);

  //   mengatur warna dari makanan
  ctx.fillStyle = "red";
  ctx.fillRect(foodX, foodY, blockSize, blockSize);
  ctx.strokeRect(foodX, foodY, blockSize, blockSize);
  ctx.strokeStyle = "black";

  // Logic untuk snake sendiri
  snakeColor = ctx.fillStyle = "lime";
  snakeX += velocityX * blockSize;
  snakeY += velocityY * blockSize;
  ctx.fillRect(snakeX, snakeY, blockSize, blockSize);
  ctx.strokeRect(snakeX, snakeY, blockSize, blockSize);
  ctx.strokeStyle = "black";

  logicGame();
  snake();
  isEat();
}

// apakah ular memakan makanan?
function isEat() {
  if (snakeX == foodX && snakeY == foodY) {
    snakeBody.push([foodX, foodY]);
    placeFood();
  }
  skor();
}

function skor() {
  score = snakeBody.length;
  let nilai_text = "Score : " + score;
  document.getElementById("score").innerHTML = nilai_text;
}

// function snake
function snake() {
  for (let i = snakeBody.length - 1; i > 0; i--) {
    snakeBody[i] = snakeBody[i - 1];
  }

  if (snakeBody.length) {
    snakeBody[0] = [snakeX, snakeY];
  }
}

function logicGame() {
  for (let i = 0; i < snakeBody.length; i++) {
    ctx.fillRect(snakeBody[i][0], snakeBody[i][1], blockSize, blockSize);
    // ctx.strokeRect(snakeX, snakeY, blockSize, blockSize);
    ctx.strokeRect(snakeBody[i][0], snakeBody[i][1], blockSize, blockSize);
  }
  gameover();
}

// gameover
function gameover() {
  if (snakeX < 0 || snakeX >= cols * blockSize || snakeY < 0 || snakeY >= rows * blockSize) {
    gameOver = true;
    alert(`Game Over\nScore mu : ${score}`);
    // jika gameover maka tampilkan tombol play again
    document.getElementById("ulang").innerHTML = '<button onclick="restart()">Play Again</button>';
    ctx.font = "30px Hack";
    ctx.fillStyle = "#d9534f";
    ctx.fillText("GAME OVER", blockSize * 7, blockSize * 10);
  }

  for (let i = 0; i < snakeBody.length; i++) {
    if (snakeX == snakeBody[i][0] && snakeY == snakeBody[i][1]) {
      gameOver = true;
      alert(`Game Over\nScore mu : ${score}`);
      // jika gameover maka tampilkan tombol play again
      document.getElementById("ulang").innerHTML = '<button onclick="restart()">Play Again</button>';
      ctx.font = "30px Hack";
      ctx.fillStyle = "#d9534f";
      ctx.fillText("GAME OVER", blockSize * 7, blockSize * 10);
    }
  }
}

function ChangeDirection(e) {
  if (e.code == "ArrowUp" && velocityY != 1) {
    velocityX = 0;
    velocityY = -1;
  } else if (e.code == "ArrowDown" && velocityY != -1) {
    velocityX = 0;
    velocityY = 1;
  } else if (e.code == "ArrowLeft" && velocityX != 1) {
    velocityX = -1;
    velocityY = 0;
  } else if (e.code == "ArrowRight" && velocityX != -1) {
    velocityX = 1;
    velocityY = 0;
  }
}

function placeFood() {
  foodX = Math.floor(Math.random() * cols) * blockSize;
  foodY = Math.floor(Math.random() * rows) * blockSize;
}

function restart() {
  window.location.reload();
}

function time(val) {
  return val > 9 ? val : "0" + val;
}

function runTime() {
  const timeInterval = setInterval(() => {
    document.getElementById("seconds").innerHTML = ":" + time(++sec % 60);
    document.getElementById("minutes").innerHTML = ":" + time(parseInt((sec / 60) % 60));
    document.getElementById("hours").innerHTML = time(parseInt(sec / 3600));

    if (gameOver == true) {
      clearInterval(timeInterval);
    }
  }, 1000);
}
