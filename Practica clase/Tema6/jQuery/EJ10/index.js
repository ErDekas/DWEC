(function ($) {
  $.fn.passwordStrength = function (options) {
    var settings = $.extend(
      {
        strengthIndicator: "#password-strength",
      },
      options
    );

    this.on("input", function () {
      var password = $(this).val();
      var strengthMessage;

      if (password.length < 5) {
        strengthMessage = "No segura";
        $(settings.strengthIndicator).css("color", "red");
      } else if (password.length >= 5 && password.length < 8) {
        strengthMessage = "Medianamente segura";
        $(settings.strengthIndicator).css("color", "orange");
      } else {
        strengthMessage = "Segura";
        $(settings.strengthIndicator).css("color", "green");
      }

      $(settings.strengthIndicator).text(strengthMessage);
    });

    return this;
  };
})(jQuery);

$(document).ready(function () {
  $("#password").passwordStrength();
});
