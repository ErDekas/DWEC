// Elementos del DOM
const paddle1 = document.getElementById("paddle1");
const paddle2 = document.getElementById("paddle2");
const gameContainer = document.querySelector(".game-container");
const ballContainer = document.getElementById("ball-container");
const player1ScoreElem = document.getElementById("player1-score");
const player2ScoreElem = document.getElementById("player2-score");

// Variables del juego
let paddle1Y = 160;
let paddle2Y = 160;
const paddleSpeed = 5;
const paddleHeight = 80;

let balls = [];
let player1Score = 0;
let player2Score = 0;

// Eventos de teclado
let paddle1Direction = 0;
let paddle2Direction = 0;

document.addEventListener("keydown", (e) => {
  if (e.key === "w") paddle1Direction = -1;
  if (e.key === "s") paddle1Direction = 1;
  if (e.key === "ArrowUp") paddle2Direction = -1;
  if (e.key === "ArrowDown") paddle2Direction = 1;
});

document.addEventListener("keyup", (e) => {
  if (e.key === "w" || e.key === "s") paddle1Direction = 0;
  if (e.key === "ArrowUp" || e.key === "ArrowDown") paddle2Direction = 0;
});

// Crear bolas
function addBall() {
  const ballElem = document.createElement("div");
  ballElem.classList.add("ball");
  ballElem.style.left = "390px";
  ballElem.style.top = `${Math.random() * 380}px`; // Posición aleatoria dentro del contenedor
  ballContainer.appendChild(ballElem);

  balls.push({
    elem: ballElem,
    x: 390,
    y: Math.random() * 380,
    speedX: (Math.random() > 0.5 ? 1 : -1) * 4,
    speedY: (Math.random() > 0.5 ? 1 : -1) * 4,
  });
}

function duplicateBalls() {
  const currentBalls = [...balls]; // Clonar el array actual para evitar problemas de referencia

  currentBalls.forEach((ball) => {
    const ballElem = document.createElement("div");
    ballElem.classList.add("ball");
    ballElem.style.left = ball.x + "px";
    ballElem.style.top = ball.y + "px";
    ballContainer.appendChild(ballElem);

    balls.push({
      elem: ballElem,
      x: ball.x,
      y: ball.y,
      speedX: (Math.random() > 0.5 ? 1 : -1) * 4,
      speedY: (Math.random() > 0.5 ? 1 : -1) * 4,
    });
  });
}

// Actualizar el marcador
function updateScore() {
  player1ScoreElem.textContent = player1Score;
  player2ScoreElem.textContent = player2Score;
}

// Lógica del juego
function update() {
  balls.forEach((ball) => {
    ball.x += ball.speedX;
    ball.y += ball.speedY;

    // Rebote en la parte superior e inferior
    if (ball.y <= 0 || ball.y + 20 >= gameContainer.offsetHeight) {
      ball.speedY *= -1;
    }

    // Rebote en los paddles
    if (
      ball.x <= 10 && // Paddle 1
      ball.y + 20 >= paddle1Y &&
      ball.y <= paddle1Y + paddleHeight
    ) {
      ball.speedX *= -1;
    }

    if (
      ball.x + 20 >= gameContainer.offsetWidth - 10 && // Paddle 2
      ball.y + 20 >= paddle2Y &&
      ball.y <= paddle2Y + paddleHeight
    ) {
      ball.speedX *= -1;
    }

    // Comprobar si una bola sale
    if (ball.x <= 0) {
      player2Score++;
      updateScore();
      resetBall(ball);
    }

    if (ball.x + 20 >= gameContainer.offsetWidth) {
      player1Score++;
      updateScore();
      resetBall(ball);
    }

    ball.elem.style.left = ball.x + "px";
    ball.elem.style.top = ball.y + "px";
  });

  // Mover los paddles
  paddle1Y += paddle1Direction * paddleSpeed;
  paddle2Y += paddle2Direction * paddleSpeed;

  // Prevenir que los paddles se salgan del contenedor
  paddle1Y = Math.max(
    0,
    Math.min(paddle1Y, gameContainer.offsetHeight - paddleHeight)
  );
  paddle2Y = Math.max(
    0,
    Math.min(paddle2Y, gameContainer.offsetHeight - paddleHeight)
  );

  paddle1.style.top = paddle1Y + "px";
  paddle2.style.top = paddle2Y + "px";

  requestAnimationFrame(update);
}

// Reiniciar una bola
function resetBall(ball) {
  ball.x = 390;
  ball.y = 190;
  ball.speedX *= -1;
}

// Manejo de teclas para añadir o duplicar bolas
document.addEventListener("keydown", (e) => {
  if (e.key === "Enter" && !e.shiftKey) {
    addBall(); // Añadir una nueva bola
  } else if (e.key === "Enter" && e.shiftKey) {
    duplicateBalls(); // Duplicar bolas existentes
  }
});

// Crear una bola inicial y comenzar
addBall(); // Al menos una bola para iniciar
update();