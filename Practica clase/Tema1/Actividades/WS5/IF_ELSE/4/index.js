let hermanos = parseInt(prompt("Introduce el numero de hermanos"));
let numero = parseInt(prompt("Introduce una cantidad"));

if(hermanos>=3){
    document.write(numero/1.15);
}else if(hermanos<3&&hermanos>0){
    document.write(numero/1.05);
}else{
    document.write(numero);
}