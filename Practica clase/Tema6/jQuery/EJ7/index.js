$(document).ready(function () {
  let interval; // Variable para almacenar el intervalo de la animación

  // Botón para iniciar las animaciones
  $("#botonAnimar").click(function () {
    let width = 100; // Ancho inicial
    let height = 100; // Alto inicial
    let color = "#3498db"; // Color inicial

    // Intervalo que se ejecutará cada 100ms
    interval = setInterval(function () {
      // Aumentar el tamaño
      width += 10;
      height += 10;

      // Cambiar de color
      color = color === "#3498db" ? "#e74c3c" : "#3498db"; // Alternar entre dos colores

      // Aplicar cambios al div
      $("#miDiv").css({
        width: width + "px",
        height: height + "px",
        backgroundColor: color,
      });
    }, 100); // Se ejecuta cada 100ms
  });

  // Botón para detener las animaciones
  $("#botonDetener").click(function () {
    // Detener la animación
    clearInterval(interval);
  });
});