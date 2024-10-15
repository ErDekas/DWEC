const size = 8;
const mines = 10;
let board = [];
let revealed = [];
let gameOver = false;
let timer;
let seconds = 0;
const timeLimit = 180; // 3 minutos


function initBoard() {
    board = Array(size).fill(null).map(() => Array(size).fill(0));
    revealed = Array(size).fill(null).map(() => Array(size).fill(false));
    placeMines();
    calculateNumbers();
    drawBoard();
}

function placeMines() {
    let minePositions = new Set();
    while (minePositions.size < mines) {
        let row = Math.floor(Math.random() * size);
        let col = Math.floor(Math.random() * size);
        minePositions.add(`${row},${col}`);
        board[row][col] = 'mine';
    }
}

function calculateNumbers() {
    for (let i = 0; i < size; i++) {
        for (let j = 0; j < size; j++) {
            if (board[i][j] === 'mine') continue;
            let count = 0;
            for (let x = -1; x <= 1; x++) {
                for (let y = -1; y <= 1; y++) {
                    if (i + x >= 0 && i + x < size && j + y >= 0 && j + y < size && board[i + x][j + y] === 'mine') {
                        count++;
                    }
                }
            }
            board[i][j] = count;
        }
    }
}

function drawBoard() {
    const boardElement = document.getElementById('board');
    boardElement.innerHTML = '';
    for (let i = 0; i < size; i++) {
        for (let j = 0; j < size; j++) {
            const cell = document.createElement('div');
            cell.className = 'cell';
            cell.dataset.row = i;
            cell.dataset.col = j;
            cell.onclick = () => handleCellClick(i, j);
            boardElement.appendChild(cell);
        }
    }
}

function handleCellClick(row, col) {
    if (gameOver || revealed[row][col]) return;

    revealed[row][col] = true;
    const cell = document.querySelector(`.cell[data-row="${row}"][data-col="${col}"]`);

    if (board[row][col] === 'mine') {
        cell.classList.add('mine');
        cell.innerHTML = '💣';
        endGame(false);
    } else {
        cell.classList.add('revealed');
        cell.innerHTML = board[row][col] > 0 ? board[row][col] : '';
        if (board[row][col] === 0) {
            revealAdjacent(row, col);
        }
        checkWin();
    }
}

function revealAdjacent(row, col) {
    for (let x = -1; x <= 1; x++) {
        for (let y = -1; y <= 1; y++) {
            const newRow = row + x;
            const newCol = col + y;
            if (newRow >= 0 && newRow < size && newCol >= 0 && newCol < size && !revealed[newRow][newCol]) {
                handleCellClick(newRow, newCol);
            }
        }
    }
}

function checkWin() {
    let clearedCells = 0;
    for (let i = 0; i < size; i++) {
        for (let j = 0; j < size; j++) {
            if (revealed[i][j] && board[i][j] !== 'mine') {
                clearedCells++;
            }
        }
    }
    if (clearedCells === (size * size - mines)) {
        endGame(true);
    }
}

function endGame(won) {
    gameOver = true;
    clearInterval(timer);
    const message = won ? "¡Ganaste!" : "Perdiste. ¡Inténtalo de nuevo!";
    alert(message);
}

function resetGame() {
    clearInterval(timer);
    seconds = 0;
    document.getElementById('time').innerText = seconds;
    gameOver = false;
    initBoard();
    startTimer();
}

function startTimer() {
    timer = setInterval(() => {
        seconds++;
        document.getElementById('time').innerText = seconds;
        if (seconds >= timeLimit) {
            endGame(false); // Termina el juego si se alcanza el tiempo límite
        }
    }, 1000);
}


// Iniciar el juego
window.onload = () => {
    initBoard();
    startTimer();
};
