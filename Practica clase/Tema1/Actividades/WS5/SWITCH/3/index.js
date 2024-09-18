let numero1 = parseInt(prompt("Introduce el primer numero"));
let numero2 = parseInt(prompt("Introduce el segundo numero"));
let operacion = prompt("Introduce la operacion");
switch(operacion){
    case "+":
        document.write(numero1+numero2);
        break;
    case "-":
        document.write(numero1-numero2);
        break;
    case "*":
        document.write(numero1*numero2);
        break;
    case "/":
        document.write(numero1/numero2);
        break;
    default:
        document.write("Operacion no valida");
}   