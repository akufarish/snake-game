// variable dasar
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

// function dasar dari game seperti lebar dan tinggi game
let go = document.getElementById("go");
window.onload = function () {
  board = document.getElementById("board");
  // height
  board.height = rows * blockSize;
  // width
  board.width = cols * blockSize;
  ctx = board.getContext("2d");
  placeFood();
  runTime();
  document.addEventListener("keyup", ChangeDirection);
  setInterval(update, 1000 / 10);
};

// function utama dari game
function update() {
  if (gameOver) {
    return;
  }

  //   mengatur background color dari board game dan ukurannya
  ctx.fillStyle = "#292b2c";
  ctx.fillRect(0, 0, board.width, board.height);

  //   mengatur warna dari makanan dan ukurannya
  ctx.fillStyle = "red";
  ctx.fillRect(foodX, foodY, blockSize, blockSize);
  ctx.strokeRect(foodX, foodY, blockSize, blockSize);
  ctx.strokeStyle = "black";

  // mengatur warna dari ular dan bentuknya
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
  // jika ular memakan makanan maka push makanan ke dalam array snakeBody
  if (snakeX == foodX && snakeY == foodY) {
    snakeBody.push([foodX, foodY]);
    placeFood();
  }
  skor();
}

// function untuk menampilkan skor
function skor() {
  // masukkan snakeBody.length ke variable score
  score = snakeBody.length;
  // buat variable nilai_text dengan value variable score
  let nilai_text = "Score : " + score;
  // gunakan dom untuk menampilkan skor
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

// logic ketika ular memakan buah maka ular akan memanjang
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
  // logic jika ular menabrak tembok
  if (snakeX < 0 || snakeX >= cols * blockSize || snakeY < 0 || snakeY >= rows * blockSize) {
    gameOver = true;
    alert(`Game Over\nScore mu : ${score}`);
    // jika gameover maka tampilkan tombol play again
    document.getElementById("ulang").innerHTML = '<button onclick="restart()">Play Again</button>';
    // jika gameOver = true maka tampilkan tulisan game over
    ctx.font = "30px Hack";
    ctx.fillStyle = "#d9534f";
    ctx.fillText("GAME OVER", blockSize * 7, blockSize * 10);
  }

  // logic jika ular menabrak ekornya sendiri
  for (let i = 0; i < snakeBody.length; i++) {
    if (snakeX == snakeBody[i][0] && snakeY == snakeBody[i][1]) {
      gameOver = true;
      alert(`Game Over\nScore mu : ${score}`);
      // jika gameover maka tampilkan tombol play again
      document.getElementById("ulang").innerHTML = '<button onclick="restart()">Play Again</button>';
      // jika gameOver = true maka tampilkan tulisan game over
      ctx.font = "30px Hack";
      ctx.fillStyle = "#d9534f";
      ctx.fillText("GAME OVER", blockSize * 7, blockSize * 10);
    }
  }
}

// function untuk menggerakkan ular
// menggunakan arrow key
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

  if (e.key == "W" && velocityY != 1) {
    velocityX = 0;
    velocityY = -1;
  } else if (e.key == "S" && velocityY != -1) {
    velocityX = 0;
    velocityY = 1;
  } else if (e.key == "A" && velocityX != 1) {
    velocityX = -1;
    velocityY = 0;
  } else if (e.key == "D" && velocityX != -1) {
    velocityX = 1;
    velocityY = 0;
  }

  if (e.key == "w" && velocityY != 1) {
    velocityX = 0;
    velocityY = -1;
  } else if (e.key == "s" && velocityY != -1) {
    velocityX = 0;
    velocityY = 1;
  } else if (e.key == "a" && velocityX != 1) {
    velocityX = -1;
    velocityY = 0;
  } else if (e.key == "d" && velocityX != -1) {
    velocityX = 1;
    velocityY = 0;
  }
}

// function untuk random food
function placeFood() {
  // function untuk memunculkan makanan ular secara random
  foodX = Math.floor(Math.random() * cols) * blockSize;
  foodY = Math.floor(Math.random() * rows) * blockSize;
}

// function restart ketika diaktifkan refresh page
function restart() {
  // function untuk refresh halaman
  window.location.reload();
}

// function untuk timer
function time(val) {
  return val > 9 ? val : "0" + val;
}

// timer logic
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
