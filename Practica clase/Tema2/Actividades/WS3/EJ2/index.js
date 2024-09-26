function mostrarInfoCadena(cad_arg){
    const mayusculas = cad_arg === cad_arg.toUpperCase();
    const minusculas = cad_arg === cad_arg.toLowerCase();

if (mayusculas) {
    console.log("La cadena está formada solo por mayúsculas.");
} else if (minusculas) {
    console.log("La cadena está formada solo por minúsculas.");
} else {
    console.log("La cadena está formada por una mezcla de mayúsculas y minúsculas.");
}
}
console.log(mostrarInfoCadena("HOLA"));
console.log(mostrarInfoCadena("Hola"));
console.log(mostrarInfoCadena("hola"));
