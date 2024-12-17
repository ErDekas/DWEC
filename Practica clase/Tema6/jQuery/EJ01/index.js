$(document).ready(function () {
  // Crear la tabla con 8 filas
  const tabla = $("#miTabla");
  for (let i = 1; i <= 8; i++) {
    tabla.append(`<tr><td>Fila ${i}</td></tr>`);
  }

  // Seleccionar las filas que están por encima de la tercera
  $("#miTabla tr:lt(2)").css("background-color", "red");

  // Seleccionar las filas que están por debajo de la tercera
  $("#miTabla tr:gt(2)").css("background-color", "blue");
});