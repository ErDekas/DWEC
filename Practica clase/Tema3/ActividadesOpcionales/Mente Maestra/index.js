const colores = ['🔴', '🔵', '🟢', '🟡', '🟣', '🟠', '🟤'];

function generarCodigoSecreto() {
    const coloresBarajados = colores.sort(() => 0.5 - Math.random());
    return coloresBarajados.slice(0, 4);
}

function verificarIntento(codigoSecreto, intento) {
    let bolasNegras = 0;
    let bolasBlancas = 0;
    const codigoSecretoCopia = [...codigoSecreto];
    const intentoCopia = [...intento];

    // Contar bolas negras
    intento.forEach((color, indice) => {
        if (color === codigoSecreto[indice]) {
            bolasNegras++;
            codigoSecretoCopia[indice] = null; // Marcar como contado
            intentoCopia[indice] = null; // Marcar como contado
        }
    });

    // Contar bolas blancas
    intentoCopia.forEach(color => {
        const indice = codigoSecretoCopia.indexOf(color);
        if (indice !== -1) {
            bolasBlancas++;
            codigoSecretoCopia[indice] = null; // Marcar como contado
        }
    });

    return { bolasBlancas, bolasNegras };
}

function MenteMaestra() {
    const codigoSecreto = generarCodigoSecreto();
    const maximoIntentos = 10;
    let intentos = [];

    console.log('¡Bienvenido a Mente Maestra!');
    console.log('Colores válidos: 🔴 🟡 🟢 🔵 🟣 🟠 🟤');
    console.log(`Tienes ${maximoIntentos} intentos para adivinar el código secreto.`);

    for (let contadorIntentos = 0; contadorIntentos < maximoIntentos; contadorIntentos++) {
        let intento = prompt(`Intento ${contadorIntentos + 1} - Ingresa tu combinación (ejemplo: 🔴🔵🟢🟡):`);

        // Validar intento
        if (!/^[🔴🟡🟢🔵🟣🟠🟤]{4}$/.test(intento)) {
            console.log('Combinación inválida. Asegúrate de usar exactamente 4 colores válidos.');
            contadorIntentos--;
            continue;
        }

        // Convertir intento en arreglo
        intento = intento.split('');
        intentos.push(intento);

        const { bolasBlancas, bolasNegras } = verificarIntento(codigoSecreto, intento);

        // Mostrar el intento y la pista
        console.log(`${intento.join('')} | ${'⚫️'.repeat(bolasNegras)}${'⚪️'.repeat(bolasBlancas)}`);

        // Verificar si ha ganado
        if (bolasNegras === 4) {
            console.log('¡Felicidades, has ganado! El código era: ' + codigoSecreto.join(''));
            break;
        }

        // Mostrar intentos restantes
        console.log(`Intentos restantes: ${maximoIntentos - (contadorIntentos + 1)}`);

        // Mostrar todos los intentos realizados
        console.log('Intentos realizados:');
        for (let i = 0; i <= contadorIntentos; i++) {
            const { bolasBlancas, bolasNegras } = verificarIntento(codigoSecreto, intentos[i]);
            console.log(`${intentos[i].join('')} | ${'⚫️'.repeat(bolasNegras)}${'⚪️'.repeat(bolasBlancas)}`);
        }

        // Si se han agotado los intentos
        if (contadorIntentos === maximoIntentos - 1) {
            console.log(`Te has quedado sin intentos. El código era: ${codigoSecreto.join('')}`);
        }
    }
}

MenteMaestra();
