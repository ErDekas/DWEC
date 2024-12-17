$(document).ready(function() {
    $("#box1").fadeIn("slow", function() {
        $("#box2").fadeIn("fast", function() {
            $("#box3").fadeIn("800", function() {
                $("#box4").fadeIn("2000", function() {
                    $("#box5").fadeIn("4000");
                });
            });
        });
    });
});