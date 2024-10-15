/**
 * Genera un código secreto aleatorio de 4 colores seleccionados de la lista de colores válidos.
 * @param {string[]} coloresValidos - Colores válidos para el juego.
 * @returns {string[]} Un arreglo de 4 colores que forman el código secreto.
 */
function generarCodigoSecreto(coloresValidos) {
  const coloresBarajados = coloresValidos.sort(() => 0.5 - Math.random());
  return coloresBarajados.slice(0, 4);
}

/**
 * Verifica un intento del jugador contra el código secreto.
 * Cuenta las bolas negras (correctas y en la posición correcta)
 * y las bolas blancas (correctas pero en la posición incorrecta).
 *
 * @param {string[]} codigoSecreto - El código secreto que debe ser adivinado.
 * @param {string[]} intento - La combinación introducida por el jugador.
 * @returns {{ bolasBlancas: number, bolasNegras: number, bolas: string[] }}
 *          Un objeto que contiene la cantidad de bolas blancas, bolas negras
 *          y una representación visual de estas.
 */
function verificarIntento(codigoSecreto, intento) {
  let bolasNegras = 0;
  let bolasBlancas = 0;
  const codigoSecretoCopia = [...codigoSecreto];
  const intentoCopia = [...intento];
  const bolas = [];

  intento.forEach((color, indice) => {
    if (color === codigoSecreto[indice]) {
      bolasNegras++;
      codigoSecretoCopia[indice] = null; 
      intentoCopia[indice] = null; 
      bolas.push("⚫️");
    } else {
      const indiceBlanco = codigoSecretoCopia.indexOf(color);
      if (indiceBlanco !== -1 && color !== null) {
        bolasBlancas++;
        codigoSecretoCopia[indiceBlanco] = null; 
        bolas.push("⚪️");
      } else {
        bolas.push(" ");
      }
    }
  });

  return { bolasBlancas, bolasNegras, bolas };
}

/**
 * Inicia el juego "Mente Maestra".
 */
function MenteMaestra() {
  const coloresValidos = prompt("Ingresa los colores válidos (6-8, separados por espacios):")
    .split(" ")
    .filter((c, i, a) => a.indexOf(c) === i && c.length === 1)
    .slice(0, 8); // Limitar a 8 colores
  const maximoIntentos = parseInt(prompt("¿Cuántos intentos deseas? (por defecto: 15)") || "15", 10);
  const historial = [];

  do {
    const codigoSecreto = generarCodigoSecreto(coloresValidos);
    let intentos = [];
    let ganado = false;

    console.log("¡Bienvenido a Mente Maestra!");
    console.log(`Colores válidos: ${coloresValidos.join(", ")}`);
    console.log(`Tienes ${maximoIntentos} intentos para adivinar el código secreto.`);

    for (let contadorIntentos = 0; contadorIntentos < maximoIntentos; contadorIntentos++) {
      let intento = prompt(`Intento ${contadorIntentos + 1} - Ingresa tu combinación (ejemplo: RAVY):`);

      if (!new RegExp(`^[${coloresValidos.join("")}]{4}$`).test(intento)) {
        console.log("Combinación inválida. Asegúrate de usar exactamente 4 colores válidos.");
        contadorIntentos--;
        continue;
      }

      intento = intento.split("");
      intentos.push(intento);

      const { bolasBlancas, bolasNegras, bolas } = verificarIntento(codigoSecreto, intento);
      const resultado = intento.join("") + " | " + bolas.join("");
      console.log(resultado);

      if (bolasNegras === 4) {
        console.log("¡Felicidades, has ganado! El código era: " + codigoSecreto.join(""));
        ganado = true;
        break;
      }

      console.log(`Intentos restantes: ${maximoIntentos - (contadorIntentos + 1)}`);
      console.log("Intentos realizados:");
      intentos.forEach((intento, index) => {
        const { bolasBlancas, bolasNegras, bolas } = verificarIntento(codigoSecreto, intento);
        const resultadoIntento = intento.join("") + " | " + bolas.join("");
        console.log(resultadoIntento);
      });
    }

    if (!ganado) {
      console.log(`Te has quedado sin intentos. El código era: ${codigoSecreto.join("")}`);
    }

    historial.push({ codigo: codigoSecreto.join(""), intentos: intentos.length, ganado });
    console.log("Historial de partidas:", historial);

  } while (confirm("¿Quieres jugar otra partida?"));
}

// Inicia el juego
MenteMaestra();
