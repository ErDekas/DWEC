const puzzle = [
  [2, 14, 3, 4],
  [5, 1, 7, 13],
  [4, 10, 11, 12],
  [8, 9, "*", 15],
];

let emptyTile = { row: 3, col: 2 }; // Posición inicial del espacio vacío

function printPuzzle() {
  console.clear();
  puzzle.forEach((row) => {
    console.log(row.join("  "));
  });
}

function isMoveValid(direction) {
  switch (direction) {
    case "ARRIBA":
      return emptyTile.row > 0;
    case "ABAJO":
      return emptyTile.row < 3;
    case "IZQUIERDA":
      return emptyTile.col > 0;
    case "DERECHA":
      return emptyTile.col < 3;
    default:
      return false;
  }
}

function moveTile(direction) {
  if (!isMoveValid(direction)) {
    console.log("Movimiento no válido.");
    return;
  }

  const { row, col } = emptyTile;
  let newRow = row;
  let newCol = col;

  switch (direction) {
    case "ARRIBA":
      newRow -= 1;
      break;
    case "ABAJO":
      newRow += 1;
      break;
    case "IZQUIERDA":
      newCol -= 1;
      break;
    case "DERECHA":
      newCol += 1;
      break;
  }

  // Intercambiar el espacio vacío con la casilla
  puzzle[row][col] = puzzle[newRow][newCol];
  puzzle[newRow][newCol] = "*";
  emptyTile = { row: newRow, col: newCol };
}

function checkWin() {
  const winState = [
    [1, 2, 3, 4],
    [5, 6, 7, 8],
    [9, 10, 11, 12],
    [13, 14, 15, "*"],
  ];

  for (let i = 0; i < 4; i++) {
    for (let j = 0; j < 4; j++) {
      if (puzzle[i][j] !== winState[i][j]) {
        return false;
      }
    }
  }
  return true;
}

function startGame() {
  printPuzzle();

  while (true) {
    const move = prompt(
      "Ingrese un movimiento (ARRIBA, ABAJO, IZQUIERDA, DERECHA) o SALIR: "
    ).toUpperCase();

    if (move === "SALIR") {
      console.log("Gracias por jugar!");
      break;
    }

    moveTile(move);
    printPuzzle();

    if (checkWin()) {
      console.log("¡Ganaste! ¿Quieres reiniciar? (sí/no)");
      const restart = prompt("").toLowerCase();
      if (restart === "sí") {
        startGame(); // Reiniciar el juego
      } else {
        console.log("Gracias por jugar!");
        break;
      }
    }
  }
}

startGame();
