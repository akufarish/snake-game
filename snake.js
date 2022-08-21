let blockSize = 25;
let rows = 20;
let cols = 20;
let board;
let context;
let score = 0;
// kepala ular
let snakeX = blockSize * 5;
let snakeY = blockSize * 5;

let velocityX = 0;
let velocityY = 0;

let snakeBody = [];

// food
let foodX = blockSize * 10;
let foodY = blockSize * 10;

let gameOver = false;

window.onload = function () {
  board = document.getElementById("board");
  board.height = rows * blockSize;
  board.width = cols * blockSize;
  context = board.getContext("2d");

  placeFood();
  document.addEventListener("keyup", ChangeDirection);

  // update();
  setInterval(update, 1000 / 10);
};

function update() {
  if (gameOver) {
    return;
  }
  // mengatur background color dari board game
  context.fillStyle = "black";
  context.fillRect(0, 0, board.width, board.height);

  // mengatur warna dari makanan
  context.fillStyle = "red";
  // context.fillRect(foodX, foodY, blockSize, blockSize);
  context.fillRect(foodX, foodY, blockSize, blockSize);
  // context.beginPath();
  // context.arc(foodX, foodY, 13.5, blockSize, blockSize * Math.PI);
  // context.fill();
  // context.closePath();
  // context.arc(foodX, foodY, blockSize, blockSize, Math.PI);

  if (snakeX == foodX && snakeY == foodY) {
    snakeBody.push([foodX, foodY]);

    // setiap ular memakan buah maka skor nya akan bertambah
    score = snakeBody.length;
    let nilai_text = "Score : " + score;
    document.getElementById("score").innerHTML = nilai_text;

    placeFood();
  }

  for (let i = snakeBody.length - 1; i > 0; i--) {
    snakeBody[i] = snakeBody[i - 1];
  }

  // if (snakeBody.length) {
  //   snakeBody[0] = [snakeX, snakeY];
  //   // snake.cells = [];
  //   // snake.maxCells = 4;
  //   // snake.dx = grid;
  //   // snake.dy = 0;
  //   // nilai = 0;
  // }

  if (snakeBody.length) {
    snakeBody[0] = [snakeX, snakeY];
  }

  // Logic untuk snake sendiri
  context.fillStyle = "lime";
  snakeX += velocityX * blockSize;
  snakeY += velocityY * blockSize;
  // context.beginPath();
  context.fillRect(snakeX, snakeY, blockSize, blockSize);
  // context.strokeStyle = "white";
  // context.Stroke();
  // context.arc(snakeX, snakeY, 15, blockSize, blockSize * Math.PI);
  // context.fill();
  // context.closePath();
  for (let i = 0; i < snakeBody.length; i++) {
    context.fillRect(snakeBody[i][0], snakeBody[i][1], blockSize, blockSize);
  }

  // logic jika tertabrak tembok maka akan gameover
  if (snakeX < 0 || snakeX >= cols * blockSize || snakeY < 0 || snakeY >= rows * blockSize) {
    gameOver = true;
    alert(`Game Over\nScore mu : ${score}`);
    // jika gameover maka tampilkan tombol play again
    document.getElementById("ulang").innerHTML = '<button onclick="restart()">Play Again</button>';
  }

  // logic jika menabrak buntut ular maka akan gameover
  for (let i = 0; i < snakeBody.length; i++) {
    if (snakeX == snakeBody[i][0] && snakeY == snakeBody[i][1]) {
      gameOver = true;
      alert(`Game Over\nScore mu : ${score}`);
      // jika gameover maka tampilkan tombol play again
      document.getElementById("ulang").innerHTML = '<button onclick="restart()">Play Again</button>';
    }
  }
}

// fungsi untuk kontrol snake
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

  // if (e.key == "W" && velocityY != 1) {
  //   velocityX = 0;
  //   velocityY = -1;
  // } else if (e.key == "S" && velocityY != -1) {
  //   velocityX = 0;
  //   velocityY = 1;
  // } else if (e.key == "A" && velocityX != 1) {
  //   velocityX = -1;
  //   velocityY = 0;
  // } else if (e.key == "D" && velocityX != -1) {
  //   velocityX = 1;
  //   velocityY = 0;
  // }

  // if (e.key == "w" && velocityY != 1) {
  //   velocityX = 0;
  //   velocityY = -1;
  // } else if (e.key == "s" && velocityY != -1) {
  //   velocityX = 0;
  //   velocityY = 1;
  // } else if (e.key == "a" && velocityX != 1) {
  //   velocityX = -1;
  //   velocityY = 0;
  // } else if (e.key == "d" && velocityX != -1) {
  //   velocityX = 1;
  //   velocityY = 0;
  // }
}

function placeFood() {
  foodX = Math.floor(Math.random() * cols) * blockSize;
  foodY = Math.floor(Math.random() * rows) * blockSize;
}

function restart() {
  window.location.reload();
}
