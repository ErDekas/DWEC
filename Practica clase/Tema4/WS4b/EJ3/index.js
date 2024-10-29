const board = document.getElementById("board");
const cells = document.querySelectorAll(".cell");
const statusDisplay = document.getElementById("status");
const restartButton = document.getElementById("restartButton");

let currentPlayer = "X";
let gameActive = true;
let gameState = Array(9).fill("");

const winningConditions = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];

function handleCellClick(event) {
  const clickedCell = event.target;
  const clickedCellIndex = parseInt(clickedCell.getAttribute("data-index"));

  if (gameState[clickedCellIndex] !== "" || !gameActive) {
    return;
  }

  gameState[clickedCellIndex] = currentPlayer;

  clickedCell.innerHTML = currentPlayer;

  clickedCell.classList.add(currentPlayer.toLowerCase());

  checkResult();
}

function checkResult() {
  let roundWon = false;

  for (let i = 0; i < winningConditions.length; i++) {
    const [a, b, c] = winningConditions[i];
    if (gameState[a] === "" || gameState[b] === "" || gameState[c] === "") {
      continue;
    }
    if (gameState[a] === gameState[b] && gameState[a] === gameState[c]) {
      roundWon = true;
      break;
    }
  }

  if (roundWon) {
    statusDisplay.innerHTML = `Jugador ${currentPlayer} ha ganado!`;
    gameActive = false;
    return;
  }

  if (!gameState.includes("")) {
    statusDisplay.innerHTML = "¡Es un empate!";
    gameActive = false;
    return;
  }

  currentPlayer = currentPlayer === "X" ? "O" : "X";
  statusDisplay.innerHTML = `Turno de ${currentPlayer}`;
}

function restartGame() {
  gameActive = true;
  currentPlayer = "X";
  gameState = Array(9).fill("");

  statusDisplay.innerHTML = `Turno de ${currentPlayer}`;

  cells.forEach((cell) => {
    cell.classList.remove("x", "o");
    cell.innerHTML = "";
  });
}

cells.forEach((cell) => cell.addEventListener("click", handleCellClick));
restartButton.addEventListener("click", restartGame);
statusDisplay.innerHTML = `Turno de ${currentPlayer}`;
