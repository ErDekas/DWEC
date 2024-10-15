const items = [
  "🍎", "🍎", // Manzana
  "🍌", "🍌", // Plátano
  "🍇", "🍇", // Uva
  "🍊", "🍊", // Naranja
  "🍉", "🍉", // Sandía
  "🍓", "🍓", // Fresa
  "🍕", "🍕", // Pizza
  "🍔", "🍔", // Hamburguesa
  "🍟", "🍟", // Papas fritas
  "🍩", "🍩", // Dona
  "🍪", "🍪", // Galleta
  "🍰", "🍰", // Pastel
  "🎂", "🎂", // Pastel de cumpleaños
  "🍾", "🍾", // Champán
  "🍻", "🍻", // Cervezas
  "🌭", "🌭", // Hot dog
  "🥗", "🥗", // Ensalada
  "🍜", "🍜", // Ramen
  "🍣", "🍣"  // Sushi
];

let grid = [];
let attempts = 5;
let revealed = [];
let foundPairs = 0;
let history = [];

// Mezclar cartas
function shuffle(array) {
  for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
  }
}

// Inicializar el juego
function init(size = 4, maxAttempts = 5) {
  attempts = maxAttempts;
  foundPairs = 0;
  revealed = [];
  grid = Array(size).fill().map(() => Array(size).fill(null));

  const totalPairs = (size * size) / 2;
  const selectedItems = items.sort(() => 0.5 - Math.random()).slice(0, totalPairs);
  const gameItems = [...selectedItems, ...selectedItems];
  shuffle(gameItems);

  for (let i = 0; i < size; i++) {
      for (let j = 0; j < size; j++) {
          grid[i][j] = { value: gameItems[i * size + j], revealed: false };
      }
  }

  document.getElementById('grid').style.gridTemplateColumns = `repeat(${size}, 80px)`;
  renderGrid();
  document.getElementById("message").innerText = `Intentos restantes: ${attempts}`;
  document.getElementById('restart').style.display = 'none'; // Ocultar botón de reinicio
  document.getElementById('start').style.display = 'none'; // Ocultar botón de inicio después de comenzar el juego
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
      // Ajustar la condición para que detecte correctamente la victoria
      if (foundPairs === (grid.length * grid.length) / 2) {
          document.getElementById("message").innerText = "¡Has ganado!";
          recordGame(true);
      }
  } else {
      attempts--;
      grid[first.x][first.y].revealed = false;
      grid[second.x][second.y].revealed = false;
      document.getElementById("message").innerText = `Ha errado. Intentos restantes: ${attempts}`;
  }

  revealed = [];
  renderGrid();

  if (attempts <= 0) {
      document.getElementById("message").innerText = "¡Has perdido!";
      recordGame(false);
  }
}



// Registrar la partida
function recordGame(win) {
  const gameRecord = {
      size: grid.length,
      attempts: attempts,
      won: win,
  };
  history.push(gameRecord);
  updateHistory();

  // Mostrar el botón de reinicio
  document.getElementById('restart').style.display = 'block';
}

// Actualizar historial
function updateHistory() {
  const historyElement = document.getElementById("history");
  historyElement.innerHTML = "<h3>Historial de Partidas</h3>";
  history.forEach((record, index) => {
      historyElement.innerHTML += `<p>Partida ${index + 1}: ${record.won ? "Ganada" : "Perdida"} | Tamaño: ${record.size} | Intentos: ${record.attempts}</p>`;
  });
}

// Reiniciar el juego
function restart() {
  const size = parseInt(prompt("Elige el tamaño del tablero (2, 4, 6):", "4"));
  const maxAttempts = parseInt(prompt("Elige la cantidad de intentos:", "5"));
  if ([2, 4, 6].includes(size) && maxAttempts > 0) {
      init(size, maxAttempts);
  } else {
      alert("Tamaño o intentos inválidos.");
  }
}

// Iniciar el juego
document.getElementById('start').addEventListener('click', () => {
  const size = parseInt(prompt("Elige el tamaño del tablero (2, 4, 6):", "4"));
  const maxAttempts = parseInt(prompt("Elige la cantidad de intentos:", "5"));
  if ([2, 4, 6].includes(size) && maxAttempts > 0) {
      init(size, maxAttempts);
  } else {
      alert("Tamaño o intentos inválidos.");
  }
});

// Añadir el evento de clic para el botón de reinicio
document.getElementById('restart').addEventListener('click', restart);
