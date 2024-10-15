const rows = 6;
const cols = 7;
const board = Array.from({ length: rows }, () => Array(cols).fill("⚪️"));
let currentPlayer = "🟢";

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
        document.getElementById("message").innerText = `${currentPlayer} gana!`;
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
  // Comprobar horizontal, vertical y diagonal
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

document.addEventListener("click", (e) => {
  const col = Array.from(e.target.parentNode.children).indexOf(e.target);
  if (col >= 0) {
    dropPiece(col);
  }
});

createBoard();
