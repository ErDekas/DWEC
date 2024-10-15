const casillas = document.querySelectorAll('.casilla');
const mensaje = document.getElementById('mensaje');
const botonReiniciar = document.getElementById('reiniciar');
let turno = 'X'; // El jugador humano siempre empieza
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
        if (casilla.textContent === '' && mensaje.textContent === '' && turno === 'X') {
            jugadaHumano(casilla);
            if (mensaje.textContent === '') {
                jugadaMaquina();
            }
        }
    });
});

botonReiniciar.addEventListener('click', reiniciarJuego);

function jugadaHumano(casilla) {
    casilla.textContent = turno;
    jugadas++;
    if (comprobarGanador(turno)) {
        mensaje.textContent = `¡Jugador ${turno} gana!`;
        botonReiniciar.style.display = 'block';
    } else if (jugadas === 9) {
        mensaje.textContent = '¡Es un empate!';
        botonReiniciar.style.display = 'block';
    }
    turno = 'O'; // Cambiar turno a la máquina
}

function jugadaMaquina() {
    // Primero, intenta ganar
    for (const combinacion of combinacionesGanadoras) {
        const casilla1 = casillas[combinacion[0]].textContent;
        const casilla2 = casillas[combinacion[1]].textContent;
        const casilla3 = casillas[combinacion[2]].textContent;
        
        if (casilla1 === 'O' && casilla2 === 'O' && casilla3 === '') {
            casillas[combinacion[2]].textContent = 'O';
            jugadas++;
            if (comprobarGanador('O')) {
                mensaje.textContent = '¡La máquina gana!';
                botonReiniciar.style.display = 'block';
            }
            turno = 'X'; // Cambiar turno al humano
            return;
        } else if (casilla1 === 'O' && casilla3 === 'O' && casilla2 === '') {
            casillas[combinacion[1]].textContent = 'O';
            jugadas++;
            if (comprobarGanador('O')) {
                mensaje.textContent = '¡La máquina gana!';
                botonReiniciar.style.display = 'block';
            }
            turno = 'X';
            return;
        } else if (casilla2 === 'O' && casilla3 === 'O' && casilla1 === '') {
            casillas[combinacion[0]].textContent = 'O';
            jugadas++;
            if (comprobarGanador('O')) {
                mensaje.textContent = '¡La máquina gana!';
                botonReiniciar.style.display = 'block';
            }
            turno = 'X';
            return;
        }
    }

    // Bloquear al jugador
    for (const combinacion of combinacionesGanadoras) {
        const casilla1 = casillas[combinacion[0]].textContent;
        const casilla2 = casillas[combinacion[1]].textContent;
        const casilla3 = casillas[combinacion[2]].textContent;

        if (casilla1 === 'X' && casilla2 === 'X' && casilla3 === '') {
            casillas[combinacion[2]].textContent = 'O';
            jugadas++;
            if (comprobarGanador('O')) {
                mensaje.textContent = '¡La máquina gana!';
                botonReiniciar.style.display = 'block';
            }
            turno = 'X';
            return;
        } else if (casilla1 === 'X' && casilla3 === 'X' && casilla2 === '') {
            casillas[combinacion[1]].textContent = 'O';
            jugadas++;
            if (comprobarGanador('O')) {
                mensaje.textContent = '¡La máquina gana!';
                botonReiniciar.style.display = 'block';
            }
            turno = 'X';
            return;
        } else if (casilla2 === 'X' && casilla3 === 'X' && casilla1 === '') {
            casillas[combinacion[0]].textContent = 'O';
            jugadas++;
            if (comprobarGanador('O')) {
                mensaje.textContent = '¡La máquina gana!';
                botonReiniciar.style.display = 'block';
            }
            turno = 'X';
            return;
        }
    }

    // Jugar en una casilla vacía aleatoria
    const indicesDisponibles = Array.from(casillas).map((casilla, index) => {
        return casilla.textContent === '' ? index : null;
    }).filter(index => index !== null);
    
    if (indicesDisponibles.length > 0) {
        const indiceAleatorio = indicesDisponibles[Math.floor(Math.random() * indicesDisponibles.length)];
        casillas[indiceAleatorio].textContent = 'O';
        jugadas++;
        if (comprobarGanador('O')) {
            mensaje.textContent = '¡La máquina gana!';
            botonReiniciar.style.display = 'block';
        }
        turno = 'X';
    }
}

function comprobarGanador(jugador) {
    return combinacionesGanadoras.some(combinacion => {
        return combinacion.every(index => {
            return casillas[index].textContent === jugador;
        });
    });
}

function reiniciarJuego() {
    casillas.forEach(casilla => {
        casilla.textContent = '';
    });
    mensaje.textContent = '';
    botonReiniciar.style.display = 'none';
    turno = 'X';
    jugadas = 0;
}
