let numero = parseInt(prompt("Introduce un numero"));
let contador = 1;
let auxiliar = numero;
do{
    numero = parseInt(prompt("Introduce un numero"));
    auxiliar = auxiliar + numero;
    contador++;
}while(contador < 10)
document.write(auxiliar)