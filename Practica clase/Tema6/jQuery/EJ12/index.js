$(document).ready(function () {
  $("#menu li").hover(
    function () {
      $(this).stop().animate({ paddingLeft: "20px" }, 200).addClass("active");
    },
    function () {
      $(this)
        .stop()
        .animate({ paddingLeft: "10px" }, 200)
        .removeClass("active");
    }
  );
});