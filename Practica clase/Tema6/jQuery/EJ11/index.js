$(document).ready(function () {
  var $tooltip = $(".tooltip");

  $(".hot")
    .on("mouseenter", function (e) {
      var message = $(this).data("tip");
      $tooltip
        .text(message)
        .css({ top: e.pageY + 10 + "px", left: e.pageX + 10 + "px" })
        .fadeIn();
    })
    .on("mouseleave", function () {
      $tooltip.fadeOut();
    })
    .on("mousemove", function (e) {
      $tooltip.css({ top: e.pageY + 10 + "px", left: e.pageX + 10 + "px" });
    });
});
