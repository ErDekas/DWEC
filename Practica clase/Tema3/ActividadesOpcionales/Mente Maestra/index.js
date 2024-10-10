/**
 * Arreglo que contiene los colores válidos para el juego.
 * @type {string[]}
 */
const colores = ["R", "A", "V", "Y", "M", "N", "B"];

/**
 * Genera un código secreto aleatorio de 4 colores seleccionados de la lista de colores válidos.
 * @returns {string[]} Un arreglo de 4 colores que forman el código secreto.
 */
function generarCodigoSecreto() {
  const coloresBarajados = colores.sort(() => 0.5 - Math.random());
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
  // Contar bolas negras y blancas
  intento.forEach((color, indice) => {
    if (color === codigoSecreto[indice]) {
      bolasNegras++;
      codigoSecretoCopia[indice] = null; // Marcar como contado
      intentoCopia[indice] = null; // Marcar como contado
      bolas.push("⚫️");
    } else {
      const indiceBlanco = codigoSecretoCopia.indexOf(color);
      if (indiceBlanco !== -1 && color !== null) {
        // Solo contar si no fue una bola negra
        bolasBlancas++;
        codigoSecretoCopia[indiceBlanco] = null; // Marcar como contado
        bolas.push("⚪️");
      } else {
        bolas.push(" "); // No detectó ni bola blanca ni negra
      }
    }
  });
  return { bolasBlancas, bolasNegras, bolas }; // Devolver también las bolas
}

/**
 * Inicia el juego "Mente Maestra".
 * El jugador tiene un máximo de 10 intentos para adivinar el código secreto.
 */
function MenteMaestra() {
  const codigoSecreto = generarCodigoSecreto();
  const maximoIntentos = 10;
  let intentos = [];

  console.log("¡Bienvenido a Mente Maestra!");
  console.log("Colores válidos: R Y V A M N B");
  console.log(
    `Tienes ${maximoIntentos} intentos para adivinar el código secreto.`
  );

  for (
    let contadorIntentos = 0;
    contadorIntentos < maximoIntentos;
    contadorIntentos++
  ) {
    let intento = prompt(
      `Intento ${
        contadorIntentos + 1
      } - Ingresa tu combinación (ejemplo: RAVY):`
    );

    // Validar intento
    if (!/^[RYVAMNB]{4}$/.test(intento)) {
      console.log(
        "Combinación inválida. Asegúrate de usar exactamente 4 colores válidos."
      );
      contadorIntentos--;
      continue;
    }

    // Convertir intento en arreglo
    intento = intento.split("");
    intentos.push(intento);

    const { bolasBlancas, bolasNegras, bolas } = verificarIntento(
      codigoSecreto,
      intento
    );

    // Mostrar el intento y la pista
    const resultado = intento.join("") + " | " + bolas.join("");
    console.log(resultado);

    // Verificar si ha ganado
    if (bolasNegras === 4) {
      console.log(
        "¡Felicidades, has ganado! El código era: " + codigoSecreto.join("")
      );
      break;
    }

    // Mostrar intentos restantes
    console.log(
      `Intentos restantes: ${maximoIntentos - (contadorIntentos + 1)}`
    );

    // Mostrar todos los intentos realizados
    console.log("Intentos realizados:");
    for (let i = 0; i <= contadorIntentos; i++) {
      const { bolasBlancas, bolasNegras, bolas } = verificarIntento(
        codigoSecreto,
        intentos[i]
      );
      const resultadoIntento = intentos[i].join("") + " | " + bolas.join("");
      console.log(resultadoIntento);
    }

    // Si se han agotado los intentos
    if (contadorIntentos === maximoIntentos - 1) {
      console.log(
        `Te has quedado sin intentos. El código era: ${codigoSecreto.join("")}`
      );
    }
  }
}

// Inicia el juego
MenteMaestra();