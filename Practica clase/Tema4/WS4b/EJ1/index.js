// colorGame.js

let correctColor;
let colorOptions = [];
let mode = "hard"; // Modo por defecto

// Función para generar un color RGB aleatorio
function generateRandomColor() {
  const r = Math.floor(Math.random() * 256);
  const g = Math.floor(Math.random() * 256);
  const b = Math.floor(Math.random() * 256);
  return `rgb(${r}, ${g}, ${b})`;
}

// Inicializar el juego
function initGame() {
  const numColors = mode === "hard" ? 6 : 3; // Determinar el número de colores según el modo
  colorOptions = Array.from({ length: numColors }, generateRandomColor);
  correctColor = colorOptions[Math.floor(Math.random() * colorOptions.length)];

  // Mostrar el valor RGB del color correcto
  document.getElementById("rgbDisplay").textContent =
    correctColor.toUpperCase();

  // Crear los elementos de color en el contenedor
  const colorContainer = document.getElementById("colorContainer");
  colorContainer.innerHTML = ""; // Limpiar opciones anteriores
  colorOptions.forEach((color) => {
    const colorDiv = document.createElement("div");
    colorDiv.classList.add("color-option");
    colorDiv.style.backgroundColor = color;
    colorDiv.onclick = () => checkColor(colorDiv, color); // Pasar el elemento y el color
    colorContainer.appendChild(colorDiv);
  });

  document.getElementById("message").textContent = ""; // Limpiar el mensaje
}

// Función para verificar si el jugador eligió el color correcto
function checkColor(colorDiv, selectedColor) {
  if (selectedColor === correctColor) {
    document.getElementById("message").textContent = "¡Correcto!";

    // Cambiar todas las opciones al color correcto
    const colorDivs = document.querySelectorAll(".color-option");
    colorDivs.forEach((div) => {
      div.classList.remove("hidden"); // Asegurarse de que todas estén visibles
      div.style.backgroundColor = correctColor; // Cambiar al color acertado
    });
  } else {
    document.getElementById("message").textContent = "Intenta de nuevo.";
    colorDiv.classList.add("hidden"); // Ocultar el color incorrecto
  }
}

// Reiniciar el juego
function resetGame() {
  // Determinar el modo actual basado en el botón de radio seleccionado
  const selectedMode = document.querySelector(
    'input[name="mode"]:checked'
  ).value;
  mode = selectedMode;

  initGame();
}

// Iniciar el juego la primera vez
initGame();
