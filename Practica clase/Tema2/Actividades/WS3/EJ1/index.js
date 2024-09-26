function invierteCadena(cad_arg){
    return cad_arg.split('').reverse().join('');
}
function inviertePalabras(cad_arg){
    const palabras = cad_arg.split(' ');
    const palabrasInvertidas = [];

    for (let i = 0; i < palabras.length; i++) {
        palabrasInvertidas.push(palabras[i].split('').reverse().join(''));
    }

    return palabrasInvertidas.join(' ');
}
function encuentraPalabraMasLarga(cad_arg) {
    const palabras = cad_arg.split(' ');
    let palabraMasLarga = '';

    for (let palabra of palabras) {
        if (palabra.length > palabraMasLarga.length) {
            palabraMasLarga = palabra;
        }
    }
    
    return palabraMasLarga;
}
function filtrarPalabrasMasLargas(cad_arg, i){
    const palabras = cad_arg.split(' ');
    return palabras.filter(palabra => palabra.length > i).length;
}
function cadenaBienFormada(cad_arg){
    return cad_arg.charAt(0).toUpperCase() + cad_arg.slice(1).toLowerCase();
}
console.log(invierteCadena("hola mundo")); // "odnum aloh"
console.log(invierteCadena("12345")); // "54321"
console.log(invierteCadena("")); // ""
console.log(inviertePalabras("hola mundo")); // "aloh odnum"
console.log(inviertePalabras("JavaScript es genial")); // "tpircSavaJ se laineg"
console.log(inviertePalabras("")); // ""
console.log(encuentraPalabraMasLarga("hola mundo")); // "mundo"
console.log(encuentraPalabraMasLarga("JavaScript es genial")); // "JavaScript"
console.log(encuentraPalabraMasLarga("")); // ""
console.log(filtrarPalabrasMasLargas("hola mundo", 3)); // 2
console.log(filtrarPalabrasMasLargas("JavaScript es genial", 4)); // 2
console.log(filtrarPalabrasMasLargas("", 0)); // 0
console.log(cadenaBienFormada("hola mundo")); // "Hola mundo"
console.log(cadenaBienFormada("JAvaScript es genial")); // "Javascript es genial"
console.log(cadenaBienFormada("")); // ""
