$(document).ready(function () {
  // Evento click en el párrafo 1
  $("#parrafo1").click(function () {
    // Cambia el color de ambos párrafos a rojo
    $("#miDiv p").css("color", "red");
  });

  // Evento click en el párrafo 2
  $("#parrafo2").click(function () {
    // Cambia el color de ambos párrafos a verde
    $("#miDiv p").css("color", "green");
  });
});