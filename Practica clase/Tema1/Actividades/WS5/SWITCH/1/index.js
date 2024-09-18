let mes = prompt("Introduce el mes");

switch (mes) {
    case "Enero":
    case "Marzo":
    case "Mayo":
    case "Julio":
    case "Agosto":
    case "Octubre":
    case "Diciembre":
        document.write("Tiene 31 días");
        break;
    case "Febrero":
        document.write("Tiene 28 días");
        break;
    default:
        document.write("Tiene 30 días");
        break;
}
