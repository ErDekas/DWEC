let palabra = prompt("Introduce una palabra");
do{
    document.write(palabra + "<br>");
    palabra = prompt("Introduce una palabra");
}while(palabra.toUpperCase() != "SALIR");