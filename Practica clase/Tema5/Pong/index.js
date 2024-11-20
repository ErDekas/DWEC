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
let particles = [];
let player1Score = 0;
let player2Score = 0;

// Clase Partícula
class Particle {
    constructor(x, y, color) {
        this.x = x;
        this.y = y;
        this.color = color;
        this.size = Math.random() * 3 + 2;
        this.speedX = (Math.random() - 0.5) * 8;
        this.speedY = (Math.random() - 0.5) * 8;
        this.life = 1; // Valor de opacidad, se irá reduciendo
        this.element = document.createElement('div');
        this.element.className = 'particle';
        this.element.style.position = 'absolute';
        this.element.style.width = this.size + 'px';
        this.element.style.height = this.size + 'px';
        this.element.style.backgroundColor = color;
        this.element.style.borderRadius = '50%';
        ballContainer.appendChild(this.element);
    }

    update() {
        this.life -= 0.02;
        this.x += this.speedX;
        this.y += this.speedY;
        this.speedY += 0.1; // Gravedad
        this.element.style.left = this.x + 'px';
        this.element.style.top = this.y + 'px';
        this.element.style.opacity = this.life;
    }

    remove() {
        this.element.remove();
    }
}

// Crear explosión de partículas
function createExplosion(x, y, isLeftSide) {
    const color = isLeftSide ? '#ff4444' : '#4444ff'; // Rojo para lado izquierdo, azul para derecho
    const particleCount = 30;
    
    for (let i = 0; i < particleCount; i++) {
        particles.push(new Particle(x, y, color));
    }
}

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
    ballElem.style.top = `${Math.random() * 380}px`;
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
    const currentBalls = [...balls];

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

function updateScore() {
    player1ScoreElem.textContent = player1Score;
    player2ScoreElem.textContent = player2Score;
}

// Actualizar partículas
function updateParticles() {
    for (let i = particles.length - 1; i >= 0; i--) {
        particles[i].update();
        
        // Eliminar partículas muertas
        if (particles[i].life <= 0) {
            particles[i].remove();
            particles.splice(i, 1);
        }
    }
}

// Lógica del juego
function update() {
    balls.forEach((ball) => {
        ball.x += ball.speedX;
        ball.y += ball.speedY;

        if (ball.y <= 0 || ball.y + 20 >= gameContainer.offsetHeight) {
            ball.speedY *= -1;
        }

        if (
            ball.x <= 10 &&
            ball.y + 20 >= paddle1Y &&
            ball.y <= paddle1Y + paddleHeight
        ) {
            ball.speedX *= -1;
        }

        if (
            ball.x + 20 >= gameContainer.offsetWidth - 10 &&
            ball.y + 20 >= paddle2Y &&
            ball.y <= paddle2Y + paddleHeight
        ) {
            ball.speedX *= -1;
        }

        if (ball.x <= 0) {
            createExplosion(ball.x, ball.y, true);
            player2Score++;
            updateScore();
            resetBall(ball);
        }

        if (ball.x + 20 >= gameContainer.offsetWidth) {
            createExplosion(ball.x, ball.y, false);
            player1Score++;
            updateScore();
            resetBall(ball);
        }

        ball.elem.style.left = ball.x + "px";
        ball.elem.style.top = ball.y + "px";
    });

    // Actualizar partículas
    updateParticles();

    paddle1Y += paddle1Direction * paddleSpeed;
    paddle2Y += paddle2Direction * paddleSpeed;

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

function resetBall(ball) {
    ball.x = 390;
    ball.y = 190;
    ball.speedX *= -1;
}

document.addEventListener("keydown", (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
        addBall();
    } else if (e.key === "Enter" && e.shiftKey) {
        duplicateBalls();
    }
});

// Agregar estilos CSS necesarios
const style = document.createElement('style');
style.textContent = `
    .particle {
        position: absolute;
        pointer-events: none;
        z-index: 100;
    }
`;
document.head.appendChild(style);

// Iniciar el juego
addBall();
update();