const items = ["🔮", "🔮", "🔈", "🔈", "🎉", "🎉", "🔥", "🔥","💨","💨","🛒","🛒","🕶","🕶","🌌","🌌"];
let grid = [];
let attempts = 5;
let revealed = [];
let foundPairs = 0;

// Mezclar cartas
function shuffle(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
}

// Inicializar el juego
function init() {
  shuffle(items);
  grid = Array(4)
    .fill()
    .map(() => Array(4).fill(null));
  for (let i = 0; i < 4; i++) {
    for (let j = 0; j < 4; j++) {
      grid[i][j] = { value: items[i * 4 + j], revealed: false };
    }
  }
  renderGrid();
  document.getElementById(
    "message"
  ).innerText = `Intentos restantes: ${attempts}`;
}

// Renderizar la grilla
function renderGrid() {
  const gridElement = document.getElementById("grid");
  gridElement.innerHTML = "";
  grid.forEach((row, i) => {
    row.forEach((card, j) => {
      const cardElement = document.createElement("div");
      cardElement.className = "card" + (card.revealed ? "" : " hidden");
      cardElement.innerText = card.revealed ? card.value : "";
      cardElement.addEventListener("click", () => handleCardClick(i, j));
      gridElement.appendChild(cardElement);
    });
  });
}

// Manejar el clic en la carta
function handleCardClick(x, y) {
  if (grid[x][y].revealed || attempts <= 0) return;

  grid[x][y].revealed = true;
  revealed.push({ x, y });
  renderGrid();

  if (revealed.length === 2) {
    setTimeout(checkMatch, 1000);
  }
}

// Comprobar coincidencias
function checkMatch() {
  const [first, second] = revealed;
  if (grid[first.x][first.y].value === grid[second.x][second.y].value) {
    foundPairs++;
    if (foundPairs === items.length / 2) {
      document.getElementById("message").innerText = "¡Has ganado!";
    }
  } else {
    attempts--;
    grid[first.x][first.y].revealed = false;
    grid[second.x][second.y].revealed = false;
    document.getElementById(
      "message"
    ).innerText = `Ha errado. Intentos restantes: ${attempts}`;
  }

  revealed = [];
  renderGrid();

  if (attempts <= 0) {
    document.getElementById("message").innerText = "¡Has perdido!";
    restart();
    }
}

function restart(){
    document.getElementById('restart').style.display = 'block';
    document.getElementById('restart').addEventListener('click', function(){
        location.reload();
    });
}

// Iniciar el juego
init();
