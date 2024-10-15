const casillas = document.querySelectorAll('.casilla');
const mensaje = document.getElementById('mensaje');
const botonReiniciar = document.getElementById('reiniciar');
let turno = 'X';
let jugadas = 0;
const combinacionesGanadoras = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
];

casillas.forEach(casilla => {
    casilla.addEventListener('click', () => {
        if (casilla.textContent === '' && mensaje.textContent === '') {
            casilla.textContent = turno;
            jugadas++;
            if (comprobarGanador(turno)) {
                mensaje.textContent = `¡Jugador ${turno} gana!`;
                botonReiniciar.style.display = 'block'; // Muestra el botón de reiniciar
            } else if (jugadas === 9) {
                mensaje.textContent = '¡Es un empate!';
                botonReiniciar.style.display = 'block'; // Muestra el botón de reiniciar
            }
            turno = turno === 'X' ? 'O' : 'X';
        }
    });
});

botonReiniciar.addEventListener('click', reiniciarJuego);

function comprobarGanador(jugador) {
    return combinacionesGanadoras.some(combinacion => {
        return combinacion.every(index => {
            return casillas[index].textContent === jugador;
        });
    });
}

function reiniciarJuego() {
    casillas.forEach(casilla => {
        casilla.textContent = ''; // Limpia las casillas
    });
    mensaje.textContent = ''; // Limpia el mensaje
    botonReiniciar.style.display = 'none'; // Oculta el botón de reiniciar
    turno = 'X'; // Reinicia el turno
    jugadas = 0; // Reinicia el contador de jugadas
}
