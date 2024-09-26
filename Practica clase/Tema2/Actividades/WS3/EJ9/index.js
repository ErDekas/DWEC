function formatearPalabra(palabra) {
    const longitud = palabra.length;

    // Primera línea
    console.log(palabra.split('').join(' '));

    // Líneas intermedias
    for (let i = 1; i < longitud - 1; i++) {
        let fila = palabra[i] + ' '.repeat((longitud - 2) * 2 + 1) + palabra[(i + 1) % longitud];
        console.log(fila);
    }

    // Última línea
    console.log(palabra[longitud - 1] + ' ' + palabra.slice(0, longitud - 1).split('').reverse().join(' '));
}

const entrada = prompt("Ingrese una palabra:");
formatearPalabra(entrada);