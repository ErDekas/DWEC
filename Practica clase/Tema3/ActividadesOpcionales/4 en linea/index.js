const rows = 6;
const cols = 7;
const board = Array.from({ length: rows }, () => Array(cols).fill("⚪️"));
let currentPlayer = "🟢";
let playerNames = ["Jugador 1", "Jugador 2"];
let history = [];

function createBoard() {
  const table = document.getElementById("board");
  table.innerHTML = "";
  board.forEach((row) => {
    const tr = document.createElement("tr");
    row.forEach((cell) => {
      const td = document.createElement("td");
      td.className = "empty";
      td.innerText = cell;
      tr.appendChild(td);
    });
    table.appendChild(tr);
  });
}

function dropPiece(col) {
  for (let row = rows - 1; row >= 0; row--) {
    if (board[row][col] === "⚪️") {
      board[row][col] = currentPlayer;
      if (checkWin(row, col)) {
        const winner = currentPlayer === "🟢" ? playerNames[0] : playerNames[1];
        document.getElementById("message").innerText = `${winner} gana!`;
        history.push({ winner, loser: playerNames[1 - (currentPlayer === "🟢" ? 0 : 1)] });
        updateHistory();
      } else {
        currentPlayer = currentPlayer === "🟢" ? "🔴" : "🟢";
      }
      createBoard();
      return;
    }
  }
  alert("Columna llena. Intenta otra.");
}

function checkWin(row, col) {
  return (
    checkDirection(row, col, 0, 1) || // Horizontal
    checkDirection(row, col, 1, 0) || // Vertical
    checkDirection(row, col, 1, 1) || // Diagonal \
    checkDirection(row, col, 1, -1) // Diagonal /
  );
}

function checkDirection(row, col, rowInc, colInc) {
  let count = 1;

  for (let i = 1; i < 4; i++) {
    const newRow = row + i * rowInc;
    const newCol = col + i * colInc;
    if (
      newRow < 0 ||
      newRow >= rows ||
      newCol < 0 ||
      newCol >= cols ||
      board[newRow][newCol] !== currentPlayer
    ) {
      break;
    }
    count++;
  }

  for (let i = 1; i < 4; i++) {
    const newRow = row - i * rowInc;
    const newCol = col - i * colInc;
    if (
      newRow < 0 ||
      newRow >= rows ||
      newCol < 0 ||
      newCol >= cols ||
      board[newRow][newCol] !== currentPlayer
    ) {
      break;
    }
    count++;
  }

  return count >= 4;
}

function startNewGame() {
  board.forEach((row) => row.fill("⚪️"));
  currentPlayer = "🟢";
  createBoard();
  document.getElementById("message").innerText = "";
}

function updateHistory() {
  const historyElement = document.getElementById("history");
  historyElement.innerHTML = history
    .map((match) => `${match.winner} ganó contra ${match.loser}`)
    .join("<br>");
}

document.getElementById("restart").addEventListener("click", startNewGame);
document.getElementById("setNames").addEventListener("click", () => {
  const name1 = prompt("Nombre del Jugador 1:", playerNames[0]);
  const name2 = prompt("Nombre del Jugador 2:", playerNames[1]);
  playerNames = [name1 || playerNames[0], name2 || playerNames[1]];
  document.getElementById("playerNames").innerText = `Nombres: ${playerNames.join(" vs ")}`;
});

// Solo responde a clics en las celdas del tablero
document.getElementById("board").addEventListener("click", (e) => {
  const col = Array.from(e.target.parentNode.children).indexOf(e.target);
  if (col >= 0 && e.target.tagName === "TD") {
    dropPiece(col);
  }
});

// Inicializa el tablero vacío al cargar el juego
createBoard();
