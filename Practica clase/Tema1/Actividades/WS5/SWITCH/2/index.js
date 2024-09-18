let numero = parseInt(prompt("Introduce un numero"));
switch(numero){
    case par:
        if(numero%2==0){
            document.write("Es par");
        }
        break;
    case multiplo3:
        if(numero/3==0){
            document.write("Es multiplo de 3");
        }
        break;
    case multiplo5:
        if(numero/5==0){
            document.write("Es multiplo de 5");
        }
        break;
    default:
        document.write("No es multiplo de 3 ni de 5 y es impar");
}