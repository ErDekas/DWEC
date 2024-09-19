let numeroOculto = parseInt(prompt("Introduce un numero"));
let numero;
while(numero != numeroOculto){
    numero = parseInt(prompt("Introduce un numero"));
    document.write(numero + "<br>");
    if(numero<numeroOculto){
        document.write("El numero es menor");
    }else{
        document.write("El numero es mayor");
    }
}