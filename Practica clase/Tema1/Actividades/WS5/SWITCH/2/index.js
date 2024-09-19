let numero = parseInt(prompt("Introduce un número:"));

let codigo = 0;

if (numero % 2 === 0) {
    codigo += 1;
}

if (numero % 3 === 0) {
    codigo += 2;
}

if (numero % 5 === 0) {
    codigo += 4;
}

switch (codigo) {
    case 0:
        document.write(numero + ` no es par, ni múltiplo de 3, ni múltiplo de 5.`);
        break;
    case 1:
        document.write(numero + ` es par, pero no es múltiplo de 3 ni de 5.`);
        break;
    case 2:
        document.write(numero + ` es múltiplo de 3, pero no es par ni múltiplo de 5.`);
        break;
    case 3:
        document.write(numero + ` es par y múltiplo de 3, pero no de 5.`);
        break;
    case 4:
        document.write(numero + ` es múltiplo de 5, pero no es par ni múltiplo de 3.`);
        break;
    case 5:
        document.write(numero + ` es par y múltiplo de 5, pero no de 3.`);
        break;
    case 6:
        document.write(numero + ` es múltiplo de 3 y de 5, pero no es par.`);
        break;
    case 7:
        document.write(numero + ` es par, múltiplo de 3 y múltiplo de 5.`);
        break;
    default:
        document.write("Algo salió mal.");
}
