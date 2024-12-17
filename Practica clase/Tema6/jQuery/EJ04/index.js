$(document).ready(function () {
  // Evento para otorgar el foco al cuadro de texto
  $("#botonFoco").click(function () {
    $("#miCuadroTexto").focus();
  });

  // Evento para quitar el foco del cuadro de texto
  $("#botonQuitarFoco").click(function () {
    $("#miCuadroTexto").blur();
  });
});