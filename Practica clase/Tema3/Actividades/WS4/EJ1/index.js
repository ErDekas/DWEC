let puzzle = [];
let size = 3;
let moves = 0;
let timer = 0;
let interval;

function initPuzzle() {
  size = parseInt(document.getElementById("size").value);
  moves = 0;
  timer = 0;
  clearInterval(interval);
  document.getElementById("moves").textContent = moves;
  document.getElementById("timer").textContent = timer;
  puzzle = generatePuzzle(size);
  renderPuzzle();
  startTimer();
}

function generatePuzzle(size) {
  const numbers = Array.from({ length: size * size }, (_, i) => i);
  shuffle(numbers);
  return numbers;
}

function shuffle(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}

function renderPuzzle() {
  const puzzleContainer = document.getElementById("puzzle");
  puzzleContainer.style.gridTemplateColumns = `repeat(${size}, 100px)`;
  puzzleContainer.style.gridTemplateRows = `repeat(${size}, 100px)`;
  puzzleContainer.innerHTML = "";

  puzzle.forEach((number, index) => {
    const tile = document.createElement("div");
    tile.className = "tile" + (number === 0 ? " empty" : "");
    tile.textContent = number || "";
    tile.onclick = () => moveTile(index);
    puzzleContainer.appendChild(tile);
  });
}

function moveTile(index) {
  const emptyIndex = puzzle.indexOf(0);
  const validMoves = [index - 1, index + 1, index - size, index + size];

  if (validMoves.includes(emptyIndex)) {
    [puzzle[index], puzzle[emptyIndex]] = [puzzle[emptyIndex], puzzle[index]];
    moves++;
    document.getElementById("moves").textContent = moves;
    renderPuzzle();
    checkWin(); // Verifica si se ha ganado después de cada movimiento
  }
}

function checkWin() {
  // Comprueba si todos los números están en orden ascendente, con 0 al final
  const isSolved = puzzle.slice(0, -1).every((val, i) => val === i + 1) && puzzle[puzzle.length - 1] === 0;
  if (isSolved) {
    clearInterval(interval);
    alert(`¡Felicidades! Has ganado en ${moves} movimientos y ${timer} segundos.`);
  }
}

function startTimer() {
  interval = setInterval(() => {
    timer++;
    document.getElementById("timer").textContent = timer;
  }, 1000);
}

window.onload = initPuzzle;
