$(document).ready(function () {
  var clics = 0;

  $("#miParrafo").click(function () {
    clics++;
    let tamano = 30;

    $(this).css("font-size", tamano + clics * 10 + "px");

    console.log(tamano+clics*10);
  });
});